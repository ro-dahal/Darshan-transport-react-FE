import React from 'react';
import headerBg from '../../../../assets/img/DSC00400.jpg';

interface PageHeaderProps {
  title?: string;
  subtitle?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title = 'About Us',
  subtitle,
}) => (
  <section
    id="about-us-header"
    className="w-full h-[30vh] bg-center bg-cover flex justify-center text-center flex-col p-3.5 relative max-md:h-[25vh] max-md:p-5"
    style={{ backgroundImage: `url(${headerBg})` }}
  >
    <div className="absolute inset-0 bg-black/40 z-0"></div>
    <h1 className="text-white text-[50px] [text-shadow:3px_3px_8px_rgba(0,0,0,0.7)] max-md:text-4xl max-sm:text-[28px] relative z-10 font-bold">
      {title}
    </h1>
    {subtitle && (
      <p className="text-white/90 text-lg max-w-[700px] mx-auto mt-3 relative z-10 max-md:text-base max-sm:text-sm">
        {subtitle}
      </p>
    )}
  </section>
);
