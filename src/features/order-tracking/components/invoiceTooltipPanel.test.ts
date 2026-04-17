import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { InvoiceTooltipPanel } from './InvoiceTooltipPanel.tsx';

test('renders only the invoice image inside the tooltip panel', () => {
  const markup = renderToStaticMarkup(
    React.createElement(InvoiceTooltipPanel, {
      imageMaxHeight: 240,
      imageSrc: '/tooltip.jpg',
    })
  );

  assert.match(
    markup,
    /Darshan Transport invoice sample showing where the invoice number is located/
  );
  assert.match(markup, /src="\/tooltip\.jpg"/);
  assert.doesNotMatch(markup, /Invoice Guide/);
  assert.doesNotMatch(markup, /Find the correct invoice digits before tracking/);
  assert.doesNotMatch(markup, /Step 1: Use the sample receipt/);
  assert.doesNotMatch(markup, /Close invoice guide/);
});
