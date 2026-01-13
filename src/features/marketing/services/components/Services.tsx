import React, { useState, useEffect } from 'react';
import './Services.css';

const servicesData = [
  {
    id: 'warehouse-inventory',
    title: 'Warehouse & Inventory Management',
    features: [
      'Secure warehouse space',
      'Barcode tracking',
      'Daily stock reports',
      'Pick & pack',
      'Reconciliation',
    ],
    seo: 'warehouse Nepal, inventory management Nepal',
  },
  {
    id: 'distribution-delivery',
    title: 'Distribution & Delivery',
    features: [
      'City-to-city shipment',
      'B2B & B2C delivery',
      'Wholesale distribution',
      'Same-day dispatch',
      'Return handling',
    ],
    seo: 'logistics Nepal, delivery Nepal, distribution Nepal',
  },
  {
    id: 'third-party-logistics',
    title: 'Third-Party Logistics (3PL)',
    features: [
      'Storage',
      'Packaging',
      'Shipping',
      'Tracking',
      'Reverse logistics',
    ],
    seo: '3PL Nepal, fulfillment Nepal',
  },
  {
    id: 'packaging-handling',
    title: 'Packaging & Handling',
    features: [
      'Packaging',
      'Handling',
      'Custom packing solutions',
      'Safe transit',
      'Labeling',
    ],
    seo: 'packaging Nepal, handling Nepal',
  },
  {
    id: 'fleet-services',
    title: 'Fleet Services',
    features: [
      'Vehicles & drivers',
      'Route planning',
      'Daily/monthly contracts',
      'Maintenance included',
    ],
    seo: 'fleet Nepal, transport rental Nepal',
  },
  {
    id: 'service-area',
    title: 'Service Areas',
    features: [
      'Kathmandu Valley',
      'Pokhara',
      'Itahari',
      'Biratnagar',
      'Butwal',
      'Nepalgunj',
      'Full District Coverage List →',
    ],
    seo: 'logistics Kathmandu, cargo Biratnagar, Nepalgunj delivery',
    isArea: true,
  },
];

const allDistricts = [
  'Bhojpur', 'Dhankuta', 'Ilam', 'Jhapa', 'Khotang', 'Morang', 'Okhaldhunga', 'Panchthar', 'Sankhuwasabha', 'Solukhumbu', 'Sunsari', 'Taplejung', 'Terhathum', 'Udayapur',
  'Bara', 'Dhanusa', 'Mahottari', 'Parsa', 'Rautahat', 'Saptari', 'Sarlahi', 'Siraha',
  'Bhaktapur', 'Chitwan', 'Dhading', 'Dolakha', 'Kathmandu', 'Kavrepalanchok', 'Lalitpur', 'Makwanpur', 'Nuwakot', 'Ramechhap', 'Rasuwa', 'Sindhuli', 'Sindhupalchok',
  'Baglung', 'Gorkha', 'Kaski', 'Lamjung', 'Manang', 'Mustang', 'Myagdi', 'Nawalpur', 'Parbat', 'Syangja', 'Tanahun',
  'Arghakhanchi', 'Banke', 'Bardiya', 'Dang', 'Eastern Rukum', 'Gulmi', 'Kapilvastu', 'Parasi', 'Palpa', 'Pyuthan', 'Rolpa', 'Rupandehi',
  'Dailekh', 'Dolpa', 'Humla', 'Jajarkot', 'Jumla', 'Kalikot', 'Mugu', 'Salyan', 'Surkhet', 'Western Rukum',
  'Achham', 'Baitadi', 'Bajhang', 'Bajura', 'Dadeldhura', 'Darchula', 'Doti', 'Kailali', 'Kanchanpur',
];

const Services: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showDistricts, setShowDistricts] = useState(false);


  // Scroll to anchor on mount or hash change if hash is present
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const anchor = hash.replace('#', '');
        const idx = servicesData.findIndex(s => s.id === anchor);
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
    if (servicesData[idx].isArea) setShowDistricts(false);
  };

  return (
    <section className="services-section">
      <h2 className="services-main-title">Services</h2>
      <div className="services-dropdowns">
        {servicesData.map((service, idx) => (
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
                      <span className="districts-toggle" onClick={() => setShowDistricts((v) => !v)}>
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
                    {allDistricts.map((d, i) => (
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
