export interface NavLinkV2 {
  to: string;
  label: string;
  dropdown?: DropdownItemV2[];
}

export interface DropdownItemV2 {
  to: string;
  label: string;
}

export const NAV_LINKS_V2: NavLinkV2[] = [
  { to: '/v2', label: 'Home' },
  { to: '/about/v2', label: 'About Us' },
  {
    to: '/services/v2',
    label: 'Services',
    dropdown: [
      {
        to: '/services/v2#warehouse-inventory',
        label: 'Warehouse & Inventory',
      },
      {
        to: '/services/v2#distribution-delivery',
        label: 'Distribution & Delivery',
      },
      {
        to: '/services/v2#third-party-logistics',
        label: 'Third-Party Logistics (3PL)',
      },
      { to: '/services/v2#packaging-handling', label: 'Packaging & Handling' },
      { to: '/services/v2#fleet-services', label: 'Fleet Services' },
      { to: '/services/v2#service-area', label: 'Service Area' },
    ],
  },
  { to: '/contact/v2', label: 'Contact' },
  { to: '/get-quote/v2', label: 'Get A Quote' },
];
