import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  HOME_CLIENT_LOGOS,
  HOME_REVIEW_TESTIMONIALS,
  HOME_HERO_DESCRIPTION,
  HOME_ABOUT_DESCRIPTION,
  OUR_SERVICES_DATA,
} from '../data/homeContent';

import { MetaTags } from '../../../../core/components/MetaTags';
import bg1 from '../../../../assets/img/home-hero-slide-1.jpeg';
import bg2 from '../../../../assets/img/home-hero-slide-2.jpeg';
import bg3 from '../../../../assets/img/home-hero-slide-3.jpeg';
import gifOperations from '../../../../assets/img/optimized/operations-illustration.webp';
import bookPickupIcon from '../../../../assets/img/process-book-pickup.png';
import weCollectYourGoodsIcon from '../../../../assets/img/process-collect-your-goods.png';
import trackAndReceiveIcon from '../../../../assets/img/process-track-and-receive.png';
import NepalMap from '../../../../layout/components/MapOfNepal/map';

const IMAGES = [bg1, bg2, bg3];

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
  visible: { transition: { staggerChildren: 0.1 } },
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

const HOME_STAT_METRICS = [
  { value: 100000, suffix: '+', label: 'Deliveries' },
  { value: 80000, suffix: '+', label: 'Customers' },
  { value: 20000, suffix: '+', label: 'Reviews' },
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

  const formatNumber = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`;
    }

    return value.toString();
  };

  return (
    <span>
      {formatNumber(count)}
      {suffix}
    </span>
  );
};

/* ── Hero ───────────────────────────────────────── */
const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % IMAGES.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home-hero"
      ref={ref}
      className="relative w-full h-[calc(100dvh-var(--head-height,90px))] overflow-hidden flex items-center"
    >
      {/* Optimized Background Layers - Rendered once to prevent reloading/memory churn */}
      {IMAGES.map((img, i) => (
        <motion.div
          key={img}
          className="absolute inset-0 w-full h-full bg-center bg-cover"
          style={{ backgroundImage: `url(${img})`, y: bgY }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: i === index ? 1 : 0,
            scale: i === index ? 1 : 1.08,
          }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/15" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-[1200px] mx-auto px-8 max-md:px-5 max-md:text-center flex flex-col max-md:items-center"
      >
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-primary font-semibold text-xs tracking-[3px] uppercase mb-4"
        >
          Transport & Logistics
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-white text-[3.2rem] leading-[1.08] font-extrabold max-w-[650px] max-lg:text-[2.6rem] max-md:text-[2rem] max-sm:text-[1.8rem]"
        >
          Bulk Cargo, Full-Truck{' '}
          <span className="text-primary">Logistics Services</span> Across Nepal
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-5 text-white/80 text-base max-w-[500px] leading-relaxed max-md:text-sm max-md:mx-auto text-justify"
        >
          {HOME_HERO_DESCRIPTION}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-3 text-white/55 text-xs max-w-[500px] italic max-md:mx-auto text-justify"
        >
          Built for high-volume cargo, structured delivery, and dependable
          logistics operations.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-8 flex gap-4 max-sm:flex-col max-sm:w-full max-md:justify-center"
        >
          <Link
            to="/order"
            className="bg-primary text-white font-bold py-3.5 px-8 rounded-lg text-base shadow-lg transition-all duration-200 hover:bg-primary-hover hover:shadow-xl no-underline max-sm:text-center"
          >
            Track Your Shipment
          </Link>
          <Link
            to="/get-quote"
            className="bg-white/10 backdrop-blur-sm text-white font-bold py-3.5 px-8 rounded-lg text-base border border-white/20 transition-all duration-200 hover:bg-white/20 no-underline max-sm:text-center"
          >
            Get a Quote
          </Link>
        </motion.div>
      </motion.div>
      {/* Scroll indicator - Aligned to content max-width */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[1200px] px-8 flex justify-end pointer-events-none z-20 max-md:hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex items-center gap-3 text-white/40 text-sm pointer-events-auto"
        >
          <span>Scroll</span>
          <span className="w-5 h-8 rounded-full border-2 border-white/25 flex items-start justify-center pt-1.5">
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

/* ── Stats Banner ───────────────────────────────── */
const StatsBanner: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      className="relative bg-secondary py-20 px-8 overflow-hidden max-md:py-14 max-md:px-5"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-primary/5 pointer-events-none" />

      <div className="relative z-10 max-w-[1100px] mx-auto">
        <div className="grid grid-cols-3 gap-8 max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-10">
          {HOME_STAT_METRICS.map((stat, index) => (
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

/* ── About / Features ───────────────────────────── */
const AboutSection: React.FC = () => (
  <section className="py-24 px-8 max-lg:py-16 max-md:py-12 max-md:px-5">
    <div className="max-w-[1200px] mx-auto">
      <div className="grid grid-cols-[1fr_0.85fr] gap-16 items-center max-lg:grid-cols-1 max-lg:gap-10">
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
            About Us
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-4 text-[2.6rem] font-extrabold leading-[1.12] text-[#1a1a1a] max-md:text-[2rem]"
          >
            Transport Solutions{' '}
            <span className="text-primary">Built for Business</span>
          </motion.h2>
          <motion.div
            variants={fadeUp}
            custom={2}
            className="mt-3 h-1 w-14 bg-primary rounded-full"
          />
          <motion.p
            variants={fadeUp}
            custom={3}
            className="mt-6 text-text-medium text-[1.05rem] leading-[1.85] text-justify"
          >
            {HOME_ABOUT_DESCRIPTION}
          </motion.p>
          <motion.div variants={fadeUp} custom={4} className="mt-8">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all duration-200 no-underline"
            >
              Learn more about us
              <span className="text-lg">→</span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-primary/10 rounded-2xl -z-10 max-lg:hidden" />
          <img
            src={gifOperations}
            alt="Operations"
            loading="lazy"
            decoding="async"
            className="w-full rounded-xl shadow-lg"
          />
        </motion.div>
      </div>
    </div>
  </section>
);

/* ── Services Grid ──────────────────────────────── */
const ServicesSection: React.FC = () => (
  <section className="py-24 px-8 bg-[#fafafa] max-lg:py-16 max-md:py-12 max-md:px-5">
    <div className="max-w-[1200px] mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="text-center mb-14"
      >
        <motion.p
          variants={fadeUp}
          custom={0}
          className="text-primary text-sm font-semibold tracking-[3px] uppercase"
        >
          Our Services
        </motion.p>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mt-3 text-[2.4rem] font-extrabold text-[#1a1a1a] max-md:text-[1.8rem]"
        >
          Logistics Services for Business Cargo Movement
        </motion.h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-2 gap-6 max-md:grid-cols-1"
      >
        {OUR_SERVICES_DATA.map((s) => (
          <motion.article
            key={s.title}
            variants={scaleIn}
            className="group bg-white rounded-xl p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 cursor-default"
          >
            <div className="flex gap-5 items-start">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                {s.iconType === 'image' ? (
                  <img
                    src={s.icon}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-8 h-8 object-contain"
                    aria-hidden="true"
                  />
                ) : (
                  <span className="text-primary text-2xl">📦</span>
                )}
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#1a1a1a] mb-1.5">
                  {s.title}
                </h4>
                <p className="text-text-medium text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center mt-10"
      >
        <Link
          to="/services"
          className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white font-semibold py-3.5 px-8 rounded-lg hover:bg-[#333] transition-colors duration-200 no-underline"
        >
          View All Services
          <span>→</span>
        </Link>
      </motion.div>
    </div>
  </section>
);

/* ── How It Works ───────────────────────────────── */
const HOW_IT_WORKS = [
  {
    title: 'Share Your Shipment Details',
    description: 'Tell us about your cargo, route, and transport requirement.',
    icon: bookPickupIcon,
  },
  {
    title: 'Get the Right Transport Plan',
    description:
      'We recommend the right logistics solution based on shipment volume and destination.',
    icon: weCollectYourGoodsIcon,
  },
  {
    title: 'Pickup, Movement & Delivery',
    description:
      'Our team handles transport planning, movement, and delivery support.',
    icon: trackAndReceiveIcon,
  },
  {
    title: 'Track Progress & Support',
    description:
      'Stay updated throughout the shipment process with service support when needed.',
    icon: bookPickupIcon,
  },
];

const HowItWorksSection: React.FC = () => (
  <section className="py-24 px-8 max-lg:py-16 max-md:py-12 max-md:px-5">
    <div className="max-w-[1000px] mx-auto text-center">
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
          How It Works
        </motion.p>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mt-3 text-[2.4rem] font-extrabold text-[#1a1a1a] max-md:text-[1.8rem]"
        >
          How Our Transport Process Works
        </motion.h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="mt-14 grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:items-center max-sm:max-w-[300px] max-sm:mx-auto"
      >
        {HOW_IT_WORKS.map((step, i) => (
          <motion.div
            key={step.title}
            variants={scaleIn}
            className="relative bg-primary text-white rounded-2xl p-8 pt-12 text-center shadow-[8px_8px_0_#e0e0e0] hover:shadow-[12px_12px_0_#d0d0d0] hover:-translate-y-1 transition-all duration-300 max-sm:w-full"
          >
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#1a1a1a] text-white text-sm font-bold flex items-center justify-center shadow-md">
              {i + 1}
            </div>
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
              <img
                src={step.icon}
                alt=""
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain"
                aria-hidden="true"
              />
            </div>
            <h4 className="font-bold text-lg mb-2">{step.title}</h4>
            <p className="text-white/85 text-sm">{step.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ── Reach / Locations ──────────────────────────── */
const REACH_STATS = [
  { value: 17, label: 'Service Points' },
  { value: 5, label: 'Booking Offices' },
  { value: 12, label: 'Delivery Zones' },
] as const;

const ReachSection: React.FC = () => (
  <section className="py-28 px-8 bg-secondary relative overflow-hidden max-lg:py-20 max-md:py-14 max-md:px-5">
    {/* Ambient glow */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(252,175,23,0.05)_0%,transparent_65%)] pointer-events-none" />

    <div className="max-w-[1200px] mx-auto relative z-10">
      {/* Centered Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        className="text-center mb-14 max-md:mb-10"
      >
        <p className="text-primary text-sm font-semibold tracking-[3px] uppercase">
          Our Reach
        </p>
        <h2 className="mt-4 text-[2.8rem] font-extrabold text-white leading-[1.1] max-md:text-[1.8rem]">
          Nationwide Transport Coverage Across{' '}
          <span className="text-primary">Nepal</span>
        </h2>
        <div className="mt-4 h-1 w-14 bg-primary rounded-full mx-auto" />
        <p className="mt-6 text-white/45 max-w-[1010px] mx-auto leading-relaxed text-[0.95rem] text-justify">
          Darshan Transport supports cargo movement across key commercial hubs,
          booking offices, and delivery zones in Nepal. Our network is built to
          help businesses move goods reliably between major cities and service
          points.
        </p>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={staggerContainer}
        className="flex justify-center gap-10 mb-14 flex-wrap max-md:gap-6 max-md:mb-10"
      >
        {REACH_STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            custom={i}
            className="text-center min-w-[120px]"
          >
            <span className="block text-4xl font-extrabold text-primary max-md:text-3xl">
              {stat.value}
            </span>
            <span className="mt-1.5 block text-xs text-white/35 font-semibold tracking-[0.15em] uppercase">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Map Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-6 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-sm max-md:p-3 max-md:rounded-2xl"
      >
        <NepalMap
          style={{ width: '100%', maxWidth: '100%', margin: '0 auto' }}
        />
      </motion.div>
    </div>
  </section>
);

/* ── Clients Marquee (uses shared carousel) ────────────────────────────── */
import ClientCarousel from '../../shared/components/ClientCarousel';

const ClientsSection: React.FC = () => (
  <section className="py-20 px-5 bg-white overflow-hidden max-md:py-12">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className="text-center mb-14 max-md:mb-8"
    >
      <span className="block text-primary text-xs font-bold tracking-[0.22em] uppercase mb-3">
        Trusted By
      </span>
      <h2 className="text-[2rem] font-extrabold text-[#1a1a1a] max-md:text-[1.5rem]">
        Companies That Count on Us
      </h2>
    </motion.div>

    <ClientCarousel logos={HOME_CLIENT_LOGOS} />
  </section>
);

/* ── Testimonials ───────────────────────────────── */
const TestimonialsSection: React.FC = () => (
  <section className="py-24 px-8 bg-[#fafafa] max-lg:py-16 max-md:py-12 max-md:px-5">
    <div className="max-w-[1200px] mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="text-center mb-14"
      >
        <motion.p
          variants={fadeUp}
          custom={0}
          className="text-primary text-sm font-semibold tracking-[3px] uppercase"
        >
          Testimonials
        </motion.p>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mt-3 text-[2.4rem] font-extrabold text-[#1a1a1a] max-md:text-[1.8rem]"
        >
          What Our Customers Say
        </motion.h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1"
      >
        {HOME_REVIEW_TESTIMONIALS.slice(0, 3).map((rev, i) => (
          <motion.div
            key={i}
            variants={scaleIn}
            className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 relative"
          >
            <div className="text-primary text-5xl font-serif leading-none mb-4 opacity-30">
              "
            </div>
            <p className="text-text-medium text-sm leading-relaxed mb-6">
              {rev.quote}
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
                <img
                  src={rev.image}
                  alt={rev.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-bold text-[#1a1a1a]">
                  {rev.name}
                </div>
                <div className="text-xs text-text-medium">{rev.company}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ── CTA ────────────────────────────────────────── */
const CtaSection: React.FC = () => (
  <section className="relative py-14 px-8 bg-primary overflow-hidden max-md:py-12 max-md:px-5">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 left-0 w-[40%] h-full bg-gradient-to-r from-black/20 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-white/10 translate-x-1/2 translate-y-1/2" />
    </div>
    <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-12 relative z-10 max-lg:flex-col max-lg:text-center">
      <div>
        <h2 className="text-[2.2rem] font-extrabold text-[#1a1a1a] leading-none lg:whitespace-nowrap max-md:text-[1.7rem]">
          Need Reliable Bulk Transport Across Nepal?
        </h2>
        <p className="mt-3 text-white text-[1.1rem] font-medium leading-relaxed max-w-[600px] max-lg:mx-auto max-md:text-[1rem]">
          Talk to Darshan Transport for full-truck shipments, warehousing, and
          business logistics support.
        </p>
      </div>
      <div className="flex sm:flex-row flex-col gap-4 shrink-0 max-sm:w-full">
        <Link
          to="/get-quote"
          className="bg-[#1a1a1a] text-white font-bold py-3.5 px-10 rounded-lg text-base transition-all duration-200 hover:bg-[#333] no-underline whitespace-nowrap text-center"
        >
          Get a Quote
        </Link>
        <Link
          to="/contact"
          className="bg-white text-[#1a1a1a] font-bold py-3.5 px-10 rounded-lg text-base transition-all duration-200 hover:bg-white/90 no-underline whitespace-nowrap text-center"
        >
          Contact Us
        </Link>
      </div>
    </div>
  </section>
);

/* ── Page ───────────────────────────────────────── */
const HOME_PAGE_STRUCTURED_DATA = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Darshan Transport',
    url: 'https://darshantransport.com',
    logo: 'https://darshantransport.com/LogoTab.png',
    description:
      'Darshan Transport provides bulk cargo transport, full-truck shipments, warehousing, and logistics services across Nepal for businesses that need reliable delivery support.',
    areaServed: 'NP',
  },
];

export const HomePage: React.FC = () => (
  <div className="flex flex-col min-h-screen">
    <MetaTags
      title="Transport & Logistics Company in Nepal | Bulk Cargo & 3PL | Darshan Transport"
      description="Darshan Transport provides bulk cargo transport, full-truck shipments, warehousing, and logistics services across Nepal for businesses that need reliable delivery support."
      canonical="https://darshantransport.com/"
      structuredData={HOME_PAGE_STRUCTURED_DATA}
    />
    <Hero />
    <StatsBanner />
    <ClientsSection />
    <AboutSection />
    <ServicesSection />
    <HowItWorksSection />
    <ReachSection />
    <TestimonialsSection />
    <CtaSection />
  </div>
);
