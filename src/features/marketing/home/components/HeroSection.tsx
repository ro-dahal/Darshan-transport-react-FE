import React, { useEffect, useState } from 'react';

export interface HeroSectionProps {
  description: string;
}

// import background images from assets so the bundler can resolve them
import bg1 from '../../../../assets/img/background.jpg';
import bg2 from '../../../../assets/img/background1.jpg';
import bg3 from '../../../../assets/img/background2.jpg';
import rightArrow from '../../../../assets/img/right-arrow.png';


const IMAGES = [bg1, bg2, bg3];

export const HeroSection: React.FC<HeroSectionProps> = ({ description }) => {
  const [index, setIndex] = useState(0);
  const intervalRef = React.useRef<number | null>(null);

  const startInterval = () => {
    intervalRef.current = window.setInterval(() => setIndex((i) => (i + 1) % IMAGES.length), 5000);
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  const pause = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resume = () => {
    if (!intervalRef.current) startInterval();
  };

  const trackStyle: React.CSSProperties = {
    transform: `translateX(-${index * 100}%)`,
  };

  return (
    <section id="main-bg" className="carousel" onMouseEnter={pause} onMouseLeave={resume}>
      <div className="carousel-track" style={trackStyle}>
        {IMAGES.map((img, i) => (
          <div
            key={i}
            className={`carousel-slide ${i === index ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
            aria-hidden={i === index ? 'false' : 'true'}
          />
        ))}
      </div>

      <button className="carousel-control prev" aria-label="Previous slide" onClick={() => setIndex((i) => (i - 1 + IMAGES.length) % IMAGES.length)}>
        <img src={rightArrow} alt="Previous" />
      </button>

      <button className="carousel-control next" aria-label="Next slide" onClick={() => setIndex((i) => (i + 1) % IMAGES.length)}>
        <img src={rightArrow} alt="Next" />
      </button>

      <section id="hero">
        <h1>Nationwide Delivery</h1>
        <h1 style={{ color: '#fcaf17' }}>Zero Hassle</h1>
        <p>{description}</p>
        <div className="hero-cta-group">
          <a href="/order" className="cta-button cta-primary">Track Your Shipment</a>
          <a href="/get-quote" className="cta-button cta-secondary">Get a Delivery Quote</a>
        </div>
      </section>
    </section>
  );
};
