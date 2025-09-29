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
    title: 'Our team',
    links: [
      { label: 'About us', href: '#' },
      { label: 'Team', href: '#' },
      { label: 'What we do', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'More',
    links: [
      { label: 'Projects', href: '#' },
      { label: 'Events', href: '#' },
      { label: 'Blog', href: '#' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Facebook', href: '#' },
      { label: 'Instagram', href: '#' },
    ],
  },
];
