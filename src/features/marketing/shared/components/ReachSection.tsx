import React from "react";
import NepalMap from "../../../../layout/components/MapOfNepal/map";

export const ReachSection: React.FC = () => (
  <section className="our-reach">
    <div className="wave-top">
      <svg viewBox="0 0 1440 150" preserveAspectRatio="none">
        <path
          d="M0,64 C360,160 1080,0 1440,96 L1440,0 L0,0 Z"
          fill="#dadada"
        ></path>
      </svg>
    </div>
    <h2>Our Reach</h2>
    <NepalMap style={{ maxWidth: "100%", margin: "0 auto" }} />
  </section>
);
