import React from 'react';
import { Link } from 'react-router-dom';

export const CallToActionSection: React.FC = () => (
  <section className="cta-section">
    <div className="cta-container">
      <h2>
        Ready to send your Goods?
        <br />
        We'll handle the heavy lifting.
      </h2>
      <Link to="/contact" className="cta-button">
        Book a Delivery
      </Link>
      <Link to="/order" className="cta-button">
        Track Your Shipment
      </Link>
    </div>
  </section>
);
