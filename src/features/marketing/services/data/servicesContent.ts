import bgImage from '../../../../assets/img/bg.jpg';
import iconTruck from '../../../../assets/img/cargo-truck.png';
import iconDelivery from '../../../../assets/img/user.png';
import iconFactory from '../../../../assets/img/working-factory.png';

export interface ServiceCard {
  icon: string;
  label: string;
  description: string;
  iconType?: 'emoji' | 'image';
}

export const SERVICES_HERO = {
  backgroundImage: bgImage,
  title: 'Our Services',
  description:
    'Darshan Transport offers a comprehensive suite of logistics, warehousing services, and transport solutions, tailored to meet the evolving needs of businesses across Nepal and beyond. Our commitment to reliability, efficiency, and customer satisfaction drives us to deliver excellence in every shipment.',
};

export const SERVICES_STATS = [
  { value: '100k+', label: 'Deliveries' },
  { value: '80k+', label: 'Customers' },
  { value: '20k+', label: 'Reviews' },
];

export const SERVICES_CARDS: ServiceCard[] = [
  {
    icon: iconTruck,
    label: 'Logistics & Transport',
    description:
      'Reliable and timely transportation services across Nepal, with a modern fleet and advanced tracking for complete transparency and peace of mind.',
    iconType: 'image',
  },
  {
    icon: iconDelivery,
    label: 'Door-to-Door Delivery',
    description:
      'We ensure your packages reach their destination safely and on schedule, whether in urban centers or remote locations.',
    iconType: 'image',
  },
  {
    icon: iconFactory,
    label: 'Warehousing Solutions',
    description:
      'Secure, convenient, and scalable warehousing for all your storage and distribution needs, with seamless inventory management.',
    iconType: 'image',
  },
  {
    icon: '📦',
    label: 'Parcel & Freight Handling',
    description:
      'Specialized handling and management of parcels and freight, ensuring safety and compliance from pickup to delivery.',
    iconType: 'emoji',
  },
  {
    icon: '🗺️',
    label: 'Route Optimization',
    description:
      'Advanced route planning for efficient and timely deliveries, reducing transit time and costs for your business.',
    iconType: 'emoji',
  },
  {
    icon: '🔒',
    label: 'Secure Cargo',
    description:
      'Comprehensive security protocols to protect your valuable goods at every stage of the logistics journey.',
    iconType: 'emoji',
  },
];
