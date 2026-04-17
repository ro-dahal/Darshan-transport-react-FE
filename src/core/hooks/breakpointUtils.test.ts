import assert from 'node:assert/strict';
import test from 'node:test';

import {
  getBreakpoint,
  getBreakpointState,
  getViewportWidth,
} from './breakpointUtils.ts';

test('returns a safe width when no browser window is available', () => {
  assert.equal(getViewportWidth(undefined), 0);
});

test('maps widths to the expected breakpoint labels', () => {
  assert.equal(getBreakpoint(0), 'xs');
  assert.equal(getBreakpoint(639), 'xs');
  assert.equal(getBreakpoint(640), 'sm');
  assert.equal(getBreakpoint(768), 'md');
  assert.equal(getBreakpoint(1024), 'lg');
  assert.equal(getBreakpoint(1536), '2xl');
});

test('derives mobile, tablet, and desktop flags from viewport width', () => {
  assert.deepEqual(getBreakpointState(767), {
    screenWidth: 767,
    breakpoint: 'sm',
    isMobile: true,
    isTablet: false,
    isDesktop: false,
  });

  assert.deepEqual(getBreakpointState(768), {
    screenWidth: 768,
    breakpoint: 'md',
    isMobile: false,
    isTablet: true,
    isDesktop: false,
  });

  assert.deepEqual(getBreakpointState(1280), {
    screenWidth: 1280,
    breakpoint: 'xl',
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });
});
