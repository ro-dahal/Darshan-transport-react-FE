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
      <h1 className="titlee" style={{ color: 'var(--primary)' }}>Your Cargo Deserves Care</h1>
      <div className="about-split">
        <p className="description">{description}</p>
        <img className="about-gif" src={animationSrc} alt="Our operations animated" loading="lazy" decoding="async" />
      </div>
      <h3 className="title">Why People Choose Us</h3>
      <ul className="features-list">
        <li className="feature-item">
          <span className="feature-icon" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} xmlns="http://www.w3.org/2000/svg" width="64" height="64">
              <path d="M3 7h13v10H3z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 9l3-2v10" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="7.5" cy="17.5" r="1.5" />
              <circle cx="18.5" cy="17.5" r="1.5" />
            </svg>
          </span>
          <span className="feature-text">Fast Pickup & Delivery</span>
        </li>
        <li className="feature-item">
          <span className="feature-icon" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} xmlns="http://www.w3.org/2000/svg" width="64" height="64">
              <path d="M12 2v6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="14" r="6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 14l2-2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="feature-text">Live Tracking</span>
        </li>
        <li className="feature-item">
          <span className="feature-icon" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} xmlns="http://www.w3.org/2000/svg" width="64" height="64">
              <rect x="3" y="4" width="18" height="12" rx="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 8h10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 12h10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 16h10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="feature-text">Professional Handling</span>
        </li>
        <li className="feature-item">
          <span className="feature-icon" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} xmlns="http://www.w3.org/2000/svg" width="64" height="64">
              <path d="M12 2l3 5 5 .5-4 3 1 5-5-3-5 3 1-5-4-3 5-.5L12 2z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="feature-text">Support When You Need It</span>
        </li>
      </ul>
    </div>
  </section>
);
