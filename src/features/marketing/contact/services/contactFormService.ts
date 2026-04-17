import {
  createApiClient,
  type ApiEnvelope,
} from '../../../../core/api/apiClient';

export interface ContactFormPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const client = createApiClient();

function extractMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return 'We could not send your message right now. Please try again shortly.';
  }

  if (!error.message) {
    return 'We could not send your message right now. Please try again shortly.';
  }

  if (error.message.startsWith('{')) {
    try {
      const parsed = JSON.parse(error.message) as { message?: string };
      if (parsed.message) {
        return parsed.message;
      }
    } catch {
      return 'We could not send your message right now. Please try again shortly.';
    }
  }

  return error.message.split('|')[1] ?? error.message;
}

export async function submitContactForm(
  payload: ContactFormPayload
): Promise<string> {
  try {
    const envelope = await client.post<ContactFormPayload, ApiEnvelope<null>>(
      '/api/v1/contact/messages',
      payload
    );

    if (!envelope.success) {
      throw new Error(envelope.message || 'Failed to send contact message');
    }

    return envelope.message || 'Your message has been sent successfully.';
  } catch (error) {
    throw new Error(extractMessage(error));
  }
}
