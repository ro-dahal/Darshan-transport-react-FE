import type { ServicePageData } from '../../components/ServiceDetailPage';

export const packagingHandlingData: ServicePageData = {
  slug: '/packaging-handling-nepal',
  titleTag: 'Packaging & Cargo Handling Nepal | Safe Transport | Darshan',
  metaDescription:
    'Professional packaging and cargo handling services to reduce damage during transport.',
  h1: 'Packaging & Handling Services',
  whatIsTitle: 'What is Packaging & Handling?',
  whatIsContent:
    'Our packaging and handling services ensure your cargo is properly secured, packed, and managed before and during transport. Professional handling reduces the risk of damage, loss, and transit issues.',
  features: [
    'Secure and professional packaging',
    'Safe loading and unloading',
    'Reduced damage risk during transport',
    'Custom packaging for fragile or heavy items',
    'Labeling and documentation support',
  ],
  audience:
    'Businesses shipping fragile goods, high-value items, or products requiring specialized handling.',
  coverage:
    'Packaging and handling services available across all service points in Nepal.',
  processSteps: [
    'Assess cargo packaging requirements',
    'Prepare appropriate packaging materials',
    'Secure packing and labeling',
    'Safe loading onto transport vehicle',
    'Careful unloading at destination',
  ],
  faq: [
    {
      question: 'Do you handle fragile items?',
      answer:
        'Yes, we provide custom packaging solutions for fragile and high-value items.',
    },
    {
      question: 'Is packaging included in transport services?',
      answer:
        'Basic handling is included. Specialized packaging can be arranged based on requirements.',
    },
    {
      question: 'Can you label shipments?',
      answer:
        'Yes, we offer labeling and documentation support as part of our packaging services.',
    },
  ],
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Packaging & Handling',
    areaServed: 'Nepal',
    provider: { '@type': 'Organization', name: 'Darshan Transport' },
    serviceType: 'Cargo packaging and handling',
  },
};
