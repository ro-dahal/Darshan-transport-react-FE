import React, { useEffect, useRef, useState } from 'react';
import type { ImageTransform } from '../shared/dev-image-editor/imageTransformUtils';
import { normalizeImageTransform } from '../shared/dev-image-editor/imageTransformUtils';
import {
  DEV_TEAM_IMAGE_EDITOR_STORAGE_KEY,
  EMPTY_TEAM_IMAGE_SOURCE_OVERRIDES,
  EMPTY_TEAM_IMAGE_TRANSFORM_OVERRIDES,
  buildCanonicalTeamAssetTarget,
  buildHeaderTransformExportText,
  buildMemberTransformExportText,
  buildTeamImageSavePayload,
  buildTeamImageSourceOverride,
  getTeamSourceRecordForKind,
  getTeamTransformRecordForKind,
  parseStoredTeamImageOverrides,
  setTeamImageOverride,
  type TeamDepartment,
  type TeamImageSelection,
  type TeamImageSourceOverride,
  type TeamImageSourceOverrides,
  type TeamImageTransformOverrides,
} from './teamImageEditorUtils';

const IS_DEV_TEAM_IMAGE_EDITOR_ENABLED = import.meta.env.DEV;
const DEV_TEAM_IMAGE_SAVE_ENDPOINT = '/__dev/team-image-editor/save';

type ActiveDragState = {
  selection: TeamImageSelection;
  pointerStartX: number;
  pointerStartY: number;
  width: number;
  height: number;
  startingTransform: ImageTransform;
};

type TeamResolvedImageSource = {
  src: string;
  alt: string;
  sourceName: string;
  hasCustomImage: boolean;
  statusLabel: string;
  sourceHelperText: string;
};

export interface TeamImageDevEditor {
  isEnabled: boolean;
  selectedTarget: TeamImageSelection | null;
  notice: string | null;
  portraitExportText: string;
  headerExportText: string;
  imagePickerInputRef: React.RefObject<HTMLInputElement | null>;
  getTransform: (selection: TeamImageSelection) => ImageTransform;
  getImageSource: (selection: TeamImageSelection) => TeamResolvedImageSource;
  isSelected: (selection: TeamImageSelection) => boolean;
  isDragging: (selection: TeamImageSelection) => boolean;
  selectTarget: (selection: TeamImageSelection) => void;
  closeSelection: () => void;
  updateTargetTransform: (
    selection: TeamImageSelection,
    nextTransform: ImageTransform
  ) => void;
  resetTarget: (selection: TeamImageSelection) => void;
  saveOverrides: () => Promise<void>;
  isTargetSaved: (selection: TeamImageSelection) => boolean;
  copyPortraitExport: () => void;
  copyHeaderExport: () => void;
  openImagePicker: () => void;
  clearImageOverride: (selection: TeamImageSelection) => void;
  startDrag: (
    event: React.PointerEvent<HTMLElement>,
    selection: TeamImageSelection,
    transform: ImageTransform
  ) => void;
  handleImagePickerChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const revokeImageOverride = (
  override: TeamImageSourceOverride | undefined,
  previewObjectUrls: Set<string>
) => {
  if (!override?.objectUrl) {
    return;
  }

  URL.revokeObjectURL(override.objectUrl);
  previewObjectUrls.delete(override.objectUrl);
};

export const useTeamImageDevEditor = (
  departments: TeamDepartment[]
): TeamImageDevEditor | undefined => {
  const [currentOverrides, setCurrentOverrides] =
    useState<TeamImageTransformOverrides>(EMPTY_TEAM_IMAGE_TRANSFORM_OVERRIDES);
  const [currentImageOverrides, setCurrentImageOverrides] =
    useState<TeamImageSourceOverrides>(EMPTY_TEAM_IMAGE_SOURCE_OVERRIDES);
  const [savedOverrides, setSavedOverrides] =
    useState<TeamImageTransformOverrides>(EMPTY_TEAM_IMAGE_TRANSFORM_OVERRIDES);
  const [selectedTarget, setSelectedTarget] =
    useState<TeamImageSelection | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [activeDragState, setActiveDragState] =
    useState<ActiveDragState | null>(null);
  const imagePickerInputRef = useRef<HTMLInputElement | null>(null);
  const previewObjectUrlsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!IS_DEV_TEAM_IMAGE_EDITOR_ENABLED) {
      return;
    }

    const storedOverrides = parseStoredTeamImageOverrides(
      window.localStorage.getItem(DEV_TEAM_IMAGE_EDITOR_STORAGE_KEY)
    );

    setCurrentOverrides(storedOverrides);
    setSavedOverrides(storedOverrides);
  }, []);

  useEffect(() => {
    if (!activeDragState) {
      return;
    }

    const previousUserSelect = document.body.style.userSelect;
    const previousCursor = document.body.style.cursor;
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'grabbing';

    const handlePointerMove = (event: PointerEvent) => {
      const deltaX = event.clientX - activeDragState.pointerStartX;
      const deltaY = event.clientY - activeDragState.pointerStartY;

      setCurrentOverrides((previousOverrides) =>
        setTeamImageOverride(previousOverrides, activeDragState.selection, {
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

    const stopDragging = () => {
      setActiveDragState(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', stopDragging);

    return () => {
      document.body.style.userSelect = previousUserSelect;
      document.body.style.cursor = previousCursor;
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', stopDragging);
    };
  }, [activeDragState]);

  useEffect(
    () => () => {
      previewObjectUrlsRef.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      previewObjectUrlsRef.current.clear();
    },
    []
  );

  const portraitExportText = buildMemberTransformExportText(
    departments,
    currentOverrides
  );
  const headerExportText = buildHeaderTransformExportText(
    departments,
    currentOverrides
  );

  const writeOverridesToStorage = (
    nextOverrides: TeamImageTransformOverrides
  ) => {
    if (!IS_DEV_TEAM_IMAGE_EDITOR_ENABLED) {
      return;
    }

    window.localStorage.setItem(
      DEV_TEAM_IMAGE_EDITOR_STORAGE_KEY,
      JSON.stringify(nextOverrides)
    );
  };

  const copyTextToClipboard = async (text: string, successMessage: string) => {
    try {
      await window.navigator.clipboard.writeText(text);
      setNotice(successMessage);
    } catch {
      setNotice(
        'Clipboard access failed. You can still copy from the export boxes.'
      );
    }
  };

  const getTransform = (selection: TeamImageSelection) =>
    normalizeImageTransform(
      getTeamTransformRecordForKind(currentOverrides, selection.kind)[
        selection.targetId
      ] ?? selection.defaultTransform
    );

  const getImageSource = (
    selection: TeamImageSelection
  ): TeamResolvedImageSource => {
    const imageOverride = getTeamSourceRecordForKind(
      currentImageOverrides,
      selection.kind
    )[selection.targetId];
    const canonicalTarget = buildCanonicalTeamAssetTarget(selection);

    if (imageOverride) {
      return {
        src: imageOverride.src,
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
      sourceName: canonicalTarget.assetDisplayPath,
      hasCustomImage: false,
      statusLabel: 'Code Asset',
      sourceHelperText: 'Source from code',
    };
  };

  const handleClearImageOverride = (selection: TeamImageSelection) => {
    const existingOverride = getTeamSourceRecordForKind(
      currentImageOverrides,
      selection.kind
    )[selection.targetId];

    revokeImageOverride(existingOverride, previewObjectUrlsRef.current);

    setCurrentImageOverrides((previousOverrides) => {
      const currentRecord = {
        ...getTeamSourceRecordForKind(previousOverrides, selection.kind),
      };

      if (!currentRecord[selection.targetId]) {
        return previousOverrides;
      }

      delete currentRecord[selection.targetId];

      return selection.kind === 'memberPortrait'
        ? { ...previousOverrides, memberPortraits: currentRecord }
        : { ...previousOverrides, departmentHeaders: currentRecord };
    });
    setNotice('Cleared the pending uploaded image for this target.');
  };

  const handleImagePickerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file || !selectedTarget) {
      event.target.value = '';
      return;
    }

    const existingOverride = getTeamSourceRecordForKind(
      currentImageOverrides,
      selectedTarget.kind
    )[selectedTarget.targetId];
    const canonicalTarget = buildCanonicalTeamAssetTarget(selectedTarget);
    const objectUrl = URL.createObjectURL(file);
    previewObjectUrlsRef.current.add(objectUrl);
    revokeImageOverride(existingOverride, previewObjectUrlsRef.current);

    setCurrentImageOverrides((previousOverrides) => {
      const currentRecord = {
        ...getTeamSourceRecordForKind(previousOverrides, selectedTarget.kind),
      };

      currentRecord[selectedTarget.targetId] = {
        ...buildTeamImageSourceOverride(selectedTarget, file, objectUrl),
        src: objectUrl,
        objectUrl,
      };

      return selectedTarget.kind === 'memberPortrait'
        ? { ...previousOverrides, memberPortraits: currentRecord }
        : { ...previousOverrides, departmentHeaders: currentRecord };
    });

    setNotice(
      `Loaded ${file.name}. Save will write it to ${canonicalTarget.assetDisplayPath}.`
    );
    event.target.value = '';
  };

  const savePendingImageOverride = async (
    selection: TeamImageSelection,
    imageOverride: TeamImageSourceOverride
  ) => {
    const formData = new FormData();
    formData.append(
      'metadata',
      JSON.stringify(buildTeamImageSavePayload(selection))
    );
    formData.append('file', imageOverride.file, imageOverride.file.name);

    const response = await fetch(DEV_TEAM_IMAGE_SAVE_ENDPOINT, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      let message = `Team image save failed with status ${response.status}`;

      try {
        const errorResponse = (await response.json()) as { message?: string };

        if (errorResponse.message) {
          message = errorResponse.message;
        }
      } catch {
        // Ignore JSON parse failures and fall back to the generic message.
      }

      throw new Error(message);
    }
  };

  if (!IS_DEV_TEAM_IMAGE_EDITOR_ENABLED) {
    return undefined;
  }

  return {
    isEnabled: true,
    selectedTarget,
    notice,
    portraitExportText,
    headerExportText,
    imagePickerInputRef,
    getTransform,
    getImageSource,
    isSelected: (selection) =>
      selectedTarget?.kind === selection.kind &&
      selectedTarget.targetId === selection.targetId,
    isDragging: (selection) =>
      activeDragState?.selection.kind === selection.kind &&
      activeDragState.selection.targetId === selection.targetId,
    selectTarget: (selection) => {
      setSelectedTarget(selection);
      setNotice(null);
    },
    closeSelection: () => {
      setSelectedTarget(null);
      setActiveDragState(null);
      setNotice(null);
    },
    updateTargetTransform: (selection, nextTransform) => {
      setCurrentOverrides((previousOverrides) =>
        setTeamImageOverride(previousOverrides, selection, nextTransform)
      );
      setSelectedTarget(selection);
    },
    resetTarget: (selection) => {
      setCurrentOverrides((previousOverrides) =>
        setTeamImageOverride(
          previousOverrides,
          selection,
          selection.defaultTransform
        )
      );
      setNotice('Reset to the code-defined default transform.');
    },
    saveOverrides: async () => {
      writeOverridesToStorage(currentOverrides);
      setSavedOverrides(currentOverrides);
      const pendingImageOverride = selectedTarget
        ? getTeamSourceRecordForKind(
            currentImageOverrides,
            selectedTarget.kind
          )[selectedTarget.targetId]
        : undefined;

      if (!selectedTarget || !pendingImageOverride) {
        setNotice('Saved current Team image overrides locally.');
        return;
      }

      try {
        await savePendingImageOverride(selectedTarget, pendingImageOverride);
        setNotice(
          `Saved overrides and wrote ${pendingImageOverride.assetDisplayPath} into the repo. Reloading...`
        );
        window.setTimeout(() => {
          window.location.reload();
        }, 180);
      } catch (error) {
        setNotice(
          error instanceof Error
            ? error.message
            : 'Saving the Team image asset failed.'
        );
      }
    },
    isTargetSaved: (selection) => {
      const pendingImageOverride = getTeamSourceRecordForKind(
        currentImageOverrides,
        selection.kind
      )[selection.targetId];

      if (pendingImageOverride?.pendingSave) {
        return false;
      }

      const currentTransform = normalizeImageTransform(
        getTeamTransformRecordForKind(currentOverrides, selection.kind)[
          selection.targetId
        ] ?? selection.defaultTransform
      );
      const savedTransform = normalizeImageTransform(
        getTeamTransformRecordForKind(savedOverrides, selection.kind)[
          selection.targetId
        ] ?? selection.defaultTransform
      );

      return (
        currentTransform.xPercent === savedTransform.xPercent &&
        currentTransform.yPercent === savedTransform.yPercent &&
        currentTransform.scale === savedTransform.scale
      );
    },
    copyPortraitExport: () => {
      void copyTextToClipboard(
        portraitExportText,
        'Copied portrait transform export.'
      );
    },
    copyHeaderExport: () => {
      void copyTextToClipboard(
        headerExportText,
        'Copied header transform export.'
      );
    },
    openImagePicker: () => {
      const input = imagePickerInputRef.current;
      const showPicker = input as HTMLInputElement & {
        showPicker?: () => void;
      };

      if (typeof showPicker.showPicker === 'function') {
        showPicker.showPicker();
        return;
      }

      input?.click();
    },
    clearImageOverride: handleClearImageOverride,
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
};
