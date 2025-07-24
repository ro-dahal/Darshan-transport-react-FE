import React from 'react';

// Example imports, update paths as needed
import logo from '../assets/img/logo.png';
import cargoTruck from '../assets/img/cargo-truck.png';
import rightArrow from '../assets/img/right-arrow.png';
import userIcon from '../assets/img/user.png';
import factory from '../assets/img/working-factory.png';
import nepalMap from '../assets/img/nepal-map.png';
import clientLogo1 from '../assets/img/Logo-01.png';
import clientLogo2 from '../assets/img/Logo-02.png';
import person1 from '../assets/img/person1.jpg';
import person2 from '../assets/img/person2.png';

const About: React.FC = () => {
  return (
    <>
      <section id="about-us-header">
        <h1>About Us</h1>
      </section>

      <section className="about-section">
        <div className="content">
          <h4 className="subtitlee">ABOUT US</h4>
          <h1 className="titlee">Logistic &amp; Transport Solutions</h1>
          <p className="description">
            Founded over two decades ago with a single truck and a strong will to serve, Darshan Transport has grown into a trusted logistics partner across western Nepal and beyond. What began as a small family-run business is now a dependable logistics network known for safe, timely, and personalized service.
            <br /><br />
            Our mission has always been simple and clear: to deliver goods with care, responsibility, and efficiency. Over the years, we've expanded our fleet, integrated GPS tracking, and established multiple branches — all with the goal of serving our clients better and more transparently.
            <br /><br />
            At Darshan Transport, we're driven by technology, built on trust, and powered by people. We've embraced challenges, adapted to change, and invested in innovation to ensure reliability and efficiency at every step. Yet, our core values remain unchanged — trust, integrity, and a deep dedication to those we serve.
            <br /><br />
            As we continue to grow, we remain committed to becoming Nepal’s leading logistics backbone. Thank you for being part of our journey.
          </p>
          <div className="stats">
            <div className="stat">
              <h2>100k+</h2>
              <p>Deliveries</p>
            </div>
            <div className="stat">
              <h2>80k+</h2>
              <p>Customers</p>
            </div>
            <div className="stat">
              <h2>20k+</h2>
              <p>Reviews</p>
            </div>
          </div>
        </div>
        <div className="icons">
          <img src={cargoTruck} alt="Truck Icon" className="icon truck" />
          <img src={rightArrow} alt="Arrow Icon" className="icon arrow arrow1" />
          <img src={userIcon} alt="Person Icon" className="icon person" />
          <img src={factory} alt="Factory Icon" className="icon factory" />
          <img src={rightArrow} alt="Arrow Icon" className="icon arrow arrow2" />
        </div>
      </section>

      <section className="about-founder">
        <div className="about-founder-container">
          <div className="about-founder-text">
            <h2>Founder / Managing Director</h2>
            <p className="quote">
              <span className="quote-mark">&#8220; </span>
              Darshan Transport began two decades ago with a single truck and a strong will to serve. Today, we are a trusted logistics partner across Nepal’s western region and beyond.
              <br />
              Our mission has always been clear: to deliver goods with care, responsibility, and efficiency. Over the years, we’ve expanded our fleet, integrated GPS tracking, and opened multiple branches — all to serve you better.
              <br />
              As we grow, our goal remains the same: to become Nepal’s leading logistics backbone — driven by technology, built on trust, and powered by people. Thank you for your continued trust
            </p>
            <p className="founder-signature">
              .................................................................<br />
              <strong>Hari Bahadur Sherestha</strong><br />
              <span>(Founder)</span>
            </p>
          </div>
          <div className="about-founder-image">
            <img src={person1} alt="Founder Photo" />
          </div>
        </div>
      </section>
      <section className="about-founder reverse">
        <div className="about-founder-container">
          <div className="about-founder-image">
            <img src={person2} alt="Co-Founder Photo" />
          </div>
          <div className="about-founder-text">
            <h2>Co-Founder</h2>
            <p className="quote">
              <span className="quote-mark">&#8220; </span>
              What started as a small family business is now a dependable logistics network known for safe, timely, and personalized service.
              <br />
              We’ve overcome challenges, embraced change, and invested in technology to improve transparency and efficiency. Our GPS-enabled fleet and expanding branch network reflect our commitment to progress.
              <br />
              As we move forward, we remain grounded in our founding values: trust, integrity, and dedication to our clients. We’re here to serve — today and always
            </p>
            <p className="founder-signature">
              .................................................................<br />
              <strong>Arun Kumar Shrestha</strong><br />
              <span>(Co-founder)</span>
            </p>
          </div>
        </div>
      </section>

      <section className="our-reach">
        <div className="wave-top">
          <svg viewBox="0 0 1440 150" preserveAspectRatio="none">
            <path
              d="M0,64 C360,160 1080,0 1440,96 L1440,0 L0,0 Z"
              fill="white"
            ></path>
          </svg>
        </div>
        <h2>Our Reach</h2>
        <img src={nepalMap} alt="Map of Nepal" className="nepal-map" />
      </section>

      <section className="clients">
        <h2>OUR CLIENTS</h2>
        <h3>TRUSTED BY THOUSANDS</h3>
        <div className="logo-carousel">
          <div className="logo-track">
            <img src={clientLogo1} alt="Client 1 Logo" />
            <img src={clientLogo2} alt="Client 2 Logo" />
            <img src={clientLogo1} alt="Client 3 Logo" />
            <img src={clientLogo2} alt="Client 4 Logo" />
            <img src={clientLogo1} alt="Client 5 Logo" />
            <img src={clientLogo2} alt="Client 6 Logo" />
            <img src={clientLogo1} alt="Client 1 Logo Duplicate" />
            <img src={clientLogo2} alt="Client 2 Logo Duplicate" />
            <img src={clientLogo1} alt="Client 3 Logo Duplicate" />
            <img src={clientLogo2} alt="Client 4 Logo Duplicate" />
            <img src={clientLogo1} alt="Client 5 Logo Duplicate" />
            <img src={clientLogo2} alt="Client 6 Logo Duplicate" />
          </div>
        </div>
      </section>

      <section className="core-values-section">
        <div className="core-values-container">
          <div className="values-grid">
            <div className="value-card">
              <div className="iconn">❤️</div>
              <h3>Commitment to customers and trust</h3>
              <p>Building trust towards customers by fulfilling the commitments provided when delivering.</p>
            </div>
            <div className="value-card">
              <div className="iconn">🤝</div>
              <h3>Respect</h3>
              <p>We believe in facilitating equal rights to all the partners involved through respect.</p>
            </div>
            <div className="value-card">
              <div className="iconn">✊</div>
              <h3>Accountability</h3>
              <p>Assurance to be accountable for all the responsibilities given to us.</p>
            </div>
            <div className="value-card">
              <div className="iconn">💡</div>
              <h3>Innovation</h3>
              <p>Creating logistics newness in the digital world.</p>
            </div>
            <div className="value-card">
              <div className="iconn">🏆</div>
              <h3>Quality</h3>
              <p>Guarantee to provide the best delivery service.</p>
            </div>
            <div className="value-card">
              <div className="iconn">⚙️</div>
              <h3>Efficiency</h3>
              <p>Continuously improving processes to serve better.</p>
            </div>
          </div>
          <div className="values-text">
            <h2>Our Core Values</h2>
            <p>At Upaya, our core values serve as the compass guiding our every endeavor, and we take our commitment seriously. Our unwavering dedication to customers is not just a promise; it’s a steadfast commitment to building trust by delivering on our commitments.</p>
            <p>Respect is the cornerstone of our interactions, fostering equal rights among all partners involved in our logistics network.</p>
            <p>We stand firm in our accountability, ensuring that every responsibility entrusted to us is met with diligence and reliability.</p>
            <p>Embracing innovation, we thrive on creating new logistics paradigms in the digital world, consistently pushing boundaries to enhance efficiency and redefine industry standards. At Upaya, achieving these core values isn’t just a goal—it’s a relentless pursuit, ingrained in our culture and driving us forward every day.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;