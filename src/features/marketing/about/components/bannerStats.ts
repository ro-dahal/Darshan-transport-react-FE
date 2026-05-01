import { formatCompactNumber } from '../../shared/utils/compactNumber';

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

export const formatBannerStatValue = formatCompactNumber;
