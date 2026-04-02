import React from 'react';
import { motion } from 'framer-motion';
import type { CoreValueItem } from '../../data/aboutContent';

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

interface CoreValuesSectionV2Props {
  values: CoreValueItem[];
}

export const CoreValuesSectionV2: React.FC<CoreValuesSectionV2Props> = ({
  values,
}) => (
  <section className="py-24 px-8 bg-bg-light max-md:py-16 max-md:px-5">
    <div className="max-w-[1200px] mx-auto">
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
          className="block text-primary text-xs font-bold tracking-[0.22em] uppercase mb-4"
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
            className="group relative bg-white rounded-2xl p-7 border border-border-light hover:border-primary/30 hover:shadow-[0_8px_32px_rgba(252,175,23,0.1)] transition-all duration-400 max-sm:p-5"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/60 transition-all duration-500" />

            {/* Icon */}
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-bg-icon group-hover:bg-primary/10 transition-colors duration-300 max-sm:w-12 max-sm:h-12">
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

            <h3 className="text-[1.05rem] font-bold text-[#1a1a1a] mb-2 leading-[1.35]">
              {value.title}
            </h3>
            <p className="text-sm text-text-medium leading-[1.7]">
              {value.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);
