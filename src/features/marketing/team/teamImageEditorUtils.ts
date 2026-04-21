import {
  areImageTransformsEqual,
  formatTransformNumber,
  normalizeImageTransform,
  type ImageTransform,
} from '../shared/dev-image-editor/imageTransformUtils';

export interface TeamMember {
  name: string;
  role: string;
  portraitSrc?: string;
  portraitAssetPath?: string;
  portraitAlt?: string;
  portraitTransform?: ImageTransform;
}

export interface TeamDepartment {
  department: string;
  description: string;
  icon: string;
  headerImageSrc?: string;
  headerImageAssetPath?: string;
  headerImageAlt?: string;
  headerImageTransform?: ImageTransform;
  members: TeamMember[];
}

export type TeamImageKind = 'memberPortrait' | 'departmentHeader';
export type TeamImageSaveTargetKind =
  | 'existing-asset'
  | 'new-member-asset'
  | 'new-header-asset';
export type TeamImageOutputFormat = 'jpeg' | 'png' | 'webp';

export type TeamImageTransformOverrides = {
  memberPortraits: Record<string, ImageTransform>;
  departmentHeaders: Record<string, ImageTransform>;
};

export type TeamImageSourceOverride = {
  src: string;
  alt: string;
  browserFileName: string;
  assetRelativePath: string;
  assetDisplayPath: string;
  assetFileName: string;
  pendingSave: boolean;
  file: File;
  objectUrl?: string;
};

export type TeamImageSourceOverrides = {
  memberPortraits: Record<string, TeamImageSourceOverride>;
  departmentHeaders: Record<string, TeamImageSourceOverride>;
};

export type TeamImageSelection = {
  kind: TeamImageKind;
  targetId: string;
  departmentName: string;
  memberName?: string;
  label: string;
  defaultTransform: ImageTransform;
  defaultImageSrc: string;
  defaultImageAlt: string;
  assetRelativePath: string | null;
  assetDisplayPath: string;
  saveTargetKind: TeamImageSaveTargetKind;
  previewAspectRatio: string;
};

export type TeamCanonicalAssetTarget = {
  assetRelativePath: string;
  assetDisplayPath: string;
  assetImportPath: string;
  assetFileName: string;
  importIdentifier: string;
  saveTargetKind: TeamImageSaveTargetKind;
  outputFormat: TeamImageOutputFormat;
};

export type TeamImageSavePayload = TeamCanonicalAssetTarget & {
  kind: TeamImageKind;
  targetId: string;
  departmentName: string;
  memberName?: string;
};

export const EMPTY_TEAM_IMAGE_TRANSFORM_OVERRIDES: TeamImageTransformOverrides =
  {
    memberPortraits: {},
    departmentHeaders: {},
  };

export const EMPTY_TEAM_IMAGE_SOURCE_OVERRIDES: TeamImageSourceOverrides = {
  memberPortraits: {},
  departmentHeaders: {},
};

export const DEV_TEAM_IMAGE_EDITOR_STORAGE_KEY =
  'darshan-team-page-image-editor-overrides';

export const buildMemberTargetId = (
  departmentName: string,
  memberName: string
) => `${departmentName}::${memberName}`;

export const buildDepartmentTargetId = (departmentName: string) =>
  departmentName;

export const getTeamTransformRecordForKind = (
  overrides: TeamImageTransformOverrides,
  kind: TeamImageKind
) =>
  kind === 'memberPortrait'
    ? overrides.memberPortraits
    : overrides.departmentHeaders;

export const getTeamSourceRecordForKind = (
  overrides: TeamImageSourceOverrides,
  kind: TeamImageKind
) =>
  kind === 'memberPortrait'
    ? overrides.memberPortraits
    : overrides.departmentHeaders;

const slugifyFilePart = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');

const buildDefaultAssetRelativePath = (selection: TeamImageSelection) => {
  if (selection.kind === 'memberPortrait') {
    const memberName = selection.memberName ?? selection.label;
    return `src/assets/marketing/team/${slugifyFilePart(memberName)}.jpg`;
  }

  return `src/assets/generated/marketing/team/team-${slugifyFilePart(
    selection.departmentName
  )}-header.webp`;
};

const getOutputFormatForAssetPath = (
  assetRelativePath: string
): TeamImageOutputFormat => {
  const normalizedPath = assetRelativePath.toLowerCase();

  if (normalizedPath.endsWith('.webp')) {
    return 'webp';
  }

  if (normalizedPath.endsWith('.png')) {
    return 'png';
  }

  return 'jpeg';
};

const toImportIdentifier = (assetFileName: string, kind: TeamImageKind) => {
  const normalizedBaseName = assetFileName.replace(/\.[a-z0-9]+$/i, '');
  const camelCaseName = normalizedBaseName
    .split(/[^a-z0-9]+/i)
    .filter(Boolean)
    .map((segment, index) =>
      index === 0
        ? segment.toLowerCase()
        : segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase()
    )
    .join('');

  return kind === 'memberPortrait' ? `${camelCaseName}Portrait` : camelCaseName;
};

export const buildCanonicalTeamAssetTarget = (
  selection: TeamImageSelection
): TeamCanonicalAssetTarget => {
  const assetRelativePath =
    selection.assetRelativePath ?? buildDefaultAssetRelativePath(selection);
  const assetDisplayPath = selection.assetDisplayPath || assetRelativePath;
  const assetFileName =
    assetRelativePath.split('/').filter(Boolean).pop() ?? assetRelativePath;

  return {
    assetRelativePath,
    assetDisplayPath,
    assetImportPath: assetRelativePath.replace(/^src\/assets/, '@assets'),
    assetFileName,
    importIdentifier: toImportIdentifier(assetFileName, selection.kind),
    saveTargetKind: selection.saveTargetKind,
    outputFormat: getOutputFormatForAssetPath(assetRelativePath),
  };
};

export const buildTeamImageSavePayload = (
  selection: TeamImageSelection
): TeamImageSavePayload => ({
  kind: selection.kind,
  targetId: selection.targetId,
  departmentName: selection.departmentName,
  memberName: selection.memberName,
  ...buildCanonicalTeamAssetTarget(selection),
});

export const buildTeamImageSourceOverride = (
  selection: TeamImageSelection,
  file: File,
  src: string,
  objectUrl?: string
): TeamImageSourceOverride => {
  const canonicalTarget = buildCanonicalTeamAssetTarget(selection);

  return {
    src,
    alt: selection.defaultImageAlt,
    browserFileName: file.name,
    assetRelativePath: canonicalTarget.assetRelativePath,
    assetDisplayPath: canonicalTarget.assetDisplayPath,
    assetFileName: canonicalTarget.assetFileName,
    pendingSave: true,
    file,
    objectUrl,
  };
};

export const setTeamImageOverride = (
  overrides: TeamImageTransformOverrides,
  selection: TeamImageSelection,
  nextTransform: ImageTransform
): TeamImageTransformOverrides => {
  const normalizedTransform = normalizeImageTransform(nextTransform);
  const nextRecord = {
    ...getTeamTransformRecordForKind(overrides, selection.kind),
  };

  if (
    areImageTransformsEqual(normalizedTransform, selection.defaultTransform)
  ) {
    delete nextRecord[selection.targetId];
  } else {
    nextRecord[selection.targetId] = normalizedTransform;
  }

  return selection.kind === 'memberPortrait'
    ? { ...overrides, memberPortraits: nextRecord }
    : { ...overrides, departmentHeaders: nextRecord };
};

export const clearTeamImageOverride = (
  overrides: TeamImageTransformOverrides,
  selection: TeamImageSelection
): TeamImageTransformOverrides => {
  const nextRecord = {
    ...getTeamTransformRecordForKind(overrides, selection.kind),
  };

  if (!nextRecord[selection.targetId]) {
    return overrides;
  }

  delete nextRecord[selection.targetId];

  return selection.kind === 'memberPortrait'
    ? { ...overrides, memberPortraits: nextRecord }
    : { ...overrides, departmentHeaders: nextRecord };
};

export const clearTeamImageSourceOverride = (
  overrides: TeamImageSourceOverrides,
  selection: TeamImageSelection
): TeamImageSourceOverrides => {
  const nextRecord = {
    ...getTeamSourceRecordForKind(overrides, selection.kind),
  };

  if (!nextRecord[selection.targetId]) {
    return overrides;
  }

  delete nextRecord[selection.targetId];

  return selection.kind === 'memberPortrait'
    ? { ...overrides, memberPortraits: nextRecord }
    : { ...overrides, departmentHeaders: nextRecord };
};

const parseTransformRecord = (
  record: unknown
): Record<string, ImageTransform> => {
  if (!record || typeof record !== 'object' || Array.isArray(record)) {
    throw new Error('Invalid transform record');
  }

  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => {
      if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new Error(`Invalid transform value for ${key}`);
      }

      return [key, normalizeImageTransform(value as Partial<ImageTransform>)];
    })
  );
};

export const parseStoredTeamImageOverrides = (
  rawValue: string | null
): TeamImageTransformOverrides => {
  if (!rawValue) {
    return EMPTY_TEAM_IMAGE_TRANSFORM_OVERRIDES;
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<TeamImageTransformOverrides>;

    return {
      memberPortraits: parseTransformRecord(parsed.memberPortraits ?? {}),
      departmentHeaders: parseTransformRecord(parsed.departmentHeaders ?? {}),
    };
  } catch {
    return EMPTY_TEAM_IMAGE_TRANSFORM_OVERRIDES;
  }
};

export const buildMemberTransformExportText = (
  departments: TeamDepartment[],
  overrides: TeamImageTransformOverrides
) => {
  const entries = departments.flatMap((department) =>
    department.members.flatMap((member) => {
      const override =
        overrides.memberPortraits[
          buildMemberTargetId(department.department, member.name)
        ];

      if (!override) {
        return [];
      }

      return [
        [
          '  {',
          `    department: ${JSON.stringify(department.department)},`,
          `    member: ${JSON.stringify(member.name)},`,
          `    portraitTransform: { xPercent: ${formatTransformNumber(
            override.xPercent
          )}, yPercent: ${formatTransformNumber(
            override.yPercent
          )}, scale: ${formatTransformNumber(override.scale)} },`,
          '  },',
        ].join('\n'),
      ];
    })
  );

  if (entries.length === 0) {
    return '[]';
  }

  return `[\n${entries.join('\n')}\n]`;
};

export const buildHeaderTransformExportText = (
  departments: TeamDepartment[],
  overrides: TeamImageTransformOverrides
) => {
  const entries = departments.flatMap((department) => {
    const override =
      overrides.departmentHeaders[
        buildDepartmentTargetId(department.department)
      ];

    if (!override) {
      return [];
    }

    return [
      [
        '  {',
        `    department: ${JSON.stringify(department.department)},`,
        `    headerImageTransform: { xPercent: ${formatTransformNumber(
          override.xPercent
        )}, yPercent: ${formatTransformNumber(
          override.yPercent
        )}, scale: ${formatTransformNumber(override.scale)} },`,
        '  },',
      ].join('\n'),
    ];
  });

  if (entries.length === 0) {
    return '[]';
  }

  return `[\n${entries.join('\n')}\n]`;
};

export const getTeamImageKindLabel = (kind: TeamImageKind) =>
  kind === 'memberPortrait' ? 'Member Portrait' : 'Department Header';
