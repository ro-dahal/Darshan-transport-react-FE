export const LOCATIONS_PAGE_META = {
  title: 'Locations | Darshan Transport',
  description:
    'Find Darshan Transport booking and delivery locations across Nepal.',
  canonical: 'https://darshantransport.com/locations',
} as const;

export const LOCATIONS_PAGE_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: LOCATIONS_PAGE_META.title,
  url: LOCATIONS_PAGE_META.canonical,
  isPartOf: {
    '@type': 'WebSite',
    name: 'Darshan Transport',
    url: 'https://darshantransport.com',
  },
} as const;
