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
          {!profile.reverse && (
            <div className="about-founder-text">
              <h2>{profile.role}</h2>
              <p className="quote">{profile.quote}</p>
              <p className="founder-signature">
                .................................................................
                <br />
                <strong>{profile.signatureLabel}</strong>
                <br />
                <span>({profile.role.includes('Co') ? 'Co-founder' : 'Founder'})</span>
              </p>
            </div>
          )}

          <div className="about-founder-image">
            <img src={profile.image} alt={`${profile.signatureLabel} portrait`} />
          </div>

          {profile.reverse && (
            <div className="about-founder-text">
              <h2>{profile.role}</h2>
              <p className="quote">{profile.quote}</p>
              <p className="founder-signature">
                .................................................................
                <br />
                <strong>{profile.signatureLabel}</strong>
                <br />
                <span>({profile.role})</span>
              </p>
            </div>
          )}
        </div>
      </section>
    ))}
  </>
);
