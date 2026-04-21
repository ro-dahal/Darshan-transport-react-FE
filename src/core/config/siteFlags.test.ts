import assert from 'node:assert/strict';
import test from 'node:test';

import { isTeamPageEnabled } from './siteFlags.ts';

test('enables the team page in production by default', () => {
  assert.equal(
    isTeamPageEnabled({
      PROD: true,
    }),
    true
  );
});

test('keeps the team page available outside production', () => {
  assert.equal(
    isTeamPageEnabled({
      PROD: false,
    }),
    true
  );
});

test('supports an explicit environment override', () => {
  assert.equal(
    isTeamPageEnabled({
      PROD: true,
      VITE_ENABLE_TEAM_PAGE: 'true',
    }),
    true
  );
  assert.equal(
    isTeamPageEnabled({
      PROD: false,
      VITE_ENABLE_TEAM_PAGE: 'false',
    }),
    false
  );
});
