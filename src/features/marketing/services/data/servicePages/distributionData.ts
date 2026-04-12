import type { ServicePageData } from '../../components/ServiceDetailPage';

export const distributionData: ServicePageData = {
  slug: '/distribution-delivery-nepal',
  titleTag: 'Distribution & Delivery Nepal | Business Logistics | Darshan',
  metaDescription:
    'Efficient distribution and delivery services across Nepal for businesses and supply chains.',
  h1: 'Distribution & Delivery Services in Nepal',
  whatIsTitle: 'What is Distribution & Delivery?',
  whatIsContent:
    'Our distribution and delivery services ensure efficient movement of goods from warehouses to multiple business locations, retail points, and end customers. We support planned and recurring delivery schedules for consistent supply chain operations.',
  features: [
    'Multi-location delivery coordination',
    'Route optimization for efficiency',
    'Timely and scheduled dispatch',
    'Branch-to-branch delivery support',
    'Dealer and retailer distribution',
  ],
  audience:
    'Retail chains, FMCG distributors, manufacturers with multi-location delivery needs.',
  coverage:
    'Distribution network covering Kathmandu, Pokhara, Birgunj, Chitwan, Butwal, Baglung and surrounding areas.',
  processSteps: [
    'Share delivery requirements and locations',
    'Route and schedule planning',
    'Goods collected from warehouse or source',
    'Coordinated multi-point delivery',
    'Delivery confirmation at each location',
  ],
  faq: [
    {
      question: 'Can you handle multi-location deliveries?',
      answer:
        'Yes, we coordinate deliveries to multiple locations including branches, dealers, and retail points.',
    },
    {
      question: 'Do you support recurring delivery schedules?',
      answer:
        'Yes, we support planned and recurring delivery schedules for businesses with regular distribution needs.',
    },
    {
      question: 'How do you optimize delivery routes?',
      answer:
        'We plan routes based on delivery locations, volume, and timing to ensure efficient and timely deliveries.',
    },
  ],
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Distribution & Delivery',
    areaServed: 'Nepal',
    provider: { '@type': 'Organization', name: 'Darshan Transport' },
    serviceType: 'Distribution and delivery logistics',
  },
};
