import type { DeliveryRecord } from '../types/DeliveryRecord';

export interface OrderTrackingService {
  loadSeries(): Promise<string[]>;
  loadDeliveryStatus(series: string, invoiceNumber: string): Promise<DeliveryRecord>;
}
