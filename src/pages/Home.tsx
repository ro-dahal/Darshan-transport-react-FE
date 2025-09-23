import React from 'react';
import GIF from '../assets/img/gif2.gif';
// Example imports for images (add all the images you use)
// logo import removed (unused)
import nepalMap from '../assets/img/nepal-map.png';
import clientLogo1 from '../assets/img/Logo-01.png';
import clientLogo2 from '../assets/img/Logo-02.png';
import person1 from '../assets/img/person1.jpg';
import person3 from '../assets/img/person3.jpg';
// import videoThumbnail1 from '../assets/img/video-thumbnail1.mp4'; // Example

const Home: React.FC = () => {
  return (
    <>
      <section id="main-bg">
        <section id="hero">
          <h4>Darshan Transport</h4>
          <h1>Logistics &amp; Transport</h1>
          <h1>Solutions</h1>
          <p>
            Two decades ago, we began our journey with just a single truck, a
            strong will, and an unwavering commitment to serve.<br />
          </p>
          <button id="but">
            <a href="/contact">Get Started</a>
          </button>
        </section>
      </section>

      <section className="about-section">
        <div className="content">
          <h4 className="subtitlee">ABOUT US</h4>
          <h1 className="titlee">Logistic &amp; Transport Solutions</h1>
          <div className="about-split">
          <p className="description">
            Founded over two decades ago with a single truck and a strong will to
            serve, Darshan Transport has grown into a trusted logistics partner
            across western Nepal and beyond. What began as a small family-run
            business is now a dependable logistics network known for safe, timely,
            and personalized service. Our mission has always been simple and
            clear: to deliver goods with care, responsibility, and efficiency.
            Over the years, we've expanded our fleet, integrated GPS tracking, and
            established multiple branches — all with the goal of serving our
            clients better and more transparently. At Darshan Transport, we're
            driven by technology, built on trust, and powered by people. We've
            embraced challenges, adapted to change, and invested in innovation to
            ensure reliability and efficiency at every step. Yet, our core values
            remain unchanged — trust, integrity, and a deep dedication to those we
            serve. As we continue to grow, we remain committed to becoming Nepal’s
            leading logistics backbone. Thank you for being part of our journey.
          </p>
          <img className="about-gif" src={GIF} alt="Our operations animated" loading="lazy" decoding="async" />
          </div>
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
  <img src={nepalMap} alt="Map of Nepal" className="nepal-map" loading="lazy" decoding="async" />
      </section>

      <section className="clients">
        <h2>OUR CLIENTS</h2>
        <h3>TRUSTED BY THOUSANDS</h3>
        <div className="logo-carousel">
          <div className="logo-track">
            <div className="logo-set" aria-hidden="false">
              <img src={clientLogo1} alt="Client 1 Logo" loading="lazy" decoding="async" />
              <img src={clientLogo2} alt="Client 2 Logo" loading="lazy" decoding="async" />
              <img src={clientLogo1} alt="Client 3 Logo" loading="lazy" decoding="async" />
              <img src={clientLogo2} alt="Client 4 Logo" loading="lazy" decoding="async" />
              <img src={clientLogo1} alt="Client 5 Logo" loading="lazy" decoding="async" />
              <img src={clientLogo2} alt="Client 6 Logo" loading="lazy" decoding="async" />
            </div>
            <div className="logo-set" aria-hidden="true">
              <img src={clientLogo1} alt="Client 1 Logo Duplicate" />
              <img src={clientLogo2} alt="Client 2 Logo Duplicate" />
              <img src={clientLogo1} alt="Client 3 Logo Duplicate" />
              <img src={clientLogo2} alt="Client 4 Logo Duplicate" />
              <img src={clientLogo1} alt="Client 5 Logo Duplicate" />
              <img src={clientLogo2} alt="Client 6 Logo Duplicate" />
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="wave-bg"></div>
        <div className="testimonials-content">
          <h2 className="subtitle">Testimonials</h2>
          <h3 className="title">The Voice of Our Customers</h3>
          <div className="videos">
            <div className="video-card">
              {/* Use your video file with the correct path */}
              <video controls poster="poster1.jpg">
                <source src="img/video-thumbnail1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="caption">
                <strong>Ravi Thakur</strong>, Head of Logistics<br />
                NovaXpress
              </div>
            </div>
            <div className="video-card">
              <video controls poster="poster2.jpg">
                <source src="img/video-thumbnail1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="caption">
                <strong>Meena Joshi</strong>, CEO<br />
                BlueOrbit Retail
              </div>
            </div>
            <div className="video-card">
              <video controls poster="poster3.jpg">
                <source src="img/video-thumbnail1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="caption">
                <strong>Arjun Rana</strong>, Sr. Officer<br />
                Zenith Hydro Solutions
              </div>
            </div>
          </div>

          <div className="reviews">
            <div className="review-card">
              <div className="profile-pic">
                <img src={person1} alt="Customer reviewer 1" loading="lazy" decoding="async" />
              </div>
              <p>
                It's been about 1 year that we have been using Darshan Transport’s service and I am happy to share my experience with everyone. They are very professional, the team is supportive, and we can deliver our service on time.
              </p>
              <h4>Kiran Shrestha</h4>
              <span>Skyline Networks</span>
            </div>
            <div className="review-card">
              <div className="profile-pic">
                <img src={person1} alt="Customer reviewer 2" loading="lazy" decoding="async" />
              </div>
              <p>
                VividBite Hospitality Pvt. Ltd. has been working with Darshan Transport since December 2021. The delivery service at the beginning was random. However, now with the delivery partnership, our issues have been resolved.
              </p>
              <h4>Priya Desai</h4>
              <span>VividBite Hospitality</span>
            </div>
            <div className="review-card">
              <div className="profile-pic">
                <img src={person3} alt="Customer reviewer 3" loading="lazy" decoding="async" />
              </div>
              <p>
                Darshan Transport has been our go-to solution for delivery. Their prompt service and affordable rates have made logistics a piece of cake.
              </p>
              <h4>Rahul Koirala</h4>
              <span>MetroGlobal Trade Co.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-container">
          <h2>
            Get Started with your<br />
            Logistics Journey!
          </h2>
          <a href="/contact" className="cta-button">Get Started</a>
        </div>
      </section>
    </>
  );
};

export default Home;