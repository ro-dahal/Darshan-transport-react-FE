import React from 'react';

export interface HeroSectionProps {
  description: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ description }) => (
  <section id="main-bg">
    <section id="hero">
      <h4>Darshan Transport</h4>
      <h1>Logistics &amp; Transport</h1>
      <h1>Solutions</h1>
      <p>{description}</p>
      <button id="but">
        <a href="/contact">Get Started</a>
      </button>
    </section>
  </section>
);
