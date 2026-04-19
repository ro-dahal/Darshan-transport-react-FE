import assert from 'node:assert/strict';
import test from 'node:test';

import {
  getSharpOutputFormatForAssetPath,
  upsertTeamPageImageAssetReference,
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
