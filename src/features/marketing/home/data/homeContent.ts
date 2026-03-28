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
import person1 from '../../../../assets/img/optimized/person1.webp';
import person3 from '../../../../assets/img/optimized/person3.webp';

export interface StatItem {
  value: string;
  label: string;
}

export interface LogoItem {
  src: string;
  alt: string;
}

export interface VideoTestimonial {
  source: string;
  poster: string;
  name: string;
  title: string;
  company: string;
}

export interface ReviewTestimonial {
  image: string;
  quote: string;
  name: string;
  company: string;
}

export interface HomeServiceItem {
  title: string;
  desc: string;
  icon?: string;
  iconType?: 'image';
}

export const HOME_HERO_DESCRIPTION = `Fast, safe and reliable transport for
businesses and individuals across Nepal.
Your goods move. You stay stress-free.`;

export const HOME_ABOUT_DESCRIPTION = `We keep it simple — clear communication, fair pricing, and
on-time delivery.
No hidden charges. No confusion.
Just smooth logistics from start to finish.`;

export const HOME_STATS: StatItem[] = [
  { value: '100k+', label: 'Deliveries' },
  { value: '80k+', label: 'Customers' },
  { value: '20k+', label: 'Reviews' },
];

export const HOME_CLIENT_LOGOS: LogoItem[] = [
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

export const HOME_VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    source: '/img/video-thumbnail1.mp4',
    poster: '/img/video-thumbnail1.mp4', // Fallback to same for now if posters missing
    name: 'Ravi Thakur',
    title: 'Head of Logistics',
    company: 'NovaXpress',
  },
  {
    source: '/img/video-thumbnail1.mp4',
    poster: '/img/video-thumbnail1.mp4',
    name: 'Meena Joshi',
    title: 'CEO',
    company: 'BlueOrbit Retail',
  },
  {
    source: '/img/video-thumbnail1.mp4',
    poster: '/img/video-thumbnail1.mp4',
    name: 'Arjun Rana',
    title: 'Sr. Officer',
    company: 'Zenith Hydro Solutions',
  },
];

export const HOME_REVIEW_TESTIMONIALS: ReviewTestimonial[] = [
  {
    image: person1,
    quote:
      '“Very reliable service. My goods always reach on time, and the team updates me clearly.”',
    name: 'Business Owner',
    company: 'Kathmandu',
  },
  {
    image: person3,
    quote: '“We send shipments almost every week. Smooth and stress-free.”',
    name: 'Retail Partner',
    company: 'Pokhara',
  },
  {
    image: person1,
    quote: '“Good handling, fair pricing, and quick pickup.”',
    name: 'Ecommerce Seller',
    company: 'Lalitpur',
  },
  {
    image: person1,
    quote: '“They treat our products with care. No damage, no hidden charges.”',
    name: 'Corporate Client',
    company: 'Bhaktapur',
  },
  {
    image: person3,
    quote: '“Strong communication. Makes logistics easier for us.”',
    name: 'Wholesale Supplier',
    company: 'Butwal',
  },
];

export const HOME_ASSETS = {
  heroAnimation: gifOperations,
  nepalMap,
};

export const MAJOR_LOCATIONS = [
  [
    'Kathmandu Valley',
    'Pokhara',
    'Butwal',
    'Narayanghat',
    'Birjung',
    'Damauli',
    'Dumre',
    'Dulegauda',
    'Kushma',
  ],
  [
    'Lamjung',
    'Jhapa',
    'Abukhaireni',
    'Baglung',
    'Beni',
    'Syangja',
    'Walling',
    'Galyang',
  ],
];

export const OUR_SERVICES_DATA: HomeServiceItem[] = [
  {
    title: 'Parcel & Courier Delivery',
    desc: 'For small packages, documents, and urgent items.',
    icon: parcelCourierDeliveryIcon,
    iconType: 'image',
  },
  {
    title: 'Cargo & Bulk Transport',
    desc: 'For business shipments moving in volume.',
  },
  {
    title: 'Office Shifting & Corporate Moves',
    desc: 'Careful packing, smooth relocation.',
  },
  {
    title: 'E-commerce Delivery Support',
    desc: 'Pickups, COD handling, order deliveries.',
  },
];
