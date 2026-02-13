import React, { useState, useEffect } from 'react';
import { SERVICES_ACCORDION_DATA, ALL_DISTRICTS } from '../data/servicesAccordionData';

export const Services: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showDistricts, setShowDistricts] = useState(false);

  // Scroll to anchor on mount or hash change if hash is present
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const anchor = hash.replace('#', '');
        const idx = SERVICES_ACCORDION_DATA.findIndex(s => s.id === anchor);
        if (idx !== -1) {
          setOpenIndex(idx);
          setTimeout(() => {
            const el = document.getElementById(anchor);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            // Second scroll after dropdown is open and rendered
            setTimeout(() => {
              const el2 = document.getElementById(anchor);
              if (el2) {
                el2.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 200);
          }, 100);
        }
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
    if (SERVICES_ACCORDION_DATA[idx].isArea) setShowDistricts(false);
  };

  return (
    <section className="bg-white text-[#222] py-14 pb-12 text-center">
      <h2 className="text-[2.2rem] font-extrabold text-primary mb-10 tracking-[0.5px] max-md:text-[1.3rem] max-md:mb-[18px]">Services</h2>
      <div className="max-w-[800px] mx-auto text-left max-md:w-full max-md:px-1">
        {SERVICES_ACCORDION_DATA.map((service, idx) => (
          <div
            className={`bg-[#f7f7f7] rounded-xl mb-[18px] overflow-hidden transition-shadow duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] ${openIndex === idx ? 'shadow-[0_6px_24px_rgba(252,175,23,0.13)]' : ''}`}
            key={idx}
            id={service.id}
          >
            <button
              className="w-full bg-none border-none outline-none text-xl max-md:text-base font-bold text-[#222] p-5 pr-7 flex items-center justify-between cursor-pointer transition-colors duration-200 hover:bg-primary hover:text-white max-md:p-[14px_16px_14px_10px]"
              onClick={() => handleToggle(idx)}
            >
              {service.title}
              <span className={`text-[1.1rem] ml-3 text-primary transition-colors duration-200 ${openIndex === idx ? '!text-[#222]' : ''}`}>
                {openIndex === idx ? '▲' : '▼'}
              </span>
            </button>
            <div
              className={`px-6 pb-[18px] pl-8 max-md:px-2 max-md:pb-2.5 max-md:pl-4 animate-fade-in ${openIndex === idx ? 'block' : 'hidden'}`}
            >
              <ul className="my-[18px] mb-2.5 ml-[18px] list-disc">
                {service.features.map((f, i) => (
                  <li key={i} className="text-[1.08rem] mb-2 text-[#444] leading-[1.6]">
                    {f === 'Full District Coverage List →' ? (
                      <span
                        className="text-primary cursor-pointer font-semibold underline"
                        role="button"
                        tabIndex={0}
                        onClick={() => setShowDistricts((v) => !v)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setShowDistricts((v) => !v);
                          }
                        }}
                      >
                        {f}
                      </span>
                    ) : f}
                  </li>
                ))}
              </ul>
              {service.isArea && showDistricts && (
                <div className="my-[18px] mb-2.5 bg-[#fffbe6] rounded-lg p-4 px-3 shadow-[0_2px_8px_rgba(252,175,23,0.08)] max-md:p-2.5 max-md:px-1">
                  <strong className="text-primary text-[1.1rem]">All 77 Districts:</strong>
                  <div className="flex flex-wrap gap-[10px_18px] mt-2.5 max-md:gap-[6px_8px]">
                    {ALL_DISTRICTS.map((d, i) => (
                      <span key={i} className="bg-primary text-white rounded-md px-2.5 py-1 text-[0.98rem] font-medium max-md:text-[0.85rem] max-md:px-1.5 max-md:py-[3px]">{d}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
