import gifOperations from '../../../../assets/img/gif2.gif';
import nepalMap from '../../../../assets/img/nepal-map.png';
import clientLogo1 from '../../../../assets/img/Logo-01.png';
import clientLogo2 from '../../../../assets/img/Logo-02.png';
import person1 from '../../../../assets/img/person1.jpg';
import person3 from '../../../../assets/img/person3.jpg';

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
  { src: clientLogo1, alt: 'Client 1 Logo' },
  { src: clientLogo2, alt: 'Client 2 Logo' },
  { src: clientLogo1, alt: 'Client 3 Logo' },
  { src: clientLogo2, alt: 'Client 4 Logo' },
  { src: clientLogo1, alt: 'Client 5 Logo' },
  { src: clientLogo2, alt: 'Client 6 Logo' },
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
      "“Very reliable service. My goods always reach on time, and the team updates me clearly.”",
    name: 'Business Owner',
    company: 'Kathmandu',
  },
  {
    image: person3,
    quote:
      '“We send shipments almost every week. Smooth and stress-free.”',
    name: 'Retail Partner',
    company: 'Pokhara',
  },
  {
    image: person1,
    quote:
      '“Good handling, fair pricing, and quick pickup.”',
    name: 'Ecommerce Seller',
    company: 'Lalitpur',
  },
  {
    image: person1,
    quote:
      '“They treat our products with care. No damage, no hidden charges.”',
    name: 'Corporate Client',
    company: 'Bhaktapur',
  },
  {
    image: person3,
    quote:
      '“Strong communication. Makes logistics easier for us.”',
    name: 'Wholesale Supplier',
    company: 'Butwal',
  },
];

export const HOME_ASSETS = {
  heroAnimation: gifOperations,
  nepalMap,
};

export const MAJOR_LOCATIONS = [
  ['Kathmandu Valley', 'Pokhara', 'Butwal', 'Narayanghat', 'Birjung', 'Damauli', 'Dumre', 'Dulegauda', 'Kushma'],
  ['Lamjung', 'Jhapa', 'Abukhaireni', 'Baglung', 'Beni', 'Syangja', 'Walling', 'Galyang']
];

export const OUR_SERVICES_DATA = [
  {
    title: 'Parcel & Courier Delivery',
    desc: 'For small packages, documents, and urgent items.',
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
