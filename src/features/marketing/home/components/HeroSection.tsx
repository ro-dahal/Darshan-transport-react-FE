import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export interface HeroSectionProps {
  description: string;
}

// import background images from assets so the bundler can resolve them
import bg1 from '../../../../assets/img/WhatsApp Image 2026-03-31 at 17.29.43.jpeg';
import bg2 from '../../../../assets/img/WhatsApp Image 2026-03-31 at 17.52.04.jpeg';
import bg3 from '../../../../assets/img/WhatsApp Image 2026-03-31 at 17.55.01.jpeg';
import rightArrow from '../../../../assets/img/optimized/right-arrow.webp';

const IMAGES = [bg1, bg2, bg3];

export const HeroSection: React.FC<HeroSectionProps> = ({ description }) => {
  const [index, setIndex] = useState(0);
  const intervalRef = React.useRef<number | null>(null);

  const startInterval = () => {
    intervalRef.current = window.setInterval(
      () => setIndex((i) => (i + 1) % IMAGES.length),
      5000
    );
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
    <section
      id="main-bg"
      className="relative h-[calc(100svh-var(--head-height,68px))] w-full overflow-hidden md:h-[90vh]"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <Helmet>
        <link rel="preload" as="image" href={bg1} fetchPriority="high" />
      </Helmet>
      <div
        className="absolute top-0 left-0 flex h-full w-full transition-transform duration-600 ease-[cubic-bezier(0.22,0.61,0.36,1)] will-change-transform z-[1]"
        style={trackStyle}
      >
        {IMAGES.map((img, i) => (
          <div
            key={i}
            className="flex-[0_0_100%] h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${img})` }}
            aria-hidden={i === index ? 'false' : 'true'}
          />
        ))}
      </div>

      <button
        className="absolute top-1/2 -translate-y-1/2 left-5 bg-black/35 border-none p-2.5 rounded-full cursor-pointer z-[4] hidden items-center justify-center focus:outline-none focus:shadow-[0_0_0_3px_rgba(252,175,23,0.15)] md:flex"
        aria-label="Previous slide"
        onClick={() => setIndex((i) => (i - 1 + IMAGES.length) % IMAGES.length)}
      >
        <img
          src={rightArrow}
          alt="Previous"
          className="w-[22px] h-[22px] brightness-0 invert rotate-180"
        />
      </button>

      <button
        className="absolute top-1/2 -translate-y-1/2 right-5 bg-black/35 border-none p-2.5 rounded-full cursor-pointer z-[4] hidden items-center justify-center focus:outline-none focus:shadow-[0_0_0_3px_rgba(252,175,23,0.15)] md:flex"
        aria-label="Next slide"
        onClick={() => setIndex((i) => (i + 1) % IMAGES.length)}
      >
        <img
          src={rightArrow}
          alt="Next"
          className="w-[22px] h-[22px] brightness-0 invert"
        />
      </button>

      <section
        id="hero"
        className="relative z-[2] flex h-full max-w-[720px] flex-col items-start justify-center px-[140px] pr-20 py-0 max-xl:px-16 max-lg:px-10 max-md:max-w-full max-md:items-center max-md:justify-end max-md:px-5 max-md:pb-[8svh] max-md:pt-0 max-md:text-center max-sm:px-4 max-sm:pb-[6svh]"
      >
        <div className="relative w-full max-w-[580px] max-md:max-w-[500px] max-sm:max-w-full">
          <div className="relative overflow-hidden rounded-[32px] px-10 py-12 max-md:px-6 max-md:py-8">
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-[32px] bg-black/15 backdrop-blur-[2px] max-md:bg-black/28"
              style={{
                WebkitMaskImage:
                  'linear-gradient(to right, transparent, black 12%, black 88%, transparent), linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
                maskImage:
                  'linear-gradient(to right, transparent, black 12%, black 88%, transparent), linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
                WebkitMaskComposite: 'destination-in',
                maskComposite: 'intersect',
              }}
            />
            <div className="relative z-[1]">
              <h1 className="text-[60px] leading-[80px] font-bold text-white drop-shadow-[0_3px_14px_rgba(0,0,0,0.45)] max-lg:text-[45px] max-lg:leading-[60px] max-md:text-[34px] max-md:leading-[42px] max-sm:text-[30px] max-sm:leading-[37px]">
                Bulk Cargo &
              </h1>
              <h2 className="text-[60px] leading-[80px] font-bold text-primary drop-shadow-[0_3px_14px_rgba(0,0,0,0.4)] max-lg:text-[45px] max-lg:leading-[60px] max-md:text-[34px] max-md:leading-[42px] max-sm:text-[30px] max-sm:leading-[37px]">
                Logistics Services Across Nepal
              </h2>
              <p className="my-[15px] text-base leading-7 text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] max-md:text-base max-md:leading-7 max-sm:text-sm max-sm:leading-6">
                {description}
              </p>
              <div className="flex gap-[18px] mt-6 max-lg:flex-col max-lg:items-center max-lg:w-full max-lg:max-w-[400px] max-lg:mx-auto">
                <Link
                  to="/order"
                  className="bg-primary text-white font-bold no-underline py-3.5 px-8 rounded-lg text-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-200 border-none cursor-pointer hover:bg-primary-hover hover:shadow-[0_4px_16px_rgba(252,175,23,0.18)] max-lg:w-full max-lg:text-center max-md:py-[15px] max-md:px-[30px] max-md:text-base max-sm:py-3 max-sm:px-[25px] max-sm:text-sm max-sm:min-h-[44px]"
                >
                  Track Your Shipment
                </Link>
                <Link
                  to="/get-quote"
                  className="bg-white text-primary font-bold no-underline py-3.5 px-8 rounded-lg text-lg shadow-[0_4px_20px_rgba(27,27,27,0.18)] transition-all duration-200 border-none cursor-pointer hover:bg-primary hover:text-white max-lg:w-full max-lg:text-center max-md:py-[15px] max-md:px-[30px] max-md:text-base max-sm:py-3 max-sm:px-[25px] max-sm:text-sm max-sm:min-h-[44px]"
                >
                  Get a Delivery Quote
                </Link>
              </div>
              <p className="mt-6 max-w-[520px] text-sm leading-6 text-white/85 drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] max-lg:mx-auto max-lg:text-center max-md:text-sm max-md:leading-6">
                Built for high-volume cargo, structured delivery, and dependable
                logistics operations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
