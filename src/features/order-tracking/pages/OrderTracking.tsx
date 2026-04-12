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
import { InvoiceTooltip } from '../components/InvoiceTooltip';

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
export const OrderTracking: React.FC = () => {
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
      <Hero />

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
            className="relative bg-white rounded-2xl border border-gray-100 shadow-sm"
          >
            {/* Tooltip in top right */}
            <div className="absolute top-8 right-8 z-20 max-md:top-5 max-md:right-5">
              <InvoiceTooltip />
            </div>

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
                    htmlFor="series"
                    className="block text-xs font-bold uppercase tracking-wider text-text-medium mb-2"
                  >
                    Series
                  </label>
                  <select
                    id="series"
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
                    htmlFor="invoice"
                    className="block text-xs font-bold uppercase tracking-wider text-text-medium mb-2"
                  >
                    Invoice Number
                  </label>
                  {isManualDemoMode ? (
                    <select
                      id="invoice"
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
                      id="invoice"
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
              <div ref={resultRef} className="border-t border-gray-100">
                {/* ── Status Banner ── */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`px-8 py-5 flex items-center gap-4 max-md:px-5 ${
                    deliveryRecord.status === 'delivered'
                      ? 'bg-gradient-to-r from-emerald-50 to-emerald-100/50'
                      : deliveryRecord.status === 'ongoing'
                        ? 'bg-gradient-to-r from-primary/5 to-primary/10'
                        : 'bg-gradient-to-r from-gray-50 to-gray-100/50'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                      deliveryRecord.status === 'delivered'
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                        : deliveryRecord.status === 'ongoing'
                          ? 'bg-primary text-white shadow-lg shadow-primary/30'
                          : 'bg-gray-300 text-white shadow-lg shadow-gray-300/30'
                    }`}
                  >
                    {deliveryRecord.status === 'delivered'
                      ? '✓'
                      : deliveryRecord.status === 'ongoing'
                        ? '🚛'
                        : '⏳'}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-0.5">
                      Current Status
                    </p>
                    <p
                      className={`text-xl font-extrabold capitalize ${
                        deliveryRecord.status === 'delivered'
                          ? 'text-emerald-600'
                          : deliveryRecord.status === 'ongoing'
                            ? 'text-primary'
                            : 'text-gray-500'
                      }`}
                    >
                      {deliveryRecord.status === 'delivered'
                        ? 'Delivered Successfully'
                        : deliveryRecord.status === 'ongoing'
                          ? 'In Transit'
                          : 'Awaiting Dispatch'}
                    </p>
                  </div>
                </motion.div>

                {/* ── Premium Timeline ── */}
                <div className="px-8 pt-8 pb-4 max-md:px-5 max-md:pt-6">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="relative"
                  >
                    {/* Background track */}
                    <div className="absolute top-7 left-[calc(16.66%)] right-[calc(16.66%)] h-1 bg-gray-100 rounded-full max-md:hidden" />
                    {/* Progress fill */}
                    <motion.div
                      className="absolute top-7 left-[calc(16.66%)] h-1 bg-gradient-to-r from-primary to-primary rounded-full max-md:hidden"
                      initial={{ width: 0 }}
                      animate={{
                        width:
                          clampedIndex === 0
                            ? '0%'
                            : clampedIndex === 1
                              ? '33.33%'
                              : '66.66%',
                      }}
                      transition={{
                        duration: 1,
                        delay: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />

                    <div className="flex items-start justify-between relative z-10 max-md:flex-col max-md:gap-4">
                      {ORDER_STATUS_STEPS.map(
                        (step: OrderStatusStep, i: number) => {
                          const isCompleted = i < clampedIndex;
                          const isActive = i === clampedIndex;
                          const stepIcons = ['📦', '🚛', '✅'];
                          const stepDescriptions = [
                            'Order received & queued',
                            'Shipment in transit',
                            'Package delivered',
                          ];

                          return (
                            <motion.div
                              key={step.key}
                              variants={itemVariants}
                              className="flex flex-col items-center flex-1 max-md:flex-row max-md:gap-4 max-md:w-full"
                            >
                              {/* Icon circle */}
                              <div
                                className={`relative w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-3 transition-all duration-500 max-md:mb-0 max-md:shrink-0 ${
                                  isActive
                                    ? 'bg-primary text-white shadow-xl shadow-primary/30 scale-110'
                                    : isCompleted
                                      ? 'bg-primary/90 text-white shadow-lg shadow-primary/20'
                                      : 'bg-gray-100 text-gray-300'
                                }`}
                              >
                                {isCompleted ? (
                                  <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                ) : (
                                  <span>{stepIcons[i]}</span>
                                )}
                                {isActive && (
                                  <span className="absolute inset-0 rounded-2xl bg-primary animate-ping opacity-20 pointer-events-none" />
                                )}
                              </div>

                              {/* Label & description */}
                              <div className="text-center max-md:text-left">
                                <p
                                  className={`text-sm font-extrabold uppercase tracking-wide leading-tight ${
                                    isActive || isCompleted
                                      ? 'text-[#1a1a1a]'
                                      : 'text-gray-300'
                                  }`}
                                >
                                  {step.label}
                                </p>
                                <p
                                  className={`text-[0.7rem] mt-0.5 leading-snug ${
                                    isActive || isCompleted
                                      ? 'text-gray-500'
                                      : 'text-gray-300'
                                  }`}
                                >
                                  {stepDescriptions[i]}
                                </p>
                              </div>
                            </motion.div>
                          );
                        }
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* ── Delivery Info ── */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="px-8 pb-8 max-md:px-5 max-md:pb-5"
                >
                  <div className="bg-[#fafafa] rounded-xl p-6 border border-gray-100">
                    <h4 className="text-sm font-bold text-text-medium uppercase tracking-wider mb-4">
                      Delivery Info
                    </h4>
                    <div className="space-y-0">
                      {deliveryRecord.source === 'public_pod' && (
                        <InfoRow label="POD Status" value="POD CONFIRMED" />
                      )}
                      {deliveryRecord.message && (
                        <InfoRow
                          label="Message"
                          value={deliveryRecord.message}
                        />
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
                        <InfoRow
                          label="Destination"
                          value={deliveryRecord.to}
                        />
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
