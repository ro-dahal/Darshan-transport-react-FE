import React, { type PropsWithChildren } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { OrderTrackingProvider } from '../../features/order-tracking/services/OrderTrackingProvider';
import { ErrorBoundary } from '../../core/components/ErrorBoundary';

export const AppProviders: React.FC<PropsWithChildren> = ({ children }) => (
  <ErrorBoundary>
    <HelmetProvider>
      <OrderTrackingProvider>{children}</OrderTrackingProvider>
    </HelmetProvider>
  </ErrorBoundary>
);
