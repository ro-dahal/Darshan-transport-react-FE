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
    source: 'img/video-thumbnail1.mp4',
    poster: 'poster1.jpg',
    name: 'Ravi Thakur',
    title: 'Head of Logistics',
    company: 'NovaXpress',
  },
  {
    source: 'img/video-thumbnail1.mp4',
    poster: 'poster2.jpg',
    name: 'Meena Joshi',
    title: 'CEO',
    company: 'BlueOrbit Retail',
  },
  {
    source: 'img/video-thumbnail1.mp4',
    poster: 'poster3.jpg',
    name: 'Arjun Rana',
    title: 'Sr. Officer',
    company: 'Zenith Hydro Solutions',
  },
];

export const HOME_REVIEW_TESTIMONIALS: ReviewTestimonial[] = [
  {
    image: person1,
    quote:
      "It's been about 1 year that we have been using Darshan Transport’s service and I am happy to share my experience with everyone. They are very professional, the team is supportive, and we can deliver our service on time.",
    name: 'Kiran Shrestha',
    company: 'Skyline Networks',
  },
  {
    image: person3,
    quote:
      'Darshan Transport has been our go-to solution for delivery. Their prompt service and affordable rates have made logistics a piece of cake.',
    name: 'Rahul Koirala',
    company: 'MetroGlobal Trade Co.',
  },
  {
    image: person1,
    quote:
      'VividBite Hospitality Pvt. Ltd. has been working with Darshan Transport since December 2021. The delivery service at the beginning was random. However, now with the delivery partnership, our issues have been resolved.',
    name: 'Priya Desai',
    company: 'VividBite Hospitality',
  },
  
];

export const HOME_ASSETS = {
  heroAnimation: gifOperations,
  nepalMap,
};
