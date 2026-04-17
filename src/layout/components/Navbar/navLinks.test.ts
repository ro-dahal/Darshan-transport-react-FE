import assert from 'node:assert/strict';
import test from 'node:test';

import { NAV_LINKS } from './navLinks.ts';

test('uses Locations as the final navbar CTA label', () => {
  const lastLink = NAV_LINKS[NAV_LINKS.length - 1];

  assert.equal(lastLink.label, 'Locations');
  assert.equal(lastLink.to, '/locations');
});
