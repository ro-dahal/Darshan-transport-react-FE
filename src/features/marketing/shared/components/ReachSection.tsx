import React from "react";

export interface ReachSectionProps {
  mapImage: string;
}

export const ReachSection: React.FC<ReachSectionProps> = ({ mapImage }) => (
  <section className="our-reach">
    <div className="wave-top">
      <svg viewBox="0 0 1440 150" preserveAspectRatio="none">
        <path
          d="M0,64 C360,160 1080,0 1440,96 L1440,0 L0,0 Z"
          fill="#f2f2f2"
        ></path>
      </svg>
    </div>
    <h2>Our Reach</h2>
    <img
      src={mapImage}
      alt="Map of Nepal"
      className="nepal-map"
      loading="lazy"
      decoding="async"
    />
  </section>
);
