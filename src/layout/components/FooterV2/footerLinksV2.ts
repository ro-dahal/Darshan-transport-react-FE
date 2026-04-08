import type { FooterColumn } from '../Footer/footerLinks';

export const FOOTER_COLUMNS_V2: FooterColumn[] = [
  {
    title: 'Company',
    links: [
      { label: 'About us', href: '/about/v2' },
      { label: 'Team', href: '/team/v2' },
      { label: 'FAQs', href: '/faq/v2' },
      { label: 'Contact', href: '/contact/v2' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Brand Summary', href: '/services/v2' },
      {
        label: 'Distribution & Delivery',
        href: '/services/v2#distribution-delivery',
      },
      {
        label: 'Third-Party Logistics (3PL)',
        href: '/services/v2#third-party-logistics',
      },
      {
        label: 'Packaging & Handling',
        href: '/services/v2#packaging-handling',
      },
      { label: 'Fleet Services', href: '/services/v2#fleet-services' },
      { label: 'Service Area', href: '/services/v2#service-area' },
      { label: 'Industries Served', href: '/services/v2#warehouse-inventory' },
    ],
  },
  {
    title: 'Connect',
    links: [
      {
        label: 'Facebook',
        href: 'https://www.facebook.com/people/Darshan-transport/100064806130243/',
      },
      {
        label: 'Instagram',
        href: 'https://www.instagram.com/darshantransportnp/',
      },
      { label: 'WhatsApp', href: '#' },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/company/darshan-transport-np/posts/?feedView=all',
      },
      { label: '+977 9705422317', href: '#' },
      { label: 'info@darshantransport.com.np', href: '#' },
    ],
  },
];
