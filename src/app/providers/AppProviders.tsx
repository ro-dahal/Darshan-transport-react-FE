import React, { type PropsWithChildren } from "react";
import { HelmetProvider } from "react-helmet-async";
import { OrderTrackingProvider } from "../../features/order-tracking/services/OrderTrackingProvider";

export const AppProviders: React.FC<PropsWithChildren> = ({ children }) => (
  <HelmetProvider>
    <OrderTrackingProvider>{children}</OrderTrackingProvider>
  </HelmetProvider>
);
