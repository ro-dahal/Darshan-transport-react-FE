import React from "react";
import type { CoreValueItem } from "../data/aboutContent";

export interface CoreValuesSectionProps {
  values: CoreValueItem[];
}

export const CoreValuesSection: React.FC<CoreValuesSectionProps> = ({
  values,
}) => (
  <section className="core-values-section">
    <div className="values-text">
        <h2>Why Choose Us</h2>
      </div>
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
      
    </div>
  </section>
);
