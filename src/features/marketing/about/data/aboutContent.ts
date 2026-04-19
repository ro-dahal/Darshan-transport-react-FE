import type { AboutImageTransform } from '../aboutImageEditorUtils';
import gifOperations from '@assets/generated/marketing/shared/operations-illustration.webp';
import nepalMap from '@assets/generated/marketing/shared/nepal-coverage-map.webp';
import parcelCourierDeliveryIcon from '@assets/shared/icons/parcel-courier-delivery.png';
import builtForHeavyLoadsIcon from '@assets/shared/icons/value-built-for-heavy-loads.png';
import strongNationwideNetworkIcon from '@assets/shared/icons/value-strong-nationwide-network.png';
import ontimeConsistentDeliveryIcon from '@assets/shared/icons/value-on-time-consistent-delivery.png';
import safeProfessionalHandlingIcon from '@assets/shared/icons/value-safe-professional-handling.png';
import businessCentricOperationIcon from '@assets/shared/icons/value-business-centric-operations.png';
import person1 from '@assets/marketing/about/service-page-hari-bahadur-shrestha.jpg';
import person2 from '@assets/marketing/about/service-page-arun-shrestha.jpg';
import { CLIENT_LOGOS, type LogoItem } from '../../shared/data/clientLogos';

export interface StatItem {
  value: string;
  label: string;
}

export interface FounderProfile {
  role: string;
  quote: string;
  signatureLabel: string;
  image: string;
  imagePosition?: string;
  imageTransform?: Partial<AboutImageTransform>;
  reverse?: boolean;
}

export interface CoreValueItem {
  icon: string;
  title: string;
  description: string;
  iconType?: 'emoji' | 'image';
}

export const ABOUT_STATS: StatItem[] = [
  { value: '100k+', label: 'Deliveries' },
  { value: '80k+', label: 'Customers' },
  { value: '20k+', label: 'Reviews' },
];

export const ABOUT_CLIENT_LOGOS: LogoItem[] = CLIENT_LOGOS;

export const ABOUT_DESCRIPTION = [
  'Darshan Transport is a Nepal-based transport and logistics company supporting businesses with dependable cargo movement across the country. We specialize in bulk transport, full-truck shipments, warehousing, and distribution services designed for commercial operations.',
  'Our focus is simple: move goods safely, efficiently, and on time with structured logistics support.',
];

export const ABOUT_FOUNDERS: FounderProfile[] = [
  {
    role: 'Founder / Managing Director',
    quote:
      '" Darshan Transport began as a single-truck operation built on consistency, discipline, and a commitment to reliable service. Under his leadership, the company has grown into a structured logistics network supporting bulk cargo movement across Nepal.\nHe focuses on building long-term systems by improving delivery coordination, expanding transport capacity, and ensuring businesses can rely on consistent cargo movement. His approach is practical: solve real logistics problems and build operations that scale with business needs.',
    signatureLabel: 'Hari Bahadur Shrestha',
    image: person1,
  },
  {
    role: 'Co-Founder',
    quote:
      '" As co-founder, he has played a key role in expanding operations and strengthening day-to-day logistics systems. His focus has been on improving efficiency, maintaining service quality, and adapting operations as business demands grow.\nFrom handling early-stage challenges to supporting a growing network, his contribution ensures that Darshan Transport continues to operate with stability, coordination, and a clear focus on business logistics.',
    signatureLabel: 'Arun Kumar Shrestha',
    image: person2,
    imageTransform: {
      yPercent: -30,
    },
    reverse: true,
  },
];

export const ABOUT_CORE_VALUES: CoreValueItem[] = [
  {
    icon: builtForHeavyLoadsIcon,
    title: 'Built for Heavy Loads & Bulk Cargo',
    description:
      'Specialized in full-truck loads, industrial materials, machinery, FMCG stock, and large-volume business shipments.',
    iconType: 'image',
  },
  {
    icon: strongNationwideNetworkIcon,
    title: 'Strong Nationwide Network',
    description:
      'Branches across major hubs allow safe, structured movement of goods through controlled routes.',
    iconType: 'image',
  },
  {
    icon: ontimeConsistentDeliveryIcon,
    title: 'On-Time & Consistent Delivery',
    description:
      'Planned routes, fixed schedules, and strict timelines help avoid delays.',
    iconType: 'image',
  },
  {
    icon: safeProfessionalHandlingIcon,
    title: 'Safe, Professional Handling',
    description:
      'Each load is checked, secured, and monitored before dispatch.',
    iconType: 'image',
  },
  {
    icon: businessCentricOperationIcon,
    title: 'Business-Centric Operations',
    description:
      'Designed for wholesalers, distributors, and large-volume suppliers needing recurring or multi-city delivery.',
    iconType: 'image',
  },
  {
    icon: parcelCourierDeliveryIcon,
    title: 'Reliable Fleet & Trained Team',
    description:
      'Verified drivers and trained handlers ensure accuracy and safety from loading to delivery.',
    iconType: 'image',
  },
  {
    icon: parcelCourierDeliveryIcon,
    title: 'Technology-Ready Logistics',
    description:
      'Digital coordination improves tracking, processing, and communication.',
    iconType: 'image',
  },
  {
    icon: parcelCourierDeliveryIcon,
    title: 'GPS Tracking Enabled Fleet',
    description:
      'Real-time GPS tracking for better visibility, route monitoring, and delivery updates.',
    iconType: 'image',
  },
  {
    icon: parcelCourierDeliveryIcon,
    title: 'ERP-Driven Operations',
    description:
      'Integrated ERP systems help manage orders, inventory, and logistics workflows with better accuracy and coordination.',
    iconType: 'image',
  },
];

export const ABOUT_ASSETS = {
  animation: gifOperations,
  nepalMap,
};
