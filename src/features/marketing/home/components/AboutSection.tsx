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
      <ul
        className="features-list"
        style={{
          listStyle: 'none',
          padding: 0,
          marginTop: 24,
          display: 'flex',
          gap: 24,
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}
      >
        <li style={{ flex: '1 1 22%', maxWidth: 220, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ width: 64, height: 64, display: 'inline-block', color: '#fcaf17' }} aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} xmlns="http://www.w3.org/2000/svg" width="64" height="64">
              <path d="M3 7h13v10H3z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 9l3-2v10" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="7.5" cy="17.5" r="1.5" />
              <circle cx="18.5" cy="17.5" r="1.5" />
            </svg>
          </span>
          <span style={{ marginTop: 8, fontWeight: 600 }}>Fast Pickup &amp; Delivery</span>
        </li>
        <li style={{ flex: '1 1 22%', maxWidth: 220, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ width: 64, height: 64, display: 'inline-block', color: '#fcaf17' }} aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} xmlns="http://www.w3.org/2000/svg" width="64" height="64">
              <path d="M12 2v6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="14" r="6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 14l2-2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span style={{ marginTop: 8, fontWeight: 600 }}>Live Tracking</span>
        </li>
        <li style={{ flex: '1 1 22%', maxWidth: 220, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ width: 64, height: 64, display: 'inline-block', color: '#fcaf17' }} aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} xmlns="http://www.w3.org/2000/svg" width="64" height="64">
              <path d="M4 12c0-1.1.9-2 2-2h12" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 14l3 3 6-6 3 3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span style={{ marginTop: 8, fontWeight: 600 }}>Professional Handling</span>
        </li>
        <li style={{ flex: '1 1 22%', maxWidth: 220, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ width: 64, height: 64, display: 'inline-block', color: '#fcaf17' }} aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} xmlns="http://www.w3.org/2000/svg" width="64" height="64">
              <path d="M12 2l3 5 5 .5-4 3 1 5-5-3-5 3 1-5-4-3 5-.5L12 2z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span style={{ marginTop: 8, fontWeight: 600 }}>Support When You Need It</span>
        </li>
      </ul>
    </div>
  </section>
);
