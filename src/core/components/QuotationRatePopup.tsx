import React, { useState, useEffect, useCallback } from 'react';
import quotationEng from '../../assets/img/QuotationRate2082Chaitra22Eng.jpeg';
import quotationNep from '../../assets/img/QuotationRate2082Chaitra22Nep.jpeg';

const STORAGE_KEY = 'dt_quotation_popup_seen_2082_chaitra22';

const slides = [
  {
    src: quotationEng,
    alt: 'Quotation Rate Notice – English',
    label: 'English',
  },
  {
    src: quotationNep,
    alt: 'Quotation Rate Notice – नेपाली',
    label: 'नेपाली',
  },
];

export const QuotationRatePopup: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem(STORAGE_KEY);
    if (!alreadySeen) {
      // Small delay so the page renders first
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
      sessionStorage.setItem(STORAGE_KEY, 'true');
    }, 300);
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible, handleClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (visible && !closing) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible, closing]);

  if (!visible) return null;

  return (
    <div
      id="quotation-rate-popup-overlay"
      className={`fixed inset-0 z-[100000] flex items-center justify-center p-4 transition-all duration-300 ${
        closing ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        backgroundColor: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(6px)',
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Quotation Rate Notice"
    >
      {/* Invisible backdrop button for closing */}
      <button
        className="absolute inset-0 w-full h-full cursor-pointer"
        style={{ background: 'transparent', border: 'none' }}
        onClick={handleClose}
        aria-label="Close popup"
        tabIndex={-1}
      />

      {/* Modal container */}
      <div
        id="quotation-rate-popup-modal"
        className={`relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-lg w-full transform transition-all duration-300 ${
          closing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        style={{ maxHeight: '90vh' }}
      >
        {/* Header bar */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{
            background: 'linear-gradient(135deg, #fcaf17 0%, #e09500 100%)',
          }}
        >
          <div className="flex items-center gap-2">
            {/* Bell icon */}
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <h2 className="text-white font-bold text-sm tracking-wide uppercase">
              Important Notice
            </h2>
          </div>
          <button
            id="quotation-rate-popup-close"
            onClick={handleClose}
            className="group flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 transition-colors cursor-pointer"
            aria-label="Close popup"
          >
            <svg
              className="w-4 h-4 text-white group-hover:scale-110 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Image container */}
          <div
            className="overflow-hidden"
            style={{ maxHeight: 'calc(90vh - 120px)' }}
          >
            <img
              src={slides[activeSlide].src}
              alt={slides[activeSlide].alt}
              className="w-full h-auto object-contain"
              loading="eager"
            />
          </div>

          {/* Navigation arrows */}
          {slides.length > 1 && (
            <>
              <button
                id="quotation-popup-prev"
                onClick={() =>
                  setActiveSlide((p) => (p === 0 ? slides.length - 1 : p - 1))
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-sm"
                aria-label="Previous slide"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                id="quotation-popup-next"
                onClick={() =>
                  setActiveSlide((p) => (p === slides.length - 1 ? 0 : p + 1))
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-sm"
                aria-label="Next slide"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Footer with dot indicators and language labels */}
        <div className="flex items-center justify-center gap-3 py-3 bg-gray-50 border-t border-gray-100">
          {slides.map((slide, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                i === activeSlide
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
              }`}
              aria-label={`View ${slide.label} version`}
            >
              <span
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === activeSlide ? 'bg-white' : 'bg-gray-400'
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
