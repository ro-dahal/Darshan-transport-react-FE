export type DeliveryStatusKey = 'waiting' | 'ongoing' | 'delivered' | string;

export interface DeliveryRecord {
  status: DeliveryStatusKey;
  consigner?: string;
  consignee?: string;
  from?: string;
  to?: string;
  message?: string;
  error?: string;
  bookingDate?: string | null;
  dispatchDate?: string | null;
  arrivalDate?: string | null;
}
