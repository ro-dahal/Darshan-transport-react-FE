import assert from 'node:assert/strict';
import test from 'node:test';

import { getNavbarDropdownClickBehavior } from './navbarInteractionUtils.ts';

test('desktop dropdown links navigate on click', () => {
  assert.equal(
    getNavbarDropdownClickBehavior({
      hasDropdown: true,
      context: 'desktop',
    }),
    'navigate'
  );
});

test('mobile dropdown links toggle the submenu on click', () => {
  assert.equal(
    getNavbarDropdownClickBehavior({
      hasDropdown: true,
      context: 'mobile',
    }),
    'toggle-dropdown'
  );
});

test('links without dropdowns always navigate on click', () => {
  assert.equal(
    getNavbarDropdownClickBehavior({
      hasDropdown: false,
      context: 'desktop',
    }),
    'navigate'
  );
});
