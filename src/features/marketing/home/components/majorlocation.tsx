import React from 'react'
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
      <div style={{maxWidth: 1100, margin: '0 auto'}}>
        <h2 className="kicker">WE DELIVER ACROSS NEPAL</h2>
        <h3 className="headline">FROM MAJOR CITIES TO REMOTE TOWNS</h3>

        <div style={{display: 'flex', justifyContent: 'center', gap: 500}}>
          <ul style={{listStyle: 'none', padding: 0, margin: 0, textAlign: 'left'}}>
            <li style={{marginBottom: 14}}> - Kathmandu Valley</li>
            <li style={{marginBottom: 14}}> - Pokhara</li>
            <li style={{marginBottom: 14}}> - Butwal</li>
            <li style={{marginBottom: 14}}> - Narayanghat</li>
            <li style={{marginBottom: 14}}> - Biratnagar</li>
          </ul>

          <ul style={{listStyle: 'none', padding: 0, margin: 0, textAlign: 'left'}}>
            <li style={{marginBottom: 14}}> - Nepalgunj</li>
            <li style={{marginBottom: 14}}> - Dhangadhi</li>
            <li style={{marginBottom: 14}}> - Jhapa</li>
            <li style={{marginBottom: 14}}> - Illam</li>
            <li style={{marginBottom: 14}}> - Birjung</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default MajorLocation
