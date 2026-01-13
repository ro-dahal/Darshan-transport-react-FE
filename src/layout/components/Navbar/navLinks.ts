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
      { to: '/services#warehouse-inventory', label: 'Ware House & Inventory' },
      { to: '/services#distribution-delivery', label: 'Distribution & Delivery' },
      { to: '/services#third-party-logistics', label: 'Third-Party Logistics (3PL)' },
      { to: '/services#packaging-handling', label: 'Packaging & Handling' },
      { to:  '/services#fleet-services', label: 'Fleet Services' },
      { to: '/services#service-area', label: 'Service Area' },
    ]
  },
  { to: '/contact', label: 'Contact' },
  { to: '/order', label: 'Track My Order' },
  { to:  '/get-quote', label: 'Get A Quote' },
];