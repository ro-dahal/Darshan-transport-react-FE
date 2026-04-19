import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MetaTags } from '../../../../core/components/MetaTags';
import supportIllustration from '@assets/shared/icons/faq-support-illustration.png';

type FAQCategory = 'Services' | 'Operations' | 'Support';
type FAQFilter = 'All' | FAQCategory;

interface FAQItem {
  id: string;
  category: FAQCategory;
  badge: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: readonly FAQItem[] = [
  {
    id: 'transport-services',
    category: 'Services',
    badge: 'What we handle',
    question: 'What transport services do you provide?',
    answer:
      'We provide bulk cargo transport, full-truck shipments, warehousing, and distribution support across Nepal for businesses that need dependable movement of goods.',
  },
  {
    id: 'who-we-serve',
    category: 'Services',
    badge: 'Ideal clients',
    question: 'Who are your services for?',
    answer:
      'Our services are designed for manufacturers, distributors, retailers, and businesses that need regular cargo movement, delivery coordination, or storage support.',
  },
  {
    id: 'bulk-shipments',
    category: 'Services',
    badge: 'High volume freight',
    question: 'Do you handle bulk shipments?',
    answer:
      'Yes. Bulk cargo and full-truck transport are core parts of our operation, so we can support recurring large-volume movement as well as one-off commercial loads.',
  },
  {
    id: 'warehousing',
    category: 'Operations',
    badge: 'Storage support',
    question: 'Do you offer warehousing?',
    answer:
      'Yes. We provide warehousing and 3PL support to help businesses store inventory, organize dispatches, and streamline day-to-day logistics operations.',
  },
  {
    id: 'service-areas',
    category: 'Operations',
    badge: 'Coverage',
    question: 'Which locations do you serve?',
    answer:
      'We serve major cities and business routes across Nepal. If you have a specific pickup or delivery corridor in mind, our team can confirm coverage quickly.',
  },
  {
    id: 'request-quote',
    category: 'Support',
    badge: 'Getting started',
    question: 'How can I request a quote?',
    answer:
      'You can request a quote through the website or by contacting our team directly. Sharing your route, cargo type, shipment frequency, and timing helps us respond faster.',
  },
  {
    id: 'shipment-tracking',
    category: 'Support',
    badge: 'Visibility',
    question: 'Can I track my shipment?',
    answer:
      'Yes. Shipment tracking support is available so you can stay informed on movement status and coordinate downstream delivery or receiving plans with more confidence.',
  },
];

const FAQ_FILTERS: ReadonlyArray<{ value: FAQFilter; label: string }> = [
  { value: 'All', label: 'All Questions' },
  { value: 'Services', label: 'Services' },
  { value: 'Operations', label: 'Operations' },
  { value: 'Support', label: 'Support' },
];

const CONTACT_OPTIONS = [
  { label: 'Phone', value: '+977 9801914226', href: 'tel:+9779801914226' },
  {
    label: 'Email',
    value: 'info@darshantransport.com.np',
    href: 'mailto:info@darshantransport.com.np',
  },
];

const FAQ_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

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

/* ── Hero ────────────────────────────────── */
const Hero: React.FC = () => (
  <section className="relative w-full py-28 bg-[#1a1a1a] overflow-hidden max-md:py-20">
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage:
          'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }}
    />
    <div className="max-w-[1200px] mx-auto px-8 relative z-10 max-md:px-5">
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-primary text-sm font-semibold tracking-[3px] uppercase mb-4"
      >
        Help Center
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="text-white text-[3.5rem] leading-[1.1] font-extrabold max-w-[600px] max-lg:text-[2.6rem] max-md:text-[2rem]"
      >
        Frequently Asked <span className="text-primary">Questions</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-4 text-white/60 text-lg max-w-[480px] leading-relaxed max-md:text-base"
      >
        Clear answers for quotes, shipment support, warehousing, and business
        logistics across Nepal.
      </motion.p>
    </div>
  </section>
);

/* ── FAQ Accordion ───────────────────────── */
const FAQAccordion: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FAQFilter>('All');
  const [openId, setOpenId] = useState<string | null>(null);

  const filteredItems =
    activeFilter === 'All'
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section className="py-24 px-8 max-lg:py-16 max-md:py-12 max-md:px-5">
      <div className="max-w-[900px] mx-auto">
        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex gap-2 flex-wrap mb-10"
        >
          {FAQ_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => {
                setActiveFilter(f.value);
                setOpenId(null);
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer ${
                activeFilter === f.value
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-text-medium border-gray-200 hover:border-primary/40 hover:text-primary'
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Accordion items */}
        <div className="space-y-3">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className={`bg-white rounded-xl overflow-hidden border transition-all duration-200 ${
                openId === item.id
                  ? 'border-primary/30 shadow-lg'
                  : 'border-gray-100 shadow-sm'
              }`}
            >
              <button
                className="w-full text-left p-5 flex items-start gap-4 cursor-pointer bg-transparent border-none"
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
              >
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    {item.badge}
                  </span>
                  <h3 className="text-base font-bold text-[#1a1a1a] mt-1 leading-snug">
                    {item.question}
                  </h3>
                </div>
                <motion.span
                  animate={{ rotate: openId === item.id ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-primary mt-1 flex-shrink-0"
                >
                  <FaChevronDown size={12} />
                </motion.span>
              </button>

              {openId === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-5 pb-5"
                >
                  <p className="text-text-medium text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Contact CTA ─────────────────────────── */
const ContactCta: React.FC = () => (
  <section className="py-24 px-8 bg-[#fafafa] max-lg:py-16 max-md:py-12 max-md:px-5">
    <div className="max-w-[900px] mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-[1fr_auto] gap-12 items-center max-md:grid-cols-1 max-md:text-center"
      >
        <div>
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-primary text-sm font-semibold tracking-[3px] uppercase"
          >
            Still Have Questions?
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-3 text-[2rem] font-extrabold text-secondary max-md:text-[1.5rem]"
          >
            We&apos;re Here to Help
          </motion.h2>
          <motion.div variants={fadeUp} custom={2} className="mt-6 space-y-3">
            {CONTACT_OPTIONS.map((opt) => (
              <a
                key={opt.label}
                href={opt.href}
                className="flex items-center gap-3 text-text-medium hover:text-primary transition-colors duration-200 no-underline max-md:justify-center"
              >
                <span className="text-sm font-bold uppercase w-14">
                  {opt.label}:
                </span>
                <span className="text-base font-semibold text-secondary">
                  {opt.value}
                </span>
              </a>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} custom={3} className="mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white font-bold py-3.5 px-8 rounded-lg hover:bg-primary-hover transition-colors duration-200 no-underline"
            >
              Contact Us →
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-md:hidden"
        >
          <img
            src={supportIllustration}
            alt="Support"
            loading="lazy"
            decoding="async"
            className="w-40 h-40 object-contain opacity-60"
          />
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ── Page ────────────────────────────────── */
export const FAQPage: React.FC = () => (
  <div className="flex flex-col min-h-screen">
    <MetaTags
      title="FAQs | Darshan Transport - Logistics & Cargo Services in Nepal"
      description="Find answers to frequently asked questions about Darshan Transport's bulk cargo, full-truck shipments, warehousing, and logistics services across Nepal."
      canonical="https://darshantransport.com/faq"
      structuredData={FAQ_STRUCTURED_DATA}
    />
    <Hero />
    <FAQAccordion />
    <ContactCta />
  </div>
);
