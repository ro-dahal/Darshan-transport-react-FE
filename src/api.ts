// Centralized API client for Darshan Transport FE
// Resolve API base URL safely:
// - If VITE_API_BASE_URL is set to a real URL, use it
// - BUT if it points to localhost and the page is NOT running on localhost, ignore it (use same-origin)
// - Otherwise default to same-origin, so IIS can reverse-proxy /api to the backend

const envBase = (import.meta.env.VITE_API_BASE_URL ?? '').toString().trim();
const isLocalHost = (hn: string) => /^(localhost|127\.0\.0\.1|\[::1\])$/i.test(hn);
const pageIsLocal = isLocalHost(window.location.hostname);
const envIsLocal = /localhost|127\.0\.0\.1|\[::1\]/i.test(envBase);

const EFFECTIVE_BASE = envBase && !(envIsLocal && !pageIsLocal) ? envBase : window.location.origin;
const toUrl = (path: string) => new URL(path, EFFECTIVE_BASE).toString();

export async function fetchSeriesList(): Promise<string[]> {
  const res = await fetch(toUrl('/api/v1/delivery/series'));
  if (!res.ok) throw new Error('Failed to fetch series list');
  const json = await res.json();
  if (!json.success || !Array.isArray(json.data)) throw new Error('Invalid series response');
  return json.data as string[];
}

export interface DeliveryData {
  status: string;
  consigner?: string;
  consignee?: string;
  from?: string;
  to?: string;
  message?: string;
  error?: string;
}

export async function fetchDeliveryStatus(series: string, invoiceNumber: string): Promise<DeliveryData> {
  const res = await fetch(
    toUrl(`/api/v1/delivery/status/${encodeURIComponent(series)}/${encodeURIComponent(invoiceNumber)}`)
  );
  if (!res.ok) throw new Error('Failed to fetch delivery status');
  const json = await res.json();
  if (!json.success || !json.data) throw new Error(json.message || 'Invalid delivery status response');
  return json.data as DeliveryData;
}
