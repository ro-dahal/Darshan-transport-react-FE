import React from 'react';

export const CallToActionSection: React.FC = () => (
  <section className="cta-section">
    <div className="cta-container">
      <h2>
        Ready to send your Goods?
        <br />
        We'll ahndle the heavy lifting.
      </h2>
      <a href="/contact" className="cta-button">
        Book a Delivey
      </a>
      <a href="/contact" className="cta-button">
        Track Your Shipment
      </a>
    </div>
  </section>
);
