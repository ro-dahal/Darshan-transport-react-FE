import assert from 'node:assert/strict';
import test from 'node:test';

import {
  LOCATIONS_PAGE_STRUCTURED_DATA,
  LOCATIONS_PAGE_META,
} from '../data/locationsPageContent.ts';

test('exports locations metadata for the new route', () => {
  assert.equal(LOCATIONS_PAGE_META.title, 'Locations | Darshan Transport');
  assert.equal(LOCATIONS_PAGE_META.canonical, 'https://darshantransport.com/locations');
  assert.equal(
    LOCATIONS_PAGE_STRUCTURED_DATA.name,
    'Locations | Darshan Transport'
  );
  assert.equal(
    LOCATIONS_PAGE_STRUCTURED_DATA.url,
    'https://darshantransport.com/locations'
  );
});
