import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { ErrorBoundary } from '../../core/components/ErrorBoundary';
import { TEAM_PAGE_ENABLED } from '../../core/config/siteFlags';

const AboutPage = React.lazy(() =>
  import('../../features/marketing/about/pages/AboutPage').then((module) => ({
    default: module.AboutPage,
  }))
);
const HomePage = React.lazy(() =>
  import('../../features/marketing/home/pages/HomePage').then((module) => ({
    default: module.HomePage,
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
const TeamPage = React.lazy(() =>
  import('../../features/marketing/team/pages/TeamPage').then((module) => ({
    default: module.TeamPage,
  }))
);
const FAQPage = React.lazy(() =>
  import('../../features/marketing/faq/pages/FAQPage').then((module) => ({
    default: module.FAQPage,
  }))
);
const LocationsPage = React.lazy(() =>
  import('../../features/marketing/locations/pages/LocationsPage').then(
    (module) => ({ default: module.LocationsPage })
  )
);
const OrderTracking = React.lazy(() =>
  import('../../features/order-tracking/pages/OrderTracking').then(
    (module) => ({ default: module.OrderTracking })
  )
);
const BulkCargoPage = React.lazy(() =>
  import('../../features/marketing/services/pages/BulkCargoPage').then(
    (module) => ({ default: module.BulkCargoPage })
  )
);
const FullTruckLoadPage = React.lazy(() =>
  import('../../features/marketing/services/pages/FullTruckLoadPage').then(
    (module) => ({ default: module.FullTruckLoadPage })
  )
);
const WarehousingPage = React.lazy(() =>
  import('../../features/marketing/services/pages/WarehousingPage').then(
    (module) => ({ default: module.WarehousingPage })
  )
);
const DistributionPage = React.lazy(() =>
  import('../../features/marketing/services/pages/DistributionPage').then(
    (module) => ({ default: module.DistributionPage })
  )
);
const ThirdPartyLogisticsPage = React.lazy(() =>
  import('../../features/marketing/services/pages/ThirdPartyLogisticsPage').then(
    (module) => ({ default: module.ThirdPartyLogisticsPage })
  )
);
const PackagingHandlingPage = React.lazy(() =>
  import('../../features/marketing/services/pages/PackagingHandlingPage').then(
    (module) => ({ default: module.PackagingHandlingPage })
  )
);
const FleetServicesPage = React.lazy(() =>
  import('../../features/marketing/services/pages/FleetServicesPage').then(
    (module) => ({ default: module.FleetServicesPage })
  )
);
const ServiceCoveragePage = React.lazy(() =>
  import('../../features/marketing/services/pages/ServiceCoveragePage').then(
    (module) => ({ default: module.ServiceCoveragePage })
  )
);
const PrivacyPolicyPage = React.lazy(() =>
  import('../../features/marketing/legal/pages/PrivacyPolicyPage').then(
    (module) => ({ default: module.PrivacyPolicyPage })
  )
);
const TermsConditionsPage = React.lazy(() =>
  import('../../features/marketing/legal/pages/TermsConditionsPage').then(
    (module) => ({ default: module.TermsConditionsPage })
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
          <Route
            path="/team"
            element={TEAM_PAGE_ENABLED ? <TeamPage /> : <NotFoundPage />}
          />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/order" element={<OrderTracking />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route
            path="/get-quote"
            element={<Navigate to="/locations" replace />}
          />
          <Route path="/faq" element={<FAQPage />} />
          <Route
            path="/bulk-cargo-transport-nepal"
            element={<BulkCargoPage />}
          />
          <Route
            path="/full-truck-load-nepal"
            element={<FullTruckLoadPage />}
          />
          <Route path="/warehousing-3pl-nepal" element={<WarehousingPage />} />
          <Route
            path="/distribution-delivery-nepal"
            element={<DistributionPage />}
          />
          <Route
            path="/third-party-logistics-nepal"
            element={<ThirdPartyLogisticsPage />}
          />
          <Route
            path="/packaging-handling-nepal"
            element={<PackagingHandlingPage />}
          />
          <Route path="/fleet-services-nepal" element={<FleetServicesPage />} />
          <Route
            path="/transport-coverage-nepal"
            element={<ServiceCoveragePage />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-conditions" element={<TermsConditionsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  </ErrorBoundary>
);
