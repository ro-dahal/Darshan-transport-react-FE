import React from 'react';

export interface HeroSectionProps {
  description: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ description }) => (
  <section id="main-bg">
    <section id="hero">
      <h1>Nationwide Delivery</h1>
      <h1 style={{ color: '#fcaf17' }}>Zero Hassle</h1>
      <p>{description}</p>
      <button id="but">
        <a href="/contact">Get Started</a>
      </button>
    </section>
  </section>
);
