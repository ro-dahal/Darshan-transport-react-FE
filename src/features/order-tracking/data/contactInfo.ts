export interface ContactChannel {
  label: string;
  value: string;
  description?: string;
  icon: 'email' | 'phone' | 'location';
}

export interface SocialLink {
  key: 'facebook' | 'linkedin' | 'instagram' | 'youtube';
  label: string;
  href: string;
}

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    label: 'Inquiry',
    value: 'info@darshantransport.com.np',
    icon: 'email',
  },
  {
    label: 'Customer Care',
    value: '01 5926452, 5927452',
    icon: 'phone',
  },
  {
    label: 'Address',
    value: 'Transport Nagar, Sano Bharyang, Kathmandu',
    icon: 'location',
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { key: 'facebook', label: 'Facebook', href: '#' },
  { key: 'linkedin', label: 'LinkedIn', href: '#' },
  { key: 'instagram', label: 'Instagram', href: '#' },
  { key: 'youtube', label: 'YouTube', href: '#' },
];
