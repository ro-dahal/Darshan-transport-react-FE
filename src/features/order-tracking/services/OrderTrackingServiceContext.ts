import { createContext, useContext } from 'react';
import type { OrderTrackingService } from './OrderTrackingService';

/**
 * Context for providing an OrderTrackingService implementation to the component tree.
 */
export const OrderTrackingServiceContext =
  createContext<OrderTrackingService | null>(null);

/**
 * Hook to access the OrderTrackingService within the OrderTrackingProvider.
 * Throws an error if used outside of its provider.
 *
 * @returns {OrderTrackingService} The registered tracking service.
 */
export function useOrderTrackingService(): OrderTrackingService {
  const ctx = useContext(OrderTrackingServiceContext);
  if (!ctx) {
    throw new Error(
      'useOrderTrackingService must be used within an OrderTrackingProvider'
    );
  }
  return ctx;
}
