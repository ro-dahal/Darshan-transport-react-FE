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
      { label: 'Team', href: '#' },
      { label: 'FAQs', href: '#' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Brand Summary', href: '/services' },
      { label: 'Distribution & Delivery', href: '/services#distribution-delivery' },
      { label: 'Thrid-Party Logistics (3PL)', href: '/services#third-party-logistics' },
      { label: 'Packaging & Handling', href: '/services#packaging-handling' },
      { label: 'Fleet Services', href: '/services#fleet-services' },
      { label: 'Service Area', href: '/services#service-area' },
      { label: 'Industries Served', href: '/services#warehouse-inventory' },


    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Facebook', href: 'https://www.facebook.com/people/Darshan-transport/100064806130243/' },
      { label: 'Instagram', href: 'https://www.instagram.com/darshantransportnp/' },
      { label: 'WhatsApp', href: '#' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/darshan-transport-np/posts/?feedView=all' },
      { label: '+977 9809991233', href: '#' },
      { label: 'info@darshantransport.com.np', href: '#' },

    ],
  },
];
