export interface NavLink {
  to: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
  { to: '/order', label: 'Track My Order' },
];
