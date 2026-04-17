import React from 'react';
import { motion } from 'framer-motion';
import type { CoreValueItem } from '../data/aboutContent';
import {
  ABOUT_CORE_VALUES_CARD_VARIANTS,
  ABOUT_CORE_VALUES_GRID_VARIANTS,
} from './coreValuesSectionVariants';

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
        variants={ABOUT_CORE_VALUES_GRID_VARIANTS}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="text-center mb-16"
      >
        <motion.span
          variants={ABOUT_CORE_VALUES_CARD_VARIANTS}
          custom={0}
          className="inline-block text-primary text-xs font-bold tracking-[0.22em] uppercase mb-4 bg-primary/8 px-4 py-1.5 rounded-full"
        >
          Why Choose Us
        </motion.span>
        <motion.h2
          variants={ABOUT_CORE_VALUES_CARD_VARIANTS}
          custom={1}
          className="text-[2.4rem] font-extrabold leading-[1.12] text-[#1a1a1a] max-md:text-[1.8rem]"
        >
          Built different, built to deliver
        </motion.h2>
        <motion.p
          variants={ABOUT_CORE_VALUES_CARD_VARIANTS}
          custom={2}
          className="mt-4 text-text-medium text-base max-w-[560px] mx-auto leading-[1.7]"
        >
          Every aspect of our operations is purpose-built for businesses that
          need dependable, large-scale logistics.
        </motion.p>
      </motion.div>

      {/* Values grid */}
      <motion.div
        variants={ABOUT_CORE_VALUES_GRID_VARIANTS}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1"
      >
        {values.map((value, index) => (
          <motion.div
            key={value.title}
            variants={ABOUT_CORE_VALUES_CARD_VARIANTS}
            custom={index}
            className="group relative bg-white rounded-2xl p-8 lg:p-10 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col items-start overflow-hidden max-sm:p-5"
          >
            {/* Top accent bar visible on hover */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-primary/60 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />

            {/* Step number watermark */}
            <span className="absolute top-4 right-5 text-[3.5rem] font-black text-gray-100 leading-none select-none pointer-events-none group-hover:text-primary/8 transition-colors duration-500">
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Icon */}
            <div className="w-[60px] h-[60px] rounded-xl bg-primary/5 flex items-center justify-center mb-6 border border-primary/10 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
              {value.iconType === 'image' ? (
                <img
                  src={value.icon}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  aria-hidden="true"
                  className="w-8 h-auto opacity-80 group-hover:opacity-100 transition-opacity"
                />
              ) : (
                <span className="text-primary text-2xl">{value.icon}</span>
              )}
            </div>

            <h3 className="text-[1.15rem] font-bold text-[#1a1a1a] leading-[1.6] group-hover:text-primary transition-colors duration-300">
              {value.title}
            </h3>
            <p className="mt-3 text-[0.85rem] text-gray-500 leading-[1.75]">
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
