import assert from 'node:assert/strict';
import test from 'node:test';

import { isTeamPageEnabled } from './siteFlags.ts';

test('disables the team page in production', () => {
  assert.equal(isTeamPageEnabled(true), false);
});

test('keeps the team page available outside production', () => {
  assert.equal(isTeamPageEnabled(false), true);
});
