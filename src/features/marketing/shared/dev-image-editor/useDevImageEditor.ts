import React, { useEffect, useRef, useState } from 'react';
import {
  normalizeImageTransform,
  type ImageTransform,
} from './imageTransformUtils';

// ---------------------------------------------------------------------------
// Types exposed to callers
// ---------------------------------------------------------------------------

export type DevImageSourceOverride = {
  src: string;
  alt: string;
  file: File;
  objectUrl: string;
  browserFileName: string;
  assetDisplayPath: string;
  pendingSave: boolean;
};

export type DevImageResolvedSource = {
  src: string;
  alt: string;
  sourceName: string;
  hasCustomImage: boolean;
  statusLabel: string;
  sourceHelperText: string;
};

/**
 * Minimum shape every selection object must satisfy.
 *
 * Consumers can extend this with additional domain-specific fields.
 */
export type BaseImageSelection = {
  targetId: string;
  defaultTransform: ImageTransform;
  /** Used for the image preview in the panel. */
  defaultImageSrc: string;
  defaultImageAlt: string;
  /** Displayed in the source row of the panel. */
  defaultSourceName: string;
  previewAspectRatio?: string;
};

/** Minimal shape of the transform-override store. */
export type BaseTransformOverrides = object;

/**
 * Configuration object passed to `useDevImageEditor`.
 *
 * @template TSelection  Domain-specific selection (must extend BaseImageSelection)
 * @template TOverrides  Domain-specific override store
 */
export type DevImageEditorConfig<
  TSelection extends BaseImageSelection,
  TOverrides extends BaseTransformOverrides,
> = {
  /** localStorage key for persisting transform overrides. */
  storageKey: string;

  /** POST endpoint that accepts a JSON body `{ targetId, transform }`. */
  saveEndpoint: string;

  /**
   * Optional POST endpoint that accepts FormData `{ metadata, file }`.
   * When absent, the "Pick Image" button is hidden.
   */
  uploadEndpoint?: string;

  /** Build the JSON save payload for the current selection & transform. */
  buildSavePayload: (
    selection: TSelection,
    transform: ImageTransform
  ) => Record<string, unknown>;

  /**
   * Build the FormData metadata blob when uploading a new image.
   * Only called when `uploadEndpoint` is provided.
   */
  buildUploadMetadata?: (
    selection: TSelection,
    transform: ImageTransform,
    file: File
  ) => Record<string, unknown>;

  /** The display path shown in the panel for a pending upload. */
  buildUploadAssetDisplayPath?: (selection: TSelection, file: File) => string;

  /** Parse a raw localStorage string back into `TOverrides`. */
  parseStoredOverrides: (raw: string | null) => TOverrides;

  /** Retrieve the transform for a selection from the override store. */
  getTransform: (
    overrides: TOverrides,
    selection: TSelection
  ) => ImageTransform | undefined;

  /** Return a new overrides object with the transform for a selection set. */
  setOverride: (
    overrides: TOverrides,
    selection: TSelection,
    transform: ImageTransform
  ) => TOverrides;

  /** Return a new overrides object with the override for a selection removed. */
  clearOverride: (overrides: TOverrides, selection: TSelection) => TOverrides;

  /** Compute the export copy text from the current overrides. */
  buildExportText: (overrides: TOverrides) => string;

  /** Empty/initial overrides value used on first render. */
  emptyOverrides: TOverrides;
};

// ---------------------------------------------------------------------------
// Public hook interface
// ---------------------------------------------------------------------------

export type DevImageEditorState<TSelection extends BaseImageSelection> = {
  isEnabled: boolean;
  selectedTarget: TSelection | null;
  notice: string | null;
  exportText: string;
  fileInputId: string;
  isSaved: boolean;
  getTransform: (selection: TSelection) => ImageTransform;
  getImageSource: (selection: TSelection) => DevImageResolvedSource;
  isSelected: (selection: TSelection) => boolean;
  isDragging: (selection: TSelection) => boolean;
  selectTarget: (selection: TSelection) => void;
  closeEditor: () => void;
  updateTargetTransform: (selection: TSelection, next: ImageTransform) => void;
  resetTarget: (selection: TSelection) => void;
  saveOverrides: () => Promise<void>;
  openImagePicker: () => void;
  clearImageOverride: (selection: TSelection) => void;
  startDrag: (
    event: React.PointerEvent<HTMLElement>,
    selection: TSelection,
    transform: ImageTransform
  ) => void;
  handleImagePickerChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

// ---------------------------------------------------------------------------
// Internal drag state
// ---------------------------------------------------------------------------

type ActiveDragState<TSelection> = {
  selection: TSelection;
  pointerStartX: number;
  pointerStartY: number;
  width: number;
  height: number;
  startingTransform: ImageTransform;
};

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

const IS_DEV = import.meta.env.DEV;

let nextEditorId = 0;

export function useDevImageEditor<
  TSelection extends BaseImageSelection,
  TOverrides extends BaseTransformOverrides,
>(
  config: DevImageEditorConfig<TSelection, TOverrides>
): DevImageEditorState<TSelection> | undefined {
  const {
    storageKey,
    saveEndpoint,
    uploadEndpoint,
    buildSavePayload,
    buildUploadMetadata,
    buildUploadAssetDisplayPath,
    parseStoredOverrides,
    getTransform: getOverrideTransform,
    setOverride,
    clearOverride,
    buildExportText,
    emptyOverrides,
  } = config;

  // Stable file-input id so the label stays linked across re-renders.
  const fileInputIdRef = useRef<string | null>(null);
  if (!fileInputIdRef.current) {
    fileInputIdRef.current = `dev-image-picker-${nextEditorId++}`;
  }
  const fileInputId = fileInputIdRef.current;

  const imagePickerRef = useRef<HTMLInputElement | null>(null);
  const previewObjectUrlsRef = useRef<Set<string>>(new Set());

  const [currentOverrides, setCurrentOverrides] =
    useState<TOverrides>(emptyOverrides);
  const [savedOverrides, setSavedOverrides] =
    useState<TOverrides>(emptyOverrides);
  const [imageOverrides, setImageOverrides] = useState<
    Record<string, DevImageSourceOverride>
  >({});
  const [selectedTarget, setSelectedTarget] = useState<TSelection | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [activeDragState, setActiveDragState] =
    useState<ActiveDragState<TSelection> | null>(null);

  // Hydrate from localStorage on mount.
  useEffect(() => {
    if (!IS_DEV) return;
    const stored = parseStoredOverrides(
      window.localStorage.getItem(storageKey)
    );
    setCurrentOverrides(stored);
    setSavedOverrides(stored);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Revoke ObjectURLs on unmount.
  useEffect(
    () => () => {
      previewObjectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      previewObjectUrlsRef.current.clear();
    },
    []
  );

  // Global pointer events while dragging.
  useEffect(() => {
    if (!activeDragState) return;

    const previousUserSelect = document.body.style.userSelect;
    const previousCursor = document.body.style.cursor;
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'grabbing';

    const handlePointerMove = (event: PointerEvent) => {
      const deltaX = event.clientX - activeDragState.pointerStartX;
      const deltaY = event.clientY - activeDragState.pointerStartY;

      setCurrentOverrides((prev) =>
        setOverride(prev, activeDragState.selection, {
          xPercent:
            activeDragState.startingTransform.xPercent +
            (deltaX / activeDragState.width) * 100,
          yPercent:
            activeDragState.startingTransform.yPercent +
            (deltaY / activeDragState.height) * 100,
          scale: activeDragState.startingTransform.scale,
        })
      );
    };

    const stopDragging = () => setActiveDragState(null);

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', stopDragging);

    return () => {
      document.body.style.userSelect = previousUserSelect;
      document.body.style.cursor = previousCursor;
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', stopDragging);
    };
  }, [activeDragState, setOverride]);

  if (!IS_DEV) {
    return undefined;
  }

  const resolveTransform = (selection: TSelection): ImageTransform =>
    normalizeImageTransform(
      getOverrideTransform(currentOverrides, selection) ??
        selection.defaultTransform
    );

  const isSaved = selectedTarget
    ? (() => {
        const imageOverride = imageOverrides[selectedTarget.targetId];
        if (imageOverride?.pendingSave) return false;

        const cur = normalizeImageTransform(
          getOverrideTransform(currentOverrides, selectedTarget) ??
            selectedTarget.defaultTransform
        );
        const saved = normalizeImageTransform(
          getOverrideTransform(savedOverrides, selectedTarget) ??
            selectedTarget.defaultTransform
        );
        return (
          cur.xPercent === saved.xPercent &&
          cur.yPercent === saved.yPercent &&
          cur.scale === saved.scale
        );
      })()
    : true;

  const writeToStorage = (next: TOverrides) => {
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const persistSaved = (next: TOverrides) => {
    writeToStorage(next);
    setCurrentOverrides(next);
    setSavedOverrides(next);
  };

  const revokeImageOverride = (targetId: string) => {
    const override = imageOverrides[targetId];
    if (!override?.objectUrl) return;
    URL.revokeObjectURL(override.objectUrl);
    previewObjectUrlsRef.current.delete(override.objectUrl);
  };

  const getImageSource = (selection: TSelection): DevImageResolvedSource => {
    const imageOverride = imageOverrides[selection.targetId];

    if (imageOverride) {
      return {
        src: imageOverride.objectUrl,
        alt: imageOverride.alt,
        sourceName: `${imageOverride.assetDisplayPath} (pending save)`,
        hasCustomImage: true,
        statusLabel: 'Pending Save',
        sourceHelperText:
          'Save writes this uploaded image into the repo asset path shown above.',
      };
    }

    return {
      src: selection.defaultImageSrc,
      alt: selection.defaultImageAlt,
      sourceName: selection.defaultSourceName,
      hasCustomImage: false,
      statusLabel: 'Code Asset',
      sourceHelperText: 'Source from code',
    };
  };

  const handleImagePickerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file || !selectedTarget) {
      event.target.value = '';
      return;
    }

    revokeImageOverride(selectedTarget.targetId);

    const objectUrl = URL.createObjectURL(file);
    previewObjectUrlsRef.current.add(objectUrl);

    const assetDisplayPath = buildUploadAssetDisplayPath
      ? buildUploadAssetDisplayPath(selectedTarget, file)
      : file.name;

    setImageOverrides((prev) => ({
      ...prev,
      [selectedTarget.targetId]: {
        src: objectUrl,
        alt: selectedTarget.defaultImageAlt,
        file,
        objectUrl,
        browserFileName: file.name,
        assetDisplayPath,
        pendingSave: true,
      },
    }));

    setNotice(
      `Loaded ${file.name}. Save will write it to ${assetDisplayPath}.`
    );
    event.target.value = '';
  };

  const saveOverrides = async () => {
    if (!selectedTarget) return;

    const imageOverride = imageOverrides[selectedTarget.targetId];
    const currentTransform = resolveTransform(selectedTarget);

    try {
      if (imageOverride && uploadEndpoint) {
        const metadata = buildUploadMetadata
          ? buildUploadMetadata(
              selectedTarget,
              currentTransform,
              imageOverride.file
            )
          : buildSavePayload(selectedTarget, currentTransform);

        const formData = new FormData();
        formData.append('metadata', JSON.stringify(metadata));
        formData.append('file', imageOverride.file, imageOverride.file.name);

        const response = await fetch(uploadEndpoint, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorResponse = (await response.json().catch(() => ({}))) as {
            message?: string;
          };
          throw new Error(
            errorResponse.message ??
              `Upload failed with status ${response.status}`
          );
        }
      } else {
        const response = await fetch(saveEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            buildSavePayload(selectedTarget, currentTransform)
          ),
        });

        if (!response.ok) {
          const errorResponse = (await response.json().catch(() => ({}))) as {
            message?: string;
          };
          throw new Error(
            errorResponse.message ??
              `Save failed with status ${response.status}`
          );
        }
      }

      const nextOverrides = clearOverride(currentOverrides, selectedTarget);
      persistSaved(nextOverrides);

      setImageOverrides((prev) => {
        const next = { ...prev };
        if (next[selectedTarget.targetId]) {
          revokeImageOverride(selectedTarget.targetId);
          delete next[selectedTarget.targetId];
        }
        return next;
      });

      setNotice(
        imageOverride
          ? `Saved transform and wrote ${imageOverride.assetDisplayPath} into the repo. Reloading...`
          : 'Saved the image transform into the codebase. Reloading...'
      );
      window.setTimeout(() => window.location.reload(), 180);
    } catch (error) {
      setNotice(
        error instanceof Error ? error.message : 'Saving the image failed.'
      );
    }
  };

  return {
    isEnabled: true,
    selectedTarget,
    notice,
    exportText: buildExportText(currentOverrides),
    fileInputId,
    isSaved,
    getTransform: resolveTransform,
    getImageSource,
    isSelected: (selection) => selectedTarget?.targetId === selection.targetId,
    isDragging: (selection) =>
      activeDragState?.selection.targetId === selection.targetId,
    selectTarget: (selection) => {
      setSelectedTarget(selection);
      setNotice(null);
    },
    closeEditor: () => {
      setSelectedTarget(null);
      setActiveDragState(null);
      setNotice(null);
    },
    updateTargetTransform: (selection, next) => {
      setCurrentOverrides((prev) => setOverride(prev, selection, next));
      setSelectedTarget(selection);
    },
    resetTarget: (selection) => {
      setCurrentOverrides((prev) =>
        setOverride(prev, selection, selection.defaultTransform)
      );
      setNotice('Reset to the code-defined default transform.');
    },
    saveOverrides,
    openImagePicker: () => {
      // Try the element found by id first (portal renders may differ from ref).
      const el =
        (document.getElementById(fileInputId) as HTMLInputElement | null) ??
        imagePickerRef.current;
      el?.click();
    },
    clearImageOverride: (selection) => {
      revokeImageOverride(selection.targetId);
      setImageOverrides((prev) => {
        const next = { ...prev };
        delete next[selection.targetId];
        return next;
      });
      setNotice('Cleared the pending uploaded image for this target.');
    },
    startDrag: (event, selection, transform) => {
      const bounds = event.currentTarget.getBoundingClientRect();
      setSelectedTarget(selection);
      setActiveDragState({
        selection,
        pointerStartX: event.clientX,
        pointerStartY: event.clientY,
        width: Math.max(bounds.width, 1),
        height: Math.max(bounds.height, 1),
        startingTransform: transform,
      });
    },
    handleImagePickerChange,
  };
}
