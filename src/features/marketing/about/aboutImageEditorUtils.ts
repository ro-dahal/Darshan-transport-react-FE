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
  imageSrc?: string;
  imageAlt?: string;
  previewAspectRatio?: string;
};

export interface AboutImageDevEditor {
  isEnabled: boolean;
  selectedTarget: AboutImageSelection | null;
  getTransform: (selection: AboutImageSelection) => AboutImageTransform;
  isSelected: (selection: AboutImageSelection) => boolean;
  isDragging: (selection: AboutImageSelection) => boolean;
  selectTarget: (selection: AboutImageSelection) => void;
  startDrag: (
    event: React.PointerEvent<HTMLElement>,
    selection: AboutImageSelection,
    transform: AboutImageTransform
  ) => void;
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
