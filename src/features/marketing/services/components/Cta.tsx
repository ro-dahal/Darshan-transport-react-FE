import React from 'react';

const CtaSection: React.FC = () => (
  <section className="cta-section-services">
    <h2 className="cta-title">Ready for faster, smoother logistics?</h2>
    <div className="cta-buttons">
      <a href="/get-quote" className="cta-btn cta-primary">Get a Quote</a>
      <a href="/contact" className="cta-btn">Contact Us</a>
      <a href="tel:+9779809991233" className="cta-btn">Call Now</a>
    </div>
  </section>
);

export default CtaSection;
