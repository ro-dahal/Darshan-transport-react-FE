import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';

import { FounderSection } from './FounderSection.tsx';

test('renders a link to the team page after the leadership profiles', () => {
  const markup = renderToStaticMarkup(
    React.createElement(
      MemoryRouter,
      undefined,
      React.createElement(FounderSection, {
        profiles: [
          {
            role: 'Founder / Managing Director',
            quote: '" Building dependable logistics starts with people.',
            signatureLabel: 'Hari Bahadur Shrestha',
            image: '/hari-bahadur-shrestha.jpg',
          },
        ],
      })
    )
  );

  assert.match(markup, /Meet the full team/);
  assert.match(markup, /href="\/team"/);
});
