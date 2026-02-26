import gifOperations from '../../../../assets/img/optimized/gif2.webp';
import nepalMap from '../../../../assets/img/optimized/nepal-map.webp';
import clientLogo1 from '../../../../assets/img/optimized/Logo-01.webp';
import clientLogo2 from '../../../../assets/img/optimized/Logo-02.webp';
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
}

export const ABOUT_STATS: StatItem[] = [
  { value: '100k+', label: 'Deliveries' },
  { value: '80k+', label: 'Customers' },
  { value: '20k+', label: 'Reviews' },
];

export const ABOUT_CLIENT_LOGOS: LogoItem[] = [
  { src: clientLogo1, alt: 'Client 1 Logo' },
  { src: clientLogo2, alt: 'Client 2 Logo' },
  { src: clientLogo1, alt: 'Client 3 Logo' },
  { src: clientLogo2, alt: 'Client 4 Logo' },
  { src: clientLogo1, alt: 'Client 5 Logo' },
  { src: clientLogo2, alt: 'Client 6 Logo' },
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
    icon: '❤️',
    title: 'Built for Heavy Loads & Bulk Cargo',
    description:
      'Specialized in full-truck loads, industrial materials, machinery, FMCG stock, and large-volume business shipments.',
  },
  {
    icon: '🤝',
    title: 'Strong Nationwide Network',
    description:
      'Branches across major hubs allow safe, structured movement of goods through controlled routes.',
  },
  {
    icon: '✊',
    title: 'On-Time & Consistent Delivery',
    description:
      'Planned routes, fixed schedules, and strict timelines help avoid delays.',
  },
  {
    icon: '💡',
    title: 'Safe, Professional Handling',
    description:
      'Each load is checked, secured, and monitored before dispatch.',
  },
  {
    icon: '🏆',
    title: 'Business-Centric Operations',
    description:
      'Designed for wholesalers, distributors, and large-volume suppliers needing recurring or multi-city delivery.',
  },
  {
    icon: '⚙️',
    title: 'Reliable Fleet & Trained Team',
    description:
      'Verified drivers and trained handlers ensure accuracy and safety from loading to delivery.',
  },
  {
    icon: '✊',
    title: 'Technology-Ready Logistics',
    description:
      'Digital workflows ensure faster processing, clear records, and transparent communication.',
  },
];

export const ABOUT_ASSETS = {
  animation: gifOperations,
  nepalMap,
};
