import React from 'react';
import headerBg from '../../../../assets/img/1.jpg';

export const PageHeader: React.FC = () => (
  <section
    id="about-us-header"
    className="w-full h-[30vh] bg-cover bg-center flex justify-center text-center flex-col p-3.5 relative max-md:h-[25vh] max-md:p-5"
    style={{ backgroundImage: `url(${headerBg})` }}
  >
    <div className="absolute inset-0 bg-black/40 z-0"></div>
    <h1 className="text-white text-[50px] [text-shadow:3px_3px_8px_rgba(0,0,0,0.7)] max-md:text-4xl max-sm:text-[28px] relative z-10 font-bold">About Us</h1>
  </section>
);
