import React from 'react';
import type { LogoItem } from '../data/homeContent';

export interface ClientsSectionProps {
  logos: LogoItem[];
}

export const ClientsSection: React.FC<ClientsSectionProps> = ({ logos }) => (
  <section className="clients">
    <h2>OUR CLIENTS</h2>
    <h3>TRUSTED BY THOUSANDS</h3>
    <div className="logo-carousel">
      <div className="logo-track">
        <div className="logo-set" aria-hidden="false">
          {logos.map((logo, index) => (
            <img key={`${logo.alt}-${index}`} src={logo.src} alt={logo.alt} loading="lazy" decoding="async" />
          ))}
        </div>
        <div className="logo-set" aria-hidden="true">
          {logos.map((logo, index) => (
            <img key={`dup-${logo.alt}-${index}`} src={logo.src} alt={`${logo.alt} Duplicate`} loading="lazy" decoding="async" />
          ))}
        </div>
      </div>
    </div>
  </section>
);
