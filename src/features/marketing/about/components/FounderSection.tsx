import React from 'react';
import { motion } from 'framer-motion';
import type { FounderProfile } from '../data/aboutContent';

const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const imgReveal = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    clipPath: 'inset(8% 8% 8% 8% round 16px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: 'inset(0% 0% 0% 0% round 16px)',
    transition: { duration: 0.8, ease: easeOut },
  },
};

interface FounderSectionProps {
  profiles: FounderProfile[];
}

export const FounderSection: React.FC<FounderSectionProps> = ({ profiles }) => (
  <section className="py-24 px-8 max-md:py-16 max-md:px-5">
    <div className="max-w-[1200px] mx-auto">
      {/* Section heading */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="text-center mb-20 max-md:mb-12"
      >
        <motion.span
          variants={fadeIn}
          className="block text-primary text-xs font-bold tracking-[0.22em] uppercase mb-4"
        >
          Leadership
        </motion.span>
        <motion.h2
          variants={fadeIn}
          className="text-[2.4rem] font-extrabold leading-[1.12] text-[#1a1a1a] max-md:text-[1.8rem]"
        >
          The people behind{' '}
          <span className="text-primary">Darshan Transport</span>
        </motion.h2>
      </motion.div>

      {/* Founder cards */}
      <div className="space-y-24 max-md:space-y-16">
        {profiles.map((profile, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={profile.signatureLabel}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className={`flex items-center gap-16 max-lg:flex-col max-lg:gap-10 ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Image */}
              <motion.div
                variants={imgReveal}
                className="relative flex-shrink-0 w-full max-w-[420px] max-lg:max-w-[360px]"
              >
                <div className={`relative ${isEven ? 'pl-6' : 'pr-6'}`}>
                  <div
                    aria-hidden="true"
                    className={`absolute hidden lg:block top-6 bottom-6 w-[4px] rounded-full bg-primary/55 ${
                      isEven ? 'left-0' : 'right-0'
                    }`}
                  />
                  <img
                    src={profile.image}
                    alt={`${profile.signatureLabel} portrait`}
                    className={`w-full aspect-[4/5] rounded-2xl object-cover shadow-lg bg-gray-100 ${
                      profile.imagePosition || 'object-center'
                    }`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </motion.div>

              {/* Text */}
              <motion.div variants={fadeIn} className="flex-1 min-w-0">
                <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
                  {profile.role}
                </span>
                <h3 className="mt-3 text-[1.8rem] font-bold text-[#1a1a1a] max-md:text-[1.4rem]">
                  {profile.signatureLabel}
                </h3>

                {/* Quote */}
                <div className="mt-6 relative pl-6 pr-8 pb-8">
                  <span className="absolute -top-2 -left-1 text-primary/20 text-5xl font-serif leading-none select-none">
                    &ldquo;
                  </span>
                  <p className="text-base leading-[1.85] text-text-medium whitespace-pre-line text-justify">
                    {profile.quote.replace(/^"\s*/, '')}
                  </p>
                </div>

                {/* Signature line */}
                <div className="mt-8 flex items-center gap-4">
                  <div className="h-px w-12 bg-primary/40" />
                  <div>
                    <p className="text-sm font-bold text-text-dark">
                      {profile.signatureLabel}
                    </p>
                    <p className="text-xs text-text-medium mt-0.5">
                      {profile.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);
