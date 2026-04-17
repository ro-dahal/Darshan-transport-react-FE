import assert from 'node:assert/strict';
import test from 'node:test';

import {
  SERVICES_HOW_IT_WORKS_SECTION_BG,
  SERVICES_OUR_SERVICES_SECTION_BG,
  SERVICES_OUR_SERVICES_SECTION_SPACING,
} from './servicesSectionStyles.ts';

test('keeps our-services and how-it-works backgrounds distinct', () => {
  assert.equal(SERVICES_OUR_SERVICES_SECTION_BG, 'bg-[#fafafa]');
  assert.equal(SERVICES_HOW_IT_WORKS_SECTION_BG, 'bg-white');
  assert.equal(
    SERVICES_OUR_SERVICES_SECTION_SPACING,
    'relative pt-12 pb-24 px-8'
  );
});
