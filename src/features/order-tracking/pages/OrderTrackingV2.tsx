import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { useOrderTracking } from '../hooks/useOrderTracking';
import { ORDER_STATUS_STEPS } from '../data/statusSteps';
import { CONTACT_CHANNELS, SOCIAL_LINKS } from '../data/contactInfo';
import { MetaTags } from '../../../core/components/MetaTags';
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';
import type { ContactChannel, SocialLink } from '../data/contactInfo';
import type { OrderStatusStep } from '../data/statusSteps';
import { DebugPanel } from '../components/DebugPanel';
import { DEMO_SCENARIOS } from '../data/demoData';
import { useOrderTrackingDemo } from '../hooks/useOrderTrackingDemo';
import { EMPTY_INVOICE_ERROR_MESSAGE } from '../utils/invoiceNumber';

const SOCIAL_ICONS: Record<string, React.ReactElement> = {
  facebook: <FaFacebook />,
  linkedin: <FaLinkedin />,
  instagram: <FaInstagram />,
};

function formatDate(d?: string | null): string | null {
  if (!d) return null;
  const date = new Date(d);
  if (isNaN(date.getTime())) return null;
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  });
}

/* ── Hero ────────────────────────────── */
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
    <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/5 -translate-y-1/2 -translate-x-1/4" />
    <div className="max-w-[1200px] mx-auto px-8 relative z-10 max-md:px-5">
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-primary text-sm font-semibold tracking-[3px] uppercase mb-4"
      >
        Order Tracking
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="text-white text-[3.5rem] leading-[1.1] font-extrabold max-w-[600px] max-lg:text-[2.6rem] max-md:text-[2rem]"
      >
        Track Your <span className="text-primary">Shipment</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-4 text-white/60 text-lg max-w-[480px] leading-relaxed max-md:text-base"
      >
        Check the delivery status of your order in real time.
      </motion.p>
    </div>
  </section>
);

/* ── Page ────────────────────────────── */
export const OrderTrackingV2: React.FC = () => {
  const {
    state: {
      seriesList,
      selectedSeries,
      invoiceNumber,
      deliveryRecord: realRecord,
      error,
      isLoading,
      isReady,
    },
    actions: { selectSeries, updateInvoiceNumber, submit },
  } = useOrderTracking();

  const {
    debugRecord,
    debugError,
    isManualDemoMode,
    isErrorHidden,
    handleDebugSelect,
    handleManualToggle,
    setDebugRecord,
    setDebugError,
    setIsErrorHidden,
    isDevelopment,
  } = useOrderTrackingDemo({
    selectedSeries,
    invoiceNumber,
    selectSeries,
    updateInvoiceNumber,
  });

  const resultRef = React.useRef<HTMLDivElement>(null);
  const deliveryRecord = debugRecord || realRecord;
  const activeError = isErrorHidden ? '' : debugError || error;

  React.useEffect(() => {
    if (deliveryRecord && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
  }, [deliveryRecord]);

  const isServiceDown = activeError?.startsWith('SERVICE_UNAVAILABLE|');
  const isServerError = activeError?.startsWith('SERVER_ERROR|');
  const isEmptyInvoiceError = activeError === EMPTY_INVOICE_ERROR_MESSAGE;

  const clampedIndex = Math.max(
    0,
    Math.min(
      ORDER_STATUS_STEPS.findIndex((s) => s.key === deliveryRecord?.status),
      ORDER_STATUS_STEPS.length - 1
    )
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 50, damping: 15 },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <MetaTags title="Track Your Order" description="Order tracking." />
      <HeroV2 />

      {/* Main Content */}
      <section className="max-w-[1200px] mx-auto px-8 py-16 max-md:px-5 max-md:py-10">
        <div className="grid grid-cols-[320px_1fr] gap-10 max-lg:grid-cols-1">
          {/* Contact Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-primary rounded-2xl p-8 text-[#1a1a1a] h-fit max-lg:rounded-xl"
          >
            <h2 className="text-2xl font-extrabold uppercase mb-2 max-lg:text-xl">
              Get in Touch
            </h2>
            <p className="text-sm opacity-70 mb-8">
              We'd love to hear from you.
            </p>
            {CONTACT_CHANNELS.map((ch: ContactChannel) => (
              <div
                key={ch.label}
                className="mb-5 border-t border-black/10 pt-4"
              >
                <div className="text-xs font-bold uppercase tracking-wider opacity-70">
                  {ch.label}
                </div>
                <div className="text-sm font-semibold mt-1 whitespace-pre-line">
                  {ch.value}
                </div>
              </div>
            ))}
            <div className="mt-6 flex gap-4 border-t border-black/10 pt-5">
              {SOCIAL_LINKS.map((l: SocialLink) => (
                <a
                  key={l.key}
                  href={l.href}
                  aria-label={l.label}
                  className="text-[#1a1a1a] text-lg transition-transform duration-200 hover:scale-125 hover:text-white"
                >
                  {SOCIAL_ICONS[l.key]}
                </a>
              ))}
            </div>
          </motion.aside>

          {/* Tracking Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="p-8 max-md:p-5">
              <h3 className="text-2xl font-extrabold text-primary mb-6 max-md:text-xl">
                Check Delivery Status
              </h3>

              {/* Service errors */}
              {isServiceDown && (
                <div className="mb-6 flex items-center gap-4 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
                  <span className="text-2xl text-primary">⚠</span>
                  <div>
                    <h4 className="font-bold uppercase text-sm">
                      Service Unavailable
                    </h4>
                    <p className="text-sm text-text-medium">
                      {activeError?.split('|')[1]}
                    </p>
                  </div>
                </div>
              )}
              {isServerError && (
                <div className="mb-6 flex items-center gap-4 rounded-xl border border-red-200 bg-red-50 px-5 py-4">
                  <span className="text-2xl text-red-500">✕</span>
                  <div>
                    <h4 className="font-bold uppercase text-sm">
                      System Error
                    </h4>
                    <p className="text-sm text-text-medium">
                      {activeError?.split('|')[1]}
                    </p>
                  </div>
                </div>
              )}

              {/* Form */}
              <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
                <div>
                  <label
                    htmlFor="v2-series"
                    className="block text-xs font-bold uppercase tracking-wider text-text-medium mb-2"
                  >
                    Series
                  </label>
                  <select
                    id="v2-series"
                    value={selectedSeries}
                    onChange={(e) => selectSeries(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200"
                  >
                    {isManualDemoMode
                      ? Array.from(
                          new Set(DEMO_SCENARIOS.map((s) => s.series))
                        ).map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))
                      : seriesList.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="v2-invoice"
                    className="block text-xs font-bold uppercase tracking-wider text-text-medium mb-2"
                  >
                    Invoice Number
                  </label>
                  {isManualDemoMode ? (
                    <select
                      id="v2-invoice"
                      value={invoiceNumber}
                      onChange={(e) => updateInvoiceNumber(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200"
                    >
                      <option value="">Select Demo Invoice</option>
                      {DEMO_SCENARIOS.filter(
                        (s) => !selectedSeries || s.series === selectedSeries
                      ).map((s) => (
                        <option key={s.key} value={s.invoice}>
                          {s.invoice} ({s.label})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id="v2-invoice"
                      type="text"
                      value={invoiceNumber}
                      onChange={(e) => updateInvoiceNumber(e.target.value)}
                      placeholder="000111 or 111"
                      autoComplete="off"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-base outline-none placeholder:text-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200"
                    />
                  )}
                  {!isManualDemoMode && (
                    <p className="mt-2 text-xs text-text-medium/60">
                      Enter just the last digits, e.g. 111 for invoice 000111.
                    </p>
                  )}
                </div>
              </div>

              {/* Error */}
              {!isServiceDown && !isServerError && activeError && (
                <div
                  role={isEmptyInvoiceError ? 'status' : 'alert'}
                  className={`mt-4 inline-flex rounded-lg border px-4 py-2 text-sm ${
                    isEmptyInvoiceError
                      ? 'border-gray-200 bg-gray-50 text-text-medium'
                      : 'border-red-200 bg-red-50 text-red-700'
                  }`}
                >
                  {activeError}
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  if (isManualDemoMode) {
                    const matched = DEMO_SCENARIOS.find(
                      (s) =>
                        s.series === selectedSeries &&
                        s.invoice === invoiceNumber
                    );
                    if (matched) setDebugRecord(matched.record);
                    else alert('No matching demo scenario found.');
                  } else {
                    submit();
                  }
                }}
                disabled={isLoading || !isReady}
                className="mt-6 w-full bg-primary text-white font-bold py-4 rounded-xl text-base transition-all duration-200 hover:bg-primary-hover hover:shadow-lg cursor-pointer border-none disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                {isLoading ? 'Checking...' : 'Check Status'}
              </button>
            </div>

            {/* Result */}
            {deliveryRecord && (
              <div
                ref={resultRef}
                className="border-t border-gray-100 p-8 max-md:p-5"
              >
                {/* Timeline */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="flex items-center justify-between gap-0 mb-10 overflow-x-auto pb-2 max-md:gap-0"
                >
                  {ORDER_STATUS_STEPS.map(
                    (step: OrderStatusStep, i: number) => {
                      const isCompleted = i < clampedIndex;
                      const isActive = i === clampedIndex;
                      return (
                        <motion.div
                          key={step.key}
                          variants={itemVariants}
                          className="flex flex-col items-center flex-1 relative"
                        >
                          {/* Connector */}
                          {i > 0 && (
                            <div
                              className={`absolute top-3 right-1/2 w-full h-0.5 -z-10 ${i <= clampedIndex ? 'bg-primary' : 'bg-gray-200'}`}
                            />
                          )}
                          {/* Dot */}
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mb-2 ${
                              isActive
                                ? 'bg-primary text-white ring-4 ring-primary/20'
                                : isCompleted
                                  ? 'bg-primary text-white'
                                  : 'bg-gray-200 text-gray-400'
                            }`}
                          >
                            {isCompleted ? '✓' : isActive ? '●' : ''}
                          </div>
                          <span
                            className={`text-[0.65rem] font-bold uppercase text-center leading-tight ${
                              isActive || isCompleted
                                ? 'text-[#1a1a1a]'
                                : 'text-gray-400'
                            }`}
                          >
                            {step.label}
                          </span>
                        </motion.div>
                      );
                    }
                  )}
                </motion.div>

                {/* Info Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="bg-[#fafafa] rounded-xl p-6 border border-gray-100"
                >
                  <h4 className="text-sm font-bold text-text-medium uppercase tracking-wider mb-4">
                    Delivery Info
                  </h4>
                  <div className="space-y-0">
                    {deliveryRecord.source === 'public_pod' && (
                      <InfoRow label="POD Status" value="POD CONFIRMED" />
                    )}
                    {deliveryRecord.message && (
                      <InfoRow label="Message" value={deliveryRecord.message} />
                    )}
                    {deliveryRecord.consigner && (
                      <InfoRow
                        label="Consigner"
                        value={deliveryRecord.consigner}
                      />
                    )}
                    {deliveryRecord.consignee && (
                      <InfoRow
                        label="Consignee"
                        value={deliveryRecord.consignee}
                      />
                    )}
                    {deliveryRecord.from && (
                      <InfoRow label="Origin" value={deliveryRecord.from} />
                    )}
                    {deliveryRecord.to && (
                      <InfoRow label="Destination" value={deliveryRecord.to} />
                    )}
                    {formatDate(deliveryRecord.bookingDate) && (
                      <InfoRow
                        label="Booked"
                        value={formatDate(deliveryRecord.bookingDate)!}
                      />
                    )}
                    {formatDate(deliveryRecord.dispatchDate) && (
                      <InfoRow
                        label="Dispatched"
                        value={formatDate(deliveryRecord.dispatchDate)!}
                      />
                    )}
                    {formatDate(deliveryRecord.arrivalDate) && (
                      <InfoRow
                        label="Arrived"
                        value={formatDate(deliveryRecord.arrivalDate)!}
                      />
                    )}
                    {deliveryRecord.error && (
                      <InfoRow label="Notes" value={deliveryRecord.error} />
                    )}
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {isDevelopment && (
        <DebugPanel
          onSelect={handleDebugSelect}
          manualMode={isManualDemoMode}
          onToggleManualMode={handleManualToggle}
          debugError={debugError}
          setDebugError={setDebugError}
          setDebugRecord={setDebugRecord}
          isErrorHidden={isErrorHidden}
          setIsErrorHidden={setIsErrorHidden}
        />
      )}
    </div>
  );
};

const InfoRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="grid grid-cols-[120px_1fr] gap-2 py-3 border-b border-gray-100 last:border-b-0 max-sm:grid-cols-1">
    <span className="text-xs font-bold text-text-medium uppercase">
      {label}
    </span>
    <span className="text-sm font-semibold text-[#1a1a1a] sm:text-right">
      {value}
    </span>
  </div>
);
