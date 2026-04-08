import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  SERVICES_HERO,
  SERVICES_STATS,
  SERVICES_CARDS,
} from '../data/servicesContent';
import {
  SERVICES_ACCORDION_DATA,
  ALL_DISTRICTS,
} from '../data/servicesAccordionData';
import { MetaTags } from '../../../../core/components/MetaTags';
import parcelCourierDeliveryIcon from '../../../../assets/img/service-parcel-courier-delivery.png';

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
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);

  return (
    <section
      ref={ref}
      id="services-hero"
      className="relative w-full h-[calc(100dvh-var(--head-height,90px))] overflow-hidden flex items-end justify-start"
    >
      <motion.div
        className="absolute inset-0 w-full h-full bg-center bg-bottom bg-no-repeat bg-contain"
        style={{
          backgroundImage: `url(${SERVICES_HERO.backgroundImage})`,
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
    <section ref={ref} className="bg-[#1a1a1a] py-16">
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
                {inView ? s.value : '0'}
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
  <section className="py-24 px-8 max-lg:py-16 max-md:py-12 max-md:px-5">
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
          Who We Serve
        </motion.p>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mt-3 text-[2.4rem] font-extrabold text-[#1a1a1a] max-md:text-[1.8rem]"
        >
          We Work With
        </motion.h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1"
      >
        {SERVICES_CARDS.map((card) => (
          <motion.div
            key={card.label}
            variants={scaleIn}
            className="group bg-white rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
              {card.iconType === 'image' ? (
                <img
                  src={card.icon}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="w-9 h-auto"
                  aria-hidden="true"
                />
              ) : (
                <span className="text-primary text-2xl">📦</span>
              )}
            </div>
            <h4 className="text-lg font-bold text-[#1a1a1a]">{card.label}</h4>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ── Benefits ───────────────────────────────── */
const BENEFITS = [
  'Nationwide coverage across major cities & districts',
  'End-to-end logistics: Store → Load → Deliver',
  'Lower operational cost',
  'Fast same-day dispatch',
  'Real-time stock & delivery visibility',
  'Fewer errors & smoother flow',
  'Scales as you grow',
];

const Benefits: React.FC = () => (
  <section className="py-24 px-8 bg-[#1a1a1a] max-lg:py-16 max-md:py-12 max-md:px-5">
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
          Benefits of Choosing{' '}
          <span className="text-primary">Darshan Logistics</span>
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
  { title: 'Onboarding', description: 'Understand routes, products, volume.' },
  { title: 'Setup', description: 'Assign warehouse space, SKUs & codes.' },
  {
    title: 'Daily Operations',
    description: 'Pick, pack, dispatch, return handling.',
  },
  { title: 'Reporting', description: 'Stock levels, shipment updates.' },
  { title: 'Scale', description: 'Add more cities or product lines anytime.' },
];

const Process: React.FC = () => (
  <section className="py-24 px-8 bg-[#fafafa] max-lg:py-16 max-md:py-12 max-md:px-5">
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
          Our Process
        </motion.p>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mt-3 text-[2.4rem] font-extrabold text-[#1a1a1a] max-md:text-[1.8rem]"
        >
          How Our Process Works
        </motion.h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="mt-14 grid grid-cols-5 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1"
      >
        {PROCESS_STEPS.map((step, i) => (
          <motion.div
            key={step.title}
            variants={scaleIn}
            className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
          >
            <div className="w-11 h-11 rounded-full bg-primary text-white font-bold flex items-center justify-center mx-auto mb-4 shadow-md text-lg">
              {i + 1}
            </div>
            <h4 className="font-bold text-[#1a1a1a] mb-1.5">{step.title}</h4>
            <p className="text-text-medium text-sm leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ── Industries ─────────────────────────────── */
const INDUSTRIES = [
  'FMCG',
  'Pharma',
  'Electronics',
  'E-Commerce',
  'Retail & Wholesale',
  'Manufacturing',
];

const Industries: React.FC = () => (
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
          Industries
        </motion.p>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mt-3 text-[2.4rem] font-extrabold text-[#1a1a1a] max-md:text-[1.8rem]"
        >
          Industries We Serve
        </motion.h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="mt-14 grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1"
      >
        {INDUSTRIES.map((ind) => (
          <motion.div
            key={ind}
            variants={scaleIn}
            className="bg-primary text-white rounded-xl p-7 text-left shadow-[6px_8px_0_#e0e0e0] hover:shadow-[10px_12px_0_#d0d0d0] hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-10 h-10 mb-4">
              <img
                src={parcelCourierDeliveryIcon}
                alt=""
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain brightness-0 invert"
                aria-hidden="true"
              />
            </div>
            <h4 className="text-lg font-bold">{ind}</h4>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ── Services Accordion ─────────────────────── */
const Accordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showDistricts, setShowDistricts] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const anchor = hash.replace('#', '');
        const idx = SERVICES_ACCORDION_DATA.findIndex((s) => s.id === anchor);
        if (idx !== -1) {
          setOpenIndex(idx);
          setTimeout(() => {
            document
              .getElementById(anchor)
              ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <section className="py-24 px-8 bg-[#fafafa] max-lg:py-16 max-md:py-12 max-md:px-5">
      <div className="max-w-[800px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center mb-12"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-primary text-sm font-semibold tracking-[3px] uppercase"
          >
            Detailed Services
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-3 text-[2.4rem] font-extrabold text-[#1a1a1a] max-md:text-[1.8rem]"
          >
            What We Offer
          </motion.h2>
        </motion.div>

        <div className="space-y-4">
          {SERVICES_ACCORDION_DATA.map((service, idx) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06, duration: 0.4 }}
              className={`bg-white rounded-xl overflow-hidden border transition-all duration-200 ${openIndex === idx ? 'border-primary/30 shadow-lg' : 'border-gray-100 shadow-sm'}`}
            >
              <button
                className="w-full text-left p-5 pr-7 flex items-center justify-between cursor-pointer bg-transparent border-none text-lg font-bold text-[#1a1a1a] hover:text-primary transition-colors duration-200"
                onClick={() => {
                  setOpenIndex(openIndex === idx ? null : idx);
                  if (SERVICES_ACCORDION_DATA[idx].isArea)
                    setShowDistricts(false);
                }}
              >
                {service.title}
                <motion.span
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-primary text-sm"
                >
                  ▼
                </motion.span>
              </button>

              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-5 pb-5"
                >
                  <ul className="ml-4 list-disc space-y-2">
                    {service.features.map((f, fi) => (
                      <li key={fi} className="text-text-medium leading-relaxed">
                        {f === 'Full District Coverage List →' ? (
                          <button
                            className="text-primary font-semibold underline cursor-pointer bg-transparent border-none p-0 text-base"
                            onClick={() => setShowDistricts((v) => !v)}
                          >
                            {f}
                          </button>
                        ) : (
                          f
                        )}
                      </li>
                    ))}
                  </ul>
                  {service.isArea && showDistricts && (
                    <div className="mt-4 bg-primary/5 rounded-lg p-4 border border-primary/10">
                      <strong className="text-primary text-sm">
                        All 77 Districts:
                      </strong>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {ALL_DISTRICTS.map((d, di) => (
                          <span
                            key={di}
                            className="bg-primary text-white rounded-md px-2.5 py-1 text-sm font-medium"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── CTA ────────────────────────────────────── */
const Cta: React.FC = () => (
  <section className="relative py-20 px-8 bg-primary overflow-hidden max-md:py-14 max-md:px-5">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-white/10 translate-x-1/2 translate-y-1/2" />
    </div>
    <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-8 relative z-10 max-md:flex-col max-md:text-center">
      <h2 className="text-[2.4rem] font-extrabold text-[#1a1a1a] leading-[1.15] max-md:text-[1.8rem]">
        Ready for faster, smoother logistics?
      </h2>
      <div className="flex gap-4 max-sm:flex-col max-sm:w-full">
        <Link
          to="/get-quote"
          className="bg-[#1a1a1a] text-white font-bold py-4 px-8 rounded-lg text-base transition-all duration-200 hover:bg-[#333] no-underline max-sm:text-center"
        >
          Get a Quote
        </Link>
        <Link
          to="/contact"
          className="bg-white text-[#1a1a1a] font-bold py-4 px-8 rounded-lg text-base transition-all duration-200 hover:bg-white/90 no-underline max-sm:text-center"
        >
          Contact Us
        </Link>
      </div>
    </div>
  </section>
);

/* ── Page ───────────────────────────────────── */
export const ServicesPage: React.FC = () => (
  <div className="flex flex-col min-h-screen">
    <MetaTags
      title="Transport & Logistics Services | Darshan Transport Nepal"
      description="Explore our comprehensive logistics services including bulk cargo transport, warehousing, distribution, and 3PL solutions across Nepal."
      canonical="https://darshantransport.com/services"
    />
    <Hero />
    <Growth />
    <ServeGrid />
    <Benefits />
    <Process />
    <Industries />
    <Accordion />
    <Cta />
  </div>
);
