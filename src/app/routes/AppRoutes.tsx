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
  import('../../features/order-tracking/pages/OrderTrackingV2').then(
    (module) => ({ default: module.OrderTrackingV2 })
  )
);
const NotFoundPage = React.lazy(() =>
  import('../../features/marketing/shared/pages/NotFoundPage').then(
    (module) => ({ default: module.NotFoundPage })
  )
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

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  </ErrorBoundary>
);
