import assert from 'node:assert/strict';
import test from 'node:test';

import {
  EMPTY_ABOUT_IMAGE_TRANSFORM_OVERRIDES,
  normalizeAboutImageTransform,
  parseStoredAboutImageOverrides,
  setAboutImageOverride,
} from './aboutImageEditorUtils.ts';

test('normalizes about image transforms into the supported bounds', () => {
  assert.deepEqual(
    normalizeAboutImageTransform({
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

test('removes an about image override when it matches the default transform', () => {
  const defaultTransform = normalizeAboutImageTransform({
    xPercent: 5,
    yPercent: -4,
    scale: 1.2,
  });

  assert.deepEqual(
    setAboutImageOverride(
      {
        founderPortraits: {
          founder: normalizeAboutImageTransform({
            xPercent: 22,
            yPercent: 14,
            scale: 1.5,
          }),
        },
        heroImages: {},
      },
      {
        kind: 'founderPortrait',
        targetId: 'founder',
        defaultTransform,
      },
      defaultTransform
    ),
    EMPTY_ABOUT_IMAGE_TRANSFORM_OVERRIDES
  );
});

test('falls back to empty about image overrides when stored data is invalid', () => {
  assert.deepEqual(
    parseStoredAboutImageOverrides('{"founderPortraits":{"hari":true}}'),
    EMPTY_ABOUT_IMAGE_TRANSFORM_OVERRIDES
  );
});
