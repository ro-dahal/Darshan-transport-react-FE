import React, { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import tooltipImage from '../../../assets/img/CheckDeliveryStatusToolTip.jpg';
import {
  getInvoiceTooltipPosition,
  type InvoiceTooltipPosition,
} from './invoiceTooltipPosition';
import { InvoiceTooltipPanel } from './InvoiceTooltipPanel';

const HOVER_CLOSE_DELAY_MS = 120;

export const InvoiceTooltip: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [position, setPosition] = useState<InvoiceTooltipPosition | null>(null);
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

    const updatePosition = () => {
      const buttonRect = buttonRef.current?.getBoundingClientRect();
      if (!buttonRect) return;

      setPosition(
        getInvoiceTooltipPosition({
          viewport: {
            width: window.innerWidth,
            height: window.innerHeight,
          },
          buttonRect: {
            top: buttonRect.top,
            right: buttonRect.right,
            bottom: buttonRect.bottom,
          },
          panelHeight: tooltipRef.current?.offsetHeight ?? 0,
        })
      );
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
        className={`group relative inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
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
          className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
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

            <div style={{ maxHeight: position.maxHeight }}>
              <InvoiceTooltipPanel
                imageMaxHeight={position.imageMaxHeight}
                imageSrc={tooltipImage}
              />
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
