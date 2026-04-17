import assert from 'node:assert/strict';
import test from 'node:test';

import { FOOTER_LAYOUT_CLASSES } from './footerLayout.ts';

test('positions the company column between the brand and contact columns on desktop', () => {
  assert.match(FOOTER_LAYOUT_CLASSES.brand, /\bmd:col-span-5\b/);
  assert.match(FOOTER_LAYOUT_CLASSES.company, /\bmd:col-start-6\b/);
  assert.match(FOOTER_LAYOUT_CLASSES.contact, /\bmd:col-start-9\b/);
  assert.match(FOOTER_LAYOUT_CLASSES.contact, /\bmd:col-span-4\b/);
  assert.match(FOOTER_LAYOUT_CLASSES.contact, /\bmd:justify-self-end\b/);
});
