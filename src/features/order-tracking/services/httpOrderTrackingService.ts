import { createApiClient, getFromEnvelope } from '../../../core/api/apiClient';
import type { DeliveryRecord } from '../types/DeliveryRecord';
import type { OrderTrackingService } from './OrderTrackingService';

export function createHttpOrderTrackingService(): OrderTrackingService {
  const client = createApiClient();

  return {
    async loadSeries(): Promise<string[]> {
      const data = await getFromEnvelope<string[]>(client, '/api/v1/delivery/series', 'Failed to fetch series list');
      if (!Array.isArray(data)) {
        throw new Error('Series list response was not an array');
      }
      return data;
    },

    async loadDeliveryStatus(series: string, invoiceNumber: string): Promise<DeliveryRecord> {
      const path = `/api/v1/delivery/status/${encodeURIComponent(series)}/${encodeURIComponent(invoiceNumber)}`;
      return getFromEnvelope<DeliveryRecord>(client, path, 'Failed to fetch delivery status');
    },
  };
}
