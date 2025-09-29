import React from 'react';

export interface ServicesHeroProps {
  backgroundImage: string;
  title: string;
  description: string;
}

export const ServicesHero: React.FC<ServicesHeroProps> = ({ backgroundImage, title, description }) => (
  <section
    className="services-hero"
    style={{
      backgroundImage: `url(${backgroundImage})`,
    }}
  >
    <div className="hero-content">
      <h1>{title}</h1>
      <p>{description}</p>
      <a href="/contact" className="cta-button" style={{ marginTop: 24, display: 'inline-block' }}>
        Contact Us
      </a>
    </div>
  </section>
);
