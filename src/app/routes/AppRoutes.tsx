import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { MainLayoutV2 } from '../layouts/MainLayoutV2';
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
  import('../../features/order-tracking/pages/OrderTracking').then(
    (module) => ({ default: module.OrderTracking })
  )
);
const FAQPage = React.lazy(() =>
  import('../../features/marketing/faq/pages/FAQPage').then((module) => ({
    default: module.FAQPage,
  }))
);
const AboutPageV2 = React.lazy(() =>
  import('../../features/marketing/about/pages/AboutPageV2').then((module) => ({
    default: module.AboutPageV2,
  }))
);
const HomePageV2 = React.lazy(() =>
  import('../../features/marketing/home/pages/HomePageV2').then((module) => ({
    default: module.HomePageV2,
  }))
);
const ServicesPageV2 = React.lazy(() =>
  import('../../features/marketing/services/pages/ServicesPageV2').then(
    (module) => ({ default: module.ServicesPageV2 })
  )
);
const ContactPageV2 = React.lazy(() =>
  import('../../features/marketing/contact/pages/ContactPageV2').then(
    (module) => ({ default: module.ContactPageV2 })
  )
);
const FAQPageV2 = React.lazy(() =>
  import('../../features/marketing/faq/pages/FAQPageV2').then((module) => ({
    default: module.FAQPageV2,
  }))
);
const GetQuotePageV2 = React.lazy(() =>
  import('../../features/marketing/get-quote/pages/GetQuotePageV2').then(
    (module) => ({ default: module.GetQuotePageV2 })
  )
);
const OrderTrackingV2 = React.lazy(() =>
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
          <Route path="/faq" element={<FAQPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* V2 Routes — uses overhauled NavbarV2 + FooterV2 */}
        <Route element={<MainLayoutV2 />}>
          <Route path="/v2" element={<HomePageV2 />} />
          <Route path="/about/v2" element={<AboutPageV2 />} />
          <Route path="/services/v2" element={<ServicesPageV2 />} />
          <Route path="/contact/v2" element={<ContactPageV2 />} />
          <Route path="/faq/v2" element={<FAQPageV2 />} />
          <Route path="/get-quote/v2" element={<GetQuotePageV2 />} />
          <Route path="/order/v2" element={<OrderTrackingV2 />} />
        </Route>
      </Routes>
    </Suspense>
  </ErrorBoundary>
);
