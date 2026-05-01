import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const homePagePath = fileURLToPath(new URL('./HomePage.tsx', import.meta.url));

test('shows the about banner counts in the home stats banner', () => {
  const fileContents = readFileSync(homePagePath, 'utf8');

  assert.match(fileContents, /22_000_000/);
  assert.match(fileContents, /200_000/);
  assert.match(fileContents, /20_000/);
});
