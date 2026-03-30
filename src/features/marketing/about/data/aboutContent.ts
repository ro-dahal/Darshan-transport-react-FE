import gifOperations from '../../../../assets/img/optimized/gif2.webp';
import nepalMap from '../../../../assets/img/optimized/nepal-map.webp';
import udnLogo from '../../../../assets/Company logos/UDN.jpg';
import cgLogo from '../../../../assets/Company logos/cg.png';
import dhiLogo from '../../../../assets/Company logos/dhi.jpg';
import dubarLogo from '../../../../assets/Company logos/dubar.png';
import hitechLogo from '../../../../assets/Company logos/hitech.png';
import neotricLogo from '../../../../assets/Company logos/neotric.png';
import peLogo from '../../../../assets/Company logos/pe.jpg';
import readmoreLogo from '../../../../assets/Company logos/readmore.png';
import sujaldairyLogo from '../../../../assets/Company logos/sujaldairy.jpg';
import sujalfoodLogo from '../../../../assets/Company logos/sujalfood.png';
import treveniLogo from '../../../../assets/Company logos/treveni.jpg';
import parcelCourierDeliveryIcon from '../../../../assets/img/Parcel & Courier Delivery.png';
import builtForHeavyLoadsIcon from '../../../../assets/img/Built for heavy loads.png';
import strongNationwideNetworkIcon from '../../../../assets/img/strong Nationwide Network.png';
import ontimeConsistentDeliveryIcon from '../../../../assets/img/ontime & consistent delivey.png';
import safeProfessionalHandlingIcon from '../../../../assets/img/Safe professional handling.png';
import businessCentricOperationIcon from '../../../../assets/img/business centric operation.png';
import person1 from '../../../../assets/img/optimized/person1.webp';
import person2 from '../../../../assets/img/optimized/person2.webp';

export interface StatItem {
  value: string;
  label: string;
}

export interface LogoItem {
  src: string;
  alt: string;
}

export interface FounderProfile {
  role: string;
  quote: string;
  signatureLabel: string;
  image: string;
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

export const ABOUT_CLIENT_LOGOS: LogoItem[] = [
  { src: udnLogo, alt: 'UDN' },
  { src: cgLogo, alt: 'CG' },
  { src: dhiLogo, alt: 'DHI' },
  { src: dubarLogo, alt: 'Dubar' },
  { src: hitechLogo, alt: 'Hi-Tech' },
  { src: neotricLogo, alt: 'Neotric' },
  { src: peLogo, alt: 'PE' },
  { src: readmoreLogo, alt: 'Readmore' },
  { src: sujaldairyLogo, alt: 'Sujal Dairy' },
  { src: sujalfoodLogo, alt: 'Sujal Food' },
  { src: treveniLogo, alt: 'Treveni' },
];

export const ABOUT_DESCRIPTION = [
  'Darshan Logistics is a nationwide cargo and transport company built for bulk loads, full-truck shipments, and large-volume distribution across Nepal.',
  'We partner with manufacturers, wholesalers, distributors, importers, and enterprise clients who need safe, consistent, and large-scale delivery — not small parcel service. Our core strength is in heavy cargo handling, long-distance routes, multi-city supply chains, and reliable fleet operations.',
  'Every day, we move tonnes of goods across Nepal with one promise: Your cargo arrives safely, on time, and handled with care.',
];

export const ABOUT_FOUNDERS: FounderProfile[] = [
  {
    role: 'Founder / Managing Director',
    quote:
      '“ Darshan Transport began two decades ago with a single truck and a strong will to serve. Today, we are a trusted logistics partner across Nepal’s western region and beyond.\nOur mission has always been clear: to deliver goods with care, responsibility, and efficiency. Over the years, we’ve expanded our fleet, integrated GPS tracking, and opened multiple branches — all to serve you better.\nAs we grow, our goal remains the same: to become Nepal’s leading logistics backbone — driven by technology, built on trust, and powered by people. Thank you for your continued trust',
    signatureLabel: 'Hari Bahadur Sherestha',
    image: person1,
  },
  {
    role: 'Co-Founder',
    quote:
      '“ What started as a small family business is now a dependable logistics network known for safe, timely, and personalized service.\nWe’ve overcome challenges, embraced change, and invested in technology to improve transparency and efficiency. Our GPS-enabled fleet and expanding branch network reflect our commitment to progress.\nAs we move forward, we remain grounded in our founding values: trust, integrity, and dedication to our clients. We’re here to serve — today and always',
    signatureLabel: 'Arun Kumar Shrestha',
    image: person2,
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
      'Digital workflows ensure faster processing, clear records, and transparent communication.',
    iconType: 'image',
  },
];

export const ABOUT_ASSETS = {
  animation: gifOperations,
  nepalMap,
};
