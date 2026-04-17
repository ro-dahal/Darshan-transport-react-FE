import assert from 'node:assert/strict';
import test from 'node:test';

import { getInvoiceTooltipPosition } from './invoiceTooltipPosition.ts';

test('keeps tooltip dimensions stable when the trigger moves during scroll', () => {
  const viewport = {
    width: 1280,
    height: 900,
  };

  const buttonNearTop = {
    top: 140,
    right: 1180,
    bottom: 184,
  };

  const buttonNearBottom = {
    top: 640,
    right: 1180,
    bottom: 684,
  };

  const topLayout = getInvoiceTooltipPosition({
    viewport,
    buttonRect: buttonNearTop,
    panelHeight: 520,
  });

  const bottomLayout = getInvoiceTooltipPosition({
    viewport,
    buttonRect: buttonNearBottom,
    panelHeight: 520,
  });

  assert.equal(topLayout.width, bottomLayout.width);
  assert.equal(topLayout.imageMaxHeight, bottomLayout.imageMaxHeight);
});

test('reduces tooltip dimensions on smaller screens', () => {
  const desktopLayout = getInvoiceTooltipPosition({
    viewport: {
      width: 1280,
      height: 900,
    },
    buttonRect: {
      top: 180,
      right: 1180,
      bottom: 224,
    },
    panelHeight: 520,
  });

  const tabletLayout = getInvoiceTooltipPosition({
    viewport: {
      width: 768,
      height: 900,
    },
    buttonRect: {
      top: 180,
      right: 700,
      bottom: 224,
    },
    panelHeight: 520,
  });

  const mobileLayout = getInvoiceTooltipPosition({
    viewport: {
      width: 390,
      height: 844,
    },
    buttonRect: {
      top: 180,
      right: 360,
      bottom: 224,
    },
    panelHeight: 520,
  });

  assert.ok(tabletLayout.width < desktopLayout.width);
  assert.ok(mobileLayout.width < tabletLayout.width);
  assert.ok(mobileLayout.maxHeight < desktopLayout.maxHeight);
});

test('keeps the image-only tooltip width close to the image content', () => {
  const layout = getInvoiceTooltipPosition({
    viewport: {
      width: 1280,
      height: 900,
    },
    buttonRect: {
      top: 180,
      right: 1180,
      bottom: 224,
    },
    panelHeight: 520,
  });

  assert.ok(layout.width <= 440);
});

test('keeps the tooltip inside the viewport gutters', () => {
  const layout = getInvoiceTooltipPosition({
    viewport: {
      width: 360,
      height: 640,
    },
    buttonRect: {
      top: 560,
      right: 340,
      bottom: 604,
    },
    panelHeight: 520,
  });

  assert.ok(layout.left >= 16);
  assert.ok(layout.top >= 16);
  assert.ok(layout.left + layout.width <= 360 - 16);
});
