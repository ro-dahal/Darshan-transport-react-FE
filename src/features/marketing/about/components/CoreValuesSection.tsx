import React from 'react';
import type { CoreValueItem } from '../data/aboutContent';

export interface CoreValuesSectionProps {
  values: CoreValueItem[];
}

export const CoreValuesSection: React.FC<CoreValuesSectionProps> = ({ values }) => (
  <section className="core-values-section">
    <div className="core-values-container">
      <div className="values-grid">
        {values.map((value) => (
          <div className="value-card" key={value.title}>
            <div className="iconn">{value.icon}</div>
            <h3>{value.title}</h3>
            <p>{value.description}</p>
          </div>
        ))}
      </div>
      <div className="values-text">
        <h2>Our Core Values</h2>
        <p>
          At Upaya, our core values serve as the compass guiding our every endeavor, and we take our
          commitment seriously. Our unwavering dedication to customers is not just a promise; it’s a steadfast
          commitment to building trust by delivering on our commitments.
        </p>
        <p>
          Respect is the cornerstone of our interactions, fostering equal rights among all partners involved in
          our logistics network.
        </p>
        <p>
          We stand firm in our accountability, ensuring that every responsibility entrusted to us is met with
          diligence and reliability.
        </p>
        <p>
          Embracing innovation, we thrive on creating new logistics paradigms in the digital world, consistently
          pushing boundaries to enhance efficiency and redefine industry standards. At Upaya, achieving these
          core values isn’t just a goal—it’s a relentless pursuit, ingrained in our culture and driving us forward
          every day.
        </p>
      </div>
    </div>
  </section>
);
