import assert from 'node:assert/strict';
import test from 'node:test';

import {
  ABOUT_CORE_VALUES_CARD_VARIANTS,
  ABOUT_CORE_VALUES_GRID_VARIANTS,
} from './coreValuesSectionVariants.ts';

test('matches the services-style staggered card reveal', () => {
  assert.deepEqual(ABOUT_CORE_VALUES_CARD_VARIANTS.hidden, {
    opacity: 0,
    scale: 0.85,
  });

  const first = ABOUT_CORE_VALUES_CARD_VARIANTS.visible(0);
  const second = ABOUT_CORE_VALUES_CARD_VARIANTS.visible(1);

  assert.deepEqual(first, {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0,
      ease: [0.22, 1, 0.36, 1],
    },
  });

  assert.equal(second.transition.delay, 0.08);
});

test('staggeres the grid children like the services page', () => {
  assert.deepEqual(ABOUT_CORE_VALUES_GRID_VARIANTS.hidden, {});
  assert.equal(
    ABOUT_CORE_VALUES_GRID_VARIANTS.visible.transition.staggerChildren,
    0.08
  );
});
