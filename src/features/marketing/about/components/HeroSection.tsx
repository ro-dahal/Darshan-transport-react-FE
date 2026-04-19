import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { AboutImageTransform } from '../aboutImageEditorUtils';
import {
  getAboutImageTransformStyle,
  normalizeAboutImageTransform,
} from '../aboutImageEditorUtils';
import headerBg from '@assets/marketing/shared/company-hero-logistics-yard.jpg';

interface HeroSectionProps {
  imageTransform?: AboutImageTransform;
  isImageSelected?: boolean;
  isImageDragging?: boolean;
  onImagePointerDown?: (event: React.PointerEvent<HTMLDivElement>) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  imageTransform,
  isImageSelected = false,
  isImageDragging = false,
  onImagePointerDown,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const effectiveImageTransform = normalizeAboutImageTransform(imageTransform);

  return (
    <section
      ref={ref}
      id="about-hero"
      className="relative flex h-[calc(100dvh-var(--head-height,90px))] w-full items-end justify-start overflow-hidden"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0 h-full w-full">
        <img
          src={headerBg}
          alt="Darshan Transport logistics yard"
          className="absolute inset-0 h-full w-full object-cover"
          style={getAboutImageTransformStyle(effectiveImageTransform)}
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

      {onImagePointerDown ? (
        <div
          onPointerDown={onImagePointerDown}
          className={`absolute inset-0 z-[1] select-none transition-all duration-300 ${
            isImageDragging
              ? 'cursor-grabbing border border-primary/70 bg-primary/[0.03] ring-2 ring-inset ring-primary/40'
              : isImageSelected
                ? 'cursor-grab border border-primary/55 bg-primary/[0.02] ring-2 ring-inset ring-primary/35'
                : 'cursor-pointer border border-transparent hover:border-white/15 hover:bg-white/[0.02]'
          }`}
        />
      ) : null}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto flex w-full max-w-[1200px] items-end justify-between gap-12 px-8 pb-16 max-md:px-5 max-md:pb-10"
      >
        <div className="flex max-w-[700px] flex-col items-start">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[3.8rem] font-extrabold leading-[1.05] text-white max-lg:text-[3rem] max-md:text-[2.6rem] max-sm:text-[2.2rem]"
          >
            About <br />
            <span className="text-primary">Darshan Transport</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-justify text-lg leading-relaxed text-white/70 max-md:text-base"
          >
            A transport and logistics company in Nepal focused on bulk cargo,
            business logistics, and reliable delivery across major routes.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-2 flex shrink-0 items-center gap-3 text-sm text-white/50"
        >
          <span>Scroll to explore</span>
          <span className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-white/30 pt-1.5">
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.6,
                ease: 'easeInOut',
              }}
              className="h-1 w-1 rounded-full bg-primary"
            />
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};
