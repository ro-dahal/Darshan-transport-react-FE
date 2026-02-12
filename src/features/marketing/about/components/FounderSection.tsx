import React from 'react';
import type { FounderProfile } from '../data/aboutContent';

export interface FounderSectionProps {
  profiles: FounderProfile[];
}

export const FounderSection: React.FC<FounderSectionProps> = ({ profiles }) => (
  <>
    {profiles.map((profile) => (
      <section key={profile.signatureLabel} className={`about-founder${profile.reverse ? ' reverse' : ''}`}>
        <div className="about-founder-container">
          <div className="about-founder-text-main">
            <h2>{profile.role}</h2>
          </div>

          <div className="about-founder-image">
            <img src={profile.image} alt={`${profile.signatureLabel} portrait`} />
          </div>

          <div className="about-founder-text">
            <p className="quote">{profile.quote}</p>
            <p className="founder-signature">
              .................................................................
              <br />
              <strong>{profile.signatureLabel}</strong>
              <br />
              <span>({profile.role.includes('Co-founder') ? 'Co-founder' : profile.role})</span>
            </p>
          </div>
        </div>
      </section>
    ))}
  </>
);
