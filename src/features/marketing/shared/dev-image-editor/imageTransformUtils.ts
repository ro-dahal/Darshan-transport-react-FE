import type React from 'react';

export type ImageTransform = {
  xPercent: number;
  yPercent: number;
  scale: number;
};

export const DEFAULT_IMAGE_TRANSFORM: ImageTransform = {
  xPercent: 0,
  yPercent: 0,
  scale: 1,
};

const roundTransformValue = (value: number) => Math.round(value * 100) / 100;

export const formatTransformNumber = (value: number) =>
  Number(roundTransformValue(value).toFixed(2)).toString();

export const clampImageTransform = (
  transform: ImageTransform
): ImageTransform => ({
  xPercent: roundTransformValue(
    Math.max(-50, Math.min(50, transform.xPercent))
  ),
  yPercent: roundTransformValue(
    Math.max(-50, Math.min(50, transform.yPercent))
  ),
  scale: roundTransformValue(Math.max(1, Math.min(2.4, transform.scale))),
});

export const normalizeImageTransform = (
  transform?: Partial<ImageTransform>
): ImageTransform =>
  clampImageTransform({
    xPercent: transform?.xPercent ?? DEFAULT_IMAGE_TRANSFORM.xPercent,
    yPercent: transform?.yPercent ?? DEFAULT_IMAGE_TRANSFORM.yPercent,
    scale: transform?.scale ?? DEFAULT_IMAGE_TRANSFORM.scale,
  });

export const areImageTransformsEqual = (
  left: ImageTransform,
  right: ImageTransform
) =>
  left.xPercent === right.xPercent &&
  left.yPercent === right.yPercent &&
  left.scale === right.scale;

export const getImageTransformStyle = (
  transform: ImageTransform
): React.CSSProperties => ({
  objectPosition: `${50 + transform.xPercent}% ${50 + transform.yPercent}%`,
  // Vendor-prefixed value not present in the DOM lib types; cast via
  // `unknown` to avoid `no-explicit-any` eslint rule.
  imageRendering:
    '-webkit-optimize-contrast' as unknown as React.CSSProperties['imageRendering'],
  ...(transform.scale !== DEFAULT_IMAGE_TRANSFORM.scale
    ? {
        transform: `scale(${transform.scale})`,
        transformOrigin: 'center center',
      }
    : undefined),
});
