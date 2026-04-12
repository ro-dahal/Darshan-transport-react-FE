import type { ServicePageData } from '../../components/ServiceDetailPage';

export const serviceCoverageData: ServicePageData = {
  slug: '/transport-coverage-nepal',
  titleTag:
    'Transport Coverage Nepal | Nationwide Logistics | Darshan Transport',
  metaDescription:
    'Darshan Transport covers all major cities and routes across Nepal for reliable cargo delivery.',
  h1: 'Service Coverage Across Nepal',
  whatIsTitle: 'Our Service Coverage',
  whatIsContent:
    'Darshan Transport operates across Nepal, connecting major cities, industrial zones, and commercial hubs. Our route network covers highways and regional roads to ensure your cargo reaches its destination reliably.',
  features: [
    'Coverage across all 7 provinces',
    'Major highway and regional routes',
    'Service to industrial zones and commercial areas',
    'Regular scheduled routes',
    'Flexible routing for special requirements',
  ],
  audience:
    'Businesses that need reliable cargo transport to various locations across Nepal.',
  coverage:
    'Nationwide coverage including Kathmandu, Birgunj, Biratnagar, Pokhara, Butwal, Nepalgunj, Dharan, Hetauda, and more.',
  processSteps: [
    'Share pickup and delivery locations',
    'Route and schedule confirmed',
    'Cargo picked up from origin',
    'Transport via optimized route',
    'Delivery at destination',
  ],
  faq: [
    {
      question: 'Do you deliver to all districts in Nepal?',
      answer:
        'We cover all major cities and commercial hubs. Contact us for specific district availability.',
    },
    {
      question: 'Do you have fixed routes?',
      answer:
        'Yes, we operate regular scheduled routes on major highways, and also offer flexible routing.',
    },
    {
      question: 'Can you transport to remote areas?',
      answer:
        'We can arrange transport to remote areas depending on road accessibility and cargo requirements.',
    },
  ],
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Transport Coverage Nepal',
    areaServed: 'Nepal',
    provider: { '@type': 'Organization', name: 'Darshan Transport' },
    serviceType: 'Nationwide cargo transport',
  },
};
