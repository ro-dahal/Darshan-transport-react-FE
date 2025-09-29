import gifOperations from '../../../../assets/img/gif2.gif';
import nepalMap from '../../../../assets/img/nepal-map.png';
import clientLogo1 from '../../../../assets/img/Logo-01.png';
import clientLogo2 from '../../../../assets/img/Logo-02.png';
import person1 from '../../../../assets/img/person1.jpg';
import person2 from '../../../../assets/img/person2.png';

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

export const ABOUT_DESCRIPTION = `Founded over two decades ago with a single truck and a strong will to serve, Darshan Transport has grown into a trusted logistics partner across western Nepal and beyond. What began as a small family-run business is now a dependable logistics network known for safe, timely, and personalized service.

Our mission has always been simple and clear: to deliver goods with care, responsibility, and efficiency. Over the years, we've expanded our fleet, integrated GPS tracking, and established multiple branches — all with the goal of serving our clients better and more transparently.

At Darshan Transport, we're driven by technology, built on trust, and powered by people. We've embraced challenges, adapted to change, and invested in innovation to ensure reliability and efficiency at every step. Yet, our core values remain unchanged — trust, integrity, and a deep dedication to those we serve.

As we continue to grow, we remain committed to becoming Nepal’s leading logistics backbone. Thank you for being part of our journey.`;

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
  { icon: '❤️', title: 'Commitment to customers and trust', description: 'Building trust towards customers by fulfilling the commitments provided when delivering.' },
  { icon: '🤝', title: 'Respect', description: 'We believe in facilitating equal rights to all the partners involved through respect.' },
  { icon: '✊', title: 'Accountability', description: 'Assurance to be accountable for all the responsibilities given to us.' },
  { icon: '💡', title: 'Innovation', description: 'Creating logistics newness in the digital world.' },
  { icon: '🏆', title: 'Quality', description: 'Guarantee to provide the best delivery service.' },
  { icon: '⚙️', title: 'Efficiency', description: 'Continuously improving processes to serve better.' },
];

export const ABOUT_ASSETS = {
  animation: gifOperations,
  nepalMap,
};
