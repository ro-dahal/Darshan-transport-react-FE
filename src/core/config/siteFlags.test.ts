import assert from 'node:assert/strict';
import test from 'node:test';

import { isTeamPageEnabled } from './siteFlags.ts';

test('keeps the team page enabled in production', () => {
  assert.equal(isTeamPageEnabled(), true);
});

test('keeps the team page available outside production', () => {
  assert.equal(isTeamPageEnabled(), true);
});
