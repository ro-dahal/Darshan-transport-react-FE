import type React from 'react';

export type AboutImageTransform = {
  xPercent: number;
  yPercent: number;
  scale: number;
};

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
  selectTarget: (selection: AboutImageSelection) => void;
  startDrag: (
    event: React.PointerEvent<HTMLElement>,
    selection: AboutImageSelection,
    transform: AboutImageTransform
  ) => void;
}

const DEFAULT_ABOUT_IMAGE_TRANSFORM: AboutImageTransform = {
  xPercent: 0,
  yPercent: 0,
  scale: 1,
};

export const EMPTY_ABOUT_IMAGE_TRANSFORM_OVERRIDES: AboutImageTransformOverrides =
  {
    founderPortraits: {},
    heroImages: {},
  };

const roundTransformValue = (value: number) => Math.round(value * 100) / 100;

const clampAboutImageTransform = (
  transform: AboutImageTransform
): AboutImageTransform => ({
  xPercent: roundTransformValue(
    Math.max(-50, Math.min(50, transform.xPercent))
  ),
  yPercent: roundTransformValue(
    Math.max(-50, Math.min(50, transform.yPercent))
  ),
  scale: roundTransformValue(Math.max(1, Math.min(2.4, transform.scale))),
});

export const normalizeAboutImageTransform = (
  transform?: Partial<AboutImageTransform>
): AboutImageTransform =>
  clampAboutImageTransform({
    xPercent: transform?.xPercent ?? DEFAULT_ABOUT_IMAGE_TRANSFORM.xPercent,
    yPercent: transform?.yPercent ?? DEFAULT_ABOUT_IMAGE_TRANSFORM.yPercent,
    scale: transform?.scale ?? DEFAULT_ABOUT_IMAGE_TRANSFORM.scale,
  });

export const areAboutImageTransformsEqual = (
  left: AboutImageTransform,
  right: AboutImageTransform
) =>
  left.xPercent === right.xPercent &&
  left.yPercent === right.yPercent &&
  left.scale === right.scale;

export const getAboutImageTransformStyle = (
  transform: AboutImageTransform
): React.CSSProperties => ({
  objectPosition: `${50 + transform.xPercent}% ${50 + transform.yPercent}%`,
  transform: `scale(${transform.scale})`,
  transformOrigin: 'center center',
  willChange: 'transform, object-position',
});

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

const formatTransformNumber = (value: number) =>
  Number(roundTransformValue(value).toFixed(2)).toString();

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
