import { useDevImageEditor } from '../shared/dev-image-editor/useDevImageEditor';
import type { DevImageEditorState } from '../shared/dev-image-editor/useDevImageEditor';
import {
  buildAboutAssetTarget,
  buildAboutTransformExportText,
  clearAboutImageOverride,
  EMPTY_ABOUT_IMAGE_TRANSFORM_OVERRIDES,
  parseStoredAboutImageOverrides,
  setAboutImageOverride,
  type AboutImageSelection,
  type AboutImageTransformOverrides,
} from './aboutImageEditorUtils';

const DEV_ABOUT_IMAGE_SAVE_ENDPOINT = '/__dev/about-image-editor/save';
const DEV_ABOUT_IMAGE_UPLOAD_ENDPOINT = '/__dev/about-image-editor/upload';
const ABOUT_IMAGE_EDITOR_STORAGE_KEY =
  'darshan-about-page-image-editor-overrides';

export type AboutImageDevEditorState = DevImageEditorState<AboutImageSelection>;

/**
 * Export-entry shape used to generate the text export.
 */
export type AboutExportEntry = {
  kind: AboutImageSelection['kind'];
  label: string;
  targetId: string;
};

/**
 * Full-featured dev image editor hook for the About page, backed by the
 * generic `useDevImageEditor` hook.  Supports:
 *  - Drag-to-pan / scroll-to-zoom transforms
 *  - Image upload with sharp optimisation on the server
 *  - Automatic localStorage persistence
 *  - Transform export text generation
 */
export const useAboutImageDevEditor = (
  exportEntries: AboutExportEntry[]
): AboutImageDevEditorState | undefined => {
  return useDevImageEditor<AboutImageSelection, AboutImageTransformOverrides>({
    storageKey: ABOUT_IMAGE_EDITOR_STORAGE_KEY,
    saveEndpoint: DEV_ABOUT_IMAGE_SAVE_ENDPOINT,
    uploadEndpoint: DEV_ABOUT_IMAGE_UPLOAD_ENDPOINT,

    parseStoredOverrides: parseStoredAboutImageOverrides,
    emptyOverrides: EMPTY_ABOUT_IMAGE_TRANSFORM_OVERRIDES,

    getTransform: (overrides, selection) => {
      const record =
        selection.kind === 'founderPortrait'
          ? overrides.founderPortraits
          : overrides.heroImages;
      return record[selection.targetId];
    },

    setOverride: (overrides, selection, transform) =>
      setAboutImageOverride(overrides, selection, transform),

    clearOverride: (overrides, selection) =>
      clearAboutImageOverride(overrides, selection),

    buildExportText: (overrides) =>
      buildAboutTransformExportText(exportEntries, overrides),

    buildSavePayload: (selection, transform) => ({
      kind: selection.kind,
      targetId: selection.targetId,
      transform,
    }),

    buildUploadMetadata: (selection, transform, file) => {
      const assetTarget = buildAboutAssetTarget(selection, file);

      return {
        kind: selection.kind,
        targetId: selection.targetId,
        importIdentifier: assetTarget.importIdentifier,
        assetImportPath: assetTarget.assetImportPath,
        assetRelativePath: assetTarget.assetRelativePath,
        transform,
      };
    },

    buildUploadAssetDisplayPath: (selection, file) => {
      const assetTarget = buildAboutAssetTarget(selection, file);
      return assetTarget.assetDisplayPath;
    },
  });
};
