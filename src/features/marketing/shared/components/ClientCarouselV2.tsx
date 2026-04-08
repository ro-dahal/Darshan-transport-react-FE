import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from 'framer-motion';

interface LogoItem {
  src: string;
  alt: string;
}

interface ClientCarouselV2Props {
  logos: LogoItem[];
  speed?: number; // px per second
}

const ClientCarouselV2: React.FC<ClientCarouselV2Props> = ({
  logos,
  speed = 50,
}) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
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

    let newX = x.get() - (delta / 1000) * speed;
    if (newX <= -contentWidth) newX += contentWidth;
    x.set(newX);
  });

  const AnimatedLogo: React.FC<{ logo: LogoItem }> = ({ logo }) => {
    const ref = useRef<HTMLDivElement | null>(null);
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

    const scale = useTransform(proximity, [0, 1], [2.0, 0.55]);
    const opacity = useTransform(proximity, [0, 1], [1, 0.2]);
    const grayscaleAmount = useTransform(proximity, [0, 1], [0, 100]);
    const filter = useTransform(grayscaleAmount, (v) => `grayscale(${v}%)`);
    const sidePadding = useTransform(proximity, [0, 1], [48, 4]);

    return (
      <motion.div
        ref={ref}
        style={{
          scale,
          opacity,
          filter,
          paddingLeft: sidePadding,
          paddingRight: sidePadding,
        }}
        className="flex-shrink-0 w-[260px] h-[140px] flex items-center justify-center will-change-transform max-md:w-[180px] max-md:h-[100px]"
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

  return (
    <div className="relative w-full py-6 cursor-default touch-none">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <motion.div
        ref={contentRef}
        style={{ x }}
        className="flex items-center gap-10 w-max will-change-transform max-md:gap-4"
      >
        {logos.map((logo, i) => (
          <AnimatedLogo key={`main-${i}`} logo={logo} />
        ))}
        {logos.map((logo, i) => (
          <AnimatedLogo key={`dup-${i}`} logo={logo} />
        ))}
      </motion.div>
    </div>
  );
};

export default ClientCarouselV2;
