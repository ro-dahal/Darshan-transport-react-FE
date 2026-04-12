import bgImage from '../../../../assets/img/optimized/services-hero-desktop.webp';
import bgImageMobile from '../../../../assets/img/optimized/services-hero-mobile.webp';
import parcelCourierDeliveryIcon from '../../../../assets/img/service-parcel-courier-delivery.png';

export interface ServiceCard {
  icon: string;
  label: string;
  // description: string;
  iconType?: 'emoji' | 'image';
}

export const SERVICES_HERO = {
  backgroundImage: bgImage,
  mobileBackgroundImage: bgImageMobile,
  title: 'Transport & Logistics Services in Nepal',
  description:
    'Bulk cargo transport, warehousing, and distribution solutions designed for businesses across Nepal.',
};

export const SERVICES_STATS = [
  { value: 100000, suffix: '+', label: 'Deliveries' },
  { value: 80000, suffix: '+', label: 'Customers' },
  { value: 20000, suffix: '+', label: 'Reviews' },
];

export const SERVICES_CARDS: ServiceCard[] = [
  {
    icon: parcelCourierDeliveryIcon,
    label: 'Importers and exporters handling bulk shipments',
    iconType: 'image',
  },
  {
    icon: parcelCourierDeliveryIcon,
    label: 'Manufacturers and wholesalers moving goods across regions',
    iconType: 'image',
  },
  {
    icon: parcelCourierDeliveryIcon,
    label: 'Retail chains distributing products nationwide',
    iconType: 'image',
  },
  {
    icon: parcelCourierDeliveryIcon,
    label: 'Growing SMEs scaling their supply chain',
    iconType: 'image',
  },
  {
    icon: parcelCourierDeliveryIcon,
    label: 'Companies needing warehousing and 3PL support',
    iconType: 'image',
  },
  {
    icon: parcelCourierDeliveryIcon,
    label: 'E-commerce brands managing inventory and deliveries',
    iconType: 'image',
  },
];

export interface ServiceOffering {
  title: string;
  description: string;
  slug: string;
  emoji: string;
  highlights: string[];
}

export const SERVICES_OFFERINGS: ServiceOffering[] = [
  {
    title: 'Bulk Cargo Transport',
    description:
      'Transport large-volume goods using full truck loads across Nepal. Ideal for manufacturers, distributors, and businesses handling heavy shipments.',
    slug: '/bulk-cargo-transport-nepal',
    emoji: '🚛',
    highlights: ['Full truckloads', 'Heavy cargo', 'Nationwide routes'],
  },
  {
    title: 'Full Truck Load (FTL)',
    description:
      'Dedicated truck transport for single-client shipments, ensuring faster and direct delivery without load sharing.',
    slug: '/full-truck-load-nepal',
    emoji: '📦',
    highlights: ['No load sharing', 'Direct delivery', 'Faster transit'],
  },
  {
    title: 'Warehousing & Inventory',
    description:
      'Secure warehouse storage with organized inventory handling and stock management support.',
    slug: '/warehousing-3pl-nepal',
    emoji: '🏭',
    highlights: ['Secure storage', 'Stock management', 'Organized handling'],
  },
  {
    title: 'Distribution & Delivery',
    description:
      'Efficient movement of goods from warehouses to multiple business locations or retail points.',
    slug: '/distribution-delivery-nepal',
    emoji: '🚚',
    highlights: [
      'Multi-point delivery',
      'Route optimization',
      'Retail coverage',
    ],
  },
  {
    title: 'Third-Party Logistics (3PL)',
    description:
      'End-to-end logistics solutions including storage, handling, and distribution for businesses.',
    slug: '/third-party-logistics-nepal',
    emoji: '🔗',
    highlights: ['End-to-end', 'Outsourced logistics', 'Scalable solutions'],
  },
  {
    title: 'Packaging & Handling',
    description:
      'Professional packaging and cargo handling to reduce damage risk during transport.',
    slug: '/packaging-handling-nepal',
    emoji: '📐',
    highlights: ['Damage prevention', 'Professional packing', 'Secure loads'],
  },
  {
    title: 'Fleet Services',
    description:
      'Access to a range of vehicles for different cargo sizes and transport requirements.',
    slug: '/fleet-services-nepal',
    emoji: '🚜',
    highlights: ['Vehicle variety', 'All cargo sizes', 'On-demand fleet'],
  },
  {
    title: 'Service Coverage',
    description:
      'Transport network covering Kathmandu, Pokhara, Birgunj, Chitwan, Butwal, Baglung, and major routes across Nepal.',
    slug: '/transport-coverage-nepal',
    emoji: '🗺️',
    highlights: ['77 districts', 'Major cities', 'Pan-Nepal network'],
  },
];
