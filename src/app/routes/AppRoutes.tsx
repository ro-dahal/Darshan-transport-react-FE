import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { ErrorBoundary } from '../../core/components/ErrorBoundary';

// Lazy load pages
const HomePage = React.lazy(() =>
  import('../../features/marketing/home/pages/HomePage').then((module) => ({
    default: module.HomePage,
  }))
);
const AboutPage = React.lazy(() =>
  import('../../features/marketing/about/pages/AboutPage').then((module) => ({
    default: module.AboutPage,
  }))
);
const ServicesPage = React.lazy(() =>
  import('../../features/marketing/services/pages/ServicesPage').then(
    (module) => ({ default: module.ServicesPage })
  )
);
const ContactPage = React.lazy(() =>
  import('../../features/marketing/contact/pages/ContactPage').then(
    (module) => ({ default: module.ContactPage })
  )
);
const GetQuotePage = React.lazy(() =>
  import('../../features/marketing/get-quote/pages/GetQuotePage').then(
    (module) => ({ default: module.GetQuotePage })
  )
);
const OrderTrackingPage = React.lazy(() =>
  import('../../features/order-tracking/pages/OrderTrackingPage').then(
    (module) => ({ default: module.OrderTrackingPage })
  )
);
const NotFoundPage = React.lazy(() =>
  import('../../features/marketing/shared/pages/NotFoundPage').then(
    (module) => ({ default: module.NotFoundPage })
  )
);

/* ===== Order Tracking Variants ===== */
const OrderTrackingV1 = React.lazy(() =>
  import('../../features/order-tracking/pages/OrderTrackingV1').then((m) => ({
    default: m.OrderTrackingV1,
  }))
);
const OrderTrackingV2 = React.lazy(() =>
  import('../../features/order-tracking/pages/OrderTrackingV2').then((m) => ({
    default: m.OrderTrackingV2,
  }))
);
const OrderTrackingV3 = React.lazy(() =>
  import('../../features/order-tracking/pages/OrderTrackingV3').then((m) => ({
    default: m.OrderTrackingV3,
  }))
);
const OrderTrackingV4 = React.lazy(() =>
  import('../../features/order-tracking/pages/OrderTrackingV4').then((m) => ({
    default: m.OrderTrackingV4,
  }))
);
const OrderTrackingV5 = React.lazy(() =>
  import('../../features/order-tracking/pages/OrderTrackingV5').then((m) => ({
    default: m.OrderTrackingV5,
  }))
);
const OrderTrackingV6 = React.lazy(() =>
  import('../../features/order-tracking/pages/OrderTrackingV6').then((m) => ({
    default: m.OrderTrackingV6,
  }))
);
const OrderTrackingV7 = React.lazy(() =>
  import('../../features/order-tracking/pages/OrderTrackingV7').then((m) => ({
    default: m.OrderTrackingV7,
  }))
);
const OrderTrackingV8 = React.lazy(() =>
  import('../../features/order-tracking/pages/OrderTrackingV8').then((m) => ({
    default: m.OrderTrackingV8,
  }))
);
const OrderTrackingV9 = React.lazy(() =>
  import('../../features/order-tracking/pages/OrderTrackingV9').then((m) => ({
    default: m.OrderTrackingV9,
  }))
);
const OrderTrackingV10 = React.lazy(() =>
  import('../../features/order-tracking/pages/OrderTrackingV10').then((m) => ({
    default: m.OrderTrackingV10,
  }))
);

const RouteLoadingFallback: React.FC = () => (
  <div
    className="min-h-[40vh] w-full flex items-center justify-center"
    role="status"
    aria-live="polite"
  >
    <div className="h-10 w-10 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
    <span className="sr-only">Loading page</span>
  </div>
);

export const AppRoutes: React.FC = () => (
  <ErrorBoundary>
    <Suspense fallback={<RouteLoadingFallback />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/order" element={<OrderTrackingPage />} />
          <Route path="/get-quote" element={<GetQuotePage />} />

          {/* Order Tracking Design Variants */}
          <Route path="/1" element={<OrderTrackingV1 />} />
          <Route path="/2" element={<OrderTrackingV2 />} />
          <Route path="/3" element={<OrderTrackingV3 />} />
          <Route path="/4" element={<OrderTrackingV4 />} />
          <Route path="/5" element={<OrderTrackingV5 />} />
          <Route path="/6" element={<OrderTrackingV6 />} />
          <Route path="/7" element={<OrderTrackingV7 />} />
          <Route path="/8" element={<OrderTrackingV8 />} />
          <Route path="/9" element={<OrderTrackingV9 />} />
          <Route path="/10" element={<OrderTrackingV10 />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  </ErrorBoundary>
);
