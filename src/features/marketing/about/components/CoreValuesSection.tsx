import React from "react";
import type { CoreValueItem } from "../data/aboutContent";

export interface CoreValuesSectionProps {
  values: CoreValueItem[];
}

import infoImg from '../../../../../src/assets/img/infog.png';

export const CoreValuesSection: React.FC<CoreValuesSectionProps> = ({ values }) => (
  <section className="core-values-section core-values-horizontal">
    <div className="core-value-heading">
      <h2>Why Choose Us</h2>
    </div>
    <div className="core-values-horizontal-grid">
      {values.map((value) => (
        <div className="core-value-row" key={value.title}>
          <div className="core-value-icon-col">
            <span className="core-value-icon">{value.icon}</span>
          </div>
          <div className="core-value-content-col">
            <h3>{value.title}</h3>
            <p>{value.description}</p>
          </div>
        </div>
      ))}
    </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
      <img src={infoImg} alt="Info" style={{ maxWidth: 1080, width: '100%', height: 'auto' }} />
    </div>
  </section>
);
