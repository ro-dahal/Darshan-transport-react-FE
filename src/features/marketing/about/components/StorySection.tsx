import React from 'react';
import type { StatItem } from '../data/aboutContent';

export interface StorySectionProps {
  description: string[];
  stats: StatItem[];
  animationSrc: string;
}

export const StorySection: React.FC<StorySectionProps> = ({
  description,
  animationSrc,
}) => (
  <section className="flex flex-col py-[60px] px-5 max-lg:py-10 max-lg:px-[30px] max-md:py-[30px] max-md:px-[15px]">
    <div className="flex-[1_1_500px] pr-0">
      <h4 className="text-primary text-sm mb-2.5">COMPANY OVERVIEW</h4>
      <h1 className="text-[28px] font-bold text-[#2c3e50] mb-[50px]">
        Reliable bulk cargo transport across Nepal
      </h1>
      <div className="grid grid-cols-[1.2fr_0.8fr] items-center gap-10 mb-10 max-lg:grid-cols-1 max-lg:gap-[30px] max-md:gap-5 [&>*]:min-w-0">
        <div className="text-justify text-base leading-[1.6] mb-10">
          {description.map((para, i) => (
            <p key={i} className="mb-[2.2em]">
              {para}
            </p>
          ))}
        </div>
        <img
          className="w-full max-w-[520px] rounded-lg object-contain mx-auto max-md:max-w-full"
          src={animationSrc}
          alt="Our operations animated"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  </section>
);
