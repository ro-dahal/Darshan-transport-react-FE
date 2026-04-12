export interface NavLink {
  to: string;
  label: string;
  dropdown?: DropdownItem[];
}

export interface DropdownItem {
  to: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  {
    to: '/services',
    label: 'Services',
    dropdown: [
      {
        to: '/bulk-cargo-transport-nepal',
        label: 'Bulk Cargo Transport',
      },
      {
        to: '/full-truck-load-nepal',
        label: 'Full Truck Load (FTL)',
      },
      {
        to: '/warehousing-3pl-nepal',
        label: 'Warehousing & 3PL',
      },
      {
        to: '/distribution-delivery-nepal',
        label: 'Distribution & Delivery',
      },
      {
        to: '/third-party-logistics-nepal',
        label: 'Third-Party Logistics',
      },
      { to: '/packaging-handling-nepal', label: 'Packaging & Handling' },
      { to: '/fleet-services-nepal', label: 'Fleet Services' },
      { to: '/transport-coverage-nepal', label: 'Service Coverage' },
    ],
  },
  { to: '/contact', label: 'Contact' },
  { to: '/get-quote', label: 'Get A Quote' },
];
