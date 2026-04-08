import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import headerBg from '../../../../assets/img/company-hero-logistics-yard.jpg';

export const HeroSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section
      ref={ref}
      id="about-hero"
      className="relative w-full h-[calc(100dvh-var(--head-height,90px))] overflow-hidden flex items-end justify-start"
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-center bg-cover"
        style={{
          backgroundImage: `url(${headerBg})`,
          y: bgY,
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

      {/* Content - bottom left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-[1200px] mx-auto px-8 pb-16 max-md:px-5 max-md:pb-10 flex items-end justify-between"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white text-[3.8rem] leading-[1.1] font-extrabold max-lg:text-[3rem] max-md:text-[2.4rem] max-sm:text-[2rem]"
        >
          About Darshan Transport
        </motion.h1>

        {/* Scroll hint - bottom right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex items-center gap-3 text-white/50 text-sm"
        >
          <span>Scroll to explore</span>
          <span className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5">
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.6,
                ease: 'easeInOut',
              }}
              className="w-1 h-1 rounded-full bg-primary"
            />
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};
