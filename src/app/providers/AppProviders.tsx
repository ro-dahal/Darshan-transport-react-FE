import React from "react";
import type { PropsWithChildren } from "react";
import { OrderTrackingProvider } from "../../features/order-tracking/services/OrderTrackingProvider";
import { GlobalStatusProvider } from "../../features/global-status/GlobalStatusContext";
import { ServiceDownBanner } from "../../features/global-status/ServiceDownBanner";

export const AppProviders: React.FC<PropsWithChildren> = ({ children }) => (
  <GlobalStatusProvider>
    <ServiceDownBanner />
    <OrderTrackingProvider>{children}</OrderTrackingProvider>
  </GlobalStatusProvider>
);
