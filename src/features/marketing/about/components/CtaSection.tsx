import React from 'react';
import { motion } from 'framer-motion';

type CtaSectionVariant = 'default' | 'team';

interface CtaSectionProps {
  variant?: CtaSectionVariant;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  variant = 'default',
}) => {
  const isTeamVariant = variant === 'team';

  return (
    <section className="relative overflow-hidden bg-primary">
      <div
        className={`relative z-10 mx-auto grid max-w-[1200px] items-center gap-12 px-8 py-14 max-lg:text-center max-md:px-5 max-md:py-12 ${
          isTeamVariant ? 'xl:gap-16' : ''
        } lg:grid-cols-[minmax(0,1fr)_auto] max-lg:grid-cols-1`}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={
            isTeamVariant
              ? 'w-full max-lg:mx-auto lg:max-w-[60%] xl:max-w-[62%]'
              : 'w-full max-lg:mx-auto lg:max-w-[58%] xl:max-w-[60%]'
          }
        >
          <h2
            className={`font-extrabold text-secondary leading-none max-md:text-[1.7rem] ${
              isTeamVariant
                ? 'text-[2rem] lg:whitespace-nowrap xl:text-[2.1rem]'
                : 'text-[1.85rem] lg:whitespace-nowrap xl:text-[2rem]'
            }`}
          >
            Ready to move your business forward?
          </h2>
          <p
            className={`mt-3 text-secondary/70 font-medium leading-relaxed max-lg:mx-auto max-md:text-[1rem] ${
              isTeamVariant
                ? 'text-base lg:whitespace-nowrap xl:text-[1.05rem]'
                : 'text-base lg:whitespace-nowrap xl:text-[1.05rem]'
            }`}
          >
            Let&rsquo;s discuss how we can support your logistics needs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 shrink-0 max-sm:w-full lg:justify-self-end"
        >
          <div className="relative z-10 flex flex-col items-center gap-4 max-sm:w-full sm:flex-row sm:justify-center">
            <a
              href="/contact"
              className={`inline-flex items-center justify-center rounded-lg bg-secondary font-bold text-base text-primary transition-colors duration-300 hover:bg-secondary/90 hover:text-primary-light no-underline whitespace-nowrap text-center ${
                isTeamVariant ? 'gap-2 px-10 py-3.5' : 'gap-1.5 px-7 py-3'
              }`}
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
