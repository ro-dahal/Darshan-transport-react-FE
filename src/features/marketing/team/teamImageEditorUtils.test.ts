import assert from 'node:assert/strict';
import test from 'node:test';

import { normalizeImageTransform } from '../shared/dev-image-editor/imageTransformUtils.ts';
import {
  EMPTY_TEAM_IMAGE_TRANSFORM_OVERRIDES,
  buildCanonicalTeamAssetTarget,
  buildDepartmentTargetId,
  buildHeaderTransformExportText,
  buildMemberTargetId,
  buildMemberTransformExportText,
  buildTeamImageSavePayload,
  buildTeamImageSourceOverride,
  parseStoredTeamImageOverrides,
  setTeamImageOverride,
  type TeamDepartment,
  type TeamImageSelection,
} from './teamImageEditorUtils.ts';

const SALES_MEMBER_SELECTION: TeamImageSelection = {
  kind: 'memberPortrait',
  targetId: buildMemberTargetId('Sales', 'Asha Rai'),
  departmentName: 'Sales',
  memberName: 'Asha Rai',
  label: 'Sales -> Asha Rai',
  defaultTransform: normalizeImageTransform({
    xPercent: 4,
    yPercent: -3,
    scale: 1.1,
  }),
  defaultImageSrc: '/asha.jpg',
  defaultImageAlt: 'Asha Rai portrait',
  assetRelativePath: null,
  assetDisplayPath: 'src/assets/marketing/team/asha-rai.jpg',
  saveTargetKind: 'new-member-asset',
  previewAspectRatio: '3 / 4',
};

const SAMPLE_DEPARTMENTS: TeamDepartment[] = [
  {
    department: 'Sales',
    description: 'Sales team',
    icon: 'S',
    members: [
      {
        name: 'Asha Rai',
        role: 'Sales Lead',
      },
    ],
  },
  {
    department: 'Finance',
    description: 'Finance team',
    icon: 'F',
    members: [],
  },
];

test('removes a team image override when it matches the default transform', () => {
  assert.deepEqual(
    setTeamImageOverride(
      {
        memberPortraits: {
          [SALES_MEMBER_SELECTION.targetId]: normalizeImageTransform({
            xPercent: 18,
            yPercent: 14,
            scale: 1.5,
          }),
        },
        departmentHeaders: {},
      },
      SALES_MEMBER_SELECTION,
      SALES_MEMBER_SELECTION.defaultTransform
    ),
    EMPTY_TEAM_IMAGE_TRANSFORM_OVERRIDES
  );
});

test('falls back to empty team image overrides when stored data is invalid', () => {
  assert.deepEqual(
    parseStoredTeamImageOverrides('{"memberPortraits":{"sales":true}}'),
    EMPTY_TEAM_IMAGE_TRANSFORM_OVERRIDES
  );
});

test('builds member and header export blocks from active overrides', () => {
  const overrides = {
    memberPortraits: {
      [buildMemberTargetId('Sales', 'Asha Rai')]: normalizeImageTransform({
        xPercent: 8.5,
        yPercent: -4,
        scale: 1.35,
      }),
    },
    departmentHeaders: {
      [buildDepartmentTargetId('Finance')]: normalizeImageTransform({
        xPercent: -6,
        yPercent: 3,
        scale: 1.12,
      }),
    },
  };

  assert.equal(
    buildMemberTransformExportText(SAMPLE_DEPARTMENTS, overrides),
    [
      '[',
      '  {',
      '    department: "Sales",',
      '    member: "Asha Rai",',
      '    portraitTransform: { xPercent: 8.5, yPercent: -4, scale: 1.35 },',
      '  },',
      ']',
    ].join('\n')
  );

  assert.equal(
    buildHeaderTransformExportText(SAMPLE_DEPARTMENTS, overrides),
    [
      '[',
      '  {',
      '    department: "Finance",',
      '    headerImageTransform: { xPercent: -6, yPercent: 3, scale: 1.12 },',
      '  },',
      ']',
    ].join('\n')
  );
});

test('resolves canonical asset targets for existing and new Team images', () => {
  assert.deepEqual(
    buildCanonicalTeamAssetTarget({
      ...SALES_MEMBER_SELECTION,
      assetRelativePath: 'src/assets/marketing/team/asha-rai.jpg',
      assetDisplayPath: 'src/assets/marketing/team/asha-rai.jpg',
      saveTargetKind: 'existing-asset',
    }),
    {
      assetRelativePath: 'src/assets/marketing/team/asha-rai.jpg',
      assetDisplayPath: 'src/assets/marketing/team/asha-rai.jpg',
      assetImportPath: '@assets/marketing/team/asha-rai.jpg',
      assetFileName: 'asha-rai.jpg',
      importIdentifier: 'ashaRaiPortrait',
      saveTargetKind: 'existing-asset',
      outputFormat: 'jpeg',
    }
  );

  assert.deepEqual(
    buildCanonicalTeamAssetTarget({
      ...SALES_MEMBER_SELECTION,
      targetId: buildDepartmentTargetId('Finance Department'),
      departmentName: 'Finance Department',
      memberName: undefined,
      kind: 'departmentHeader',
      label: 'Finance Department header',
      defaultImageSrc: '/finance.jpg',
      defaultImageAlt: 'Finance header',
      assetRelativePath:
        'src/assets/generated/marketing/team/team-finance-department-header.webp',
      assetDisplayPath:
        'src/assets/generated/marketing/team/team-finance-department-header.webp',
      saveTargetKind: 'existing-asset',
      previewAspectRatio: '16 / 5',
    }),
    {
      assetRelativePath:
        'src/assets/generated/marketing/team/team-finance-department-header.webp',
      assetDisplayPath:
        'src/assets/generated/marketing/team/team-finance-department-header.webp',
      assetImportPath:
        '@assets/generated/marketing/team/team-finance-department-header.webp',
      assetFileName: 'team-finance-department-header.webp',
      importIdentifier: 'teamFinanceDepartmentHeader',
      saveTargetKind: 'existing-asset',
      outputFormat: 'webp',
    }
  );

  assert.deepEqual(buildCanonicalTeamAssetTarget(SALES_MEMBER_SELECTION), {
    assetRelativePath: 'src/assets/marketing/team/asha-rai.jpg',
    assetDisplayPath: 'src/assets/marketing/team/asha-rai.jpg',
    assetImportPath: '@assets/marketing/team/asha-rai.jpg',
    assetFileName: 'asha-rai.jpg',
    importIdentifier: 'ashaRaiPortrait',
    saveTargetKind: 'new-member-asset',
    outputFormat: 'jpeg',
  });

  assert.deepEqual(
    buildCanonicalTeamAssetTarget({
      ...SALES_MEMBER_SELECTION,
      targetId: buildDepartmentTargetId('Operations & Dispatch'),
      departmentName: 'Operations & Dispatch',
      memberName: undefined,
      kind: 'departmentHeader',
      label: 'Operations & Dispatch header',
      defaultImageSrc: '/operations.jpg',
      defaultImageAlt: 'Operations header',
      assetRelativePath: null,
      assetDisplayPath:
        'src/assets/generated/marketing/team/team-operations-dispatch-header.webp',
      saveTargetKind: 'new-header-asset',
      previewAspectRatio: '16 / 5',
    }),
    {
      assetRelativePath:
        'src/assets/generated/marketing/team/team-operations-dispatch-header.webp',
      assetDisplayPath:
        'src/assets/generated/marketing/team/team-operations-dispatch-header.webp',
      assetImportPath:
        '@assets/generated/marketing/team/team-operations-dispatch-header.webp',
      assetFileName: 'team-operations-dispatch-header.webp',
      importIdentifier: 'teamOperationsDispatchHeader',
      saveTargetKind: 'new-header-asset',
      outputFormat: 'webp',
    }
  );
});

test('builds save payload and upload metadata from canonical asset targets', () => {
  const uploadedFile = new File(['header-bytes'], 'raw-upload.png', {
    type: 'image/png',
    lastModified: 4321,
  });

  const headerSelection: TeamImageSelection = {
    ...SALES_MEMBER_SELECTION,
    kind: 'departmentHeader',
    targetId: buildDepartmentTargetId('Finance'),
    departmentName: 'Finance',
    memberName: undefined,
    label: 'Finance header',
    previewAspectRatio: '16 / 5',
    defaultImageSrc: '/finance.jpg',
    defaultImageAlt: 'Finance header',
    assetRelativePath: null,
    assetDisplayPath:
      'src/assets/generated/marketing/team/team-finance-header.webp',
    saveTargetKind: 'new-header-asset',
  };

  const savePayload = buildTeamImageSavePayload(headerSelection);
  const sourceOverride = buildTeamImageSourceOverride(
    headerSelection,
    uploadedFile,
    'blob:finance-preview'
  );

  assert.deepEqual(savePayload, {
    kind: 'departmentHeader',
    targetId: buildDepartmentTargetId('Finance'),
    departmentName: 'Finance',
    memberName: undefined,
    assetRelativePath:
      'src/assets/generated/marketing/team/team-finance-header.webp',
    assetDisplayPath:
      'src/assets/generated/marketing/team/team-finance-header.webp',
    assetImportPath:
      '@assets/generated/marketing/team/team-finance-header.webp',
    assetFileName: 'team-finance-header.webp',
    importIdentifier: 'teamFinanceHeader',
    saveTargetKind: 'new-header-asset',
    outputFormat: 'webp',
  });

  assert.equal(sourceOverride.browserFileName, 'raw-upload.png');
  assert.equal(
    sourceOverride.assetRelativePath,
    'src/assets/generated/marketing/team/team-finance-header.webp'
  );
  assert.equal(
    sourceOverride.assetDisplayPath,
    'src/assets/generated/marketing/team/team-finance-header.webp'
  );
  assert.equal(sourceOverride.assetFileName, 'team-finance-header.webp');
  assert.equal(sourceOverride.pendingSave, true);
  assert.equal(sourceOverride.src, 'blob:finance-preview');
  assert.equal(sourceOverride.file, uploadedFile);
});

test('preserves canonical output contract when the upload extension differs', () => {
  const jpegSelection: TeamImageSelection = {
    ...SALES_MEMBER_SELECTION,
    assetRelativePath: null,
    assetDisplayPath: 'src/assets/marketing/team/asha-rai.jpg',
    saveTargetKind: 'new-member-asset',
  };

  const webpSelection: TeamImageSelection = {
    kind: 'departmentHeader',
    targetId: buildDepartmentTargetId('Operations & Dispatch'),
    departmentName: 'Operations & Dispatch',
    memberName: undefined,
    label: 'Operations & Dispatch header',
    defaultTransform: SALES_MEMBER_SELECTION.defaultTransform,
    defaultImageSrc: '/finance.jpg',
    defaultImageAlt: 'Operations header',
    assetRelativePath: null,
    assetDisplayPath:
      'src/assets/generated/marketing/team/team-operations-dispatch-header.webp',
    saveTargetKind: 'new-header-asset',
    previewAspectRatio: '16 / 5',
  };

  assert.equal(buildTeamImageSavePayload(jpegSelection).outputFormat, 'jpeg');
  assert.equal(buildTeamImageSavePayload(webpSelection).outputFormat, 'webp');
});
