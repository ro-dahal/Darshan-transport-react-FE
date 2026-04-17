import assert from 'node:assert/strict';
import test from 'node:test';

import {
  CLOSING_FOUNDER_QUOTE_MARK,
  OPENING_FOUNDER_QUOTE_MARK,
  normalizeFounderQuote,
} from './founderQuoteUtils.ts';

test('normalizes founder quotes and keeps matching quote marks', () => {
  assert.equal(normalizeFounderQuote('" Hello there'), 'Hello there');
  assert.equal(normalizeFounderQuote('" Hello\nWorld'), 'Hello\nWorld');
  assert.equal(OPENING_FOUNDER_QUOTE_MARK, '“');
  assert.equal(CLOSING_FOUNDER_QUOTE_MARK, '”');
});
