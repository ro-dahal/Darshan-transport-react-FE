import React from 'react';
import './Serve.css';

const serveData = [
  {
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm-1 15-5-5 1.41-1.42L11 13.17l5.59-5.59L18 9Z" fill="#111"/></svg>
    ),
    label: 'FMCG',
  },
  {
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8Zm-1-13h2v6h-2Zm0 8h2v2h-2Z" fill="#111"/></svg>
    ),
    label: 'Pharma',
  },
  {
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm0 16H5V5h14ZM7 7h10v2H7Zm0 4h10v2H7Zm0 4h7v2H7Z" fill="#111"/></svg>
    ),
    label: 'Electronics',
  },
  {
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><path d="M16.24 11.51a6.5 6.5 0 1 0-8.48 0A7.5 7.5 0 0 0 12 21a7.5 7.5 0 0 0 4.24-9.49ZM12 19a5.5 5.5 0 0 1-4.47-8.74l.71-.71a4.5 4.5 0 0 1 7.52 0l.71.71A5.5 5.5 0 0 1 12 19Zm-1-7h2v2h-2Z" fill="#111"/></svg>
    ),
    label: 'E-Electronics',
  },
  {
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8Zm-1-13h2v6h-2Zm0 8h2v2h-2Z" fill="#111"/></svg>
    ),
    label: 'Retail & Wholesale',
  },
  {
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8Zm-1-13h2v6h-2Zm0 8h2v2h-2Z" fill="#111"/></svg>
    ),
    label: 'Manufacturing',
  },
];

const Serve: React.FC = () => (
  <section className="serve-section">
    <h2 className="serve-title">INDUSTRIES WE SERVE</h2>
    <div className="serve-grid">
      {serveData.map((item, idx) => (
        <div className="serve-card" key={idx}>
          <div className="serve-icon">{item.icon}</div>
          <div className="serve-label">{item.label}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Serve;
