import assert from 'node:assert/strict';
import test from 'node:test';

import { resolveMetaUrl } from './metaTagsUtils.ts';

test('prefers an explicitly provided metadata URL', () => {
  assert.equal(
    resolveMetaUrl(
      'https://darshantransport.com.np/services',
      'https://example.com/fallback'
    ),
    'https://darshantransport.com.np/services'
  );
});

test('falls back to the current location when no explicit URL is provided', () => {
  assert.equal(
    resolveMetaUrl(undefined, 'https://darshantransport.com.np/contact'),
    'https://darshantransport.com.np/contact'
  );
});

test('returns an empty string when there is no browser location available', () => {
  assert.equal(resolveMetaUrl(undefined, undefined), '');
});
