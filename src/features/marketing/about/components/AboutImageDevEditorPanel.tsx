import React from 'react';
import { createPortal } from 'react-dom';
import type {
  AboutImageSelection,
  AboutImageTransform,
} from '../aboutImageEditorUtils';
import { getAboutImageTransformStyle } from '../aboutImageEditorUtils';

interface AboutImageDevEditorPanelProps {
  selection: AboutImageSelection;
  transform: AboutImageTransform;
  imageSrc: string;
  imageAlt: string;
  notice: string | null;
  isSaved: boolean;
  exportText: string;
  onClose: () => void;
  onReset: () => void;
  onSave: () => void;
  onTransformChange: (nextTransform: AboutImageTransform) => void;
  onCopyExport: () => void;
}

const formatTransformNumber = (value: number) =>
  Number(value.toFixed(2)).toString();

export const AboutImageDevEditorPanel: React.FC<
  AboutImageDevEditorPanelProps
> = ({
  selection,
  transform,
  imageSrc,
  imageAlt,
  notice,
  isSaved,
  exportText,
  onClose,
  onReset,
  onSave,
  onTransformChange,
  onCopyExport,
}) => {
  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      onPointerDown={(event) => event.stopPropagation()}
      className="fixed inset-x-4 bottom-4 z-[120] max-h-[calc(100vh-6rem)] overflow-y-auto rounded-3xl border border-white/15 bg-[#111]/94 p-4 text-white shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:inset-x-auto md:right-5 md:top-24 md:bottom-5 md:w-[360px]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-primary">
            Dev Image Editor
          </p>
          <p className="mt-1 text-sm font-semibold leading-snug">
            {selection.label ?? selection.targetId}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/15 px-2 py-0.5 text-[0.7rem] text-white/70 transition-colors hover:border-white/30 hover:text-white"
        >
          Close
        </button>
      </div>

      <p className="mt-3 text-[0.72rem] leading-relaxed text-white/60">
        Click once to select, then drag the image to reposition it. Use zoom and
        nudge controls when you want finer adjustments.
      </p>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div>
          <span className="mb-1.5 block text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/45">
            Frame Preview
          </span>
          <div
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30"
            style={{ aspectRatio: selection.previewAspectRatio ?? '4 / 5' }}
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              className="absolute inset-0 h-full w-full object-cover"
              style={getAboutImageTransformStyle(transform)}
            />
          </div>
        </div>
        <div>
          <span className="mb-1.5 block text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/45">
            Full Image
          </span>
          <div
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top,#2a2a2a_0%,#111_85%)]"
            style={{ aspectRatio: selection.previewAspectRatio ?? '4 / 5' }}
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-full w-full object-contain p-2"
            />
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-3">
        <label className="block">
          <span className="mb-1.5 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/60">
            Zoom
          </span>
          <input
            type="range"
            min="1"
            max="2.4"
            step="0.01"
            value={transform.scale}
            onChange={(event) =>
              onTransformChange({
                ...transform,
                scale: Number(event.target.value),
              })
            }
            className="w-full accent-primary"
          />
        </label>

        <div className="grid grid-cols-2 gap-2 text-[0.74rem]">
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <span className="block text-[0.62rem] uppercase tracking-[0.16em] text-white/45">
              X Offset
            </span>
            <span className="mt-1 block font-semibold">
              {formatTransformNumber(transform.xPercent)}%
            </span>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <span className="block text-[0.62rem] uppercase tracking-[0.16em] text-white/45">
              Y Offset
            </span>
            <span className="mt-1 block font-semibold">
              {formatTransformNumber(transform.yPercent)}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <button
            type="button"
            onClick={() =>
              onTransformChange({
                ...transform,
                xPercent: transform.xPercent - 1,
              })
            }
            className="rounded-lg border border-white/10 bg-white/6 px-2 py-2 transition-colors hover:bg-white/12"
          >
            Left
          </button>
          <button
            type="button"
            onClick={() =>
              onTransformChange({
                ...transform,
                yPercent: transform.yPercent - 1,
              })
            }
            className="rounded-lg border border-white/10 bg-white/6 px-2 py-2 transition-colors hover:bg-white/12"
          >
            Up
          </button>
          <button
            type="button"
            onClick={() =>
              onTransformChange({
                ...transform,
                xPercent: transform.xPercent + 1,
              })
            }
            className="rounded-lg border border-white/10 bg-white/6 px-2 py-2 transition-colors hover:bg-white/12"
          >
            Right
          </button>
          <button
            type="button"
            onClick={() =>
              onTransformChange({
                ...transform,
                yPercent: transform.yPercent + 1,
              })
            }
            className="col-start-2 rounded-lg border border-white/10 bg-white/6 px-2 py-2 transition-colors hover:bg-white/12"
          >
            Down
          </button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
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

      <div className="mt-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[0.72rem] leading-relaxed">
        <span className="font-semibold text-white">
          {isSaved ? 'Saved locally.' : 'Unsaved changes.'}
        </span>
        <span className="mt-1 block text-white/60">
          Copy the export block below when you want to move the tuned values
          into the codebase.
        </span>
        {notice ? (
          <span className="mt-1 block text-white/60">{notice}</span>
        ) : null}
      </div>

      <details className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3">
        <summary className="cursor-pointer text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/70">
          Export Transforms
        </summary>

        <div className="mt-3">
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/55">
              About Page
            </span>
            <button
              type="button"
              onClick={onCopyExport}
              className="text-[0.68rem] font-semibold text-primary"
            >
              Copy
            </button>
          </div>
          <textarea
            readOnly
            value={exportText}
            className="h-32 w-full resize-none rounded-lg border border-white/10 bg-black/25 px-3 py-2 text-[0.68rem] leading-relaxed text-white/70 outline-none"
          />
        </div>
      </details>
    </div>,
    document.body
  );
};
