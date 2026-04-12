import type { ServicePageData } from '../../components/ServiceDetailPage';

export const fleetServicesData: ServicePageData = {
  slug: '/fleet-services-nepal',
  titleTag: 'Fleet Services Nepal | GPS-Tracked Trucks | Darshan Transport',
  metaDescription:
    'GPS-tracked fleet services with well-maintained trucks for safe and timely cargo transport across Nepal.',
  h1: 'Fleet Services',
  whatIsTitle: 'What Are Fleet Services?',
  whatIsContent:
    'Our fleet services provide access to a range of well-maintained, GPS-tracked vehicles for cargo transport. Our drivers are trained professionals, and our fleet management system ensures timely dispatch, tracking, and delivery.',
  features: [
    'Well-maintained fleet of trucks and vehicles',
    'GPS tracking on all vehicles',
    'Trained and professional drivers',
    'Fleet management and dispatch',
    'Regular vehicle maintenance and safety checks',
  ],
  audience:
    'Businesses that require reliable vehicles for regular or one-time cargo transport.',
  coverage:
    'Fleet available for operations across Nepal, including highways and regional routes.',
  processSteps: [
    'Share your transport requirements',
    'Vehicle assigned from available fleet',
    'GPS tracking enabled for shipment',
    'Driver dispatched on schedule',
    'Delivery confirmed and documented',
  ],
  faq: [
    {
      question: 'Are all vehicles GPS tracked?',
      answer:
        'Yes, every vehicle in our fleet is equipped with GPS tracking for real-time visibility.',
    },
    {
      question: 'What types of vehicles are available?',
      answer:
        'Our fleet includes trucks of various capacities suitable for different cargo sizes and weights.',
    },
    {
      question: 'Do you offer dedicated vehicles?',
      answer:
        'Yes, we can assign dedicated vehicles for businesses with regular transport needs.',
    },
  ],
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Fleet Services',
    areaServed: 'Nepal',
    provider: { '@type': 'Organization', name: 'Darshan Transport' },
    serviceType: 'Fleet management and transport services',
  },
};
