import type { ServicePageData } from '../../components/ServiceDetailPage';

export const thirdPartyLogisticsData: ServicePageData = {
  slug: '/third-party-logistics-nepal',
  titleTag: '3PL Services Nepal | Logistics Outsourcing | Darshan',
  metaDescription:
    'End-to-end 3PL services in Nepal including storage, fulfillment, and distribution.',
  h1: 'Third-Party Logistics (3PL) Services in Nepal',
  whatIsTitle: 'What is Third-Party Logistics (3PL)?',
  whatIsContent:
    'Third-party logistics (3PL) is a complete logistics outsourcing service where we handle storage, order fulfillment, shipping, and distribution on behalf of your business. This allows you to focus on your core operations while we manage the logistics.',
  features: [
    'End-to-end logistics management',
    'Inventory and fulfillment support',
    'Integrated warehouse operations',
    'Shipping and distribution coordination',
    'Reverse logistics handling',
  ],
  audience:
    'E-commerce businesses, growing brands, and companies looking to outsource logistics operations.',
  coverage: 'Logistics operations across key commercial hubs in Nepal.',
  processSteps: [
    'Discuss logistics requirements',
    'Onboard products and set up workflows',
    'Ongoing storage and fulfillment',
    'Shipping coordination and tracking',
    'Reporting and optimization',
  ],
  faq: [
    {
      question: 'What does 3PL include?',
      answer:
        'Our 3PL services include storage, inventory management, order fulfillment, shipping, and distribution coordination.',
    },
    {
      question: 'Is 3PL suitable for small businesses?',
      answer:
        'Yes, our 3PL solutions are scalable and can support businesses of all sizes.',
    },
    {
      question: 'Do you handle returns?',
      answer:
        'Yes, we offer reverse logistics support as part of our 3PL services.',
    },
  ],
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Third Party Logistics',
    areaServed: 'Nepal',
    provider: { '@type': 'Organization', name: 'Darshan Transport' },
    serviceType: '3PL logistics outsourcing',
  },
};
