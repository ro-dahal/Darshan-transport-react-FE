import assert from 'node:assert/strict';
import test from 'node:test';

import { formatCompactNumber } from './compactNumber.ts';

test('formats compact numbers with thousand and million suffixes', () => {
  assert.equal(formatCompactNumber(999), '999');
  assert.equal(formatCompactNumber(1_000), '1k');
  assert.equal(formatCompactNumber(200_000), '200k');
  assert.equal(formatCompactNumber(22_000_000), '22M');
});
