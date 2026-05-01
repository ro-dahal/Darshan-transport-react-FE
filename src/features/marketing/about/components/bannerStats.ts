export interface BannerStat {
  value: number;
  suffix: string;
  label: string;
}

export const BANNER_STATS: BannerStat[] = [
  { value: 22_000_000, suffix: '+', label: 'Deliveries Completed' },
  { value: 200_000, suffix: '+', label: 'Happy Customers' },
  { value: 10_000, suffix: '', label: 'Sq. Ft Warehousing' },
  { value: 20, suffix: '+', label: 'Years of Service' },
];

export const formatBannerStatValue = (value: number): string => {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(value % 1_000 === 0 ? 0 : 1)}k`;
  }

  return value.toString();
};
