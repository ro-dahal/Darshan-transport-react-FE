import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OfficeLocationsSection.css';

const locations = [
  {
    city: 'Kathmandu',
    area: 'PepsiCola',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  },
  {
    city: 'Pokhara',
    area: 'Ramghat',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
  },
  {
    city: 'Chitwan',
    area: 'Beltadi - 2',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80',
  },
  {
    city: 'Hetauda',
    area: 'Hupra Chour-4',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  },
];


export const OfficeLocationsSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="office-locations-section">
      <h2 className="office-locations-title">
        We are pleased to have an in-person conversation if you are<br />
        near any of our office sites.
      </h2>
      <div className="office-locations-cards">
        {locations.map((loc) => (
          <div className="office-location-card" key={loc.city + loc.area} style={{ backgroundImage: `url(${loc.image})` }}>
            <div className="office-location-overlay">
              <span className="office-location-city">{loc.city}</span>
              <span className="office-location-area">{loc.area}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="office-locations-pagination">
        <span className="office-locations-dot active"></span>
      </div>
      <div className="office-locations-action">
        <button className="office-locations-btn" onClick={() => navigate('/get-quote')}>View All Locations</button>
      </div>
    </section>
  );
};
