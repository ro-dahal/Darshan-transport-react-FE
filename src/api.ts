// Centralized API client for Darshan Transport FE
// Uses VITE_API_BASE_URL from env

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export async function fetchSeriesList(): Promise<string[]> {
  const res = await fetch(`${API_BASE_URL}/api/v1/delivery/series`);
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
  const res = await fetch(`${API_BASE_URL}/api/v1/delivery/status/${encodeURIComponent(series)}/${encodeURIComponent(invoiceNumber)}`);
  if (!res.ok) throw new Error('Failed to fetch delivery status');
  const json = await res.json();
  if (!json.success || !json.data) throw new Error(json.message || 'Invalid delivery status response');
  return json.data as DeliveryData;
}
