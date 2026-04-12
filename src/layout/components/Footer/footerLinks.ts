import { TEAM_PAGE_ENABLED } from '../../../core/config/siteFlags';

interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Company',
    links: [
      { label: 'About us', href: '/about' },
      ...(TEAM_PAGE_ENABLED ? [{ label: 'Team', href: '/team' }] : []),
      { label: 'Services', href: '/services' },
      { label: 'FAQs', href: '/faq' },
      { label: 'Contact', href: '/contact' },
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
