import type { ServicePageData } from '../../components/ServiceDetailPage';

export const bulkCargoData: ServicePageData = {
  slug: '/bulk-cargo-transport-nepal',
  titleTag:
    'Bulk Cargo Transport Nepal | Full Truck Logistics | Darshan Transport',
  metaDescription:
    'Bulk cargo transport across Nepal for businesses. Full-truck logistics, direct routes, and secure handling for high-volume shipments.',
  h1: 'Bulk Cargo Transport Across Nepal',
  whatIsTitle: 'What is Bulk Cargo Transport?',
  whatIsContent:
    'Bulk cargo transport involves moving large volumes of goods in a single shipment using dedicated trucks. It is ideal for manufacturers, distributors, and businesses handling palletized or heavy goods.',
  features: [
    'Dedicated full-truck movement',
    'Direct routes between major cities',
    'Minimal handling → lower damage risk',
    'Scheduled and on-demand dispatch',
    'Real-time coordination support',
  ],
  audience:
    'Manufacturers, FMCG distributors, wholesalers, industrial suppliers.',
  coverage:
    'Kathmandu, Pokhara, Birgunj, Chitwan, Butwal, Baglung + major trade routes.',
  processSteps: [
    'Share cargo details',
    'Vehicle assigned',
    'Pickup & load',
    'Direct transport',
    'Delivery confirmation',
  ],
  faq: [
    {
      question: 'Do you handle large shipments?',
      answer: 'Yes, we specialize in bulk cargo.',
    },
    {
      question: 'Is this full truck only?',
      answer: 'Yes, bulk shipments use full truck loads.',
    },
    {
      question: 'Do you offer tracking?',
      answer:
        'Yes, real-time coordination and tracking support is available for all shipments.',
    },
    {
      question: 'Which cities do you cover?',
      answer:
        'We cover major routes across Nepal including Kathmandu, Pokhara, Birgunj, Chitwan, Butwal, and Baglung.',
    },
  ],
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Bulk Cargo Transport',
    areaServed: 'Nepal',
    provider: { '@type': 'Organization', name: 'Darshan Transport' },
    serviceType: 'Bulk cargo logistics',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Bulk Transport Options',
    },
  },
};
