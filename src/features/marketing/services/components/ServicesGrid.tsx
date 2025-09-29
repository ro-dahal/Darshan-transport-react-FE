import React from 'react';
import type { ServiceCard } from '../data/servicesContent';

export interface ServicesGridProps {
  services: ServiceCard[];
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ services }) => (
  <section className="services-section">
    <div className="container">
      <div className="section-subtitle">What We Offer</div>
      <div className="section-title">Our Core Services</div>
      <div className="services-grid">
        {services.map((service) => (
          <div className="service-card" key={service.label}>
            <div className="iconnn">
              {service.iconType === 'image' ? (
                <img src={service.icon} alt={`${service.label} icon`} style={{ width: 36 }} loading="lazy" decoding="async" />
              ) : (
                service.icon
              )}
            </div>
            <h4>{service.label}</h4>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
