import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  SERVICES_HERO,
  SERVICES_STATS,
  SERVICES_CARDS,
  SERVICES_OFFERINGS,
} from '../data/servicesContent';
import { MetaTags } from '../../../../core/components/MetaTags';
import { useBreakpoint } from '../../../../core/hooks/useBreakpoint';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

/* ── Hero ───────────────────────────────────── */
const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const { isMobile } = useBreakpoint();
  const heroImage = isMobile
    ? SERVICES_HERO.mobileBackgroundImage
    : SERVICES_HERO.backgroundImage;
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);

  return (
    <section
      ref={ref}
      id="services-hero"
      className="relative w-full h-[calc(100dvh-var(--head-height,90px))] overflow-hidden flex items-end justify-start"
    >
      <motion.div
        className="absolute inset-0 w-full h-full bg-center bg-bottom bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${heroImage})`,
          y: bgY,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-8 pb-16 max-md:px-5 max-md:pb-10">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-primary text-sm font-semibold tracking-[3px] uppercase mb-4"
        >
          Our Services
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-white text-[3.5rem] leading-[1.1] font-extrabold max-w-[650px] max-lg:text-[2.6rem] max-md:text-[2rem]"
        >
          {SERVICES_HERO.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-4 text-white/75 text-lg max-w-[500px] leading-relaxed max-md:text-base"
        >
          {SERVICES_HERO.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="absolute bottom-16 right-8 flex items-center gap-3 text-white/50 text-sm max-md:hidden"
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
      </div>
    </section>
  );
};

/* ── Animated Number ────────────────────────── */
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

/* ── Growth Stats ───────────────────────────── */
const Growth: React.FC = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-secondary py-16">
      <div className="max-w-[1200px] mx-auto px-8 text-center">
        <p className="text-primary text-sm font-semibold tracking-[3px] uppercase">
          Our Growth
        </p>
        <h2 className="mt-3 text-3xl font-extrabold text-white max-md:text-2xl">
          Driven by Results
        </h2>
        <div className="mt-10 flex justify-center gap-20 max-md:gap-10 max-sm:flex-col max-sm:gap-8">
          {SERVICES_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-primary text-[3rem] font-extrabold leading-none max-md:text-[2.2rem]">
                <AnimatedNumber
                  target={s.value}
                  suffix={s.suffix}
                  inView={inView}
                />
              </div>
              <div className="text-white/60 text-sm font-medium mt-2 uppercase tracking-wider">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Who We Serve Grid ──────────────────────── */
const ServeGrid: React.FC = () => (
  <section className="relative py-24 px-8 bg-white overflow-hidden max-lg:py-16 max-md:py-12 max-md:px-5">
    {/* Subtle dot pattern background */}
    <div
      className="absolute inset-0 opacity-[0.4] pointer-events-none"
      style={{
        backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    />

    <div className="relative z-10 max-w-[1240px] mx-auto">
      {/* Header section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="text-center mb-16"
      >
        <motion.p
          variants={fadeUp}
          custom={0}
          className="text-primary text-sm font-bold tracking-[3px] uppercase mb-4"
        >
          Who We Serve
        </motion.p>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="text-[2.8rem] font-extrabold text-[#1a1a1a] leading-[1.12] max-md:text-[2rem]"
        >
          Partnering with Key Industries
        </motion.h2>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {SERVICES_CARDS.map((card) => (
          <motion.div
            key={card.label}
            variants={scaleIn}
            className="group relative bg-white rounded-2xl p-8 lg:p-10 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col items-start overflow-hidden"
          >
            {/* Top accent bar visible on hover */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-primary/60 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />

            <div className="w-[60px] h-[60px] rounded-xl bg-primary/5 flex items-center justify-center mb-6 border border-primary/10 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
              {card.iconType === 'image' ? (
                <img
                  src={card.icon}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="w-8 h-auto opacity-80 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
              ) : (
                <span className="text-primary text-2xl">🌍</span>
              )}
            </div>

            <h4 className="text-[1.15rem] font-bold text-[#1a1a1a] leading-[1.6] group-hover:text-primary transition-colors duration-300">
              {card.label}
            </h4>

            {/* Decorative arrow in the corner */}
            <div className="absolute bottom-6 right-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-primary">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ── Benefits ───────────────────────────────── */
const BENEFITS = [
  'Full-truck and bulk cargo transport across Nepal',
  'Direct delivery with minimal handling',
  'Structured logistics process from pickup to delivery',
  'Real-time coordination and shipment updates',
  'Strong route network across major cities and industrial areas',
  'Scalable solutions for growing businesses',
];

const Benefits: React.FC = () => (
  <section className="py-24 px-8 bg-secondary max-lg:py-16 max-md:py-12 max-md:px-5">
    <div className="max-w-[800px] mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <motion.p
          variants={fadeUp}
          custom={0}
          className="text-primary text-sm font-semibold tracking-[3px] uppercase"
        >
          Why Choose Us
        </motion.p>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mt-3 text-[2.4rem] font-extrabold text-white max-md:text-[1.8rem]"
        >
          Why Businesses Choose{' '}
          <span className="text-primary">Darshan Transport</span>
        </motion.h2>
        <motion.div
          variants={fadeUp}
          custom={2}
          className="mt-3 h-1 w-14 bg-primary rounded-full"
        />
      </motion.div>

      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="mt-10 space-y-4 list-none"
      >
        {BENEFITS.map((item, i) => (
          <motion.li
            key={i}
            variants={scaleIn}
            className="flex items-start gap-4 bg-white/5 rounded-lg px-5 py-4 border border-white/8 hover:border-primary/20 transition-colors duration-200"
          >
            <span className="text-primary text-lg mt-0.5 flex-shrink-0">✓</span>
            <span className="text-white/85 text-base leading-relaxed">
              {item}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  </section>
);

/* ── Process ────────────────────────────────── */
const PROCESS_STEPS = [
  {
    title: 'Requirement Understanding',
    description:
      'We understand your cargo type, volume, and delivery locations.',
  },
  {
    title: 'Planning & Vehicle Allocation',
    description: 'We assign the right vehicle and plan the route.',
  },
  {
    title: 'Pickup & Loading',
    description: 'Goods are picked up and loaded securely.',
  },
  {
    title: 'Transport & Tracking',
    description: 'Shipment is transported with coordination and tracking.',
  },
  {
    title: 'Delivery & Confirmation',
    description: 'Goods are delivered and confirmed at destination.',
  },
];

const Process: React.FC = () => (
  <section className="relative py-24 px-8 bg-[#fafafa] overflow-hidden max-lg:py-16 max-md:py-12 max-md:px-5">
    {/* Decorative Background Accents */}
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

    <div className="relative z-10 max-w-[1240px] mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="text-center mb-24 max-lg:mb-12"
      >
        <motion.p
          variants={fadeUp}
          custom={0}
          className="text-primary text-sm font-bold tracking-[3px] uppercase mb-4"
        >
          Our Process
        </motion.p>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="text-[2.8rem] font-extrabold text-[#1a1a1a] leading-[1.15] max-md:text-[2rem]"
        >
          How We Deliver Excellence
        </motion.h2>
      </motion.div>

      <div className="relative">
        {/* Horizontal Line (Desktop) */}
        <div className="hidden lg:block absolute top-[35px] left-[10%] right-[10%] h-[3px] bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 rounded-full" />

        {/* Vertical Line (Mobile) */}
        <div className="block lg:hidden absolute left-[35px] top-[10px] bottom-[10px] w-[3px] bg-gradient-to-b from-primary/10 via-primary/30 to-primary/10 rounded-full" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-5 relative">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className="relative flex flex-col items-start lg:items-center max-lg:pl-[84px] max-lg:justify-center max-lg:min-h-[100px]"
            >
              {/* Timeline Node */}
              <div className="max-lg:absolute max-lg:left-0 lg:mb-8 flex-shrink-0 w-[74px] h-[74px] bg-[#fafafa] rounded-full border-4 border-white shadow-[0_4px_16px_rgb(0,0,0,0.06)] flex items-center justify-center z-10 transition-transform duration-500 hover:scale-110">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl relative overflow-hidden group">
                  <span className="relative z-10">{i + 1}</span>
                  <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-500 rounded-full" />
                </div>
              </div>

              {/* Content Card */}
              <div className="w-full h-full">
                <div className="group bg-white p-7 max-lg:p-6 rounded-[1.5rem] shadow-[0_8px_24px_rgb(0,0,0,0.03)] border border-gray-100/50 hover:shadow-[0_16px_32px_rgb(0,0,0,0.06)] hover:border-primary/20 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden h-full flex flex-col items-start lg:items-center lg:text-center text-left">
                  {/* Watermark Number */}
                  <div className="absolute inset-0 flex lg:items-center max-lg:items-start lg:justify-center max-lg:justify-end max-lg:pr-4 max-lg:pt-2 text-[5rem] lg:text-[7rem] font-black text-[#f8f8f8] select-none pointer-events-none group-hover:text-primary/5 transition-colors duration-500 leading-none">
                    0{i + 1}
                  </div>

                  <div className="relative z-10 h-full flex flex-col">
                    <h4 className="text-[1.15rem] font-bold text-[#1a1a1a] mb-2 group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h4>
                    <p className="text-gray-500 leading-[1.65] text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ── What We Offer ──────────────────────────────── */
const Offerings: React.FC = () => (
  <section className="relative py-24 px-8 bg-secondary overflow-hidden max-lg:py-16 max-md:py-12 max-md:px-5">
    {/* Background texture */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage:
          'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }}
    />
    {/* Accent glows */}
    <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[140px] pointer-events-none" />
    <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-primary/6 rounded-full blur-[120px] pointer-events-none" />

    <div className="relative z-10 max-w-[1200px] mx-auto">
      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="text-center mb-16"
      >
        <motion.p
          variants={fadeUp}
          custom={0}
          className="text-primary text-xs font-bold tracking-[0.22em] uppercase mb-4"
        >
          What We Offer
        </motion.p>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="text-[2.4rem] font-extrabold text-white leading-[1.15] max-md:text-[1.8rem]"
        >
          Our Logistics Services
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-4 text-white/50 text-base max-w-[550px] mx-auto leading-relaxed"
        >
          Comprehensive transport and supply chain solutions tailored for
          businesses across Nepal.
        </motion.p>
      </motion.div>

      {/* Bento grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1"
      >
        {SERVICES_OFFERINGS.map((service, idx) => (
          <motion.div
            key={service.slug}
            variants={scaleIn}
            className={`group relative rounded-2xl bg-white/[0.04] border border-white/8 p-7 backdrop-blur-sm hover:border-primary/30 hover:bg-white/[0.07] transition-all duration-500 ${
              idx < 2 ? 'max-lg:col-span-1 lg:col-span-1' : ''
            }`}
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-7 w-10 h-[3px] bg-primary/60 rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Service number */}
            <span className="text-white/10 text-[3.5rem] font-extrabold leading-none absolute top-4 right-5 select-none pointer-events-none group-hover:text-primary/15 transition-colors duration-500">
              {String(idx + 1).padStart(2, '0')}
            </span>

            {/* Emoji icon */}
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
              <span className="text-2xl" aria-hidden="true">
                {service.emoji}
              </span>
            </div>

            {/* Content */}
            <h4 className="text-lg font-bold text-white mb-2 leading-snug">
              {service.title}
            </h4>
            <p className="text-white/50 text-sm leading-[1.8] mb-4 text-justify">
              {service.description}
            </p>

            {/* Highlight tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {service.highlights.map((h) => (
                <span
                  key={h}
                  className="text-[0.7rem] font-semibold text-primary/80 bg-primary/8 px-2.5 py-1 rounded-full uppercase tracking-wide"
                >
                  {h}
                </span>
              ))}
            </div>

            {/* Learn more link */}
            <Link
              to={service.slug}
              className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:gap-3 transition-all duration-300 no-underline mt-auto"
            >
              Learn More{' '}
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </Link>

            {/* Corner hover accent */}
            <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-primary/20 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ── CTA ────────────────────────────────────── */
const Cta: React.FC = () => (
  <section className="relative py-14 px-8 bg-primary overflow-hidden max-md:py-12 max-md:px-5">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-white/10 translate-x-1/2 translate-y-1/2" />
    </div>
    <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-12 relative z-10 max-lg:flex-col max-lg:text-center">
      <h2 className="text-[2.2rem] font-extrabold text-secondary leading-none lg:whitespace-nowrap max-md:text-[1.7rem]">
        Ready for Reliable Logistics Across Nepal?
      </h2>
      <div className="flex flex-col items-center gap-4 shrink-0 max-sm:w-full sm:flex-row sm:justify-center">
        <Link
          to="/get-quote"
          className="bg-secondary text-primary font-bold py-3.5 px-10 rounded-lg text-base transition-all duration-200 hover:bg-secondary/90 hover:text-primary-light no-underline whitespace-nowrap text-center"
        >
          Get a Quote
        </Link>
        <Link
          to="/contact"
          className="font-bold text-base text-secondary transition-colors duration-300 hover:text-secondary/70 no-underline whitespace-nowrap text-center"
        >
          Contact Us
        </Link>
      </div>
    </div>
  </section>
);

/* ── Page ───────────────────────────────────── */
const SERVICES_PAGE_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Transport & Logistics Services',
  areaServed: 'Nepal',
  provider: {
    '@type': 'Organization',
    name: 'Darshan Transport',
  },
  serviceType: 'Logistics and Transport',
};

export const ServicesPage: React.FC = () => (
  <div className="flex flex-col min-h-screen">
    <MetaTags
      title="Logistics Services Nepal | Bulk Transport, Warehousing | Darshan Transport"
      description="Explore logistics services in Nepal including bulk cargo transport, full truckload, warehousing solutions for businesses across Nepal."
      canonical="https://darshantransport.com/services"
      structuredData={SERVICES_PAGE_STRUCTURED_DATA}
    />
    <Hero />
    <Growth />
    <ServeGrid />
    <Benefits />
    <Process />
    <Offerings />
    <Cta />
  </div>
);
