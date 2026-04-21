import assert from 'node:assert/strict';
import test from 'node:test';

import {
  getSharpOutputFormatForAssetPath,
  upsertTeamPageImageAssetReference,
  upsertTeamPageTransformReference,
  validateTeamImageDimensions,
} from '../../../../teamImageEditorDevServer.ts';

const TEAM_PAGE_FIXTURE = `
import React from 'react';
import demoMemberPortrait from '@assets/generated/marketing/team/team-demo-member-1.webp';

const TEAM_DEPARTMENTS = [
  {
    department: 'Sales',
    description: 'Sales team',
    icon: 'S',
    members: [
      { name: 'Asha Rai', role: 'Sales Lead' },
      { name: 'Bikash Rai', role: 'Sales Executive' },
    ],
  },
  {
    department: 'Operations & Dispatch',
    description: 'Operations team',
    icon: 'O',
    members: [],
  },
];
`;

test('upserts a new member portrait import and source reference into TeamPage', () => {
  const nextSource = upsertTeamPageImageAssetReference(TEAM_PAGE_FIXTURE, {
    kind: 'memberPortrait',
    departmentName: 'Sales',
    memberName: 'Asha Rai',
    importIdentifier: 'ashaRaiPortrait',
    assetImportPath: '@assets/marketing/team/asha-rai.jpg',
    assetRelativePath: 'src/assets/marketing/team/asha-rai.jpg',
  });

  assert.match(
    nextSource,
    /import ashaRaiPortrait from ["']@assets\/marketing\/team\/asha-rai\.jpg["'];/
  );
  assert.match(
    nextSource,
    /portraitSrc: ashaRaiPortrait, portraitAssetPath: ["']src\/assets\/marketing\/team\/asha-rai\.jpg["']/
  );

  const idempotentSource = upsertTeamPageImageAssetReference(nextSource, {
    kind: 'memberPortrait',
    departmentName: 'Sales',
    memberName: 'Asha Rai',
    importIdentifier: 'ashaRaiPortrait',
    assetImportPath: '@assets/marketing/team/asha-rai.jpg',
    assetRelativePath: 'src/assets/marketing/team/asha-rai.jpg',
  });

  assert.equal(
    idempotentSource.match(/import ashaRaiPortrait from/g)?.length ?? 0,
    1
  );
  assert.equal(
    idempotentSource.match(/portraitSrc: ashaRaiPortrait/g)?.length ?? 0,
    1
  );
  assert.equal(
    idempotentSource.match(
      /portraitAssetPath: ["']src\/assets\/marketing\/team\/asha-rai\.jpg["']/g
    )?.length ?? 0,
    1
  );
});

test('upserts a new department header import and source reference into TeamPage', () => {
  const nextSource = upsertTeamPageImageAssetReference(TEAM_PAGE_FIXTURE, {
    kind: 'departmentHeader',
    departmentName: 'Operations & Dispatch',
    importIdentifier: 'teamOperationsDispatchHeader',
    assetImportPath:
      '@assets/generated/marketing/team/team-operations-dispatch-header.webp',
    assetRelativePath:
      'src/assets/generated/marketing/team/team-operations-dispatch-header.webp',
  });

  assert.match(
    nextSource,
    /import teamOperationsDispatchHeader from ["']@assets\/generated\/marketing\/team\/team-operations-dispatch-header\.webp["'];/
  );
  assert.match(
    nextSource,
    /department: 'Operations & Dispatch',[\s\S]*headerImageSrc: teamOperationsDispatchHeader,[\s\S]*headerImageAssetPath: ["']src\/assets\/generated\/marketing\/team\/team-operations-dispatch-header\.webp["'],/
  );
});

test('writes member portrait transforms into TeamPage', () => {
  const nextSource = upsertTeamPageTransformReference(TEAM_PAGE_FIXTURE, {
    kind: 'memberPortrait',
    departmentName: 'Sales',
    memberName: 'Asha Rai',
    transform: {
      xPercent: 14,
      yPercent: -6,
      scale: 1.18,
    },
  });

  assert.match(
    nextSource,
    /name: 'Asha Rai',[\s\S]*portraitTransform: \{[\s\S]*xPercent: 14,[\s\S]*yPercent: -6,[\s\S]*scale: 1\.18[\s\S]*\}/
  );
});

test('writes department header transforms into TeamPage', () => {
  const nextSource = upsertTeamPageTransformReference(TEAM_PAGE_FIXTURE, {
    kind: 'departmentHeader',
    departmentName: 'Operations & Dispatch',
    transform: {
      xPercent: -10,
      yPercent: 8,
      scale: 1.12,
    },
  });

  assert.match(
    nextSource,
    /department: 'Operations & Dispatch',[\s\S]*headerImageTransform: \{[\s\S]*xPercent: -10,[\s\S]*yPercent: 8,[\s\S]*scale: 1\.12[\s\S]*\}/
  );
});

test('maps Team asset paths to sharp output formats', () => {
  assert.equal(
    getSharpOutputFormatForAssetPath(
      'src/assets/generated/marketing/team/team-operations-dispatch-header.webp'
    ),
    'webp'
  );
  assert.equal(
    getSharpOutputFormatForAssetPath('src/assets/marketing/team/asha-rai.jpg'),
    'jpeg'
  );
});

test('rejects undersized Team portraits before writing generated assets', () => {
  assert.throws(
    () =>
      validateTeamImageDimensions('memberPortrait', {
        width: 400,
        height: 267,
      }),
    /Uploaded portrait is too small \(400x267\)/
  );

  assert.doesNotThrow(() =>
    validateTeamImageDimensions('memberPortrait', {
      width: 1200,
      height: 1800,
    })
  );
});

test('rejects undersized Team headers before writing generated assets', () => {
  assert.throws(
    () =>
      validateTeamImageDimensions('departmentHeader', {
        width: 1600,
        height: 900,
      }),
    /Uploaded header is too small \(1600x900\)/
  );

  assert.doesNotThrow(() =>
    validateTeamImageDimensions('departmentHeader', {
      width: 7008,
      height: 4672,
    })
  );
});
