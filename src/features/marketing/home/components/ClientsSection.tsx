import React from 'react';
import type { LogoItem } from '../data/homeContent';

export interface ClientsSectionProps {
  logos: LogoItem[];
}

export const ClientsSection: React.FC<ClientsSectionProps> = ({ logos }) => (
  <section className="text-center py-[60px] px-5 bg-white max-md:py-10 max-md:px-[15px]">
    <h2 className="text-[1.8rem] font-normal tracking-[1px] text-primary mb-2.5 max-md:text-[1.5rem] max-sm:text-[1.3rem]">
      OUR CLIENTS
    </h2>
    <h3 className="text-[2rem] font-bold text-primary mb-[100px] max-md:text-[1.6rem] max-md:mb-[60px] max-sm:text-[1.4rem]">
      TRUSTED BY BUSINESSES ACROSS NEPAL
    </h3>
    <div className="overflow-hidden relative w-full">
      <div className="flex items-center flex-nowrap w-fit animate-[scroll_30s_linear_infinite] will-change-transform gap-0 motion-reduce:animate-none">
        <div
          className="flex items-center gap-10 pr-10 flex-[0_0_auto]"
          aria-hidden="false"
        >
          {logos.map((logo, index) => (
            <img
              key={`${logo.alt}-${index}`}
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              decoding="async"
              className="w-[140px] h-auto object-contain block grayscale opacity-90 transition-all duration-[250ms] ease-in-out hover:grayscale-0 hover:opacity-100 hover:scale-105"
            />
          ))}
        </div>
        <div
          className="flex items-center gap-10 pr-10 flex-[0_0_auto]"
          aria-hidden="true"
        >
          {logos.map((logo, index) => (
            <img
              key={`dup-${logo.alt}-${index}`}
              src={logo.src}
              alt={`${logo.alt} Duplicate`}
              loading="lazy"
              decoding="async"
              className="w-[140px] h-auto object-contain block grayscale opacity-90 transition-all duration-[250ms] ease-in-out hover:grayscale-0 hover:opacity-100 hover:scale-105"
            />
          ))}
        </div>
      </div>
    </div>
  </section>
);
