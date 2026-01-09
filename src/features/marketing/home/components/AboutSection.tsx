import React from 'react';
import type { StatItem } from '../data/homeContent';

export interface AboutSectionProps {
  description: string;
  stats: StatItem[];
  animationSrc: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ description, animationSrc }) => (
  <section className="about-section">
    <div className="content">
      <h1 className="titleee"  style={{ color: '#fcaf17' }}>Your Cargo Deserve Care</h1>
      <div className="about-split">
        <p className="description">{description}</p>
        <img className="about-gif" src={animationSrc} alt="Our operations animated" loading="lazy" decoding="async" />
      </div>
      <h3 className="title">Why People Choose Us</h3>
    </div>
  </section>
);
