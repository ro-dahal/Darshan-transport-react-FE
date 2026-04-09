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

interface ClientCarouselProps {
  logos: LogoItem[];
  speed?: number; // px per second
  size?: 'default' | 'compact';
}

const SIZE_STYLES = {
  default: {
    itemClassName:
      'w-[260px] h-[140px] max-md:w-[180px] max-md:h-[100px]',
    scaleRange: [2.0, 0.55] as [number, number],
    sidePaddingRange: [48, 4] as [number, number],
    gapClassName: 'gap-10 max-md:gap-4',
  },
  compact: {
    itemClassName:
      'w-[210px] h-[112px] max-md:w-[150px] max-md:h-[84px]',
    scaleRange: [1.65, 0.5] as [number, number],
    sidePaddingRange: [36, 4] as [number, number],
    gapClassName: 'gap-8 max-md:gap-3',
  },
} as const;

const ClientCarousel: React.FC<ClientCarouselProps> = ({
  logos,
  speed = 50,
  size = 'default',
}) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const [contentWidth, setContentWidth] = useState(0);
  const sizeStyles = SIZE_STYLES[size];

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

    const scale = useTransform(proximity, [0, 1], sizeStyles.scaleRange);
    const opacity = useTransform(proximity, [0, 1], [1, 0.2]);
    const grayscaleAmount = useTransform(proximity, [0, 1], [0, 100]);
    const filter = useTransform(grayscaleAmount, (v) => `grayscale(${v}%)`);
    const sidePadding = useTransform(proximity, [0, 1], sizeStyles.sidePaddingRange);

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
        className={`flex-shrink-0 ${sizeStyles.itemClassName} flex items-center justify-center will-change-transform`}
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
        className={`flex items-center ${sizeStyles.gapClassName} w-max will-change-transform`}
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

export default ClientCarousel;
