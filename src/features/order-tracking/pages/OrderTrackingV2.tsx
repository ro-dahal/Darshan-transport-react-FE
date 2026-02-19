import React from 'react';
import { useOrderTracking } from '../hooks/useOrderTracking';
import { ORDER_STATUS_STEPS } from '../data/statusSteps';
import { CONTACT_CHANNELS, SOCIAL_LINKS } from '../data/contactInfo';
import { OrderHero } from '../components/OrderHero';
import { MetaTags } from '../../../core/components/MetaTags';
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';
import type { ContactChannel, SocialLink } from '../data/contactInfo';
import type { OrderStatusStep } from '../data/statusSteps';

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
  });
}

/* ============================================
   DESIGN 2 — Brutalist / Raw
   ============================================ */
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

  // Use real data
  const deliveryRecord = realRecord;

  const isServiceDown = error?.startsWith('SERVICE_UNAVAILABLE|');
  const isServerError = error?.startsWith('SERVER_ERROR|');

  const clampedIndex = Math.max(
    0,
    Math.min(
      ORDER_STATUS_STEPS.findIndex((s) => s.key === deliveryRecord?.status),
      ORDER_STATUS_STEPS.length - 1
    )
  );

  return (
    <div className="min-h-screen bg-white font-sans text-text-dark">
      <MetaTags
        title="Track Your Order — Design 2"
        description="Order tracking."
      />
      <OrderHero />
      {/* Order Tracking Card */}
      <section className="relative z-10 mx-3 mt-10 mb-20 grid max-w-[1200px] grid-cols-[320px_1fr] gap-0 rounded-[20px] border-[1.5px] border-black/10 bg-white animate-slide-down sm:mx-6 xl:mx-auto max-[960px]:grid-cols-1">
        {/* ─── Contact ─── */}
        <aside className="relative border-r-[1.5px] border-black/5 bg-primary px-[30px] py-10 text-text-dark rounded-tl-[20px] rounded-bl-[20px] max-[960px]:rounded-tl-[16px] max-[960px]:rounded-tr-[16px] max-[960px]:rounded-bl-none max-[960px]:border-r-0 max-[960px]:border-b-[1.5px] max-[960px]:border-black/10">
          <div className="absolute top-0 left-[30px] inline-block -translate-y-1/2 rounded bg-[#2b2b2b] px-3 py-1 text-xs font-semibold tracking-[2px] text-white uppercase">
            CONTACT
          </div>
          <h2 className="mt-[10px] mb-6 text-3xl leading-[0.9] font-semibold text-text-dark uppercase sm:text-4xl lg:text-5xl">
            GET IN TOUCH!
          </h2>
          <p className="mb-10 text-xs leading-relaxed opacity-80">
            We'd love to hear from you.
          </p>
          {CONTACT_CHANNELS.map((ch: ContactChannel) => (
            <div
              key={ch.label}
              className="mb-4 border-t border-black/10 pt-4 sm:mb-6 lg:mb-8"
            >
              <div className="mb-1 text-base font-bold tracking-[2px] uppercase">
                {ch.label.toUpperCase()}
              </div>
              <div className="break-all text-sm leading-[1.4] font-medium">
                {ch.value}
              </div>
            </div>
          ))}
          <div className="mt-6 flex gap-4 border-t border-black/10 pt-6 sm:mt-10 lg:mt-12">
            {SOCIAL_LINKS.map((l: SocialLink) => (
              <a
                key={l.key}
                href={l.href}
                aria-label={l.label}
                className="text-[1.2rem] text-text-dark transition-transform duration-200 hover:scale-[1.2] hover:text-white"
              >
                {SOCIAL_ICONS[l.key]}
              </a>
            ))}
          </div>
        </aside>

        {/* ─── Main ─── */}
        <div className="bg-white pt-10 rounded-tr-[20px] rounded-br-[20px] max-[960px]:rounded-tr-none max-[960px]:rounded-bl-[16px] max-[960px]:rounded-br-[16px]">
          <h3 className="mb-2 px-4 text-2xl leading-[1.1] font-bold tracking-[-0.02em] text-primary sm:px-6 sm:text-3xl lg:px-10 lg:text-5xl">
            CHECK DELIVERY STATUS
          </h3>

          {isServiceDown && (
            <div className="mx-4 mt-4 flex items-center gap-4 rounded-xl border-[1.5px] border-primary-light bg-white px-4 py-4 sm:mx-6 sm:mt-6 sm:gap-6 sm:px-6 sm:py-6 lg:mx-10 lg:mt-8 lg:px-10 lg:py-8">
              <span className="text-3xl text-primary">⚠</span>
              <div>
                <h4 className="mb-1 text-xl font-semibold uppercase">
                  SERVICE UNAVAILABLE
                </h4>
                <p className="text-sm text-text-dark">{error.split('|')[1]}</p>
              </div>
            </div>
          )}
          {isServerError && (
            <div className="mx-4 mt-4 flex items-center gap-4 rounded-xl border-[1.5px] border-primary-light bg-white px-4 py-4 sm:mx-6 sm:mt-6 sm:gap-6 sm:px-6 sm:py-6 lg:mx-10 lg:mt-8 lg:px-10 lg:py-8">
              <span className="text-3xl text-primary">✕</span>
              <div>
                <h4 className="mb-1 text-xl font-semibold uppercase">
                  SYSTEM ERROR
                </h4>
                <p className="text-sm text-text-dark">{error.split('|')[1]}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-[1fr_1.2fr] max-[639px]:grid-cols-1">
            {/* Location */}
            <div className="px-4 pt-6 pb-0 sm:px-6 sm:py-7 lg:px-10 lg:py-8">
              <h3 className="mb-6 inline-block border-b-[3px] border-primary pb-1 text-xl font-semibold text-text-dark uppercase sm:text-2xl lg:text-[2rem]">
                SERIES
              </h3>
              <div className="mt-8 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-6">
                <label
                  htmlFor="v2-series"
                  className="text-[0.85rem] font-semibold tracking-[1px] uppercase sm:min-w-[120px]"
                >
                  SERIES:
                </label>
                <select
                  id="v2-series"
                  value={selectedSeries}
                  onChange={(e) => selectSeries(e.target.value)}
                  className="w-full max-w-full rounded-xl border-[1.5px] border-border-light bg-white px-[18px] py-[14px] text-[1.1rem] outline-none sm:max-w-[340px]"
                >
                  {seriesList.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Form */}
            <div className="px-4 py-6 sm:px-6 sm:py-7 lg:px-10 lg:py-8">
              <h3 className="mb-6 hidden border-b-[3px] border-primary pb-1 text-xl font-semibold text-text-dark uppercase sm:inline-block sm:text-2xl lg:text-[2rem]">
                INVOICE NUMBER
              </h3>
              <div className="mt-0 flex flex-col items-start gap-2 sm:mt-8 sm:flex-row sm:items-center sm:gap-6">
                <label
                  htmlFor="v2-invoice"
                  className="text-[0.85rem] font-semibold tracking-[1px] uppercase sm:min-w-[120px]"
                >
                  INVOICE NO:
                </label>
                <input
                  id="v2-invoice"
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => updateInvoiceNumber(e.target.value)}
                  placeholder="000001"
                  className="w-full max-w-full rounded-xl border-[1.5px] border-border-light bg-white px-[18px] py-[14px] text-[1.1rem] outline-none placeholder:text-[#ddd] sm:max-w-[340px]"
                />
              </div>
              {!isServiceDown && !isServerError && error && (
                <div className="mt-2 text-sm text-red-600">ERR: {error}</div>
              )}
            </div>
          </div>

          <div className="px-4 pb-10 sm:px-6 sm:pb-7 lg:px-10 lg:pb-8">
            <button
              type="button"
              className="inline-flex w-full cursor-pointer items-center justify-center gap-4 whitespace-nowrap rounded-xl border-[1.5px] border-black/10 bg-primary px-12 py-4 text-[1.1rem] font-semibold text-text-dark uppercase shadow-[4px_4px_0_rgba(0,0,0,0.05)] transition-all duration-200 sm:w-auto sm:justify-start hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-primary-hover hover:shadow-[6px_6px_0_rgba(252,175,23,0.2)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#333] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:bg-primary disabled:hover:shadow-none"
              onClick={submit}
              disabled={isLoading || !isReady}
            >
              {isLoading ? '> CHECKING...' : 'CHECK STATUS'}
            </button>
          </div>

          {/* Result */}
          {deliveryRecord && (
            <div className="grid grid-cols-[160px_1fr] items-stretch gap-10 border-b-0 px-4 py-6 sm:px-6 sm:py-7 lg:gap-6 lg:px-10 lg:py-8 xl:grid-cols-[200px_1fr] xl:gap-10 max-[1023px]:grid-cols-1 max-[1023px]:gap-8">
              {/* Terminal Timeline */}
              {/* Terminal Timeline */}
              <div className="relative flex h-full flex-col justify-between py-[10px] pl-5 lg:pl-4 xl:pl-5 max-[1023px]:flex-row max-[1023px]:items-center max-[1023px]:justify-between max-[1023px]:gap-0 max-[1023px]:overflow-hidden max-[1023px]:pb-4 max-[1023px]:pl-0 max-[1023px]:pt-0">
                {ORDER_STATUS_STEPS.map((step: OrderStatusStep, i: number) => {
                  const isCompleted = i < clampedIndex;
                  const isActive = i === clampedIndex;
                  const baseStepClass =
                    'relative flex items-center gap-4 transition-all duration-300 lg:flex-1 lg:gap-3 xl:gap-4 max-[1023px]:before:hidden max-[1023px]:flex-col max-[1023px]:items-center max-[1023px]:gap-2 max-[1023px]:flex-1';
                  const completedStepClass =
                    "before:content-[''] before:absolute before:left-[-27px] xl:before:left-[-27px] lg:before:left-[-23px] before:top-1/2 before:h-[14px] before:w-[14px] before:-translate-y-1/2 before:rounded-full before:bg-primary before:shadow-[0_0_0_6px_#fff] before:z-[2]";
                  const activeStepClass =
                    "before:content-['➤'] before:absolute before:left-[-31px] xl:before:left-[-31px] lg:before:left-[-27px] before:top-1/2 before:-translate-y-1/2 before:text-[1.4rem] before:text-primary before:bg-white before:animate-blink before:shadow-[0_0_0_4px_#fff] before:z-[3] before:flex before:items-center before:justify-center";
                  const inactiveStepClass =
                    "before:content-[''] before:absolute before:left-[-26px] xl:before:left-[-26px] lg:before:left-[-22px] before:top-1/2 before:h-3 before:w-3 before:-translate-y-1/2 before:rounded-full before:border-2 before:border-[#ccc] before:bg-white before:shadow-[0_0_0_6px_#fff] before:z-[2]";

                  const stepClass = `${baseStepClass} ${
                    isActive
                      ? activeStepClass
                      : isCompleted
                        ? completedStepClass
                        : inactiveStepClass
                  }`;

                  return (
                    <div key={step.key} className={stepClass}>
                      {/* Vertical Segment (Desktop/Laptop) */}
                      {i < ORDER_STATUS_STEPS.length - 1 && (
                        <div
                          className={`absolute top-1/2 left-[-21px] hidden h-full lg:block lg:left-[-17px] xl:left-[-21px] ${
                            i < clampedIndex
                              ? 'w-[2px] bg-primary'
                              : 'w-0 border-l-2 border-dotted border-gray-300'
                          }`}
                          aria-hidden="true"
                        />
                      )}

                      {/* Segmented Connector (Tablet) */}
                      {i < ORDER_STATUS_STEPS.length - 1 && (
                        <div
                          className={`absolute left-[50%] top-[6px] hidden w-full transform max-[1023px]:block ${
                            i < clampedIndex
                              ? 'h-[2px] bg-primary'
                              : 'h-0 border-t-2 border-dotted border-gray-300'
                          }`}
                          aria-hidden="true"
                        />
                      )}

                      {/* Tablet Marker */}
                      <div className="relative z-[2] hidden h-3 items-center justify-center max-[1023px]:flex">
                        {isActive ? (
                          <span className="animate-blink text-lg leading-none text-primary">
                            ▼
                          </span>
                        ) : (
                          <span
                            className={`h-3 w-3 rounded-full ${
                              isCompleted
                                ? 'bg-primary'
                                : 'border-2 border-[#ccc] bg-white'
                            }`}
                          />
                        )}
                      </div>

                      <span
                        className={`text-[0.9rem] font-bold tracking-[1px] uppercase lg:text-[0.8rem] xl:text-[0.9rem] max-[1023px]:text-[0.75rem] max-[1023px]:text-center ${
                          isActive || isCompleted
                            ? 'text-text-dark'
                            : 'text-text-medium opacity-40'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Delivery info */}
              <div className="rounded-xl border-[1.5px] border-border-light bg-bg-light p-8">
                <h4 className="mb-4 text-lg font-bold text-text-dark uppercase">
                  DELIVERY INFO
                </h4>
                {deliveryRecord.message && (
                  <div className="grid grid-cols-1 gap-1 border-b border-black/5 py-4 last:border-b-0 sm:grid-cols-[140px_1fr] xl:sm:grid-cols-[200px_1fr] sm:gap-0">
                    <b className="text-xs font-medium tracking-[1px] text-text-medium uppercase">
                      MESSAGE
                    </b>
                    <span className="font-semibold text-text-dark sm:text-right">
                      {deliveryRecord.message}
                    </span>
                  </div>
                )}
                {deliveryRecord.consigner && (
                  <div className="grid grid-cols-1 gap-1 border-b border-black/5 py-4 last:border-b-0 sm:grid-cols-[140px_1fr] xl:sm:grid-cols-[200px_1fr] sm:gap-0">
                    <b className="text-xs font-medium tracking-[1px] text-text-medium uppercase">
                      CONSIGNER
                    </b>
                    <span className="font-semibold text-text-dark sm:text-right">
                      {deliveryRecord.consigner}
                    </span>
                  </div>
                )}
                {deliveryRecord.consignee && (
                  <div className="grid grid-cols-1 gap-1 border-b border-black/5 py-4 last:border-b-0 sm:grid-cols-[140px_1fr] xl:sm:grid-cols-[200px_1fr] sm:gap-0">
                    <b className="text-xs font-medium tracking-[1px] text-text-medium uppercase">
                      CONSIGNEE
                    </b>
                    <span className="font-semibold text-text-dark sm:text-right">
                      {deliveryRecord.consignee}
                    </span>
                  </div>
                )}
                {deliveryRecord.from && (
                  <div className="grid grid-cols-1 gap-1 border-b border-black/5 py-4 last:border-b-0 sm:grid-cols-[140px_1fr] xl:sm:grid-cols-[200px_1fr] sm:gap-0">
                    <b className="text-xs font-medium tracking-[1px] text-text-medium uppercase">
                      ORIGIN
                    </b>
                    <span className="font-semibold text-text-dark sm:text-right">
                      {deliveryRecord.from}
                    </span>
                  </div>
                )}
                {deliveryRecord.to && (
                  <div className="grid grid-cols-1 gap-1 border-b border-black/5 py-4 last:border-b-0 sm:grid-cols-[140px_1fr] xl:sm:grid-cols-[200px_1fr] sm:gap-0">
                    <b className="text-xs font-medium tracking-[1px] text-text-medium uppercase">
                      DEST
                    </b>
                    <span className="font-semibold text-text-dark sm:text-right">
                      {deliveryRecord.to}
                    </span>
                  </div>
                )}
                {formatDate(deliveryRecord.bookingDate) && (
                  <div className="grid grid-cols-1 gap-1 border-b border-black/5 py-4 last:border-b-0 sm:grid-cols-[140px_1fr] xl:sm:grid-cols-[200px_1fr] sm:gap-0">
                    <b className="text-xs font-medium tracking-[1px] text-text-medium uppercase">
                      BOOKED
                    </b>
                    <span className="font-semibold text-text-dark sm:text-right">
                      {formatDate(deliveryRecord.bookingDate)}
                    </span>
                  </div>
                )}
                {formatDate(deliveryRecord.dispatchDate) && (
                  <div className="grid grid-cols-1 gap-1 border-b border-black/5 py-4 last:border-b-0 sm:grid-cols-[140px_1fr] xl:sm:grid-cols-[200px_1fr] sm:gap-0">
                    <b className="text-xs font-medium tracking-[1px] text-text-medium uppercase">
                      DISPATCHED
                    </b>
                    <span className="font-semibold text-text-dark sm:text-right">
                      {formatDate(deliveryRecord.dispatchDate)}
                    </span>
                  </div>
                )}
                {formatDate(deliveryRecord.arrivalDate) && (
                  <div className="grid grid-cols-1 gap-1 border-b border-black/5 py-4 last:border-b-0 sm:grid-cols-[140px_1fr] xl:sm:grid-cols-[200px_1fr] sm:gap-0">
                    <b className="text-xs font-medium tracking-[1px] text-text-medium uppercase">
                      ARRIVED
                    </b>
                    <span className="font-semibold text-text-dark sm:text-right">
                      {formatDate(deliveryRecord.arrivalDate)}
                    </span>
                  </div>
                )}
                {deliveryRecord.error && (
                  <div className="grid grid-cols-1 gap-1 border-b border-black/5 py-4 last:border-b-0 sm:grid-cols-[140px_1fr] xl:sm:grid-cols-[200px_1fr] sm:gap-0">
                    <b className="text-xs font-medium tracking-[1px] text-text-medium uppercase">
                      NOTES
                    </b>
                    <span className="font-semibold text-text-dark sm:text-right">
                      {deliveryRecord.error}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
