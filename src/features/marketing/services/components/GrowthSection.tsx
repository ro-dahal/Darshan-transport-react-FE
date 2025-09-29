import React from 'react';

export interface GrowthSectionProps {
  stats: { value: string; label: string }[];
}

export const GrowthSection: React.FC<GrowthSectionProps> = ({ stats }) => (
  <section className="growth-section">
    <div className="growth-container">
      <h4>Our Growth</h4>
      <h2>Driven by Results</h2>
      <div className="growth-stats">
        {stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <div className="number">{stat.value}</div>
            <div className="label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
