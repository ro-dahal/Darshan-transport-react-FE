import type { DeliveryStatusKey } from '../types/DeliveryRecord';

export interface OrderStatusStep {
  key: DeliveryStatusKey;
  label: string;
}

export const ORDER_STATUS_STEPS: OrderStatusStep[] = [
  { key: 'waiting', label: 'Waiting' },
  { key: 'ongoing', label: 'Ongoing' },
  { key: 'delivered', label: 'Delivered' },
];
