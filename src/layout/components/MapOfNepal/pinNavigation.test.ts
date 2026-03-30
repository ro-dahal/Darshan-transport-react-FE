import assert from 'node:assert/strict';
import test from 'node:test';

import { getWrappedPinIndex } from './pinNavigation.ts';

test('moves to the next pin and wraps back to the first pin', () => {
  assert.equal(getWrappedPinIndex(0, 12, 'next'), 1);
  assert.equal(getWrappedPinIndex(11, 12, 'next'), 0);
});

test('moves to the previous pin and wraps back to the last pin', () => {
  assert.equal(getWrappedPinIndex(4, 12, 'previous'), 3);
  assert.equal(getWrappedPinIndex(0, 12, 'previous'), 11);
});

test('starts from a safe default when no pin is active yet', () => {
  assert.equal(getWrappedPinIndex(-1, 12, 'next'), 0);
  assert.equal(getWrappedPinIndex(-1, 12, 'previous'), 11);
});
