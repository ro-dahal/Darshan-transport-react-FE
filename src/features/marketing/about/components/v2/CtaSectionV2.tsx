import React from 'react';
import { motion } from 'framer-motion';

export const CtaSectionV2: React.FC = () => (
  <section className="relative overflow-hidden">
    {/* Background with angled split */}
    <div className="absolute inset-0 bg-primary" />
    <div className="absolute inset-0 bg-[#1a1a1a] clip-cta-angle max-md:hidden" />

    <div className="relative z-10 max-w-[1200px] mx-auto px-8 py-20 flex items-center justify-between gap-8 max-md:flex-col max-md:text-center max-md:py-14 max-md:px-5">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-[2.6rem] font-extrabold text-black leading-[1.1] max-md:text-[2rem] max-sm:text-[1.6rem]">
          Ready to move your
          <br className="max-md:hidden" /> business forward?
        </h2>
        <p className="mt-3 text-black/60 text-base max-w-[420px] max-md:mx-auto">
          Let&rsquo;s discuss how we can support your logistics needs.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <a
          href="/contact"
          className="inline-flex items-center justify-center gap-2 bg-[#1a1a1a] text-white font-bold px-8 py-4 rounded-xl text-base hover:bg-[#333] transition-colors duration-300 no-underline"
        >
          Talk to Leadership
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
        <a
          href="/get-quote"
          className="inline-flex items-center justify-center bg-white text-[#1a1a1a] font-bold px-8 py-4 rounded-xl text-base hover:bg-white/90 transition-colors duration-300 no-underline"
        >
          Get a Quote
        </a>
      </motion.div>
    </div>
  </section>
);
