import gifOperations from '../../../../assets/img/optimized/operations-illustration.webp';
import nepalMap from '../../../../assets/img/optimized/nepal-coverage-map.webp';
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
import parcelCourierDeliveryIcon from '../../../../assets/img/service-parcel-courier-delivery.png';
import person1 from '../../../../assets/img/optimized/founder-bishal-poudel.webp';
import person3 from '../../../../assets/img/optimized/founder-bishnu-prasad-poudyal.webp';

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

export const HOME_HERO_DESCRIPTION = `Darshan Transport helps businesses move high-volume goods across Nepal with reliable transport, warehousing, and distribution support.`;

export const HOME_ABOUT_DESCRIPTION = `Darshan Transport is a transport and logistics company in Nepal focused on bulk cargo movement, full-truck shipments, and warehousing support. We help businesses move goods safely, efficiently, and on time across key commercial routes and cities.`;

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
      '"Reliable bulk transport. Our shipments arrive on time and the coordination is always smooth."',
    name: 'FMCG Distributor',
    company: 'Kathmandu',
  },
  {
    image: person3,
    quote:
      '"We move goods regularly, and Darshan Transport has made the process more consistent and easier to manage."',
    name: 'Retail Supply Partner',
    company: 'Pokhara',
  },
  {
    image: person1,
    quote:
      '"Good handling, fair pricing, and dependable pickup support for recurring deliveries."',
    name: 'Business Customer',
    company: 'Lalitpur',
  },
];

export const HOME_ASSETS = {
  heroAnimation: gifOperations,
  nepalMap,
};

export const MAJOR_LOCATIONS = [
  [
    'Kathmandu',
    'Pokhara',
    'Chitwan',
    'Birgunj',
    'Butwal',
    'Abukhaireni',
    'Gorkha',
    'Lamjung',
    'Dumre',
    'Kushma',
    'Syangja',
    'Walling',
    'Galyang',
  ],
  [
    'Bardaghat',
    'Daune',
    'Daldalde',
    'Kawasoti',
    'Dumkibas',
    'Arun Khola',
    'Damauli',
    'Khairenitar',
    'Dulegauda',
    'Talchowk',
    'Baglung',
    'Beni',
  ],
];

export const OUR_SERVICES_DATA: HomeServiceItem[] = [
  {
    title: 'Bulk Cargo Transport',
    desc: 'For high-volume goods movement across Nepal with reliable transport coordination.',
    icon: parcelCourierDeliveryIcon,
    iconType: 'image',
  },
  {
    title: 'Full-Truck Load Transport',
    desc: 'Dedicated trucks for larger shipments with better control, direct delivery, and reduced handling.',
    icon: parcelCourierDeliveryIcon,
    iconType: 'image',
  },
  {
    title: 'Warehousing & 3PL',
    desc: 'Storage, inventory coordination, and logistics support for businesses managing regular goods movement.',
    icon: parcelCourierDeliveryIcon,
    iconType: 'image',
  },
  {
    title: 'Distribution & Delivery Support',
    desc: 'Planned goods movement across branches, dealers, retailers, and supply networks.',
    icon: parcelCourierDeliveryIcon,
    iconType: 'image',
  },
];
