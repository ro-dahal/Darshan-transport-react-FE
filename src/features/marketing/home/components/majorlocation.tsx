import React from 'react';
import { MAJOR_LOCATIONS } from '../data/homeContent';
import './OurServices.css';

const MajorLocation: React.FC = () => {
  return (
    <section
      className="major-locations"
      style={{
        background: '#6e6e6e',
        padding: '56px 20px',
        color: '#ffffff',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 className="kicker">WE DELIVER ACROSS NEPAL</h2>
        <h3 className="headline">FROM MAJOR CITIES TO REMOTE TOWNS</h3>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', flexWrap: 'wrap' }}>
          {MAJOR_LOCATIONS.map((column, colIdx) => (
            <ul key={colIdx} style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'left', minWidth: '200px' }}>
              {column.map((loc, locIdx) => (
                <li key={locIdx} style={{ marginBottom: 14 }}> - {loc}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MajorLocation;
