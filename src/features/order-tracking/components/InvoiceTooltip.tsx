import React, { useState, useRef, useEffect } from 'react';
import tooltipImage from '../../../assets/img/CheckDeliveryStatusToolTip.jpg';

export const InvoiceTooltip: React.FC = () => {
  const [open, setOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative inline-flex items-center" ref={tooltipRef}>
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-[#1a1a1a] text-sm font-bold cursor-pointer border-none shadow-[0_4px_12px_rgba(255,184,0,0.3)] hover:scale-110 active:scale-95 transition-all duration-300 relative z-30"
        aria-label="Where to find your invoice number"
      >
        ?{/* Pulsing ring for visibility */}
        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20 pointer-events-none" />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-4 z-50 bg-white rounded-[2rem] shadow-[0_30px_90px_rgba(0,0,0,0.2)] border border-gray-100 p-6 w-[600px] max-w-[90vw] animate-[popIn_0.4s_cubic-bezier(0.16,1,0.3,1)]"
          style={{ transformOrigin: 'top right' }}
        >
          {/* Subtle top indicator */}
          <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl">
                📄
              </div>
              <div>
                <h5 className="text-[1.1rem] font-bold text-[#1a1a1a]">
                  Invoice Number Guide
                </h5>
                <p className="text-[0.85rem] text-gray-500">
                  Find the digits highlighted in your physical receipt below
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-2xl">
              <img
                src={tooltipImage}
                alt="Darshan Transport Invoice Sample"
                className="w-full h-auto scale-105 hover:scale-100 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>

            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2 text-[0.75rem] text-gray-400 italic">
              <span>
                💡 Note: Enter only the numeric digits (e.g., 000111).
              </span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: translateY(15px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};
