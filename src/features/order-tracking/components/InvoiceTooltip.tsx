import React, { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import tooltipImage from '../../../assets/img/CheckDeliveryStatusToolTip.jpg';

const TOOLTIP_GAP = 16;
const VIEWPORT_GUTTER = 16;
const MIN_TOOLTIP_WIDTH = 300;
const MAX_TOOLTIP_WIDTH = 620;
const MIN_TOOLTIP_HEIGHT = 260;
const TOOLTIP_CHROME_HEIGHT = 320;
const HOVER_CLOSE_DELAY_MS = 120;
const TOOLTIP_IMAGE_ASPECT_RATIO = 877 / 1241;

type TooltipPosition = {
  left: number;
  top: number;
  width: number;
  imageMaxHeight: number;
  placement: 'top' | 'bottom';
};

export const InvoiceTooltip: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [position, setPosition] = useState<TooltipPosition | null>(null);
  const tooltipId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current === null) return;
    window.clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = null;
  };

  const showTooltip = () => {
    clearCloseTimeout();
    setOpen(true);
  };

  const closeTooltip = () => {
    clearCloseTimeout();
    setIsPinned(false);
    setOpen(false);
  };

  const scheduleClose = () => {
    if (isPinned) return;

    clearCloseTimeout();
    closeTimeoutRef.current = window.setTimeout(() => {
      setOpen(false);
      closeTimeoutRef.current = null;
    }, HOVER_CLOSE_DELAY_MS);
  };

  const togglePinned = () => {
    clearCloseTimeout();
    setIsPinned((current) => {
      const nextPinned = !current;
      setOpen(nextPinned);
      return nextPinned;
    });
  };

  useEffect(() => {
    return () => clearCloseTimeout();
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        !wrapperRef.current?.contains(target) &&
        !tooltipRef.current?.contains(target)
      ) {
        clearCloseTimeout();
        setIsPinned(false);
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (!open || typeof window === 'undefined') return;

    const getTooltipWidth = (imageMaxHeight: number) =>
      Math.min(
        MAX_TOOLTIP_WIDTH,
        window.innerWidth - VIEWPORT_GUTTER * 2,
        Math.max(
          MIN_TOOLTIP_WIDTH,
          imageMaxHeight * TOOLTIP_IMAGE_ASPECT_RATIO + 76
        )
      );

    const updatePosition = () => {
      const buttonRect = buttonRef.current?.getBoundingClientRect();
      if (!buttonRect) return;

      const panelHeight = tooltipRef.current?.offsetHeight ?? 0;
      const bottomSpace =
        window.innerHeight - buttonRect.bottom - TOOLTIP_GAP - VIEWPORT_GUTTER;
      const topSpace = buttonRect.top - TOOLTIP_GAP - VIEWPORT_GUTTER;
      const shouldPlaceAbove =
        bottomSpace < Math.min(panelHeight || 400, 400) &&
        topSpace > bottomSpace;

      if (shouldPlaceAbove) {
        const availableHeight = Math.max(MIN_TOOLTIP_HEIGHT, topSpace);
        const desiredHeight = panelHeight || Math.min(560, availableHeight);
        const imageMaxHeight = Math.max(
          150,
          availableHeight - TOOLTIP_CHROME_HEIGHT
        );
        const width = getTooltipWidth(imageMaxHeight);
        const left = Math.min(
          window.innerWidth - VIEWPORT_GUTTER - width,
          Math.max(VIEWPORT_GUTTER, buttonRect.right - width)
        );

        setPosition({
          left,
          top: Math.max(
            VIEWPORT_GUTTER,
            buttonRect.top -
              TOOLTIP_GAP -
              Math.min(desiredHeight, availableHeight)
          ),
          width,
          imageMaxHeight,
          placement: 'top',
        });
        return;
      }

      const top = buttonRect.bottom + TOOLTIP_GAP;
      const availableHeight = Math.max(
        MIN_TOOLTIP_HEIGHT,
        window.innerHeight - top - VIEWPORT_GUTTER
      );
      const imageMaxHeight = Math.max(
        150,
        availableHeight - TOOLTIP_CHROME_HEIGHT
      );
      const width = getTooltipWidth(imageMaxHeight);
      const left = Math.min(
        window.innerWidth - VIEWPORT_GUTTER - width,
        Math.max(VIEWPORT_GUTTER, buttonRect.right - width)
      );

      setPosition({
        left,
        top,
        width,
        imageMaxHeight,
        placement: 'bottom',
      });
    };

    updatePosition();
    const rafId = window.requestAnimationFrame(updatePosition);

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [open]);

  return (
    <div className="inline-flex items-center" ref={wrapperRef}>
      <button
        ref={buttonRef}
        type="button"
        onMouseEnter={showTooltip}
        onMouseLeave={scheduleClose}
        onFocus={showTooltip}
        onBlur={(event) => {
          const nextTarget = event.relatedTarget as Node | null;

          if (
            nextTarget &&
            (wrapperRef.current?.contains(nextTarget) ||
              tooltipRef.current?.contains(nextTarget))
          ) {
            return;
          }

          if (!isPinned) {
            closeTooltip();
          }
        }}
        onClick={togglePinned}
        className={`group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full border px-3.5 text-left transition-all duration-300 ${
          isPinned
            ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white shadow-[0_14px_32px_rgba(26,26,26,0.22)]'
            : 'border-primary/20 bg-white text-[#1a1a1a] shadow-[0_10px_30px_rgba(252,175,23,0.16)] hover:border-primary/40 hover:shadow-[0_16px_40px_rgba(252,175,23,0.22)]'
        }`}
        aria-label="Invoice number guide"
        aria-expanded={open}
        aria-controls={tooltipId}
        aria-pressed={isPinned}
      >
        <span
          className={`absolute inset-0 transition-opacity duration-300 ${
            isPinned
              ? 'bg-[radial-gradient(circle_at_top_right,rgba(252,175,23,0.28),transparent_48%)] opacity-100'
              : 'bg-[radial-gradient(circle_at_top_right,rgba(252,175,23,0.22),transparent_52%)] opacity-0 group-hover:opacity-100'
          }`}
        />
        <span
          className={`relative flex h-6 w-6 items-center justify-center rounded-full text-sm font-black ${
            isPinned
              ? 'bg-primary text-[#1a1a1a]'
              : 'bg-primary/15 text-primary'
          }`}
        >
          ?
        </span>
        <span className="relative hidden min-[420px]:flex flex-col leading-none">
          <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] opacity-55">
            Need Help
          </span>
          <span className="mt-1 text-[0.82rem] font-semibold">
            Find Invoice No.
          </span>
        </span>
      </button>

      {open &&
        position &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            id={tooltipId}
            ref={tooltipRef}
            onMouseEnter={showTooltip}
            onMouseLeave={scheduleClose}
            className="fixed z-[70] animate-[popIn_0.35s_cubic-bezier(0.16,1,0.3,1)]"
            style={{
              left: position.left,
              top: position.top,
              width: position.width,
              transformOrigin:
                position.placement === 'top' ? 'bottom right' : 'top right',
            }}
            role="dialog"
            aria-label="Invoice number guide"
          >
            <div
              className={`absolute right-6 h-4 w-4 rotate-45 rounded-[4px] border border-black/5 bg-white ${
                position.placement === 'top' ? '-bottom-2' : '-top-2'
              }`}
            />

            <div className="overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.18)]">
              <div className="relative overflow-hidden border-b border-black/5 bg-[linear-gradient(135deg,#fff8e3_0%,#ffffff_52%,#f7f7f7_100%)] px-5 py-5">
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/18 blur-2xl" />
                <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-[#1a1a1a]/4 blur-2xl" />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#7b5600] backdrop-blur-sm">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      Invoice Guide
                    </div>
                    <h5 className="mt-3 text-[1.2rem] font-extrabold leading-tight text-[#1a1a1a]">
                      Find the correct invoice digits before tracking
                    </h5>
                    <p className="mt-2 max-w-[28rem] text-[0.92rem] leading-relaxed text-[#5f5f5f]">
                      Match the highlighted receipt number from your physical
                      invoice, then type only the numeric digits into the form.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={closeTooltip}
                    className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/85 text-sm font-bold text-[#1a1a1a] shadow-sm transition-colors duration-200 hover:border-black/20 hover:bg-white"
                    aria-label="Close invoice guide"
                  >
                    x
                  </button>
                </div>
              </div>

              <div className="px-5 py-5">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-[0.72rem] font-semibold text-[#7b5600]">
                    Step 1: Use the sample receipt
                  </span>
                  <span className="rounded-full bg-[#1a1a1a]/5 px-3 py-1 text-[0.72rem] font-semibold text-[#555]">
                    Click the help button to keep this open
                  </span>
                </div>

                <div className="flex justify-center overflow-hidden rounded-[1.6rem] border border-black/6 bg-[radial-gradient(circle_at_top,#ffffff_0%,#f6f6f6_100%)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                  <img
                    src={tooltipImage}
                    alt="Darshan Transport invoice sample showing where the invoice number is located"
                    className="block h-auto w-auto max-w-full rounded-[1rem] shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
                    style={{ maxHeight: position.imageMaxHeight }}
                    loading="lazy"
                  />
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.25rem] border border-primary/14 bg-primary/6 px-4 py-3">
                    <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#7b5600]">
                      Enter This
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-relaxed text-[#1a1a1a]">
                      Only the digits, for example{' '}
                      <span className="text-primary">000111</span>.
                    </p>
                  </div>

                  <div className="rounded-[1.25rem] border border-black/7 bg-[#1a1a1a]/[0.03] px-4 py-3">
                    <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#666]">
                      Interaction
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-relaxed text-[#1a1a1a]">
                      Hover previews the guide. Click pins it open until you
                      close it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};
