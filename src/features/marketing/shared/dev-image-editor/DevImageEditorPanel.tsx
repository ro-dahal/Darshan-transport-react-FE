import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  formatTransformNumber,
  getImageTransformStyle,
  normalizeImageTransform,
  type ImageTransform,
} from './imageTransformUtils';

export interface DevImageEditorExportSection {
  title: string;
  exportText: string;
  onCopy: () => void;
}

interface DevImageEditorPanelProps {
  selectionLabel: string;
  selectionKindLabel: string;
  transform: ImageTransform;
  imageSrc: string;
  imageAlt: string;
  sourceName: string;
  previewAspectRatio?: string;
  hasCustomImage?: boolean;
  customImageLabel?: string;
  sourceHelperText?: string;
  notice: string | null;
  isSaved: boolean;
  exportSections: DevImageEditorExportSection[];
  fileInputId?: string;
  onClose: () => void;
  onReset: () => void;
  onSave: () => void;
  onTransformChange: (nextTransform: ImageTransform) => void;
  onPickImage?: () => void;
  onClearImageOverride?: () => void;
}

const isTextEntryElement = (element: Element | null) =>
  element instanceof HTMLInputElement ||
  element instanceof HTMLTextAreaElement ||
  (element instanceof HTMLElement && element.isContentEditable);

export const DevImageEditorPanel: React.FC<DevImageEditorPanelProps> = ({
  selectionLabel,
  selectionKindLabel,
  transform,
  imageSrc,
  imageAlt,
  sourceName,
  previewAspectRatio = '4 / 5',
  hasCustomImage = false,
  customImageLabel = 'Local Preview',
  sourceHelperText,
  notice,
  isSaved,
  exportSections,
  fileInputId,
  onClose,
  onReset,
  onSave,
  onTransformChange,
  onPickImage,
  onClearImageOverride,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isTextEntryElement(document.activeElement)) {
        return;
      }

      const offsetStep = event.shiftKey ? 5 : 1;
      const zoomStep = event.shiftKey ? 0.1 : 0.05;
      let nextTransform: ImageTransform | null = null;

      switch (event.key) {
        case 'ArrowLeft':
          nextTransform = {
            ...transform,
            xPercent: transform.xPercent - offsetStep,
          };
          break;
        case 'ArrowRight':
          nextTransform = {
            ...transform,
            xPercent: transform.xPercent + offsetStep,
          };
          break;
        case 'ArrowUp':
          nextTransform = {
            ...transform,
            yPercent: transform.yPercent - offsetStep,
          };
          break;
        case 'ArrowDown':
          nextTransform = {
            ...transform,
            yPercent: transform.yPercent + offsetStep,
          };
          break;
        case '+':
        case '=':
          nextTransform = {
            ...transform,
            scale: transform.scale + zoomStep,
          };
          break;
        case '-':
        case '_':
          nextTransform = {
            ...transform,
            scale: transform.scale - zoomStep,
          };
          break;
        case 'Escape':
          event.preventDefault();
          onClose();
          return;
        case 'r':
        case 'R':
          event.preventDefault();
          onReset();
          return;
        default:
          return;
      }

      event.preventDefault();
      onTransformChange(normalizeImageTransform(nextTransform));
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onReset, onTransformChange, transform]);

  if (typeof document === 'undefined') {
    return null;
  }

  const applyTransformPatch = (patch: Partial<ImageTransform>) => {
    onTransformChange(
      normalizeImageTransform({
        ...transform,
        ...patch,
      })
    );
  };

  const handleNumberInput =
    (field: keyof ImageTransform) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = Number(event.target.value);

      if (!Number.isFinite(nextValue)) {
        return;
      }

      applyTransformPatch({ [field]: nextValue });
    };

  return createPortal(
    <div
      onPointerDown={(event) => event.stopPropagation()}
      className="fixed inset-x-4 bottom-4 z-[1105] h-[calc(100vh-6rem)] overflow-hidden rounded-[28px] border border-white/12 bg-[#0b0b0b]/95 text-white shadow-[0_24px_90px_rgba(0,0,0,0.52)] backdrop-blur-xl md:inset-x-auto md:right-5 md:top-20 md:bottom-5 md:w-[390px]"
    >
      <div className="dev-image-editor-scrollbar flex h-full min-h-0 flex-col overflow-y-auto overscroll-contain p-4 pr-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-primary/90">
              Dev Image Editor
            </p>
            <p className="mt-1 text-sm font-semibold leading-snug text-white">
              {selectionLabel}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/12 px-2.5 py-1 text-[0.68rem] font-semibold text-white/70 transition-colors hover:border-white/25 hover:text-white"
          >
            Close
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-primary">
            {selectionKindLabel}
          </span>
          <span
            className={`rounded-full border px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] ${
              isSaved
                ? 'border-emerald-400/20 bg-emerald-400/12 text-emerald-200'
                : 'border-amber-300/20 bg-amber-300/10 text-amber-100'
            }`}
          >
            {isSaved ? 'Saved Locally' : 'Unsaved Changes'}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/68">
            {hasCustomImage ? customImageLabel : 'Code Asset'}
          </span>
        </div>

        <p className="mt-3 text-[0.72rem] leading-relaxed text-white/58">
          Click once to select, then drag the image to reposition it. Use the
          controls below for precise offsets, zoom, and keyboard nudging.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <span className="mb-1.5 block text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/45">
              Frame Preview
            </span>
            <div
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30"
              style={{ aspectRatio: previewAspectRatio }}
            >
              <img
                src={imageSrc}
                alt={imageAlt}
                className="absolute inset-0 h-full w-full object-cover"
                style={getImageTransformStyle(transform)}
              />
            </div>
          </div>
          <div>
            <span className="mb-1.5 block text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/45">
              Full Image
            </span>
            <div
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top,#282828_0%,#101010_85%)]"
              style={{ aspectRatio: previewAspectRatio }}
            >
              <img
                src={imageSrc}
                alt={imageAlt}
                className="h-full w-full object-contain p-2"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/55">
              Image Source
            </span>
            <span className="text-[0.68rem] font-semibold text-primary">
              {sourceHelperText ??
                (hasCustomImage
                  ? 'Temporary preview only'
                  : 'Source from code')}
            </span>
          </div>
          <code className="mt-2 block break-all text-[0.72rem] text-white/76">
            {sourceName || 'Unspecified source'}
          </code>
          {onPickImage || onClearImageOverride ? (
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              {fileInputId ? (
                <label
                  htmlFor={fileInputId}
                  className="cursor-pointer rounded-lg border border-white/10 bg-white/6 px-3 py-2 text-center font-semibold transition-colors hover:bg-white/12"
                >
                  Add Image
                </label>
              ) : (
                <button
                  type="button"
                  onClick={onPickImage}
                  className="rounded-lg border border-white/10 bg-white/6 px-3 py-2 font-semibold transition-colors hover:bg-white/12"
                >
                  Add Image
                </button>
              )}
              <button
                type="button"
                onClick={onClearImageOverride}
                disabled={!hasCustomImage}
                className="rounded-lg border border-white/10 bg-white/6 px-3 py-2 font-semibold transition-colors hover:bg-white/12 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Clear Image
              </button>
            </div>
          ) : null}
        </div>

        <div className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/60">
              Zoom
            </span>
            <input
              type="number"
              min="1"
              max="2.4"
              step="0.01"
              value={formatTransformNumber(transform.scale)}
              onChange={handleNumberInput('scale')}
              className="w-24 rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-right text-[0.78rem] text-white outline-none"
            />
          </div>
          <input
            type="range"
            min="1"
            max="2.4"
            step="0.01"
            value={transform.scale}
            onChange={(event) =>
              applyTransformPatch({ scale: Number(event.target.value) })
            }
            className="w-full accent-primary"
          />

          <div className="grid grid-cols-2 gap-2 text-[0.74rem]">
            <label className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
              <span className="block text-[0.62rem] uppercase tracking-[0.16em] text-white/45">
                X Offset
              </span>
              <input
                type="number"
                step="0.1"
                value={formatTransformNumber(transform.xPercent)}
                onChange={handleNumberInput('xPercent')}
                className="mt-1 w-full bg-transparent font-semibold text-white outline-none"
              />
            </label>
            <label className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
              <span className="block text-[0.62rem] uppercase tracking-[0.16em] text-white/45">
                Y Offset
              </span>
              <input
                type="number"
                step="0.1"
                value={formatTransformNumber(transform.yPercent)}
                onChange={handleNumberInput('yPercent')}
                className="mt-1 w-full bg-transparent font-semibold text-white outline-none"
              />
            </label>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              type="button"
              onClick={() =>
                applyTransformPatch({ xPercent: transform.xPercent - 1 })
              }
              className="rounded-lg border border-white/10 bg-white/6 px-2 py-2 transition-colors hover:bg-white/12"
            >
              Left
            </button>
            <button
              type="button"
              onClick={() =>
                applyTransformPatch({ yPercent: transform.yPercent - 1 })
              }
              className="rounded-lg border border-white/10 bg-white/6 px-2 py-2 transition-colors hover:bg-white/12"
            >
              Up
            </button>
            <button
              type="button"
              onClick={() =>
                applyTransformPatch({ xPercent: transform.xPercent + 1 })
              }
              className="rounded-lg border border-white/10 bg-white/6 px-2 py-2 transition-colors hover:bg-white/12"
            >
              Right
            </button>
            <button
              type="button"
              onClick={() =>
                applyTransformPatch({ yPercent: transform.yPercent + 1 })
              }
              className="col-start-2 rounded-lg border border-white/10 bg-white/6 px-2 py-2 transition-colors hover:bg-white/12"
            >
              Down
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={onReset}
            className="rounded-lg border border-white/10 bg-white/6 px-3 py-2 font-semibold transition-colors hover:bg-white/12"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onSave}
            className="rounded-lg bg-primary px-3 py-2 font-semibold text-[#111] transition-opacity hover:opacity-90"
          >
            Save
          </button>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-[0.72rem] leading-relaxed text-white/68">
          <span className="block font-semibold text-white">
            {isSaved ? 'Saved locally.' : 'Unsaved changes.'}
          </span>
          <span className="mt-1 block">
            {sourceHelperText
              ? `${sourceHelperText} Copy the export blocks below when you want to move the tuned values into the codebase.`
              : 'Local image swaps are temporary dev previews. Copy the export blocks below when you want to move the tuned values into the codebase.'}
          </span>
          {notice ? (
            <span className="mt-1 block text-white/78">{notice}</span>
          ) : null}
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
          <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/55">
            Shortcuts
          </span>
          <div className="mt-3 grid grid-cols-2 gap-2 text-[0.68rem] text-white/65">
            <span>
              <code>Arrow</code> nudge by 1
            </span>
            <span>
              <code>Shift + Arrow</code> nudge by 5
            </span>
            <span>
              <code>+ / -</code> zoom by 0.05
            </span>
            <span>
              <code>Shift + +/-</code> zoom by 0.1
            </span>
            <span>
              <code>R</code> reset target
            </span>
            <span>
              <code>Esc</code> close editor
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {exportSections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-3"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/55">
                  {section.title}
                </span>
                <button
                  type="button"
                  onClick={section.onCopy}
                  className="text-[0.68rem] font-semibold text-primary"
                >
                  Copy
                </button>
              </div>
              <textarea
                readOnly
                value={section.exportText}
                className="h-28 w-full resize-none rounded-lg border border-white/10 bg-black/25 px-3 py-2 text-[0.68rem] leading-relaxed text-white/70 outline-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};
