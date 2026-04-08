import React, { useCallback, useEffect, useRef, useState } from 'react';
import quotationEng from '../../assets/img/QuotationRate2082Chaitra22Eng.jpeg';
import quotationNep from '../../assets/img/QuotationRate2082Chaitra22Nep.jpeg';

const STORAGE_KEY = 'dt_quotation_popup_seen_2082_chaitra22';
const OPEN_DELAY_MS = 800;
const CLOSE_DELAY_MS = 300;

const slides = [
  {
    src: quotationEng,
    alt: 'Quotation rate notice in English',
    label: 'English',
  },
  {
    src: quotationNep,
    alt: 'Quotation rate notice in Nepali',
    label: 'नेपाली',
  },
] as const;

const hasSeenNotice = (): boolean => {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

const markNoticeSeen = (): void => {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, 'true');
  } catch {
    // Ignore storage failures so the popup still closes cleanly.
  }
};

export const ImportantNoticePopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (hasSeenNotice()) {
      return undefined;
    }

    const timerId = window.setTimeout(() => {
      setIsVisible(true);
    }, OPEN_DELAY_MS);

    return () => window.clearTimeout(timerId);
  }, []);

  const handleClose = useCallback(() => {
    if (isClosing) {
      return;
    }

    setIsClosing(true);

    closeTimerRef.current = window.setTimeout(() => {
      markNoticeSeen();
      setIsVisible(false);
      setIsClosing(false);
    }, CLOSE_DELAY_MS);
  }, [isClosing]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleClose, isVisible]);

  useEffect(() => {
    if (isVisible && !isClosing) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }

    document.body.style.overflow = '';
    return undefined;
  }, [isClosing, isVisible]);

  if (!isVisible) {
    return null;
  }

  const goToPreviousSlide = () => {
    setActiveSlide((currentSlide) =>
      currentSlide === 0 ? slides.length - 1 : currentSlide - 1
    );
  };

  const goToNextSlide = () => {
    setActiveSlide((currentSlide) =>
      currentSlide === slides.length - 1 ? 0 : currentSlide + 1
    );
  };

  return (
    <div
      className={`fixed inset-0 z-[100000] flex items-center justify-center p-4 transition-all duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(6px)',
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Important notice"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        onClick={handleClose}
        aria-label="Close notice"
      />

      <div
        className={`relative max-h-[90vh] w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        onClick={(event) => event.stopPropagation()}
        role="presentation"
      >
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{
            background: 'linear-gradient(135deg, #fcaf17 0%, #e09500 100%)',
          }}
        >
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <h2 className="text-sm font-bold uppercase tracking-wide text-white">
              Important Notice
            </h2>
          </div>

          <button
            type="button"
            onClick={() => {
              handleClose();
            }}
            className="group flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/40"
            aria-label="Close notice"
          >
            <svg
              className="h-4 w-4 text-white transition-transform group-hover:scale-110"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="relative">
          <div
            className="overflow-hidden"
            style={{ maxHeight: 'calc(90vh - 120px)' }}
          >
            <img
              src={slides[activeSlide].src}
              alt={slides[activeSlide].alt}
              className="h-auto w-full object-contain"
              loading="eager"
            />
          </div>

          {slides.length > 1 ? (
            <>
              <button
                type="button"
                onClick={goToPreviousSlide}
                className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
                aria-label="Previous notice"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                type="button"
                onClick={goToNextSlide}
                className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
                aria-label="Next notice"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          ) : null}
        </div>

        <div className="flex items-center justify-center gap-3 border-t border-gray-100 bg-gray-50 py-3">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.label}
              type="button"
              onClick={() => setActiveSlide(slideIndex)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                slideIndex === activeSlide
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
              }`}
              aria-label={`View ${slide.label} notice`}
            >
              <span
                className={`h-2 w-2 rounded-full transition-colors ${
                  slideIndex === activeSlide ? 'bg-white' : 'bg-gray-400'
                }`}
              />
              {slide.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
