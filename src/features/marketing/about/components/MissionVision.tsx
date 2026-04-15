import React from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export const MissionVision: React.FC = () => (
  <section className="relative bg-secondary text-white py-24 px-8 overflow-hidden max-md:py-16 max-md:px-5">
    {/* Decorative grid lines */}
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage:
          'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }}
    />

    {/* Accent glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

    <div className="relative z-10 max-w-[1200px] mx-auto">
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
          What Drives Us
        </motion.span>
        <motion.h2
          variants={cardVariants}
          custom={1}
          className="text-[2.4rem] font-extrabold leading-[1.15] max-md:text-[1.8rem]"
        >
          Purpose that powers progress
        </motion.h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid lg:grid-cols-2 gap-8"
      >
        {/* Mission card */}
        <motion.div
          variants={cardVariants}
          custom={0}
          className="group relative rounded-2xl bg-white/[0.04] border border-white/10 p-10 backdrop-blur-sm hover:border-primary/30 transition-colors duration-500 max-md:p-6"
        >
          <div className="absolute top-0 left-8 w-12 h-1 bg-primary rounded-b-full" />
          <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
            Our Mission
          </span>
          <h3 className="mt-4 text-2xl font-bold leading-[1.3] max-md:text-xl">
            Simplify cargo movement across Nepal
          </h3>
          <p className="mt-5 text-white/60 text-base leading-[1.85]">
            To simplify cargo movement for businesses across Nepal through
            structured transport, dependable delivery, and practical logistics
            support.
          </p>
          {/* Corner accent */}
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/20 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>

        {/* Vision card */}
        <motion.div
          variants={cardVariants}
          custom={1}
          className="group relative rounded-2xl bg-white/[0.04] border border-white/10 p-10 backdrop-blur-sm hover:border-primary/30 transition-colors duration-500 max-md:p-6"
        >
          <div className="absolute top-0 left-8 w-12 h-1 bg-primary rounded-b-full" />
          <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
            Our Vision
          </span>
          <h3 className="mt-4 text-2xl font-bold leading-[1.3] max-md:text-xl">
            Nepal&rsquo;s most trusted logistics network
          </h3>
          <p className="mt-5 text-white/60 text-base leading-[1.85]">
            To become a trusted logistics partner for businesses across Nepal by
            building a strong transport network, improving service reliability,
            and supporting long-term business growth through dependable
            logistics solutions.
          </p>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/20 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
      </motion.div>

      {/* What we do / Our approach */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="mt-16 grid lg:grid-cols-2 gap-8"
      >
        <motion.div
          variants={cardVariants}
          custom={0}
          className="lg:pl-10 max-md:pl-6"
        >
          <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
            What We Do
          </span>
          <p className="mt-4 text-white/55 text-base leading-[1.85] max-w-[520px]">
            We provide transport and logistics services for businesses that
            require regular, large-scale, or organized cargo movement. Our
            operations are built to handle bulk goods, support distribution
            networks, and improve delivery coordination across Nepal.
          </p>
        </motion.div>

        <motion.div
          variants={cardVariants}
          custom={1}
          className="lg:pl-10 max-md:pl-6"
        >
          <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
            Our Approach
          </span>
          <p className="mt-4 text-white/55 text-base leading-[1.85] max-w-[520px]">
            We focus on clear planning, efficient transport coordination, and
            reliable delivery execution. Our logistics systems are designed for
            ongoing cargo movement — not one-time deliveries.
          </p>
        </motion.div>
      </motion.div>
    </div>
  </section>
);
