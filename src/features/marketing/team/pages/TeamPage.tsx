import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { createPortal } from 'react-dom';
import { CtaSection } from '../../about/components/CtaSection';
import { MetaTags } from '../../../../core/components/MetaTags';
import demoMemberPortrait from '../../../../assets/img/optimized/person-1.webp';
import financeDepartmentHeader from '../../../../assets/img/optimized/team-fd-header.webp';
import alternateHeaderPortrait from '../../../../assets/img/optimized/person-2.webp';
import founderHeaderPortrait from '../../../../assets/img/optimized/team-HBS.webp';

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */

const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.1,
      ease: easeOut,
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardFade = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

/* ------------------------------------------------------------------ */
/*  Types & Data                                                       */
/* ------------------------------------------------------------------ */

interface TeamMember {
  name: string;
  role: string;
  portraitSrc?: string;
  portraitAlt?: string;
  portraitTransform?: ImageTransform;
}

interface Department {
  department: string;
  description: string;
  icon: string;
  headerImageSrc?: string;
  headerImageAlt?: string;
  headerImageTransform?: ImageTransform;
  members: TeamMember[];
}

type ImageTransform = {
  xPercent: number;
  yPercent: number;
  scale: number;
};

type DevImageKind = 'memberPortrait' | 'departmentHeader';

type TeamImageTransformOverrides = {
  memberPortraits: Record<string, ImageTransform>;
  departmentHeaders: Record<string, ImageTransform>;
};

type DevImageSourceOverride = {
  src: string;
  alt: string;
  originalFileName: string;
  suggestedFileName: string;
  objectUrl?: string;
};

type TeamImageSourceOverrides = {
  memberPortraits: Record<string, DevImageSourceOverride>;
  departmentHeaders: Record<string, DevImageSourceOverride>;
};

type DevEditorSelection = {
  kind: DevImageKind;
  targetId: string;
  label: string;
  defaultTransform: ImageTransform;
  defaultImageSrc: string;
  defaultImageAlt: string;
  suggestedFileName: string;
  previewAspectRatio: string;
};

type ActiveDragState = {
  selection: DevEditorSelection;
  pointerStartX: number;
  pointerStartY: number;
  width: number;
  height: number;
  startingTransform: ImageTransform;
};

interface TeamImageDevEditor {
  isEnabled: boolean;
  selectedTarget: DevEditorSelection | null;
  currentOverrides: TeamImageTransformOverrides;
  currentImageOverrides: TeamImageSourceOverrides;
  notice: string | null;
  portraitExportText: string;
  headerExportText: string;
  selectTarget: (selection: DevEditorSelection) => void;
  closeSelection: () => void;
  updateTargetTransform: (
    selection: DevEditorSelection,
    nextTransform: ImageTransform
  ) => void;
  resetTarget: (selection: DevEditorSelection) => void;
  saveOverrides: () => void;
  isTargetSaved: (selection: DevEditorSelection) => boolean;
  copyPortraitExport: () => void;
  copyHeaderExport: () => void;
  openImagePicker: () => void;
  clearImageOverride: (selection: DevEditorSelection) => void;
  startDrag: (
    event: React.PointerEvent<HTMLElement>,
    selection: DevEditorSelection,
    transform: ImageTransform
  ) => void;
}

const IS_DEV_TEAM_IMAGE_EDITOR_ENABLED = import.meta.env.DEV;

const DEFAULT_IMAGE_TRANSFORM: ImageTransform = {
  xPercent: 0,
  yPercent: 0,
  scale: 1,
};

const EMPTY_TEAM_IMAGE_TRANSFORM_OVERRIDES: TeamImageTransformOverrides = {
  memberPortraits: {},
  departmentHeaders: {},
};

const EMPTY_TEAM_IMAGE_SOURCE_OVERRIDES: TeamImageSourceOverrides = {
  memberPortraits: {},
  departmentHeaders: {},
};

const DEV_TEAM_IMAGE_EDITOR_STORAGE_KEY =
  'darshan-team-page-image-editor-overrides';

const roundTransformValue = (value: number) => Math.round(value * 100) / 100;

const formatTransformNumber = (value: number) =>
  Number(roundTransformValue(value).toFixed(2)).toString();

const clampImageTransform = (transform: ImageTransform): ImageTransform => ({
  xPercent: roundTransformValue(
    Math.max(-50, Math.min(50, transform.xPercent))
  ),
  yPercent: roundTransformValue(
    Math.max(-50, Math.min(50, transform.yPercent))
  ),
  scale: roundTransformValue(Math.max(1, Math.min(2.4, transform.scale))),
});

const normalizeImageTransform = (
  transform?: Partial<ImageTransform>
): ImageTransform =>
  clampImageTransform({
    xPercent: transform?.xPercent ?? DEFAULT_IMAGE_TRANSFORM.xPercent,
    yPercent: transform?.yPercent ?? DEFAULT_IMAGE_TRANSFORM.yPercent,
    scale: transform?.scale ?? DEFAULT_IMAGE_TRANSFORM.scale,
  });

const areImageTransformsEqual = (left: ImageTransform, right: ImageTransform) =>
  left.xPercent === right.xPercent &&
  left.yPercent === right.yPercent &&
  left.scale === right.scale;

const buildMemberTargetId = (departmentName: string, memberName: string) =>
  `${departmentName}::${memberName}`;

const buildDepartmentTargetId = (departmentName: string) => departmentName;

const getImageTransformStyle = (
  transform: ImageTransform
): React.CSSProperties => ({
  objectPosition: `${50 + transform.xPercent}% ${50 + transform.yPercent}%`,
  transform: `scale(${transform.scale})`,
  transformOrigin: 'center center',
  willChange: 'transform, object-position',
});

const getOverrideRecordForKind = (
  overrides: TeamImageTransformOverrides,
  kind: DevImageKind
) =>
  kind === 'memberPortrait'
    ? overrides.memberPortraits
    : overrides.departmentHeaders;

const getSourceOverrideRecordForKind = (
  overrides: TeamImageSourceOverrides,
  kind: DevImageKind
) =>
  kind === 'memberPortrait'
    ? overrides.memberPortraits
    : overrides.departmentHeaders;

const slugifyFilePart = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');

const buildSuggestedFileName = (
  kind: DevImageKind,
  label: string,
  originalFileName?: string
) => {
  const extensionMatch = originalFileName?.match(/\.[a-z0-9]+$/i);
  const extension = extensionMatch?.[0]?.toLowerCase() ?? '.jpg';
  const normalizedLabel = slugifyFilePart(label);

  return kind === 'memberPortrait'
    ? `team-${normalizedLabel}${extension}`
    : `team-${normalizedLabel}-header${extension}`;
};

const setOverrideForSelection = (
  overrides: TeamImageTransformOverrides,
  selection: DevEditorSelection,
  nextTransform: ImageTransform
): TeamImageTransformOverrides => {
  const normalizedTransform = normalizeImageTransform(nextTransform);
  const nextRecord = {
    ...getOverrideRecordForKind(overrides, selection.kind),
  };

  if (
    areImageTransformsEqual(normalizedTransform, selection.defaultTransform)
  ) {
    delete nextRecord[selection.targetId];
  } else {
    nextRecord[selection.targetId] = normalizedTransform;
  }

  return selection.kind === 'memberPortrait'
    ? { ...overrides, memberPortraits: nextRecord }
    : { ...overrides, departmentHeaders: nextRecord };
};

const parseStoredTeamImageOverrides = (
  rawValue: string | null
): TeamImageTransformOverrides => {
  if (!rawValue) {
    return EMPTY_TEAM_IMAGE_TRANSFORM_OVERRIDES;
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<TeamImageTransformOverrides>;
    const memberPortraits = Object.fromEntries(
      Object.entries(parsed.memberPortraits ?? {}).map(([key, value]) => [
        key,
        normalizeImageTransform(value),
      ])
    );
    const departmentHeaders = Object.fromEntries(
      Object.entries(parsed.departmentHeaders ?? {}).map(([key, value]) => [
        key,
        normalizeImageTransform(value),
      ])
    );

    return {
      memberPortraits,
      departmentHeaders,
    };
  } catch {
    return EMPTY_TEAM_IMAGE_TRANSFORM_OVERRIDES;
  }
};

const buildMemberTransformExportText = (
  departments: Department[],
  overrides: TeamImageTransformOverrides
) => {
  const entries = departments.flatMap((department) =>
    department.members.flatMap((member) => {
      const override =
        overrides.memberPortraits[
          buildMemberTargetId(department.department, member.name)
        ];

      if (!override) {
        return [];
      }

      return [
        [
          '  {',
          `    department: ${JSON.stringify(department.department)},`,
          `    member: ${JSON.stringify(member.name)},`,
          `    portraitTransform: { xPercent: ${formatTransformNumber(
            override.xPercent
          )}, yPercent: ${formatTransformNumber(
            override.yPercent
          )}, scale: ${formatTransformNumber(override.scale)} },`,
          '  },',
        ].join('\n'),
      ];
    })
  );

  if (entries.length === 0) {
    return '[]';
  }

  return `[\n${entries.join('\n')}\n]`;
};

const buildHeaderTransformExportText = (
  departments: Department[],
  overrides: TeamImageTransformOverrides
) => {
  const entries = departments.flatMap((department) => {
    const override =
      overrides.departmentHeaders[
        buildDepartmentTargetId(department.department)
      ];

    if (!override) {
      return [];
    }

    return [
      [
        '  {',
        `    department: ${JSON.stringify(department.department)},`,
        `    headerImageTransform: { xPercent: ${formatTransformNumber(
          override.xPercent
        )}, yPercent: ${formatTransformNumber(
          override.yPercent
        )}, scale: ${formatTransformNumber(override.scale)} },`,
        '  },',
      ].join('\n'),
    ];
  });

  if (entries.length === 0) {
    return '[]';
  }

  return `[\n${entries.join('\n')}\n]`;
};

const TeamImageDevEditorPanel: React.FC<{
  selection: DevEditorSelection;
  transform: ImageTransform;
  imageSrc: string;
  imageAlt: string;
  hasCustomImage: boolean;
  suggestedFileName: string;
  notice: string | null;
  isSaved: boolean;
  portraitExportText: string;
  headerExportText: string;
  onClose: () => void;
  onReset: () => void;
  onSave: () => void;
  onTransformChange: (nextTransform: ImageTransform) => void;
  onCopyPortraitExport: () => void;
  onCopyHeaderExport: () => void;
  onPickImage: () => void;
  onClearImageOverride: () => void;
}> = ({
  selection,
  transform,
  imageSrc,
  imageAlt,
  hasCustomImage,
  suggestedFileName,
  notice,
  isSaved,
  portraitExportText,
  headerExportText,
  onClose,
  onReset,
  onSave,
  onTransformChange,
  onCopyPortraitExport,
  onCopyHeaderExport,
  onPickImage,
  onClearImageOverride,
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
            {selection.label}
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
        Click once to select, then drag the image to reposition it. The preview
        below shows both the crop and the full image.
      </p>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div>
          <span className="mb-1.5 block text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/45">
            Frame Preview
          </span>
          <div
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30"
            style={{ aspectRatio: selection.previewAspectRatio }}
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
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top,#2a2a2a_0%,#111_85%)]"
            style={{ aspectRatio: selection.previewAspectRatio }}
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-full w-full object-contain p-2"
            />
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/55">
            Image Source
          </span>
          <span className="text-[0.68rem] font-semibold text-primary">
            {hasCustomImage ? 'Local Preview' : 'Code Asset'}
          </span>
        </div>
        <code className="mt-2 block break-all text-[0.72rem] text-white/75">
          {suggestedFileName}
        </code>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={onPickImage}
            className="rounded-lg border border-white/10 bg-white/6 px-3 py-2 font-semibold transition-colors hover:bg-white/12"
          >
            Add Image
          </button>
          <button
            type="button"
            onClick={onClearImageOverride}
            disabled={!hasCustomImage}
            className="rounded-lg border border-white/10 bg-white/6 px-3 py-2 font-semibold transition-colors hover:bg-white/12 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear Image
          </button>
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
          Local image uploads are preview-only in dev. Use the suggested file
          name above when you move the image into the repo.
        </span>
        {notice ? (
          <span className="mt-1 block text-white/60">{notice}</span>
        ) : null}
      </div>

      <details className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3">
        <summary className="cursor-pointer text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/70">
          Export Transforms
        </summary>

        <div className="mt-3 space-y-3">
          <div>
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/55">
                Portraits
              </span>
              <button
                type="button"
                onClick={onCopyPortraitExport}
                className="text-[0.68rem] font-semibold text-primary"
              >
                Copy
              </button>
            </div>
            <textarea
              readOnly
              value={portraitExportText}
              className="h-24 w-full resize-none rounded-lg border border-white/10 bg-black/25 px-3 py-2 text-[0.68rem] leading-relaxed text-white/70 outline-none"
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/55">
                Headers
              </span>
              <button
                type="button"
                onClick={onCopyHeaderExport}
                className="text-[0.68rem] font-semibold text-primary"
              >
                Copy
              </button>
            </div>
            <textarea
              readOnly
              value={headerExportText}
              className="h-24 w-full resize-none rounded-lg border border-white/10 bg-black/25 px-3 py-2 text-[0.68rem] leading-relaxed text-white/70 outline-none"
            />
          </div>
        </div>
      </details>
    </div>,
    document.body
  );
};

const TEAM_DEPARTMENTS: Department[] = [
  {
    department: 'Executive Leadership',
    description:
      'Visionary leaders guiding Darshan Transport towards excellence in logistics across Nepal.',
    icon: '👑',
    members: [
      {
        name: 'Hari Bahadur Shrestha',
        role: 'Founder & Chairman',
        portraitSrc: founderHeaderPortrait,
        portraitAlt: 'Portrait of Hari Bahadur Shrestha',
      },
      { name: 'Arun Kumar Shrestha', role: 'Executive Director' },
      { name: 'Sukman Shrestha', role: 'Executive Member' },
      { name: 'Shrawan Kumar Shrestha', role: 'Executive Member' },
      { name: 'Ram Kumar Shrestha', role: 'Executive Member' },
      {
        name: 'Laxman Kumar Shrestha',
        role: 'Executive Member & Branch Head',
      },
      { name: 'Sandesh Shrestha', role: 'Executive Member' },
      { name: 'Sadeep Shrestha', role: 'Head of Operations & Technology' },
    ],
  },
  {
    department: 'Finance Department',
    description:
      'Managing billing, accounts, and financial operations that keep the business running smoothly.',
    icon: '💰',
    headerImageSrc: financeDepartmentHeader,
    headerImageAlt: 'Finance department header',
    members: [
      { name: 'Anjila Karki', role: 'Finance Head' },
      { name: 'Kamal Bahadur Dhami', role: 'Finance Assistant' },
      { name: 'Tik Maya Gurung', role: 'Finance Assistant' },
      { name: 'Puja Ghimire', role: 'Accounts & Operations Support' },
      { name: 'Kanchan Thapa', role: 'Billing & Collection Officer' },
      { name: 'Manoj Acharya', role: 'Billing & Collection Officer' },
    ],
  },
  {
    department: 'Operations & Dispatch',
    description:
      'The backbone of daily cargo movement, coordinating pickups, bookings, and dispatches across Nepal.',
    icon: '🚛',
    members: [
      { name: 'Anita Shrestha', role: 'Dispatch & Delivery Coordinator' },
      { name: 'Bikash Pariyar', role: 'Dispatch & Delivery Coordinator' },
      { name: 'Jagat Pun', role: 'Dispatch & Delivery Coordinator' },
      { name: 'Krishna Karki', role: 'Booking Supervisor' },
      {
        name: 'Ram Prasad Gurung',
        role: 'Dispatch & Delivery Coordinator',
      },
      { name: 'Kripesh Shrestha', role: 'Booking Supervisor' },
      { name: 'Nandalal Pudasaini', role: 'Operations Supervisor' },
      { name: 'Sajan Gurung', role: 'Operations Supervisor' },
      {
        name: 'Bishal Prasad Yadav',
        role: 'Booking & Dispatch Executive',
      },
      { name: 'Rohit Gurung', role: 'Booking & Dispatch Executive' },
      { name: 'Sanjeev Chatri', role: 'Booking & Dispatch Executive' },
      {
        name: 'Sushil Kumar Nepal',
        role: 'Booking & Dispatch Executive',
      },
    ],
  },
  {
    department: 'Branch Operations',
    description:
      'Leading regional branches to ensure consistent service quality across the country.',
    icon: '🏢',
    members: [
      { name: 'Deepak Lamichhane', role: 'Branch Manager' },
      { name: 'Govinda Shrestha', role: 'Branch Manager' },
      { name: 'Rajesh Patel', role: 'Branch Manager' },
    ],
  },
  {
    department: 'Dispatch Supervisors',
    description:
      'Overseeing branch-level dispatch operations and ensuring timely cargo movement.',
    icon: '📋',
    members: [
      {
        name: 'Chandra Bahadur Magar',
        role: 'Branch Dispatch Supervisor',
      },
      { name: 'Lalu K.C', role: 'Branch Dispatch Supervisor' },
      { name: 'Raj Kumar Shrestha', role: 'Branch Dispatch Supervisor' },
      { name: 'Sobita Thapa', role: 'Branch Dispatch Supervisor' },
      { name: 'Suman Darai', role: 'Branch Dispatch Supervisor' },
      { name: 'Thaneshwor Gaudel', role: 'Branch Dispatch Supervisor' },
      { name: 'Baburam Shrestha', role: 'Branch Dispatch Supervisor' },
    ],
  },
  {
    department: 'Fleet Management',
    description:
      'Keeping our vehicles running safely and reliably through expert maintenance.',
    icon: '🔧',
    members: [
      { name: 'Nur Islam Hawari', role: 'Lead Mechanic' },
      { name: 'Esrafil Alam', role: 'Mechanic' },
    ],
  },
  {
    department: 'IT & Digital Team',
    description:
      'Driving technology, design, and digital growth for Darshan Transport.',
    icon: '💻',
    members: [
      { name: 'Subin Gurung', role: 'Lead Developer' },
      { name: 'Rohan Dahal', role: 'UI/UX & Creative Designer' },
      {
        name: 'Sharon Shrestha',
        role: 'Digital Marketing & Content Manager',
      },
      { name: 'Susam Thapa', role: 'QA & Support Engineer' },
    ],
  },
  {
    department: 'Support Staff',
    description:
      'Ensuring smooth day-to-day office operations and workplace support.',
    icon: '🤝',
    members: [
      { name: 'Bhesh Maya Gurung', role: 'Office Assistant' },
      { name: 'Urmila Lama', role: 'Office Assistant' },
    ],
  },
];

const DEPARTMENT_HEADER_IMAGES = [
  {
    src: financeDepartmentHeader,
    alt: 'Finance department header',
  },
  {
    src: alternateHeaderPortrait,
    alt: 'Operations team header',
  },
  {
    src: founderHeaderPortrait,
    alt: 'Branch operations header',
  },
  {
    src: demoMemberPortrait,
    alt: 'Department team header',
  },
] as const;

const TOTAL_MEMBERS = TEAM_DEPARTMENTS.reduce(
  (acc, d) => acc + d.members.length,
  0
);

/* ------------------------------------------------------------------ */
/*  Structured Data                                                    */
/* ------------------------------------------------------------------ */

const TEAM_PAGE_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Our Team - Darshan Transport',
  url: 'https://darshantransport.com/team',
  description:
    'Meet the dedicated team behind Darshan Transport: 45+ professionals driving logistics excellence across Nepal.',
  publisher: {
    '@type': 'Organization',
    name: 'Darshan Transport',
  },
};

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

const HeroSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const decorY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section
      ref={ref}
      className="relative w-full py-32 bg-[#1a1a1a] overflow-hidden max-md:py-20"
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Decorative circle */}
      <motion.div
        style={{ y: decorY }}
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 -translate-y-1/2 translate-x-1/4"
      />
      <motion.div
        style={{ y: decorY }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/3 translate-y-1/2 -translate-x-1/4"
      />

      <div className="max-w-[1200px] mx-auto px-8 relative z-10 max-md:px-5">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-primary text-sm font-semibold tracking-[3px] uppercase mb-4"
        >
          Our People
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-white text-[3.5rem] leading-[1.1] font-extrabold max-w-[650px] max-lg:text-[2.6rem] max-md:text-[2rem]"
        >
          The People Behind{' '}
          <span className="text-primary">Darshan Transport</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-5 text-white/60 text-lg max-w-[520px] leading-relaxed max-md:text-base"
        >
          {TOTAL_MEMBERS}+ dedicated professionals ensuring your cargo reaches
          its destination safely across every route in Nepal.
        </motion.p>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Stats Banner                                                       */
/* ------------------------------------------------------------------ */

const STATS = [
  { value: `${TOTAL_MEMBERS}+`, label: 'Team Members' },
  { value: `${TEAM_DEPARTMENTS.length}`, label: 'Departments' },
  { value: '3', label: 'Regional Branches' },
  { value: '25+', label: 'Years Combined' },
];

const StatsBanner: React.FC = () => (
  <section className="relative -mt-10 z-20 px-8 max-md:px-5">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="max-w-[1000px] mx-auto bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-gray-100 grid grid-cols-4 max-md:grid-cols-2 divide-x divide-gray-100 max-md:divide-x-0"
    >
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          variants={fadeUp}
          custom={i}
          className="py-8 px-6 text-center max-md:py-6 max-md:border-b max-md:border-gray-100 last:border-b-0"
        >
          <p className="text-[2rem] font-extrabold text-[#1a1a1a] leading-none max-md:text-[1.6rem]">
            {stat.value}
          </p>
          <p className="mt-2 text-sm text-text-medium font-medium">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

const MemberPortraitCard: React.FC<{
  departmentName: string;
  member: TeamMember;
  minHeightClassName?: string;
  devEditor?: TeamImageDevEditor;
}> = ({
  departmentName,
  member,
  minHeightClassName = 'min-h-[320px]',
  devEditor,
}) => {
  const portraitSrc = member.portraitSrc ?? demoMemberPortrait;
  const portraitAlt = member.portraitAlt ?? `Portrait of ${member.name}`;
  const defaultTransform = normalizeImageTransform(member.portraitTransform);
  const targetId = buildMemberTargetId(departmentName, member.name);
  const imageOverride =
    devEditor?.currentImageOverrides.memberPortraits[targetId];
  const effectivePortraitSrc = imageOverride?.src ?? portraitSrc;
  const effectivePortraitAlt = imageOverride?.alt ?? portraitAlt;
  const selection: DevEditorSelection = {
    kind: 'memberPortrait',
    targetId,
    label: `${departmentName} -> ${member.name}`,
    defaultTransform,
    defaultImageSrc: portraitSrc,
    defaultImageAlt: portraitAlt,
    suggestedFileName: buildSuggestedFileName(
      'memberPortrait',
      member.name,
      imageOverride?.originalFileName ?? portraitSrc
    ),
    previewAspectRatio: '3 / 4',
  };
  const override = devEditor?.currentOverrides.memberPortraits[targetId];
  const effectiveTransform = devEditor?.isEnabled
    ? normalizeImageTransform(override ?? defaultTransform)
    : defaultTransform;
  const isSelected =
    devEditor?.selectedTarget?.kind === selection.kind &&
    devEditor.selectedTarget.targetId === selection.targetId;

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!devEditor?.isEnabled) {
      return;
    }

    if (!isSelected) {
      devEditor.selectTarget(selection);
      return;
    }

    devEditor.startDrag(event, selection, effectiveTransform);
  };

  return (
    <motion.div
      variants={cardFade}
      onPointerDown={handlePointerDown}
      className={`group relative overflow-hidden rounded-2xl border bg-[#111] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.24)] shadow-[0_18px_55px_rgba(0,0,0,0.18)] ${
        devEditor?.isEnabled
          ? isSelected
            ? 'cursor-grab border-primary/60 ring-2 ring-primary/30'
            : 'cursor-pointer border-gray-200'
          : 'border-gray-200'
      } ${minHeightClassName}`}
    >
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]">
        <img
          src={effectivePortraitSrc}
          alt={effectivePortraitAlt}
          className="absolute inset-0 h-full w-full object-cover"
          style={getImageTransformStyle(effectiveTransform)}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/12 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/82 via-black/50 via-58% to-transparent backdrop-blur-md [mask-image:linear-gradient(to_top,black_0%,black_58%,transparent_100%)]" />

      <div className="relative z-10 flex h-full items-end p-6">
        <div>
          <h3 className="text-[1.1rem] font-bold text-white leading-snug mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
            {member.name}
          </h3>
          <p className="text-sm text-white/85 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
            {member.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  Executive Leadership Section (Featured)                            */
/* ------------------------------------------------------------------ */

const ExecutiveSection: React.FC<{
  department: Department;
  devEditor?: TeamImageDevEditor;
}> = ({ department, devEditor }) => (
  <section className="py-20 px-8 max-md:py-14 max-md:px-5">
    <div className="max-w-[1200px] mx-auto">
      {/* Section header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="text-center mb-14 max-md:mb-10"
      >
        <motion.span
          variants={fadeUp}
          custom={0}
          className="inline-block text-primary text-xs font-bold tracking-[0.22em] uppercase mb-4 bg-primary/8 px-4 py-1.5 rounded-full"
        >
          {department.department}
        </motion.span>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="text-[2.4rem] font-extrabold leading-[1.12] text-[#1a1a1a] max-md:text-[1.8rem]"
        >
          Guiding <span className="text-primary">Vision & Strategy</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-4 text-text-medium text-base max-w-[560px] mx-auto leading-[1.7]"
        >
          {department.description}
        </motion.p>
      </motion.div>

      {/* Executive cards - prominent layout */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-4 gap-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1"
      >
        {department.members.map((member) => (
          <MemberPortraitCard
            key={member.name}
            departmentName={department.department}
            member={member}
            minHeightClassName="min-h-[340px]"
            devEditor={devEditor}
          />
        ))}
      </motion.div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Department Section (Compact)                                       */
/* ------------------------------------------------------------------ */

const DepartmentSection: React.FC<{
  department: Department;
  index: number;
  devEditor?: TeamImageDevEditor;
}> = ({ department, index, devEditor }) => {
  const isEven = index % 2 === 0;
  const fallbackHeaderImage =
    DEPARTMENT_HEADER_IMAGES[(index - 1) % DEPARTMENT_HEADER_IMAGES.length];
  const headerImageSrc = department.headerImageSrc ?? fallbackHeaderImage.src;
  const headerImageAlt = department.headerImageAlt ?? fallbackHeaderImage.alt;
  const hasHeaderImage = Boolean(headerImageSrc);
  const headerSurfaceHex = isEven ? '#ffffff' : '#fafaf8';
  const headerSurfaceRgb = isEven ? '255,255,255' : '250,250,248';
  const imageOnLeft = index % 2 === 0;
  const headerImageSideClass = imageOnLeft
    ? 'left-0 w-1/2 max-md:w-[56%]'
    : 'right-0 w-1/2 max-md:w-[56%]';
  const headerDefaultTransform = normalizeImageTransform(
    department.headerImageTransform
  );
  const headerTargetId = buildDepartmentTargetId(department.department);
  const headerImageOverride =
    devEditor?.currentImageOverrides.departmentHeaders[headerTargetId];
  const effectiveHeaderImageSrc = headerImageOverride?.src ?? headerImageSrc;
  const effectiveHeaderImageAlt = headerImageOverride?.alt ?? headerImageAlt;
  const headerSelection: DevEditorSelection = {
    kind: 'departmentHeader',
    targetId: headerTargetId,
    label: `${department.department} header`,
    defaultTransform: headerDefaultTransform,
    defaultImageSrc: headerImageSrc,
    defaultImageAlt: headerImageAlt ?? department.department,
    suggestedFileName: buildSuggestedFileName(
      'departmentHeader',
      department.department,
      headerImageOverride?.originalFileName ?? headerImageSrc
    ),
    previewAspectRatio: '16 / 5',
  };
  const headerOverride =
    devEditor?.currentOverrides.departmentHeaders[headerTargetId];
  const headerTransform = devEditor?.isEnabled
    ? normalizeImageTransform(headerOverride ?? headerDefaultTransform)
    : headerDefaultTransform;
  const isHeaderSelected =
    devEditor?.selectedTarget?.kind === headerSelection.kind &&
    devEditor.selectedTarget.targetId === headerSelection.targetId;

  const handleHeaderPointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!devEditor?.isEnabled || !hasHeaderImage) {
      return;
    }

    if (!isHeaderSelected) {
      devEditor.selectTarget(headerSelection);
      return;
    }

    devEditor.startDrag(event, headerSelection, headerTransform);
  };

  return (
    <section
      id={`dept-${index}`}
      className={`py-20 px-8 max-md:py-14 max-md:px-5 ${isEven ? 'bg-white' : 'bg-[#fafaf8]'}`}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Department info */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mb-7 w-full"
        >
          <div
            onPointerDown={handleHeaderPointerDown}
            className={`relative overflow-hidden ${hasHeaderImage ? 'rounded-[28px]' : ''} ${
              devEditor?.isEnabled && hasHeaderImage
                ? isHeaderSelected
                  ? 'cursor-grab ring-2 ring-primary/30'
                  : 'cursor-pointer'
                : ''
            }`}
            style={{ backgroundColor: headerSurfaceHex }}
          >
            {hasHeaderImage ? (
              <>
                <div className={`absolute inset-y-0 ${headerImageSideClass}`}>
                  <img
                    src={effectiveHeaderImageSrc}
                    alt={effectiveHeaderImageAlt ?? department.department}
                    className={`absolute inset-0 h-full w-full object-cover opacity-[0.88] ${
                      imageOnLeft ? 'object-left' : 'object-center'
                    }`}
                    style={getImageTransformStyle(headerTransform)}
                  />
                </div>
                <div
                  className="absolute inset-0"
                  style={{
                    background: imageOnLeft
                      ? `linear-gradient(270deg, rgba(${headerSurfaceRgb},0.99) 0%, rgba(${headerSurfaceRgb},0.98) 42%, rgba(${headerSurfaceRgb},0.9) 56%, rgba(${headerSurfaceRgb},0.42) 70%, rgba(${headerSurfaceRgb},0.06) 100%)`
                      : `linear-gradient(90deg, rgba(${headerSurfaceRgb},0.99) 0%, rgba(${headerSurfaceRgb},0.98) 42%, rgba(${headerSurfaceRgb},0.9) 56%, rgba(${headerSurfaceRgb},0.42) 70%, rgba(${headerSurfaceRgb},0.06) 100%)`,
                  }}
                />
                <div
                  className={`absolute inset-y-0 w-[18%] backdrop-blur-xl max-md:w-[24%] ${
                    imageOnLeft
                      ? 'left-[41%] max-md:left-[36%]'
                      : 'right-[41%] max-md:right-[36%]'
                  }`}
                  style={{
                    background: imageOnLeft
                      ? `linear-gradient(270deg, rgba(${headerSurfaceRgb},0) 0%, rgba(${headerSurfaceRgb},0.16) 28%, rgba(${headerSurfaceRgb},0.34) 52%, rgba(${headerSurfaceRgb},0.02) 100%)`
                      : `linear-gradient(90deg, rgba(${headerSurfaceRgb},0) 0%, rgba(${headerSurfaceRgb},0.16) 28%, rgba(${headerSurfaceRgb},0.34) 52%, rgba(${headerSurfaceRgb},0.02) 100%)`,
                    maskImage: imageOnLeft
                      ? 'linear-gradient(to left, transparent 0%, black 20%, black 82%, transparent 100%)'
                      : 'linear-gradient(to right, transparent 0%, black 20%, black 82%, transparent 100%)',
                  }}
                />
              </>
            ) : null}

            <div
              className={`relative z-10 flex bg-transparent ${
                imageOnLeft ? 'justify-end' : 'justify-start'
              } ${hasHeaderImage ? 'px-2 py-2 max-md:px-0 max-md:py-0' : ''}`}
            >
              {imageOnLeft ? (
                <div className="grid grid-cols-[minmax(0,1fr)_140px] items-stretch gap-3 w-full max-w-[700px] max-md:grid-cols-[minmax(0,1fr)_88px] max-md:gap-3">
                  <div className="min-w-0 text-right">
                    <div className="px-3 py-1 max-md:px-1 max-md:py-0.5">
                      <h2 className="text-[1.4rem] font-bold text-[#1a1a1a] leading-tight max-md:text-[1.2rem]">
                        {department.department}
                      </h2>
                    </div>
                    <div className="px-3 py-2 max-md:px-1 max-md:py-1.5">
                      <p className="text-text-medium text-[0.92rem] leading-[1.7]">
                        {department.description}
                      </p>
                    </div>
                    <div className="px-3 py-1 max-md:px-1 max-md:py-0.5">
                      <span className="text-sm font-bold text-primary whitespace-nowrap">
                        {department.members.length}{' '}
                        {department.members.length === 1 ? 'member' : 'members'}
                      </span>
                    </div>
                  </div>
                  <div className="flex min-h-[132px] items-center justify-center max-md:min-h-[88px]">
                    <span className="text-[2.4rem] leading-none">
                      {department.icon}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-[140px_minmax(0,1fr)] items-stretch gap-3 w-full max-w-[700px] max-md:grid-cols-[88px_minmax(0,1fr)] max-md:gap-3">
                  <div className="flex min-h-[132px] items-center justify-center max-md:min-h-[88px]">
                    <span className="text-[2.4rem] leading-none">
                      {department.icon}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="px-3 py-1 max-md:px-1 max-md:py-0.5">
                      <h2 className="text-[1.4rem] font-bold text-[#1a1a1a] leading-tight max-md:text-[1.2rem]">
                        {department.department}
                      </h2>
                    </div>
                    <div className="px-3 py-2 max-md:px-1 max-md:py-1.5">
                      <p className="text-text-medium text-[0.92rem] leading-[1.7]">
                        {department.description}
                      </p>
                    </div>
                    <div className="px-3 py-1 max-md:px-1 max-md:py-0.5">
                      <span className="text-sm font-bold text-primary whitespace-nowrap">
                        {department.members.length}{' '}
                        {department.members.length === 1 ? 'member' : 'members'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Members list */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {department.members.map((member) => (
            <MemberPortraitCard
              key={member.name}
              departmentName={department.department}
              member={member}
              minHeightClassName="min-h-[300px]"
              devEditor={devEditor}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Team Overview Section (all departments at a glance)                */
/* ------------------------------------------------------------------ */

const TeamOverview: React.FC = () => (
  <section className="relative overflow-hidden py-6 px-8 bg-secondary max-md:py-5 max-md:px-5">
    <div
      className="absolute inset-0 opacity-[0.28]"
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.14) 1px, transparent 1px)',
        backgroundSize: '34px 34px',
      }}
    />
    <div
      className="absolute inset-0 opacity-[0.18]"
      style={{
        backgroundImage:
          'radial-gradient(circle at 1px 1px, rgba(252,175,23,0.5) 1.2px, transparent 0)',
        backgroundSize: '34px 34px',
      }}
    />
    <div className="absolute -top-8 right-[10%] h-32 w-32 rounded-full bg-primary/28 blur-3xl" />
    <div className="absolute bottom-0 left-[6%] h-24 w-44 rounded-full bg-white/12 blur-3xl" />

    <div className="relative z-10 max-w-[1080px] mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="text-center mb-4"
      >
        <motion.p
          variants={fadeUp}
          custom={0}
          className="text-primary text-[0.66rem] font-semibold tracking-[0.24em] uppercase"
        >
          Organization
        </motion.p>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mt-1.5 text-[1.3rem] font-semibold text-white max-md:text-[1.1rem]"
        >
          How We&apos;re Organized
        </motion.h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-3 gap-2.5 max-lg:grid-cols-2 max-md:grid-cols-1"
      >
        {TEAM_DEPARTMENTS.slice(1).map((dept) => (
          <motion.div
            key={dept.department}
            variants={cardFade}
            className="group rounded-xl bg-white/8 px-3.5 py-3 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-white font-medium text-[0.84rem] leading-snug">
                  {dept.department}
                </h3>
                <span className="mt-1 block text-primary text-[0.68rem] font-semibold tracking-[0.14em] uppercase">
                  {dept.members.length} members
                </span>
              </div>
              <span className="text-base leading-none text-white/70 flex-shrink-0">
                {dept.icon}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export const TeamPage: React.FC = () => {
  const [currentOverrides, setCurrentOverrides] =
    useState<TeamImageTransformOverrides>(EMPTY_TEAM_IMAGE_TRANSFORM_OVERRIDES);
  const [currentImageOverrides, setCurrentImageOverrides] =
    useState<TeamImageSourceOverrides>(EMPTY_TEAM_IMAGE_SOURCE_OVERRIDES);
  const [savedOverrides, setSavedOverrides] =
    useState<TeamImageTransformOverrides>(EMPTY_TEAM_IMAGE_TRANSFORM_OVERRIDES);
  const [selectedTarget, setSelectedTarget] =
    useState<DevEditorSelection | null>(null);
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

    const handlePointerMove = (event: PointerEvent) => {
      const deltaX = event.clientX - activeDragState.pointerStartX;
      const deltaY = event.clientY - activeDragState.pointerStartY;

      setCurrentOverrides((previousOverrides) =>
        setOverrideForSelection(previousOverrides, activeDragState.selection, {
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
    TEAM_DEPARTMENTS,
    currentOverrides
  );
  const headerExportText = buildHeaderTransformExportText(
    TEAM_DEPARTMENTS,
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

  const revokeImageOverride = (override?: DevImageSourceOverride) => {
    if (!override?.objectUrl) {
      return;
    }

    URL.revokeObjectURL(override.objectUrl);
    previewObjectUrlsRef.current.delete(override.objectUrl);
  };

  const selectedImageOverride = selectedTarget
    ? getSourceOverrideRecordForKind(
        currentImageOverrides,
        selectedTarget.kind
      )[selectedTarget.targetId]
    : undefined;
  const selectedImageSrc =
    selectedImageOverride?.src ?? selectedTarget?.defaultImageSrc ?? '';
  const selectedImageAlt =
    selectedImageOverride?.alt ?? selectedTarget?.defaultImageAlt ?? '';
  const selectedSuggestedFileName =
    selectedImageOverride?.suggestedFileName ??
    selectedTarget?.suggestedFileName ??
    '';

  const handleOpenImagePicker = () => {
    imagePickerInputRef.current?.click();
  };

  const handleClearImageOverride = (selection: DevEditorSelection) => {
    const existingOverride = getSourceOverrideRecordForKind(
      currentImageOverrides,
      selection.kind
    )[selection.targetId];

    revokeImageOverride(existingOverride);

    setCurrentImageOverrides((previousOverrides) => {
      const currentRecord = {
        ...getSourceOverrideRecordForKind(previousOverrides, selection.kind),
      };
      if (!currentRecord[selection.targetId]) {
        return previousOverrides;
      }
      delete currentRecord[selection.targetId];

      return selection.kind === 'memberPortrait'
        ? { ...previousOverrides, memberPortraits: currentRecord }
        : { ...previousOverrides, departmentHeaders: currentRecord };
    });
    setNotice('Cleared the temporary local image preview.');
  };

  const handleImagePickerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file || !selectedTarget) {
      event.target.value = '';
      return;
    }

    const targetLabel =
      selectedTarget.kind === 'memberPortrait'
        ? (selectedTarget.label.split(' -> ')[1] ?? selectedTarget.label)
        : selectedTarget.label.replace(/\s+header$/i, '');
    const suggestedFileName = buildSuggestedFileName(
      selectedTarget.kind,
      targetLabel,
      file.name
    );
    const existingOverride = getSourceOverrideRecordForKind(
      currentImageOverrides,
      selectedTarget.kind
    )[selectedTarget.targetId];
    const objectUrl = URL.createObjectURL(file);
    previewObjectUrlsRef.current.add(objectUrl);
    revokeImageOverride(existingOverride);

    setCurrentImageOverrides((previousOverrides) => {
      const currentRecord = {
        ...getSourceOverrideRecordForKind(
          previousOverrides,
          selectedTarget.kind
        ),
      };

      currentRecord[selectedTarget.targetId] = {
        src: objectUrl,
        alt: selectedTarget.defaultImageAlt,
        originalFileName: file.name,
        suggestedFileName,
        objectUrl,
      };

      return selectedTarget.kind === 'memberPortrait'
        ? { ...previousOverrides, memberPortraits: currentRecord }
        : { ...previousOverrides, departmentHeaders: currentRecord };
    });

    setNotice(
      `Loaded ${file.name} as a temporary dev preview. Suggested asset name: ${suggestedFileName}`
    );
    event.target.value = '';
  };

  const devEditor: TeamImageDevEditor | undefined =
    IS_DEV_TEAM_IMAGE_EDITOR_ENABLED
      ? {
          isEnabled: true,
          selectedTarget,
          currentOverrides,
          currentImageOverrides,
          notice,
          portraitExportText,
          headerExportText,
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
              setOverrideForSelection(
                previousOverrides,
                selection,
                nextTransform
              )
            );
            setSelectedTarget(selection);
          },
          resetTarget: (selection) => {
            setCurrentOverrides((previousOverrides) =>
              setOverrideForSelection(
                previousOverrides,
                selection,
                selection.defaultTransform
              )
            );
            setNotice('Reset to the code-defined default transform.');
          },
          saveOverrides: () => {
            writeOverridesToStorage(currentOverrides);
            setSavedOverrides(currentOverrides);
            setNotice('Saved current Team image overrides locally.');
          },
          isTargetSaved: (selection) => {
            const currentOverride = getOverrideRecordForKind(
              currentOverrides,
              selection.kind
            )[selection.targetId];
            const savedOverride = getOverrideRecordForKind(
              savedOverrides,
              selection.kind
            )[selection.targetId];
            const effectiveCurrent = normalizeImageTransform(
              currentOverride ?? selection.defaultTransform
            );
            const effectiveSaved = normalizeImageTransform(
              savedOverride ?? selection.defaultTransform
            );

            return areImageTransformsEqual(effectiveCurrent, effectiveSaved);
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
          openImagePicker: handleOpenImagePicker,
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
        }
      : undefined;

  return (
    <div className="team-page-wrapper bg-white min-h-screen font-sans">
      <MetaTags
        title="Meet Our Team | Darshan Transport"
        description="Meet the 45+ dedicated professionals behind Darshan Transport driving logistics excellence across Nepal."
        canonical="https://darshantransport.com/team"
        structuredData={TEAM_PAGE_STRUCTURED_DATA}
      />

      <HeroSection />
      <StatsBanner />

      {/* Executive Leadership - featured section */}
      <div id="dept-0">
        <ExecutiveSection
          department={TEAM_DEPARTMENTS[0]}
          devEditor={devEditor}
        />
      </div>

      {/* Organization overview */}
      <TeamOverview />

      {/* All other departments */}
      {TEAM_DEPARTMENTS.slice(1).map((dept, i) => (
        <DepartmentSection
          key={dept.department}
          department={dept}
          index={i + 1}
          devEditor={devEditor}
        />
      ))}

      {devEditor?.selectedTarget ? (
        <TeamImageDevEditorPanel
          selection={devEditor.selectedTarget}
          transform={normalizeImageTransform(
            getOverrideRecordForKind(
              devEditor.currentOverrides,
              devEditor.selectedTarget.kind
            )[devEditor.selectedTarget.targetId] ??
              devEditor.selectedTarget.defaultTransform
          )}
          imageSrc={selectedImageSrc}
          imageAlt={selectedImageAlt}
          hasCustomImage={Boolean(selectedImageOverride)}
          suggestedFileName={selectedSuggestedFileName}
          notice={devEditor.notice}
          isSaved={devEditor.isTargetSaved(devEditor.selectedTarget)}
          portraitExportText={devEditor.portraitExportText}
          headerExportText={devEditor.headerExportText}
          onClose={devEditor.closeSelection}
          onReset={() => devEditor.resetTarget(devEditor.selectedTarget!)}
          onSave={devEditor.saveOverrides}
          onTransformChange={(nextTransform) =>
            devEditor.updateTargetTransform(
              devEditor.selectedTarget!,
              nextTransform
            )
          }
          onCopyPortraitExport={devEditor.copyPortraitExport}
          onCopyHeaderExport={devEditor.copyHeaderExport}
          onPickImage={devEditor.openImagePicker}
          onClearImageOverride={() =>
            devEditor.clearImageOverride(devEditor.selectedTarget!)
          }
        />
      ) : null}

      {devEditor?.isEnabled ? (
        <input
          ref={imagePickerInputRef}
          type="file"
          accept="image/*"
          onChange={handleImagePickerChange}
          className="hidden"
        />
      ) : null}

      <CtaSection variant="team" />
    </div>
  );
};
