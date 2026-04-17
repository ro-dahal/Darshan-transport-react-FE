import { appConfig } from '../config/appConfig';

export interface ApiEnvelope<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export type FetchImplementation = typeof fetch;

export interface ApiClient {
  get<TResponse>(path: string): Promise<TResponse>;
  post<TRequest, TResponse>(path: string, body: TRequest): Promise<TResponse>;
}

export interface CreateApiClientOptions {
  baseUrl?: string;
  fetchImpl?: FetchImplementation;
}

function buildUrl(path: string, baseUrl: string): string {
  return new URL(path, baseUrl).toString();
}

async function ensureOk(response: Response): Promise<Response> {
  if (!response.ok) {
    const text = await response.text().catch(() => undefined);
    let apiMessage: string | undefined;

    if (text?.trim().startsWith('{')) {
      try {
        const parsed = JSON.parse(text) as { message?: string };
        apiMessage = parsed.message;
      } catch {
        apiMessage = undefined;
      }
    }

    // If it's a 502 or 503, it's likely the backend is down
    if (
      response.status === 502 ||
      response.status === 503 ||
      response.status === 504
    ) {
      throw new Error(
        `SERVICE_UNAVAILABLE|${apiMessage || 'The service is currently unavailable. Please try again later.'}`
      );
    }

    // If the response is HTML (starts with <!DOCTYPE or <html), don't show it to the user
    if (
      text?.trim().toLowerCase().startsWith('<!doctype') ||
      text?.trim().toLowerCase().startsWith('<html')
    ) {
      throw new Error(
        `SERVER_ERROR|We encountered an unexpected error on our server. Status: ${response.status}`
      );
    }

    throw new Error(
      apiMessage || text || `Request failed with status ${response.status}`
    );
  }
  return response;
}

export function createApiClient({
  baseUrl = appConfig.apiBaseUrl,
  fetchImpl = fetch,
}: CreateApiClientOptions = {}): ApiClient {
  async function requestJson<TResponse>(
    path: string,
    init?: RequestInit
  ): Promise<TResponse> {
    const url = buildUrl(path, baseUrl);
    const correlationId = `web-${crypto.randomUUID()}`;

    try {
      const response = await ensureOk(
        await fetchImpl(url, {
          ...init,
          headers: {
            'X-Correlation-ID': correlationId,
            ...(init?.headers ?? {}),
          },
        })
      );
      return (await response.json()) as TResponse;
    } catch (error: unknown) {
      // Handle fetch level errors (network down, CORS, etc.)
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error(
          'SERVICE_UNAVAILABLE|The service is currently unavailable. Please try again later.'
        );
      }
      // Re-throw unexpected errors
      throw error;
    }
  }

  return {
    async get<TResponse>(path: string): Promise<TResponse> {
      return requestJson<TResponse>(path);
    },

    async post<TRequest, TResponse>(
      path: string,
      body: TRequest
    ): Promise<TResponse> {
      return requestJson<TResponse>(path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    },
  };
}

export async function getFromEnvelope<TData>(
  client: ApiClient,
  path: string,
  errorHint: string
): Promise<TData> {
  const envelope = await client.get<ApiEnvelope<TData>>(path);
  if (
    !envelope.success ||
    envelope.data === undefined ||
    envelope.data === null
  ) {
    throw new Error(envelope.message || errorHint);
  }
  return envelope.data;
}
