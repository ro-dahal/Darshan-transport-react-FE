import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MetaTags } from '../../../../core/components/MetaTags';
import type { JsonLdObject } from '../../../../core/components/metaTagsUtils';

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

export interface ServicePageFAQ {
  question: string;
  answer: string;
}

export interface ServicePageData {
  slug: string;
  titleTag: string;
  metaDescription: string;
  h1: string;
  whatIsTitle: string;
  whatIsContent: string;
  features: string[];
  audience: string;
  coverage: string;
  processSteps: string[];
  faq: ServicePageFAQ[];
  structuredData: JsonLdObject;
}

interface ServiceDetailPageProps {
  data: ServicePageData;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  data,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const combinedStructuredData = [data.structuredData, faqStructuredData];

  return (
    <div className="flex flex-col min-h-screen">
      <MetaTags
        title={data.titleTag}
        description={data.metaDescription}
        canonical={`https://darshantransport.com${data.slug}`}
        structuredData={combinedStructuredData}
      />

      {/* Hero */}
      <section className="relative bg-secondary py-24 px-8 max-md:py-16 max-md:px-5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-primary/5 pointer-events-none" />
        <div className="relative z-10 max-w-[900px] mx-auto">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-primary text-sm font-semibold tracking-[3px] uppercase mb-4"
          >
            Service
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-white text-[3rem] leading-[1.1] font-extrabold max-lg:text-[2.4rem] max-md:text-[2rem]"
          >
            {data.h1}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-8 flex max-sm:w-full"
          >
            <Link
              to="/contact"
              className="bg-primary text-white font-bold py-3.5 px-8 rounded-lg text-base shadow-lg transition-all duration-200 hover:bg-primary-hover hover:shadow-xl no-underline max-sm:text-center"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* What Is */}
      <section className="py-24 px-8 max-lg:py-16 max-md:py-12 max-md:px-5">
        <div className="max-w-[900px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-[2.2rem] font-extrabold text-[#1a1a1a] max-md:text-[1.6rem]"
            >
              {data.whatIsTitle}
            </motion.h2>
            <motion.div
              variants={fadeUp}
              custom={1}
              className="mt-3 h-1 w-14 bg-primary rounded-full"
            />
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 text-text-medium text-[1.05rem] leading-[1.85]"
            >
              {data.whatIsContent}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-24 px-8 bg-[#fafafa] max-lg:py-16 max-md:py-12 max-md:px-5">
        <div className="max-w-[900px] mx-auto">
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
              Features
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-3 text-[2rem] font-extrabold text-[#1a1a1a] max-md:text-[1.6rem]"
            >
              What You Get
            </motion.h2>
          </motion.div>

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="mt-10 space-y-4 list-none"
          >
            {data.features.map((feature, i) => (
              <motion.li
                key={i}
                variants={scaleIn}
                className="flex items-start gap-4 bg-white rounded-lg px-5 py-4 border border-gray-100 shadow-sm"
              >
                <span className="text-primary text-lg mt-0.5 flex-shrink-0">
                  ✓
                </span>
                <span className="text-text-medium text-base leading-relaxed">
                  {feature}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Who This is For + Coverage */}
      <section className="py-24 px-8 max-lg:py-16 max-md:py-12 max-md:px-5">
        <div className="max-w-[900px] mx-auto grid lg:grid-cols-2 gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.h3
              variants={fadeUp}
              custom={0}
              className="text-xl font-bold text-[#1a1a1a] mb-4"
            >
              Who This is For
            </motion.h3>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="text-text-medium leading-[1.85]"
            >
              {data.audience}
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.h3
              variants={fadeUp}
              custom={0}
              className="text-xl font-bold text-[#1a1a1a] mb-4"
            >
              Coverage
            </motion.h3>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="text-text-medium leading-[1.85]"
            >
              {data.coverage}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-8 bg-secondary max-lg:py-16 max-md:py-12 max-md:px-5">
        <div className="max-w-[900px] mx-auto">
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
              Process
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-3 text-[2rem] font-extrabold text-white max-md:text-[1.6rem]"
            >
              How It Works
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="space-y-4"
          >
            {data.processSteps.map((step, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                className="flex items-start gap-5 bg-white/5 rounded-xl px-6 py-5 border border-white/8"
              >
                <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center flex-shrink-0 shadow-md text-sm">
                  {i + 1}
                </div>
                <p className="text-white/85 text-base leading-relaxed pt-1.5">
                  {step}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-8 bg-[#fafafa] max-lg:py-16 max-md:py-12 max-md:px-5">
        <div className="max-w-[800px] mx-auto">
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
              FAQ
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-3 text-[2rem] font-extrabold text-[#1a1a1a] max-md:text-[1.6rem]"
            >
              Frequently Asked Questions
            </motion.h2>
          </motion.div>

          <div className="space-y-4">
            {data.faq.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06, duration: 0.4 }}
                className={`bg-white rounded-xl overflow-hidden border transition-all duration-200 ${
                  openFaq === idx
                    ? 'border-primary/30 shadow-lg'
                    : 'border-gray-100 shadow-sm'
                }`}
              >
                <button
                  className="w-full text-left p-5 pr-7 flex items-center justify-between cursor-pointer bg-transparent border-none text-base font-bold text-[#1a1a1a] hover:text-primary transition-colors duration-200"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  {item.question}
                  <motion.span
                    animate={{ rotate: openFaq === idx ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-primary text-sm flex-shrink-0 ml-4"
                  >
                    ▼
                  </motion.span>
                </button>

                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5"
                  >
                    <p className="text-text-medium leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-8 bg-primary overflow-hidden max-md:py-14 max-md:px-5">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-white/10 translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-8 relative z-10 max-md:flex-col max-md:text-center">
          <h2 className="text-[2rem] font-extrabold text-secondary leading-[1.15] max-md:text-[1.6rem]">
            Need this service for your business?
          </h2>
          <div className="flex justify-center max-sm:w-full">
            <Link
              to="/contact"
              className="bg-secondary text-primary font-bold py-4 px-8 rounded-lg text-base transition-all duration-200 hover:bg-secondary/90 hover:text-primary-light no-underline max-sm:text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
