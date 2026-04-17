import assert from 'node:assert/strict';
import test from 'node:test';

import {
  HOME_ABOUT_SECTION_BG,
  HOME_CLIENTS_SECTION_SPACING,
  HOME_SERVICES_SECTION_BG,
  HOME_TRUSTED_BY_SECTION_BG,
} from './homeSectionStyles.ts';

test('keeps about, trusted-by, and services backgrounds distinct', () => {
  assert.equal(HOME_ABOUT_SECTION_BG, 'bg-[#fafafa]');
  assert.equal(HOME_TRUSTED_BY_SECTION_BG, 'bg-white');
  assert.equal(HOME_SERVICES_SECTION_BG, 'bg-[#fafafa]');
  assert.equal(HOME_CLIENTS_SECTION_SPACING, 'pt-12 pb-20 px-5');
});
