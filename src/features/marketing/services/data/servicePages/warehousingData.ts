import type { ServicePageData } from '../../components/ServiceDetailPage';

export const warehousingData: ServicePageData = {
  slug: '/warehousing-3pl-nepal',
  titleTag: 'Warehousing Nepal | Inventory Management & Storage | Darshan',
  metaDescription:
    'Secure warehousing and inventory management services in Nepal with scalable storage and stock handling.',
  h1: 'Warehousing & Inventory Management in Nepal',
  whatIsTitle: 'What is Warehousing & Inventory Management?',
  whatIsContent:
    'Our warehousing services provide secure storage, organized inventory handling, and stock management support for businesses that need scalable solutions. We help you maintain better control and visibility over your goods.',
  features: [
    'Secure storage facilities',
    'SKU-based inventory handling',
    'Stock tracking and reporting',
    'Inbound/outbound management',
    'Scalable storage solutions',
  ],
  audience:
    'E-commerce businesses, distributors, manufacturers, and companies managing regular inventory flow.',
  coverage:
    'Warehousing facilities available in key commercial hubs across Nepal.',
  processSteps: [
    'Discuss storage requirements',
    'Warehouse space allocated',
    'Goods received and catalogued',
    'Ongoing inventory management',
    'Dispatch coordination as needed',
  ],
  faq: [
    {
      question: 'Do you offer short-term storage?',
      answer:
        'Yes, we offer both short-term and long-term warehousing solutions based on your needs.',
    },
    {
      question: 'Can you manage inventory tracking?',
      answer:
        'Yes, we provide SKU-based inventory handling with regular stock reports.',
    },
    {
      question: 'Is the warehouse secure?',
      answer:
        'Yes, our warehousing facilities have security measures and controlled access.',
    },
  ],
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Warehousing & Inventory',
    areaServed: 'Nepal',
    provider: { '@type': 'Organization', name: 'Darshan Transport' },
    serviceType: 'Warehousing and inventory management',
  },
};
