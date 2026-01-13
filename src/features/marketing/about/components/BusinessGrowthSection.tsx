import React from 'react';
import './BusinessGrowthSection.css';

const growthStats = [
  {
    value: '10k',
    label: 'Warehousing Sq. ft',
  },
  {
    value: '5k',
    label: 'Delivery Partners',
  },
  {
    value: '2M',
    label: 'Orders Delivered',
  },
];

const BusinessGrowthSection: React.FC = () => {
  return (
    <section className="business-growth-section">
      <div className="business-growth-header">
        <span className="business-growth-title">ABOUT GROWTH</span>
        <h2 className="business-growth-subtitle">Enablers for your business growth</h2>
      </div>
      <div className="business-growth-stats">
        {growthStats.map((stat, idx) => (
          <div className="business-growth-stat" key={idx}>
            <span className="business-growth-value">{stat.value}</span>
            <span className="business-growth-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BusinessGrowthSection;
