import React from 'react';
import { motion } from 'framer-motion';
import type { LogoItem } from '../../data/aboutContent';
import ClientCarouselV2 from '../../../shared/components/ClientCarouselV2';

interface ClientsSectionV2Props {
  logos: LogoItem[];
}

export const ClientsSectionV2: React.FC<ClientsSectionV2Props> = ({
  logos,
}) => (
  <section className="py-20 px-5 bg-white overflow-hidden max-md:py-12">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className="text-center mb-14 max-md:mb-8"
    >
      <span className="block text-primary text-xs font-bold tracking-[0.22em] uppercase mb-3">
        Our Clients
      </span>
      <h2 className="text-[2rem] font-extrabold text-[#1a1a1a] max-md:text-[1.5rem]">
        Trusted by businesses across Nepal
      </h2>
    </motion.div>

    <ClientCarouselV2 logos={logos} />
  </section>
);
