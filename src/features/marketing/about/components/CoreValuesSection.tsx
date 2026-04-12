import React from 'react';
import { motion } from 'framer-motion';
import type { CoreValueItem } from '../data/aboutContent';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

interface CoreValuesSectionProps {
  values: CoreValueItem[];
}

export const CoreValuesSection: React.FC<CoreValuesSectionProps> = ({
  values,
}) => (
  <section className="relative py-24 px-8 bg-[#fafaf8] max-md:py-16 max-md:px-5 overflow-hidden">
    {/* Subtle background texture */}
    <div
      className="absolute inset-0 opacity-[0.025] pointer-events-none"
      style={{
        backgroundImage:
          'radial-gradient(circle at 1px 1px, #1a1a1a 0.5px, transparent 0)',
        backgroundSize: '32px 32px',
      }}
    />

    <div className="relative z-10 max-w-[1200px] mx-auto">
      {/* Section heading */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="text-center mb-16"
      >
        <motion.span
          variants={cardVariants}
          custom={0}
          className="inline-block text-primary text-xs font-bold tracking-[0.22em] uppercase mb-4 bg-primary/8 px-4 py-1.5 rounded-full"
        >
          Why Choose Us
        </motion.span>
        <motion.h2
          variants={cardVariants}
          custom={1}
          className="text-[2.4rem] font-extrabold leading-[1.12] text-[#1a1a1a] max-md:text-[1.8rem]"
        >
          Built different, built to deliver
        </motion.h2>
        <motion.p
          variants={cardVariants}
          custom={2}
          className="mt-4 text-text-medium text-base max-w-[560px] mx-auto leading-[1.7]"
        >
          Every aspect of our operations is purpose-built for businesses that
          need dependable, large-scale logistics.
        </motion.p>
      </motion.div>

      {/* Values grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1"
      >
        {values.map((value, index) => (
          <motion.div
            key={value.title}
            variants={cardVariants}
            custom={index}
            className="group relative bg-white rounded-2xl p-7 border border-gray-100 hover:border-primary/30 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(252,175,23,0.1)] transition-all duration-500 max-sm:p-5"
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/60 group-hover:via-primary group-hover:to-primary/60 transition-all duration-500" />

            {/* Step number watermark */}
            <span className="absolute top-4 right-5 text-[3.5rem] font-black text-gray-100 leading-none select-none pointer-events-none group-hover:text-primary/8 transition-colors duration-500">
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Icon */}
            <div className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-[#f5f5f0] group-hover:bg-primary/10 transition-all duration-300 max-sm:w-12 max-sm:h-12 ring-1 ring-gray-100 group-hover:ring-primary/20">
              {value.iconType === 'image' ? (
                <img
                  src={value.icon}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  aria-hidden="true"
                  className="w-9 h-9 object-contain max-sm:w-7 max-sm:h-7"
                />
              ) : (
                <span className="text-2xl text-secondary">{value.icon}</span>
              )}
            </div>

            <h3 className="text-[1.05rem] font-bold text-[#1a1a1a] mb-2.5 leading-[1.35] pr-12">
              {value.title}
            </h3>
            <p className="text-[0.85rem] text-gray-500 leading-[1.75]">
              {value.description}
            </p>

            {/* Hover arrow indicator */}
            <div className="mt-4 flex items-center gap-1.5 text-primary text-xs font-semibold opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300">
              <span>Learn more</span>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);
