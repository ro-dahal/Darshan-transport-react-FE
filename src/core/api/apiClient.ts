import { appConfig } from '../config/appConfig';

export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
}

export type FetchImplementation = typeof fetch;

export interface ApiClient {
  get<TResponse>(path: string): Promise<TResponse>;
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
    const message = await response.text().catch(() => undefined);
    throw new Error(message || `Request failed with status ${response.status}`);
  }
  return response;
}

export function createApiClient({
  baseUrl = appConfig.apiBaseUrl,
  fetchImpl = fetch,
}: CreateApiClientOptions = {}): ApiClient {
  return {
    async get<TResponse>(path: string): Promise<TResponse> {
      const url = buildUrl(path, baseUrl);
      const response = await ensureOk(await fetchImpl(url));
      return (await response.json()) as TResponse;
    },
  };
}

export async function getFromEnvelope<TData>(
  client: ApiClient,
  path: string,
  errorHint: string
): Promise<TData> {
  const envelope = await client.get<ApiEnvelope<TData>>(path);
  if (!envelope.success || envelope.data === undefined || envelope.data === null) {
    throw new Error(envelope.message || errorHint);
  }
  return envelope.data;
}
