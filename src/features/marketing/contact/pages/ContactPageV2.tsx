import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MetaTags } from '../../../../core/components/MetaTags';
import { BOOKING_OFFICES, DELIVERY_OFFICES } from '../data/contactDirectory';

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

/* ── Hero ────────────────────────────────── */
const HeroV2: React.FC = () => (
  <section className="relative w-full py-28 bg-[#1a1a1a] overflow-hidden max-md:py-20">
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage:
          'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }}
    />
    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 -translate-y-1/2 translate-x-1/4" />
    <div className="max-w-[1200px] mx-auto px-8 relative z-10 max-md:px-5">
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-primary text-sm font-semibold tracking-[3px] uppercase mb-4"
      >
        Contact Us
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="text-white text-[3.5rem] leading-[1.1] font-extrabold max-w-[600px] max-lg:text-[2.6rem] max-md:text-[2rem]"
      >
        Let&apos;s Talk <span className="text-primary">Logistics</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-4 text-white/60 text-lg max-w-[480px] leading-relaxed max-md:text-base"
      >
        We&apos;re here to help with all your logistics needs. Reach out and our
        team will get back to you quickly.
      </motion.p>
    </div>
  </section>
);

/* ── Contact Info Cards ──────────────────── */
const CONTACT_CHANNELS = [
  {
    icon: '📞',
    label: 'Phone',
    value: '+977 9705422317',
    href: 'tel:+9779705422317',
  },
  {
    icon: '✉️',
    label: 'Email',
    value: 'info@darshantransport.com.np',
    href: 'mailto:info@darshantransport.com.np',
  },
  {
    icon: '📍',
    label: 'Head Office',
    value: 'Rani Pauwa, Pokhara, Nepal',
    href: undefined,
  },
  {
    icon: '⏰',
    label: 'Working Hours',
    value: 'Sun – Fri: 6 AM – 7 PM',
    href: undefined,
  },
];

const ContactCards: React.FC = () => (
  <section className="py-20 px-8 max-lg:py-14 max-md:py-10 max-md:px-5">
    <div className="max-w-[1200px] mx-auto">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-4 gap-5 max-xl:grid-cols-2 max-md:grid-cols-1"
      >
        {CONTACT_CHANNELS.map((ch) => (
          <motion.div
            key={ch.label}
            variants={scaleIn}
            className="bg-white rounded-xl p-6 pr-8 border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300"
          >
            <span className="text-2xl mb-3 block">{ch.icon}</span>
            <h4 className="text-sm font-bold text-text-medium uppercase tracking-wider mb-2">
              {ch.label}
            </h4>
            {ch.href ? (
              <a
                href={ch.href}
                className="text-[#1a1a1a] font-semibold text-base no-underline hover:text-primary transition-colors duration-200 whitespace-nowrap"
              >
                {ch.value}
              </a>
            ) : (
              <p className="text-[#1a1a1a] font-semibold text-base m-0">
                {ch.value}
              </p>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ── Contact Form ────────────────────────── */
const ContactFormV2: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact from ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\nPhone: ${formState.phone}\n\n${formState.message}`
    );
    window.location.href = `mailto:info@darshantransport.com.np?subject=${subject}&body=${body}`;
  };

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
            Send a Message
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-3 text-[2.4rem] font-extrabold text-[#1a1a1a] max-md:text-[1.8rem]"
          >
            Get in Touch
          </motion.h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm max-md:p-6"
        >
          <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-sm font-bold text-text-medium uppercase tracking-wider mb-2"
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={formState.name}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, name: e.target.value }))
                }
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="block text-sm font-bold text-text-medium uppercase tracking-wider mb-2"
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={formState.email}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, email: e.target.value }))
                }
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200"
                placeholder="Your email"
              />
            </div>
          </div>
          <div className="mt-5">
            <label
              htmlFor="contact-phone"
              className="block text-sm font-bold text-text-medium uppercase tracking-wider mb-2"
            >
              Phone
            </label>
            <input
              id="contact-phone"
              type="tel"
              value={formState.phone}
              onChange={(e) =>
                setFormState((s) => ({ ...s, phone: e.target.value }))
              }
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200"
              placeholder="Your phone number"
            />
          </div>
          <div className="mt-5">
            <label
              htmlFor="contact-message"
              className="block text-sm font-bold text-text-medium uppercase tracking-wider mb-2"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              required
              rows={5}
              value={formState.message}
              onChange={(e) =>
                setFormState((s) => ({ ...s, message: e.target.value }))
              }
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200 resize-y"
              placeholder="How can we help you?"
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-primary text-white font-bold py-4 rounded-lg text-base transition-all duration-200 hover:bg-primary-hover hover:shadow-lg cursor-pointer border-none"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
};

/* ── Office Locations ────────────────────── */
const OfficeLocationsV2: React.FC = () => (
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
          Our Offices
        </motion.p>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mt-3 text-[2.4rem] font-extrabold text-[#1a1a1a] max-md:text-[1.8rem]"
        >
          Find Us Across Nepal
        </motion.h2>
      </motion.div>

      <div className="grid grid-cols-2 gap-10 max-lg:grid-cols-1">
        {/* Booking Offices */}
        <div>
          <h3 className="text-lg font-bold text-[#1a1a1a] mb-5 pb-2 border-b-2 border-primary inline-block">
            Booking Offices
          </h3>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="space-y-4"
          >
            {BOOKING_OFFICES.map((office) => (
              <motion.div
                key={office.sn}
                variants={scaleIn}
                className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200"
              >
                <h4 className="font-bold text-[#1a1a1a] mb-1">
                  {office.office}
                </h4>
                <p className="text-text-medium text-sm mb-2">
                  {office.address}
                </p>
                <a
                  href={`tel:${office.contact.replace(/[^+\d]/g, '').slice(0, 14)}`}
                  className="text-primary text-sm font-semibold no-underline hover:underline"
                >
                  {office.contact}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Delivery Offices */}
        <div>
          <h3 className="text-lg font-bold text-[#1a1a1a] mb-5 pb-2 border-b-2 border-primary inline-block">
            Delivery Offices
          </h3>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="space-y-4"
          >
            {DELIVERY_OFFICES.map((office) => (
              <motion.div
                key={office.sn}
                variants={scaleIn}
                className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200"
              >
                <h4 className="font-bold text-[#1a1a1a] mb-1">
                  {office.office}
                </h4>
                <p className="text-text-medium text-sm mb-2">
                  {office.address}
                </p>
                <a
                  href={`tel:${office.contact.replace(/[^+\d]/g, '').slice(0, 14)}`}
                  className="text-primary text-sm font-semibold no-underline hover:underline"
                >
                  {office.contact}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

/* ── Page ────────────────────────────────── */
const CONTACT_PAGE_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Darshan Transport',
  url: 'https://darshantransport.com/contact',
  mainEntity: {
    '@type': 'Organization',
    name: 'Darshan Transport',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      telephone: '+9779801914226',
      email: 'info@darshantransport.com.np',
      areaServed: 'NP',
      availableLanguage: ['en', 'ne'],
    },
  },
};

export const ContactPageV2: React.FC = () => (
  <div className="flex flex-col min-h-screen">
    <MetaTags
      title="Contact Us | Darshan Transport"
      description="Get in touch with Darshan Transport. We are here to help with all your logistics needs. Find our office locations across Nepal."
      canonical="https://darshantransport.com/contact"
      structuredData={CONTACT_PAGE_STRUCTURED_DATA}
    />
    <HeroV2 />
    <ContactCards />
    <ContactFormV2 />
    <OfficeLocationsV2 />
  </div>
);
