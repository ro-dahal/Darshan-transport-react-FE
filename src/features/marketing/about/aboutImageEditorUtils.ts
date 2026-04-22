import {
  areImageTransformsEqual,
  formatTransformNumber,
  getImageTransformStyle,
  normalizeImageTransform,
  type ImageTransform,
} from '../shared/dev-image-editor/imageTransformUtils';

export type AboutImageTransform = ImageTransform;

export type AboutImageKind = 'founderPortrait' | 'heroImage';

export type AboutImageTransformOverrides = {
  founderPortraits: Record<string, AboutImageTransform>;
  heroImages: Record<string, AboutImageTransform>;
};

export type AboutImageSelection = {
  kind: AboutImageKind;
  targetId: string;
  defaultTransform: AboutImageTransform;
  label?: string;
  /** Displayed image source (satisfies BaseImageSelection). */
  defaultImageSrc: string;
  defaultImageAlt: string;
  /** Short path shown in the panel source row. */
  defaultSourceName: string;
  imageSrc?: string;
  imageAlt?: string;
  previewAspectRatio?: string;
  /** Existing asset path relative to project root (null if not yet on disk). */
  assetRelativePath?: string | null;
};

/** Source-override (uploaded image awaiting a save). */
export type AboutImageSourceOverride = {
  src: string;
  alt: string;
  file: File;
  objectUrl: string;
  browserFileName: string;
  assetDisplayPath: string;
  pendingSave: boolean;
};

export type AboutImageSourceOverrides = Record<
  string,
  AboutImageSourceOverride
>;

export const EMPTY_ABOUT_IMAGE_SOURCE_OVERRIDES: AboutImageSourceOverrides = {};

export interface AboutImageDevEditor {
  isEnabled: boolean;
  selectedTarget: AboutImageSelection | null;
  notice: string | null;
  exportText: string;
  fileInputId: string;
  isSaved: boolean;
  getTransform: (selection: AboutImageSelection) => AboutImageTransform;
  getImageSource: (selection: AboutImageSelection) => {
    src: string;
    alt: string;
    sourceName: string;
    hasCustomImage: boolean;
    statusLabel: string;
    sourceHelperText: string;
  };
  isSelected: (selection: AboutImageSelection) => boolean;
  isDragging: (selection: AboutImageSelection) => boolean;
  selectTarget: (selection: AboutImageSelection) => void;
  closeEditor: () => void;
  updateTargetTransform: (
    selection: AboutImageSelection,
    transform: AboutImageTransform
  ) => void;
  resetTarget: (selection: AboutImageSelection) => void;
  saveOverrides: () => Promise<void>;
  openImagePicker: () => void;
  clearImageOverride: (selection: AboutImageSelection) => void;
  startDrag: (
    event: React.PointerEvent<HTMLElement>,
    selection: AboutImageSelection,
    transform: AboutImageTransform
  ) => void;
  handleImagePickerChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EMPTY_ABOUT_IMAGE_TRANSFORM_OVERRIDES: AboutImageTransformOverrides =
  {
    founderPortraits: {},
    heroImages: {},
  };

export const normalizeAboutImageTransform = (
  transform?: Partial<AboutImageTransform>
): AboutImageTransform => normalizeImageTransform(transform);

export const areAboutImageTransformsEqual = areImageTransformsEqual;

export const getAboutImageTransformStyle = getImageTransformStyle;

const getOverrideRecordForKind = (
  overrides: AboutImageTransformOverrides,
  kind: AboutImageKind
) =>
  kind === 'founderPortrait'
    ? overrides.founderPortraits
    : overrides.heroImages;

export const setAboutImageOverride = (
  overrides: AboutImageTransformOverrides,
  selection: AboutImageSelection,
  nextTransform: AboutImageTransform
): AboutImageTransformOverrides => {
  const normalizedTransform = normalizeAboutImageTransform(nextTransform);
  const nextRecord = {
    ...getOverrideRecordForKind(overrides, selection.kind),
  };

  if (
    areAboutImageTransformsEqual(
      normalizedTransform,
      selection.defaultTransform
    )
  ) {
    delete nextRecord[selection.targetId];
  } else {
    nextRecord[selection.targetId] = normalizedTransform;
  }

  return selection.kind === 'founderPortrait'
    ? { ...overrides, founderPortraits: nextRecord }
    : { ...overrides, heroImages: nextRecord };
};

export const clearAboutImageOverride = (
  overrides: AboutImageTransformOverrides,
  selection: AboutImageSelection
): AboutImageTransformOverrides => {
  const nextRecord = {
    ...getOverrideRecordForKind(overrides, selection.kind),
  };

  if (!nextRecord[selection.targetId]) {
    return overrides;
  }

  delete nextRecord[selection.targetId];

  return selection.kind === 'founderPortrait'
    ? { ...overrides, founderPortraits: nextRecord }
    : { ...overrides, heroImages: nextRecord };
};

const parseTransformRecord = (
  record: unknown
): Record<string, AboutImageTransform> => {
  if (!record || typeof record !== 'object' || Array.isArray(record)) {
    throw new Error('Invalid transform record');
  }

  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => {
      if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new Error(`Invalid transform value for ${key}`);
      }

      return [
        key,
        normalizeAboutImageTransform(value as Partial<AboutImageTransform>),
      ];
    })
  );
};

export const parseStoredAboutImageOverrides = (
  rawValue: string | null
): AboutImageTransformOverrides => {
  if (!rawValue) {
    return EMPTY_ABOUT_IMAGE_TRANSFORM_OVERRIDES;
  }

  try {
    const parsed = JSON.parse(
      rawValue
    ) as Partial<AboutImageTransformOverrides>;

    return {
      founderPortraits: parseTransformRecord(parsed.founderPortraits ?? {}),
      heroImages: parseTransformRecord(parsed.heroImages ?? {}),
    };
  } catch {
    return EMPTY_ABOUT_IMAGE_TRANSFORM_OVERRIDES;
  }
};

export const buildAboutTransformExportText = (
  entries: Array<{ kind: AboutImageKind; label: string; targetId: string }>,
  overrides: AboutImageTransformOverrides
) => {
  const lines = entries.flatMap((entry) => {
    const transform = getOverrideRecordForKind(overrides, entry.kind)[
      entry.targetId
    ];

    if (!transform) {
      return [];
    }

    return [
      [
        '  {',
        `    kind: ${JSON.stringify(entry.kind)},`,
        `    label: ${JSON.stringify(entry.label)},`,
        `    targetId: ${JSON.stringify(entry.targetId)},`,
        `    transform: { xPercent: ${formatTransformNumber(
          transform.xPercent
        )}, yPercent: ${formatTransformNumber(
          transform.yPercent
        )}, scale: ${formatTransformNumber(transform.scale)} },`,
        '  },',
      ].join('\n'),
    ];
  });

  if (lines.length === 0) {
    return '[]';
  }

  return `[\n${lines.join('\n')}\n]`;
};

// ---------------------------------------------------------------------------
// Asset-target helpers (used by useAboutImageDevEditor for image uploads)
// ---------------------------------------------------------------------------

const slugifyFilePart = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');

const toImportIdentifier = (assetFileName: string): string => {
  const baseName = assetFileName.replace(/\.[a-z0-9]+$/i, '');
  return baseName
    .split(/[^a-z0-9]+/i)
    .filter(Boolean)
    .map((segment, index) =>
      index === 0
        ? segment.toLowerCase()
        : segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase()
    )
    .join('');
};

export type AboutCanonicalAssetTarget = {
  assetRelativePath: string;
  assetDisplayPath: string;
  assetImportPath: string;
  assetFileName: string;
  importIdentifier: string;
};

/**
 * Build the canonical on-disk asset paths for a given selection.
 * Used to populate FormData metadata when uploading a new image.
 */
export const buildAboutAssetTarget = (
  selection: AboutImageSelection,
  file: File
): AboutCanonicalAssetTarget => {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
  const assetRelativePath =
    selection.assetRelativePath ??
    `src/assets/marketing/about/${slugifyFilePart(selection.targetId)}.${ext}`;
  const assetFileName =
    assetRelativePath.split('/').filter(Boolean).pop() ?? file.name;

  return {
    assetRelativePath,
    assetDisplayPath: assetRelativePath,
    assetImportPath: assetRelativePath.replace(/^src\/assets/, '@assets'),
    assetFileName,
    importIdentifier: toImportIdentifier(assetFileName),
  };
};
