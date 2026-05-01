import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const homeContentPath = fileURLToPath(
  new URL('./homeContent.ts', import.meta.url)
);

test('serves home testimonial videos from the normalized public media path', () => {
  const fileContents = readFileSync(homeContentPath, 'utf8');

  assert.match(fileContents, /source:\s*'\/media\/video-thumbnail1\.mp4'/);
  assert.match(fileContents, /poster:\s*'\/media\/video-thumbnail1\.mp4'/);
  assert.doesNotMatch(fileContents, /\/img\/video-thumbnail1\.mp4/);
});

test('keeps the home stat copy aligned with the about banner counts', () => {
  const fileContents = readFileSync(homeContentPath, 'utf8');

  assert.match(fileContents, /22M\+/);
  assert.match(fileContents, /200k\+/);
  assert.match(fileContents, /20k\+/);
});
