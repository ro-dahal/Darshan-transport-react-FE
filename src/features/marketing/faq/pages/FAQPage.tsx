import React from 'react';
import { FAQSection } from '../../home/components/FAQSection';
import { PageHeader } from '../../about/components/PageHeader';
import { MetaTags } from '../../../../core/components/MetaTags';

export const FAQPage: React.FC = () => (
  <div className="flex flex-col min-h-screen">
    <MetaTags
      title="FAQs | Darshan Transport - Logistics & Cargo Services in Nepal"
      description="Find answers to frequently asked questions about Darshan Transport's bulk cargo, full-truck shipments, warehousing, and logistics services across Nepal."
      canonical="https://darshantransport.com/faq"
    />
    <PageHeader
      title="Frequently Asked Questions"
      subtitle="Clear answers for quotes, shipment support, warehousing, and business logistics across Nepal."
    />
    <FAQSection />
  </div>
);
