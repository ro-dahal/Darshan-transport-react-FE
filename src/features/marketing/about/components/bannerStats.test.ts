import assert from 'node:assert/strict';
import test from 'node:test';

import { BANNER_STATS, formatBannerStatValue } from './bannerStats.ts';

test('formats banner stat values with compact thousand and million suffixes', () => {
  assert.equal(formatBannerStatValue(999), '999');
  assert.equal(formatBannerStatValue(1_000), '1k');
  assert.equal(formatBannerStatValue(200_000), '200k');
  assert.equal(formatBannerStatValue(22_000_000), '22M');
});

test('keeps the about banner targets aligned with the requested counts', () => {
  assert.equal(BANNER_STATS[0]?.value, 22_000_000);
  assert.equal(BANNER_STATS[1]?.value, 200_000);
  assert.equal(BANNER_STATS[2]?.value, 10_000);
  assert.equal(BANNER_STATS[3]?.value, 20);
});
