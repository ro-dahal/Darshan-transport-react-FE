import React from 'react';

// Example imports for images and icons (replace with your actual icons)
import bgImage from '../assets/img/bg.jpg'; // background image for hero section
import iconTruck from '../assets/img/cargo-truck.png';
import iconDelivery from '../assets/img/user.png';
import iconFactory from '../assets/img/working-factory.png';

const Services: React.FC = () => {
  return (
    <>
      <section
        className="services-hero"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <div className="hero-content">
          <h1>Our Services</h1>
          <p>
            Darshan Transport offers a comprehensive suite of logistics, warehousing services, and transport solutions, tailored to meet the evolving needs of businesses across Nepal and beyond. Our commitment to reliability, efficiency, and customer satisfaction drives us to deliver excellence in every shipment.
          </p>
          {/* CTA Button just below the hero text */}
          <a href="/contact" className="cta-button" style={{ marginTop: 24, display: 'inline-block' }}>
            Contact Us
          </a>
        </div>
      </section>

      <section className="growth-section">
        <div className="growth-container">
          <h4>Our Growth</h4>
          <h2>Driven by Results</h2>
          <div className="growth-stats">
            <div className="stat">
              <div className="number">100k+</div>
              <div className="label">Deliveries</div>
            </div>
            <div className="stat">
              <div className="number">80k+</div>
              <div className="label">Customers</div>
            </div>
            <div className="stat">
              <div className="number">20k+</div>
              <div className="label">Reviews</div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          <div className="section-subtitle">What We Offer</div>
          <div className="section-title">Our Core Services</div>
          <div className="services-grid">
            <div className="service-card">
              <div className="iconnn">
                <img src={iconTruck} alt="Transport Service" style={{ width: 36 }} />
              </div>
              <h4>Logistics &amp; Transportation</h4>
              <p>
                Reliable and timely transportation services across Nepal, with a modern fleet and advanced tracking for complete transparency and peace of mind.
              </p>
            </div>
            <div className="service-card">
              <div className="iconnn">
                <img src={iconDelivery} alt="Delivery Service" style={{ width: 36 }} />
              </div>
              <h4>Door-to-Door Delivery</h4>
              <p>
                We ensure your packages reach their destination safely and on schedule, whether in urban centers or remote locations.
              </p>
            </div>
            <div className="service-card">
              <div className="iconnn">
                <img src={iconFactory} alt="Warehousing" style={{ width: 36 }} />
              </div>
              <h4>Warehousing Solutions</h4>
              <p>
                Secure, convenient, and scalable warehousing for all your storage and distribution needs, with seamless inventory management.
              </p>
            </div>
            <div className="service-card">
              <div className="iconnn">📦</div>
              <h4>Parcel &amp; Freight Handling</h4>
              <p>
                Specialized handling and management of parcels and freight, ensuring safety and compliance from pickup to delivery.
              </p>
            </div>
            <div className="service-card">
              <div className="iconnn">🗺️</div>
              <h4>Route Optimization</h4>
              <p>
                Advanced route planning for efficient and timely deliveries, reducing transit time and costs for your business.
              </p>
            </div>
            <div className="service-card">
              <div className="iconnn">🔒</div>
              <h4>Secure Cargo</h4>
              <p>
                Comprehensive security protocols to protect your valuable goods at every stage of the logistics journey.
              </p>
            </div>
          </div>
          
        </div>
      </section>
    </>
  );
};

export default Services;