import bgImage from '../../../../assets/img/optimized/bg.webp';
import parcelCourierDeliveryIcon from '../../../../assets/img/Parcel & Courier Delivery.png';

export interface ServiceCard {
  icon: string;
  label: string;
  // description: string;
  iconType?: 'emoji' | 'image';
}

export const SERVICES_HERO = {
  backgroundImage: bgImage,
  title: 'Our Logistics Services in Nepal',
  description:
    'Reliable warehousing, nationwide delivery, and complete 3PL solutions for businesses that want speed, safety, and consistency.',
};

export const SERVICES_STATS = [
  { value: '100k+', label: 'Deliveries' },
  { value: '80k+', label: 'Customers' },
  { value: '20k+', label: 'Reviews' },
];

export const SERVICES_CARDS: ServiceCard[] = [
  {
    icon: parcelCourierDeliveryIcon,
    label: 'E-commerce brands',
    // description:
    //   'Secure, convenient, and scalable warehousing for all your storage and distribution needs, with seamless inventory management.',
    iconType: 'image',
  },
  {
    icon: parcelCourierDeliveryIcon,
    label: 'Importers & exporters',
    // description:
    //   'Specialized handling and management of parcels and freight, ensuring safety and compliance from pickup to delivery.',
    iconType: 'image',
  },
  {
    icon: parcelCourierDeliveryIcon,
    label: 'Manufacturers & wholesalers',
    // description:
    //   'Advanced route planning for efficient and timely deliveries, reducing transit time and costs for your business.',
    iconType: 'image',
  },
  {
    icon: parcelCourierDeliveryIcon,
    label: 'Retail chains',
    // description:
    //   'Comprehensive security protocols to protect your valuable goods at every stage of the logistics journey.',
    iconType: 'image',
  },
  {
    icon: parcelCourierDeliveryIcon,
    label: 'SMEs scaling distribution',
    // description:
    //   'Comprehensive security protocols to protect your valuable goods at every stage of the logistics journey.',
    iconType: 'image',
  },
  {
    icon: parcelCourierDeliveryIcon,
    label: 'Companies needing 3PL support',
    // description:
    //   'Comprehensive security protocols to protect your valuable goods at every stage of the logistics journey.',
    iconType: 'image',
  },
];
