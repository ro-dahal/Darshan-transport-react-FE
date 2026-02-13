import React from 'react';
import type { StatItem } from '../data/homeContent';

export interface AboutSectionProps {
  description: string;
  stats: StatItem[];
  animationSrc: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ description, animationSrc }) => (
  <section className="flex flex-col py-[60px] px-5 max-lg:py-10 max-lg:px-[30px] max-md:py-[30px] max-md:px-[15px]">
    <div className="flex-[1_1_500px] pr-0">
      <h1 className="text-[28px] font-bold text-[#2c3e50] mb-[50px] text-primary">Your Cargo Deserves Care</h1>
      <div className="grid grid-cols-[1.2fr_0.8fr] items-center gap-10 mb-10 max-lg:grid-cols-1 max-lg:gap-[30px] max-md:gap-5 [&>*]:min-w-0">
        <p className="text-justify text-base leading-[1.6] mb-10">{description}</p>
        <img
          className="w-full max-w-[520px] rounded-lg object-contain mx-auto max-md:max-w-full"
          src={animationSrc}
          alt="Our operations animated"
          loading="lazy"
          decoding="async"
        />
      </div>
      <h3 className="text-[28px] font-bold text-[#2c3e50] mb-[50px] text-center max-lg:text-4xl max-md:text-[28px] max-sm:text-2xl">
        Why People Choose Us
      </h3>
      <ul className="list-none p-0 mt-6 flex gap-6 justify-between flex-wrap items-start max-lg:justify-center max-lg:gap-x-5 max-lg:gap-y-[30px]">
        {[
          {
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} xmlns="http://www.w3.org/2000/svg" width="64" height="64">
                <path d="M3 7h13v10H3z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 9l3-2v10" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="7.5" cy="17.5" r="1.5" />
                <circle cx="18.5" cy="17.5" r="1.5" />
              </svg>
            ),
            text: 'Fast Pickup & Delivery',
          },
          {
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} xmlns="http://www.w3.org/2000/svg" width="64" height="64">
                <path d="M12 2v6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="14" r="6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 14l2-2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: 'Live Tracking',
          },
          {
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} xmlns="http://www.w3.org/2000/svg" width="64" height="64">
                <rect x="3" y="4" width="18" height="12" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 8h10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 12h10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 16h10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: 'Professional Handling',
          },
          {
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} xmlns="http://www.w3.org/2000/svg" width="64" height="64">
                <path d="M12 2l3 5 5 .5-4 3 1 5-5-3-5 3 1-5-4-3 5-.5L12 2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            text: 'Support When You Need It',
          },
        ].map((feature) => (
          <li
            key={feature.text}
            className="flex flex-col items-center gap-2 flex-[1_1_22%] max-w-[220px] text-center max-lg:flex-[1_1_40%] max-lg:max-w-[180px]"
          >
            <span className="text-primary w-16 h-16 flex items-center justify-center" aria-hidden>
              {feature.icon}
            </span>
            <span className="text-sm font-semibold text-text-dark">{feature.text}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
