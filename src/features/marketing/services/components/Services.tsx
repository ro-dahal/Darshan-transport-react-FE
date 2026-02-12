import React, { useState, useEffect } from 'react';
import './Services.css';
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
    <section className="services-section">
      <h2 className="services-main-title">Services</h2>
      <div className="services-dropdowns">
        {SERVICES_ACCORDION_DATA.map((service, idx) => (
          <div
            className={`service-dropdown${openIndex === idx ? ' open' : ''}`}
            key={idx}
            id={service.id}
          >
            <button className="service-dropdown-title" onClick={() => handleToggle(idx)}>
              {service.title}
              <span className="dropdown-arrow">{openIndex === idx ? '▲' : '▼'}</span>
            </button>
            <div className="service-dropdown-content" style={{ display: openIndex === idx ? 'block' : 'none' }}>
              <ul className="service-features">
                {service.features.map((f, i) => (
                  <li key={i}>
                    {f === 'Full District Coverage List →' ? (
                      <span
                        className="districts-toggle"
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
                <div className="districts-list">
                  <strong>All 77 Districts:</strong>
                  <div className="districts-grid">
                    {ALL_DISTRICTS.map((d, i) => (
                      <span key={i} className="district-item">{d}</span>
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
