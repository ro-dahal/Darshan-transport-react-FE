import React from 'react';
import headerBg from '../../../assets/img/optimized/1.webp';

/**
 * Hero section for the Order Tracking page.
 * Displays a descriptive title over a branding-specific background image.
 */
export const OrderHero: React.FC = () => (
  <section
    id="about-us-header"
    className="w-full h-[30vh] bg-cover bg-center flex justify-center text-center flex-col p-3.5 relative max-md:h-[25vh] max-md:p-5"
    style={{ backgroundImage: `url(${headerBg})` }}
  >
    <div className="absolute inset-0 bg-black/40 z-0"></div>
    <h1 className="text-white text-[50px] [text-shadow:3px_3px_8px_rgba(0,0,0,0.7)] max-md:text-4xl max-sm:text-[28px] relative z-10 font-bold">
      Order Tracker
    </h1>
  </section>
);
