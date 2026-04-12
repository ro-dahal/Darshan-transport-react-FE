import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

interface StorySectionProps {
  description: string[];
  animationSrc: string;
}

export const StorySection: React.FC<StorySectionProps> = ({
  description,
  animationSrc,
}) => (
  <section className="relative py-24 px-8 max-lg:py-16 max-md:py-12 max-md:px-5">
    {/* Subtle background accent */}
    <div className="absolute top-0 right-0 w-[40%] h-[60%] bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-[120px] pointer-events-none max-lg:hidden" />

    <div className="mx-auto max-w-[1200px] relative z-10">
      {/* Eyebrow + heading */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-[700px]"
      >
        <motion.h2
          variants={fadeUp}
          custom={0}
          className="mt-4 text-[2.6rem] font-extrabold leading-[1.12] text-[#1a1a1a] max-md:text-[2rem] max-sm:text-[1.6rem]"
        >
          A logistics partner built for
          <span className="text-primary"> businesses across Nepal</span>
        </motion.h2>
        <motion.div
          variants={fadeUp}
          custom={2}
          className="mt-3 h-1 w-14 bg-primary rounded-full"
        />
      </motion.div>

      {/* Two-column layout */}
      <div className="mt-10 grid grid-cols-[1fr_0.85fr] items-center gap-16 max-lg:grid-cols-1 max-lg:gap-10">
        {/* Text column */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-6"
        >
          {description.map((para, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              custom={i}
              className="text-[1.05rem] leading-[1.85] text-text-medium text-justify"
            >
              {para}
            </motion.p>
          ))}

          {/* Quick-hit highlights */}
          <motion.div
            variants={fadeUp}
            custom={description.length}
            className="pt-4 grid grid-cols-2 gap-4 max-sm:grid-cols-1"
          >
            {[
              { label: 'Bulk & heavy cargo', icon: '📦' },
              { label: 'Nationwide coverage', icon: '🗺️' },
              { label: 'Warehousing support', icon: '🏭' },
              { label: 'Distribution logistics', icon: '🚚' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 py-2.5 px-4 rounded-lg bg-bg-light border border-border-light"
              >
                <span className="text-xl" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="text-sm font-semibold text-text-dark">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Image / animation column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative lg:-mt-24">
            <img
              className="w-full max-w-[480px] rounded-xl object-contain drop-shadow-xl"
              src={animationSrc}
              alt="Our operations animated"
              loading="lazy"
              decoding="async"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
