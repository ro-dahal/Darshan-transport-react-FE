import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const servicesContentPath = fileURLToPath(
  new URL('./servicesContent.ts', import.meta.url)
);

test('matches the about banner counts in the services stats data', () => {
  const fileContents = readFileSync(servicesContentPath, 'utf8');

  assert.match(fileContents, /22_000_000/);
  assert.match(fileContents, /200_000/);
  assert.match(fileContents, /20_000/);
});
