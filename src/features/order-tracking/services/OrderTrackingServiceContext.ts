import { createContext, useContext } from 'react';
import type { OrderTrackingService } from './OrderTrackingService';

export const OrderTrackingServiceContext = createContext<OrderTrackingService | null>(null);

export function useOrderTrackingService(): OrderTrackingService {
  const ctx = useContext(OrderTrackingServiceContext);
  if (!ctx) {
    throw new Error('useOrderTrackingService must be used within an OrderTrackingProvider');
  }
  return ctx;
}
