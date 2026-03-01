import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  MotionValue,
} from 'framer-motion';
import type { LogoItem } from '../data/homeContent';

export interface ClientsSectionProps {
  logos: LogoItem[];
}

const AnimatedLogo: React.FC<{
  logo: LogoItem;
  scrollX: MotionValue<number>;
}> = ({ logo }) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const proximity = useMotionValue(1);

  useAnimationFrame(() => {
    if (!logoRef.current) return;

    const rect = logoRef.current.getBoundingClientRect();
    const centerX = window.innerWidth / 2;
    const logoCenter = rect.left + rect.width / 2;

    const distance = Math.abs(centerX - logoCenter);
    const range = window.innerWidth * 0.35;

    const normalizedDistance = Math.min(distance / range, 1);
    proximity.set(normalizedDistance);
  });

  const scale = useTransform(proximity, [0, 1], [1.2, 0.8]);
  const opacity = useTransform(proximity, [0, 1], [1, 0.3]);
  const grayscaleAmount = useTransform(proximity, [0, 1], [0, 100]);
  const filter = useTransform(grayscaleAmount, (v) => `grayscale(${v}%)`);

  return (
    <motion.div
      ref={logoRef}
      style={{ scale, opacity, filter }}
      className="flex-shrink-0 w-[140px] h-[80px] flex items-center justify-center will-change-transform"
    >
      <img
        src={logo.src}
        alt={logo.alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-contain image-rendering-auto"
      />
    </motion.div>
  );
};

export const ClientsSection: React.FC<ClientsSectionProps> = ({ logos }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (!contentRef.current) return;

    const updateWidth = () => {
      if (contentRef.current) {
        // Divide by 2 because we duplicate the set for seamless looping
        setContentWidth(contentRef.current.scrollWidth / 2);
      }
    };

    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(contentRef.current);

    return () => resizeObserver.disconnect();
  }, [logos]);

  useAnimationFrame((_, delta) => {
    if (!contentWidth) return;

    // Slow, steady crawl.
    const moveBy = (delta / 1000) * 55;
    let newX = x.get() - moveBy;

    // Seamless wrap-around
    if (newX <= -contentWidth) {
      newX += contentWidth;
    }

    x.set(newX);
  });

  return (
    <section className="text-center py-[80px] px-5 bg-white max-md:py-12 max-md:px-[15px] overflow-hidden">
      <h2 className="text-[1.8rem] font-normal tracking-[1px] text-primary mb-2.5 max-md:text-[1.5rem] max-sm:text-[1.3rem]">
        OUR CLIENTS
      </h2>
      <h3 className="text-[2rem] font-bold text-primary mb-[100px] max-md:text-[1.6rem] max-md:mb-[60px] max-sm:text-[1.4rem]">
        TRUSTED BY BUSINESSES ACROSS NEPAL
      </h3>
      <div
        ref={containerRef}
        className="relative w-full py-10 cursor-default touch-none"
      >
        <motion.div
          ref={contentRef}
          style={{ x }}
          className="flex items-center gap-32 w-max will-change-transform"
        >
          {/* Main set */}
          {logos.map((logo, index) => (
            <AnimatedLogo key={`main-${index}`} logo={logo} scrollX={x} />
          ))}
          {/* Duplicate set for seamless looping */}
          {logos.map((logo, index) => (
            <AnimatedLogo key={`dup-${index}`} logo={logo} scrollX={x} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
