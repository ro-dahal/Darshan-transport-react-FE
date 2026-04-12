import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const stats = [
  { value: 100000, suffix: '+', label: 'Deliveries Completed', prefix: '' },
  { value: 80000, suffix: '+', label: 'Happy Customers', prefix: '' },
  { value: 10000, suffix: '', label: 'Sq. Ft Warehousing', prefix: '' },
  { value: 20, suffix: '+', label: 'Years of Service', prefix: '' },
];

const AnimatedNumber: React.FC<{
  target: number;
  suffix: string;
  inView: boolean;
}> = ({ target, suffix, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 1000;
    const step = target / (duration / 16);
    let raf: number;

    const animate = () => {
      start += step;
      if (start >= target) {
        setCount(target);
        return;
      }
      setCount(Math.floor(start));
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  const formatNumber = (n: number) => {
    if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
    return n.toString();
  };

  return (
    <span>
      {formatNumber(count)}
      {suffix}
    </span>
  );
};

export const StatsBanner: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      className="relative bg-[#1a1a1a] py-20 px-8 overflow-hidden max-md:py-14 max-md:px-5"
    >
      {/* Gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-primary/5 pointer-events-none" />

      <div className="relative z-10 max-w-[1100px] mx-auto">
        <div className="grid grid-cols-4 gap-8 max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center"
            >
              <div className="text-primary text-[2.8rem] font-extrabold leading-none max-md:text-[2.2rem]">
                <AnimatedNumber
                  target={stat.value}
                  suffix={stat.suffix}
                  inView={inView}
                />
              </div>
              <p className="mt-3 text-white/50 text-sm font-medium tracking-wide uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
