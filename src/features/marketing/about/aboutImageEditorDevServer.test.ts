import assert from 'node:assert/strict';
import test from 'node:test';

import {
  updateFounderTransformInAboutContent,
  updateHeroTransformInAboutPage,
} from '../../../../aboutImageEditorDevServer.ts';

const ABOUT_CONTENT_FIXTURE = `
export const ABOUT_FOUNDERS = [
  {
    role: 'Founder / Managing Director',
    signatureLabel: 'Hari Bahadur Shrestha',
    image: person1,
  },
  {
    role: 'Co-Founder',
    signatureLabel: 'Arun Kumar Shrestha',
    image: person2,
    imageTransform: {
      yPercent: -30,
    },
    reverse: true,
  },
];
`;

const ABOUT_PAGE_FIXTURE = `
const ABOUT_HERO_SELECTION: AboutImageSelection = {
  kind: 'heroImage',
  targetId: 'about-hero',
  label: 'About hero background',
  defaultTransform: normalizeAboutImageTransform(),
  imageSrc: companyHeroImage,
};
`;

test('writes founder transforms into aboutContent', () => {
  const nextSource = updateFounderTransformInAboutContent(
    ABOUT_CONTENT_FIXTURE,
    'Hari Bahadur Shrestha',
    { xPercent: 12, yPercent: -8, scale: 1.24 }
  );

  assert.match(
    nextSource,
    /signatureLabel: 'Hari Bahadur Shrestha',[\s\S]*imageTransform: \{[\s\S]*xPercent: 12,[\s\S]*yPercent: -8,[\s\S]*scale: 1\.24[\s\S]*\}/
  );
});

test('removes founder transforms when saving the neutral default', () => {
  const nextSource = updateFounderTransformInAboutContent(
    ABOUT_CONTENT_FIXTURE,
    'Arun Kumar Shrestha',
    { xPercent: 0, yPercent: 0, scale: 1 }
  );

  assert.doesNotMatch(nextSource, /imageTransform:/);
});

test('writes hero transforms into AboutPage', () => {
  const nextSource = updateHeroTransformInAboutPage(ABOUT_PAGE_FIXTURE, {
    xPercent: 6,
    yPercent: -4,
    scale: 1.18,
  });

  assert.match(
    nextSource,
    /defaultTransform: normalizeAboutImageTransform\(\{[\s\S]*xPercent: 6,[\s\S]*yPercent: -4,[\s\S]*scale: 1\.18[\s\S]*\}\)/
  );
});

test('keeps hero transform call empty for the neutral default', () => {
  const nextSource = updateHeroTransformInAboutPage(ABOUT_PAGE_FIXTURE, {
    xPercent: 0,
    yPercent: 0,
    scale: 1,
  });

  assert.match(
    nextSource,
    /defaultTransform: normalizeAboutImageTransform\(\)/
  );
});
