/**
 * Shared utilities for the dev image editor Vite plugins.
 *
 * This module is imported by `teamImageEditorDevServer.ts` and
 * `aboutImageEditorDevServer.ts` so that sharp optimisation logic lives
 * in one place.  It must only use Node built-ins + sharp — no Vite or
 * browser APIs.
 */

import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SharpOutputFormat = 'jpeg' | 'png' | 'webp';

export type ImageDimensions = {
  width: number;
  height: number;
};

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Maximum long-edge pixel size for any uploaded image. */
export const MAX_IMAGE_DIMENSION = 1600;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Convert a Node `IncomingMessage`-style headers object into a plain
 * `Record<string, string>` so it can be passed to `new Headers()`.
 */
export const toRequestHeaders = (
  headers: Record<string, string | string[] | undefined>
): Record<string, string> =>
  Object.fromEntries(
    Object.entries(headers).flatMap(([key, value]) => {
      if (typeof value === 'string') return [[key, value]];
      if (Array.isArray(value)) return [[key, value.join(', ')]];
      return [];
    })
  );

/**
 * Ensure that a resolved asset path is inside `<projectRoot>/src/assets/`
 * to prevent path-traversal writes.
 *
 * @returns The resolved absolute path.
 * @throws  If the path would escape `src/assets/`.
 */
export const ensureAssetPathIsSafe = (
  projectRoot: string,
  assetRelativePath: string
): string => {
  const absoluteAssetPath = path.resolve(projectRoot, assetRelativePath);
  const absoluteAssetRoot = path.resolve(projectRoot, 'src/assets');

  if (!absoluteAssetPath.startsWith(absoluteAssetRoot + path.sep)) {
    throw new Error(
      `Refusing to write outside src/assets: ${assetRelativePath}`
    );
  }

  return absoluteAssetPath;
};

/**
 * Read sharp metadata for a `File` object (validates it is a real image).
 */
export const readImageMetadata = async (
  file: File
): Promise<ImageDimensions> => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const metadata = await sharp(buffer).rotate().metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error('Unable to determine uploaded image dimensions');
  }

  return { width: metadata.width, height: metadata.height };
};

/**
 * Write an image file after running it through the sharp optimisation
 * pipeline.
 *
 * Processing steps:
 *  1. Auto-rotate based on EXIF orientation
 *  2. Resize so the longest edge is at most `MAX_IMAGE_DIMENSION` px
 *  3. Apply format-specific quality settings
 *
 * The output directory is created recursively if it does not exist.
 */
export const writeOptimizedImageFile = async (
  file: File,
  assetAbsolutePath: string,
  outputFormat: SharpOutputFormat
): Promise<void> => {
  const imageBuffer = Buffer.from(await file.arrayBuffer());
  const outputDirectory = path.dirname(assetAbsolutePath);
  await mkdir(outputDirectory, { recursive: true });

  const pipeline = sharp(imageBuffer)
    .rotate()
    .resize(MAX_IMAGE_DIMENSION, MAX_IMAGE_DIMENSION, {
      fit: 'inside',
      withoutEnlargement: true,
    });

  switch (outputFormat) {
    case 'jpeg':
      await pipeline
        .jpeg({ quality: 92, mozjpeg: true })
        .toFile(assetAbsolutePath);
      return;
    case 'png':
      await pipeline.png({ compressionLevel: 9 }).toFile(assetAbsolutePath);
      return;
    case 'webp':
      await pipeline
        .webp({ quality: 96, effort: 6, smartSubsample: true })
        .toFile(assetAbsolutePath);
      return;
    default: {
      const exhaustive: never = outputFormat;
      throw new Error(`Unsupported output format: ${exhaustive}`);
    }
  }
};

/**
 * Infer the sharp output format from a file extension.
 */
export const getSharpOutputFormatForAssetPath = (
  assetRelativePath: string
): SharpOutputFormat => {
  const normalized = assetRelativePath.toLowerCase();
  if (normalized.endsWith('.webp')) return 'webp';
  if (normalized.endsWith('.png')) return 'png';
  return 'jpeg';
};
