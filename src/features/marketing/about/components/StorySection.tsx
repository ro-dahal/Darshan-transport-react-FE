import React from 'react';
import type { StatItem } from '../data/aboutContent';

export interface StorySectionProps {
  description: string;
  stats: StatItem[];
  animationSrc: string;
}

export const StorySection: React.FC<StorySectionProps> = ({ description, stats, animationSrc }) => (
  <section className="about-section">
    <div className="content">
      <h4 className="subtitlee">COMPANY OVERVIEW</h4>
      <h1 className="titlee">Reliable bulk cargo transport across Nepal</h1>
      <div className="about-split">
        <p className="description">{description}</p>
        <img className="about-gif" src={animationSrc} alt="Our operations animated" loading="lazy" decoding="async" />
      </div>
    </div>
  </section>
);
