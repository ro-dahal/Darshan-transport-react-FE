import React, { createContext, useContext, useMemo } from 'react';
import type { PropsWithChildren } from 'react';
import type { OrderTrackingService } from './OrderTrackingService';
import { createHttpOrderTrackingService } from './httpOrderTrackingService';

const OrderTrackingServiceContext = createContext<OrderTrackingService | null>(null);

export interface OrderTrackingProviderProps extends PropsWithChildren {
  service?: OrderTrackingService;
}

export const OrderTrackingProvider: React.FC<OrderTrackingProviderProps> = ({ children, service }) => {
  const value = useMemo<OrderTrackingService>(() => service ?? createHttpOrderTrackingService(), [service]);

  return <OrderTrackingServiceContext.Provider value={value}>{children}</OrderTrackingServiceContext.Provider>;
};

export function useOrderTrackingService(): OrderTrackingService {
  const ctx = useContext(OrderTrackingServiceContext);
  if (!ctx) {
    throw new Error('useOrderTrackingService must be used within an OrderTrackingProvider');
  }
  return ctx;
}
