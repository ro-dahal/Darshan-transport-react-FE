import React from 'react';
import type { StatItem } from '../data/homeContent';

export interface AboutSectionProps {
  description: string;
  stats: StatItem[];
  animationSrc: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ description, stats, animationSrc }) => (
  <section className="about-section">
    <div className="content">
      <h4 className="subtitlee">ABOUT US</h4>
      <h1 className="titlee">Logistic &amp; Transport Solutions</h1>
      <div className="about-split">
        <p className="description">{description}</p>
        <img className="about-gif" src={animationSrc} alt="Our operations animated" loading="lazy" decoding="async" />
      </div>
      <div className="stats">
        {stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <h2>{stat.value}</h2>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
