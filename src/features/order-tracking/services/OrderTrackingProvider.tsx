import React, { useMemo } from 'react';
import type { PropsWithChildren } from 'react';
import type { OrderTrackingService } from './OrderTrackingService';
import { createHttpOrderTrackingService } from './httpOrderTrackingService';
import { OrderTrackingServiceContext } from './OrderTrackingServiceContext';

export interface OrderTrackingProviderProps extends PropsWithChildren {
  service?: OrderTrackingService;
}

export const OrderTrackingProvider: React.FC<OrderTrackingProviderProps> = ({ children, service }) => {
  const value = useMemo<OrderTrackingService>(() => service ?? createHttpOrderTrackingService(), [service]);

  return <OrderTrackingServiceContext.Provider value={value}>{children}</OrderTrackingServiceContext.Provider>;
};
