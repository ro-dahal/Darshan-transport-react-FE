import assert from 'node:assert/strict';
import test from 'node:test';

import {
  areImageTransformsEqual,
  getImageTransformStyle,
  normalizeImageTransform,
} from './imageTransformUtils.ts';

test('normalizes image transforms into the supported bounds', () => {
  assert.deepEqual(
    normalizeImageTransform({
      xPercent: 72.239,
      yPercent: -80.555,
      scale: 9,
    }),
    {
      xPercent: 50,
      yPercent: -50,
      scale: 2.4,
    }
  );
});

test('compares image transforms by value', () => {
  assert.equal(
    areImageTransformsEqual(
      { xPercent: 12.5, yPercent: -8, scale: 1.4 },
      { xPercent: 12.5, yPercent: -8, scale: 1.4 }
    ),
    true
  );
  assert.equal(
    areImageTransformsEqual(
      { xPercent: 12.5, yPercent: -8, scale: 1.4 },
      { xPercent: 12.5, yPercent: -7.99, scale: 1.4 }
    ),
    false
  );
});

test('builds the expected object-position and scale styles', () => {
  assert.deepEqual(
    getImageTransformStyle({
      xPercent: -12,
      yPercent: 6.5,
      scale: 1.33,
    }),
    {
      objectPosition: '38% 56.5%',
      transform: 'scale(1.33)',
      transformOrigin: 'center center',
    }
  );
});
