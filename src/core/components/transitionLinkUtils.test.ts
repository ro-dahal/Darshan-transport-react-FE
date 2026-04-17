import assert from 'node:assert/strict';
import test from 'node:test';

import {
  getTransitionNavigationMode,
  isModifiedEvent,
} from './transitionLinkUtils.ts';

test('treats modifier-assisted clicks as native browser interactions', () => {
  assert.equal(
    isModifiedEvent({
      button: 0,
      metaKey: true,
      altKey: false,
      ctrlKey: false,
      shiftKey: false,
    }),
    true
  );

  assert.equal(
    isModifiedEvent({
      button: 1,
      metaKey: false,
      altKey: false,
      ctrlKey: false,
      shiftKey: false,
    }),
    true
  );
});

test('routes same-page hash links without a transition', () => {
  assert.equal(
    getTransitionNavigationMode({
      currentPathname: '/services',
      to: '/services#coverage',
      target: undefined,
      download: undefined,
      event: {
        button: 0,
        metaKey: false,
        altKey: false,
        ctrlKey: false,
        shiftKey: false,
      },
    }),
    'instant'
  );
});

test('keeps regular internal links on the transition path', () => {
  assert.equal(
    getTransitionNavigationMode({
      currentPathname: '/services',
      to: '/contact',
      target: undefined,
      download: undefined,
      event: {
        button: 0,
        metaKey: false,
        altKey: false,
        ctrlKey: false,
        shiftKey: false,
      },
    }),
    'transition'
  );
});

test('lets native browser handling win for new-tab targets and modified clicks', () => {
  assert.equal(
    getTransitionNavigationMode({
      currentPathname: '/services',
      to: '/contact',
      target: '_blank',
      download: undefined,
      event: {
        button: 0,
        metaKey: false,
        altKey: false,
        ctrlKey: false,
        shiftKey: false,
      },
    }),
    'browser'
  );

  assert.equal(
    getTransitionNavigationMode({
      currentPathname: '/services',
      to: '/contact',
      target: undefined,
      download: undefined,
      event: {
        button: 0,
        metaKey: false,
        altKey: false,
        ctrlKey: true,
        shiftKey: false,
      },
    }),
    'browser'
  );
});

test('ignores redundant clicks to the current path', () => {
  assert.equal(
    getTransitionNavigationMode({
      currentPathname: '/services',
      to: '/services',
      target: undefined,
      download: undefined,
      event: {
        button: 0,
        metaKey: false,
        altKey: false,
        ctrlKey: false,
        shiftKey: false,
      },
    }),
    'ignore'
  );
});
