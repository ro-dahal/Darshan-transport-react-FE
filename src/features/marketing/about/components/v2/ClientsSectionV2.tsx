import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import type { LogoItem } from '../../data/aboutContent';

interface ClientsSectionV2Props {
  logos: LogoItem[];
}

const AnimatedLogo: React.FC<{
  logo: LogoItem;
  scrollX: MotionValue<number>;
}> = ({ logo }) => {
  const ref = useRef<HTMLDivElement>(null);
  const proximity = useMotionValue(1);

  useAnimationFrame(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = window.innerWidth / 2;
    const logoCenter = rect.left + rect.width / 2;
    const distance = Math.abs(centerX - logoCenter);
    const range = window.innerWidth * 0.35;
    proximity.set(Math.min(distance / range, 1));
  });

  const scale = useTransform(proximity, [0, 1], [1.3, 0.7]);
  const opacity = useTransform(proximity, [0, 1], [1, 0.25]);
  const grayscaleAmount = useTransform(proximity, [0, 1], [0, 100]);
  const filter = useTransform(grayscaleAmount, (v) => `grayscale(${v}%)`);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, filter }}
      className="flex-shrink-0 w-[180px] h-[100px] flex items-center justify-center will-change-transform max-md:w-[140px] max-md:h-[75px]"
    >
      <img
        src={logo.src}
        alt={logo.alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
};

export const ClientsSectionV2: React.FC<ClientsSectionV2Props> = ({
  logos,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (!contentRef.current) return;
    const update = () => {
      if (contentRef.current)
        setContentWidth(contentRef.current.scrollWidth / 2);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [logos]);

  useAnimationFrame((_, delta) => {
    if (!contentWidth) return;
    let newX = x.get() - (delta / 1000) * 50;
    if (newX <= -contentWidth) newX += contentWidth;
    x.set(newX);
  });

  return (
    <section className="py-20 px-5 bg-white overflow-hidden max-md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 max-md:mb-8"
      >
        <span className="block text-primary text-xs font-bold tracking-[0.22em] uppercase mb-3">
          Our Clients
        </span>
        <h2 className="text-[2rem] font-extrabold text-[#1a1a1a] max-md:text-[1.5rem]">
          Trusted by businesses across Nepal
        </h2>
      </motion.div>

      <div className="relative w-full py-6 cursor-default touch-none">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          ref={contentRef}
          style={{ x }}
          className="flex items-center gap-24 w-max will-change-transform max-md:gap-14"
        >
          {logos.map((logo, i) => (
            <AnimatedLogo key={`main-${i}`} logo={logo} scrollX={x} />
          ))}
          {logos.map((logo, i) => (
            <AnimatedLogo key={`dup-${i}`} logo={logo} scrollX={x} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
