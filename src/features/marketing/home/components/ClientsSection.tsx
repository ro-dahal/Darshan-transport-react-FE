import React from 'react';
import type { LogoItem } from '../data/homeContent';
import ClientCarouselV2 from '../../shared/components/ClientCarouselV2';

export interface ClientsSectionProps {
  logos: LogoItem[];
}

export const ClientsSection: React.FC<ClientsSectionProps> = ({ logos }) => {
  return (
    <section className="text-center py-[80px] px-5 bg-white max-md:py-12 max-md:px-[15px] overflow-hidden">
      <h2 className="text-[1.8rem] font-normal tracking-[1px] text-primary mb-2.5 max-md:text-[1.5rem] max-sm:text-[1.3rem]">
        OUR CLIENTS
      </h2>
      <h3 className="text-[2rem] font-bold text-primary mb-[100px] max-md:text-[1.6rem] max-md:mb-[60px] max-sm:text-[1.4rem]">
        TRUSTED BY BUSINESSES ACROSS NEPAL
      </h3>
      <div className="relative w-full py-10 cursor-default touch-none">
        <ClientCarouselV2 logos={logos} />
      </div>
    </section>
  );
};
