import React from 'react';
import { motion } from 'framer-motion';
import { MetaTags } from '../../../../core/components/MetaTags';
import { ContactMap } from '../../contact/components/ContactMap';
import { useContactDirectory } from '../../contact/hooks/useContactDirectory';

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

import type { OfficeRow } from '../../contact/data/contactDirectory';

/* ── Hero ────────────────────────────── */
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
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 translate-y-1/2 -translate-x-1/4" />
    <div className="max-w-[1200px] mx-auto px-8 relative z-10 max-md:px-5">
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-primary text-sm font-semibold tracking-[3px] uppercase mb-4"
      >
        Get Started
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="text-white text-[3.5rem] leading-[1.1] font-extrabold max-w-[600px] max-lg:text-[2.6rem] max-md:text-[2rem]"
      >
        Get a <span className="text-primary">Quote</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-4 text-white/60 text-lg max-w-[480px] leading-relaxed max-md:text-base"
      >
        Request a free quote for your delivery and logistics needs. Find the
        nearest booking or delivery office below.
      </motion.p>
    </div>
  </section>
);

/* ── Map Section ─────────────────────── */
const MapSection: React.FC<{
  mapUrl: string;
  loading: boolean;
  mapRef: React.RefObject<HTMLDivElement | null>;
}> = ({ mapUrl, loading, mapRef }) => (
  <section className="py-16 px-8 bg-[#fafafa] max-md:py-10 max-md:px-5">
    <div className="max-w-[900px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
      >
        <ContactMap mapUrl={mapUrl} loading={loading} mapRef={mapRef} />
      </motion.div>
    </div>
  </section>
);

/* ── Office Directory ────────────────── */
interface OfficeCardProps {
  title: string;
  type: 'booking' | 'delivery';
  offices: OfficeRow[];
  selected: OfficeRow;
  isActive: boolean;
  onSelect: (office: OfficeRow, type: 'booking' | 'delivery') => void;
}

const OfficeDirectory: React.FC<OfficeCardProps> = ({
  title,
  type,
  offices,
  selected,
  isActive,
  onSelect,
}) => (
  <div>
    <h3 className="text-lg font-bold text-[#1a1a1a] mb-5 pb-2 border-b-2 border-primary inline-block">
      {title}
    </h3>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="space-y-3"
    >
      {offices.map((office) => {
        const isSelected = isActive && selected.sn === office.sn;
        return (
          <motion.button
            key={office.sn}
            variants={scaleIn}
            onClick={() => onSelect(office, type)}
            className={`w-full text-left bg-white rounded-xl p-5 border transition-all duration-200 cursor-pointer ${
              isSelected
                ? 'border-primary shadow-lg bg-primary/5'
                : 'border-gray-100 shadow-sm hover:border-primary/20 hover:shadow-md'
            }`}
          >
            <h4 className="font-bold text-[#1a1a1a] mb-1">{office.office}</h4>
            <p className="text-text-medium text-sm mb-1">{office.address}</p>
            <span className="text-primary text-sm font-semibold">
              {office.contact}
            </span>
          </motion.button>
        );
      })}
    </motion.div>
  </div>
);

/* ── Page ────────────────────────────── */
const GET_QUOTE_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Get a Quote | Darshan Transport',
  url: 'https://darshantransport.com/get-quote',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Darshan Transport',
    url: 'https://darshantransport.com',
  },
};

export const GetQuotePage: React.FC = () => {
  const {
    bookingOffices,
    deliveryOffices,
    selectedBooking,
    selectedDelivery,
    lastSelectedType,
    selectOffice,
    mapUrl,
    loading,
    mapRef,
  } = useContactDirectory();

  return (
    <div className="flex flex-col min-h-screen">
      <MetaTags
        title="Get a Quote | Darshan Transport"
        description="Request a free quote for your delivery and logistics needs."
        canonical="https://darshantransport.com/get-quote"
        structuredData={GET_QUOTE_STRUCTURED_DATA}
      />
      <Hero />
      <MapSection mapUrl={mapUrl} loading={loading} mapRef={mapRef} />

      <section className="py-20 px-8 max-lg:py-14 max-md:py-10 max-md:px-5">
        <div className="max-w-[1200px] mx-auto">
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
              Our Offices
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-3 text-[2.4rem] font-extrabold text-[#1a1a1a] max-md:text-[1.8rem]"
            >
              Find Your Nearest Office
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-10 max-lg:grid-cols-1">
            <OfficeDirectory
              title="Booking Area"
              type="booking"
              offices={bookingOffices}
              selected={selectedBooking}
              isActive={lastSelectedType === 'booking'}
              onSelect={selectOffice}
            />
            <OfficeDirectory
              title="Delivery Area"
              type="delivery"
              offices={deliveryOffices}
              selected={selectedDelivery}
              isActive={lastSelectedType === 'delivery'}
              onSelect={selectOffice}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
