import React from 'react';
import { OUR_SERVICES_DATA } from '../data/homeContent';
import './OurServices.css';

export const OurServices: React.FC = () => (
  <section className="our-services">
    <div className="container">
      <h2 className="kicker">OUR SERVICES</h2>
      <h3 className="headline">WE MOVE EVERYTHING THAT MATTERS.</h3>

      <div className="services-grid">
        {OUR_SERVICES_DATA.map((s) => (
          <article className="service-card" key={s.title}>
            <span className="service-icon" aria-hidden>
              {/* simple outlined box/truck style icon using currentColor */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="4" width="14" height="11" rx="1.5" />
                <path d="M15 8h4l3 3v4" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="6.5" cy="17.5" r="1.5" />
                <circle cx="18.5" cy="17.5" r="1.5" />
              </svg>
            </span>
            <div className="service-body">
              <h4 className="service-title">{s.title}</h4>
              <p className="service-desc">{s.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default OurServices;
