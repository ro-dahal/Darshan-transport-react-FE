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
      { label: 'About us', href: '#' },
      { label: 'Team', href: '#' },
      { label: 'FAQs', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Brand Summary', href: '#' },
      { label: 'Distribution & Delivery', href: '#' },
      { label: 'Thrid-Party Logistics (3PL)', href: '#' },
      { label: 'Packaging & Handling', href: '#' },
      { label: 'Fleet Services', href: '#' },
      { label: 'Service Area', href: '#' },
      { label: 'Industries Served', href: '#' },


    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Facebook', href: '#' },
      { label: 'Instagram', href: '#' },
      { label: 'WhatsApp', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: '+977 9809991233', href: '#' },
      { label: 'info@darshan.np', href: '#' },

    ],
  },
];
