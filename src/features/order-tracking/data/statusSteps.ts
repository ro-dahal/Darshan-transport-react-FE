import type { DeliveryStatusKey } from '../types/DeliveryRecord';
import { DELIVERED_STATUS_COPY } from './deliveryStatusCopy';

export interface OrderStatusStep {
  key: DeliveryStatusKey;
  label: string;
}

export const ORDER_STATUS_STEPS: OrderStatusStep[] = [
  { key: 'waiting', label: 'Waiting' },
  { key: 'ongoing', label: 'Ongoing' },
  { key: 'delivered', label: DELIVERED_STATUS_COPY.stepLabel },
];
