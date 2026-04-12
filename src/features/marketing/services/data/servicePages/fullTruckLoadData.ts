import type { ServicePageData } from '../../components/ServiceDetailPage';

export const fullTruckLoadData: ServicePageData = {
  slug: '/full-truck-load-nepal',
  titleTag: 'Full Truck Load Nepal | Dedicated Truck Transport | Darshan',
  metaDescription:
    'Book full truck load transport in Nepal. Dedicated trucks, faster delivery, and secure shipment handling.',
  h1: 'Full Truck Load Transport in Nepal',
  whatIsTitle: 'What is FTL?',
  whatIsContent:
    'FTL assigns one truck to one shipment, ensuring direct delivery without sharing space. This means faster transit, better security, and full control over your cargo.',
  features: [
    'Exclusive truck for your shipment',
    'Faster delivery with no stops',
    'Higher safety and security',
    'Flexible scheduling',
  ],
  audience: 'Urgent shipments, high-value goods, large-volume cargo.',
  coverage:
    'Kathmandu, Pokhara, Birgunj, Chitwan, Butwal, Baglung + major trade routes.',
  processSteps: [
    'Share shipment details and schedule',
    'Dedicated truck assigned',
    'Pickup and secure loading',
    'Direct transport to destination',
    'Delivery and confirmation',
  ],
  faq: [
    {
      question: 'Is FTL faster than shared transport?',
      answer:
        'Yes. FTL provides direct delivery without stops, making it faster than shared loads.',
    },
    {
      question: 'Do you mix loads in FTL?',
      answer:
        'No. Each truck is dedicated to a single client shipment for maximum security.',
    },
    {
      question: 'Can I schedule pickups in advance?',
      answer:
        'Yes, we offer flexible scheduling for both on-demand and pre-planned FTL shipments.',
    },
  ],
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Full Truck Load (FTL)',
    areaServed: 'Nepal',
    provider: { '@type': 'Organization', name: 'Darshan Transport' },
    serviceType: 'Dedicated truck transport',
  },
};
