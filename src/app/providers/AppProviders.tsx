import React from "react";
import type { PropsWithChildren } from "react";
import { OrderTrackingProvider } from "../../features/order-tracking/services/OrderTrackingProvider";

export const AppProviders: React.FC<PropsWithChildren> = ({ children }) => (
  <OrderTrackingProvider>{children}</OrderTrackingProvider>
);
