import React, { useState } from 'react';
import { useOrderTracking } from '../hooks/useOrderTracking';
import { ORDER_STATUS_STEPS } from '../data/statusSteps';
import { CONTACT_CHANNELS, SOCIAL_LINKS } from '../data/contactInfo';
import { OrderHero } from '../components/OrderHero';
import { MetaTags } from '../../../core/components/MetaTags';
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import type { ContactChannel, SocialLink } from '../data/contactInfo';
import type { OrderStatusStep } from '../data/statusSteps';
import type { DeliveryRecord } from '../types/DeliveryRecord';
import './order-tracking-v2.css';

const SOCIAL_ICONS: Record<string, React.ReactElement> = {
  facebook: <FaFacebook />,
  linkedin: <FaLinkedin />,
  instagram: <FaInstagram />,
  youtube: <FaYoutube />,
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

const DEMO_RECORD: DeliveryRecord = {
  status: 'ongoing',
  consigner: 'Darshan Transport Demo',
  consignee: 'John Doe',
  from: 'Kathmandu',
  to: 'Pokhara',
  message: 'Your shipment is in transit.',
  bookingDate: new Date(Date.now() - 86400000 * 2).toISOString(),
  dispatchDate: new Date(Date.now() - 86400000).toISOString(),
};

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

  const [showAlerts, setShowAlerts] = useState(true);
  const [showResults, setShowResults] = useState(true);

  // FORCE DEMO DATA for visualization
  const deliveryRecord = realRecord || DEMO_RECORD;

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
    <div className="otv2">
      <MetaTags
        title="Track Your Order — Design 2"
        description="Brutalist order tracking."
      />
      <OrderHero />

      <section className="otv2-section">
        {/* ─── Contact ─── */}
        <aside className="otv2-contact">
          <div className="otv2-contact-label-box">CONTACT</div>
          <h2>GET IN TOUCH!</h2>
          <p>We'd love to hear from you.</p>
          {CONTACT_CHANNELS.map((ch: ContactChannel) => (
            <div key={ch.label} className="otv2-contact-item">
              <div className="otv2-label">{ch.label.toUpperCase()}</div>
              <div className="otv2-value">{ch.value}</div>
            </div>
          ))}
          <div className="otv2-social">
            {SOCIAL_LINKS.map((l: SocialLink) => (
              <a key={l.key} href={l.href} aria-label={l.label}>
                {SOCIAL_ICONS[l.key]}
              </a>
            ))}
          </div>
        </aside>

        {/* ─── Main ─── */}
        <div className="otv2-main">
          <h3 className="otv2-main-title">CHECK DELIVERY STATUS</h3>

          {showAlerts && isServiceDown && (
            <div className="otv2-alert">
              <span className="otv2-alert-marker">⚠</span>
              <div>
                <h4>SERVICE UNAVAILABLE</h4>
                <p>{error.split('|')[1]}</p>
              </div>
            </div>
          )}
          {showAlerts && isServerError && (
            <div className="otv2-alert error-alert">
              <span className="otv2-alert-marker">✕</span>
              <div>
                <h4>SYSTEM ERROR</h4>
                <p>{error.split('|')[1]}</p>
              </div>
            </div>
          )}

          <div className="otv2-input-section">
            {/* Location */}
            <div className="otv2-card">
              <h3>LOCATION</h3>
              <div className="otv2-field">
                <label htmlFor="v2-series">SERIES:</label>
                <select
                  id="v2-series"
                  value={selectedSeries}
                  onChange={(e) => selectSeries(e.target.value)}
                >
                  {seriesList.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                className="otv2-btn"
                onClick={submit}
                disabled={isLoading || !isReady}
              >
                {isLoading ? '> CHECKING...' : 'CHECK STATUS'}
              </button>
            </div>

            {/* Form */}
            <div className="otv2-card">
              <h3>CHECK STATUS</h3>
              <div className="otv2-field">
                <label htmlFor="v2-invoice">INVOICE NO:</label>
                <input
                  id="v2-invoice"
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => updateInvoiceNumber(e.target.value)}
                  placeholder="000001"
                />
              </div>
              {!isServiceDown && !isServerError && error && (
                <div className="otv2-error">ERR: {error}</div>
              )}
            </div>
          </div>

          {/* Result */}
          {showResults && deliveryRecord && (
            <div className="otv2-card otv2-result-card">
              {/* Terminal Timeline */}
              <div className="otv2-timeline">
                {ORDER_STATUS_STEPS.map((step: OrderStatusStep, i: number) => {
                  const isCompleted = i < clampedIndex;
                  const isActive = i === clampedIndex;
                  let cls = 'otv2-timeline-step';
                  if (isCompleted) cls += ' completed';
                  if (isActive) cls += ' active';
                  return (
                    <div key={step.key} className={cls}>
                      <span className="otv2-step-label">{step.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Delivery info */}
              <div className="otv2-delivery-info">
                <h4>DELIVERY INFO</h4>
                {deliveryRecord.message && (
                  <div className="otv2-delivery-row">
                    <b>MESSAGE</b>
                    <span>{deliveryRecord.message}</span>
                  </div>
                )}
                {deliveryRecord.consigner && (
                  <div className="otv2-delivery-row">
                    <b>CONSIGNER</b>
                    <span>{deliveryRecord.consigner}</span>
                  </div>
                )}
                {deliveryRecord.consignee && (
                  <div className="otv2-delivery-row">
                    <b>CONSIGNEE</b>
                    <span>{deliveryRecord.consignee}</span>
                  </div>
                )}
                {deliveryRecord.from && (
                  <div className="otv2-delivery-row">
                    <b>ORIGIN</b>
                    <span>{deliveryRecord.from}</span>
                  </div>
                )}
                {deliveryRecord.to && (
                  <div className="otv2-delivery-row">
                    <b>DEST</b>
                    <span>{deliveryRecord.to}</span>
                  </div>
                )}
                {formatDate(deliveryRecord.bookingDate) && (
                  <div className="otv2-delivery-row">
                    <b>BOOKED</b>
                    <span>{formatDate(deliveryRecord.bookingDate)}</span>
                  </div>
                )}
                {formatDate(deliveryRecord.dispatchDate) && (
                  <div className="otv2-delivery-row">
                    <b>DISPATCHED</b>
                    <span>{formatDate(deliveryRecord.dispatchDate)}</span>
                  </div>
                )}
                {formatDate(deliveryRecord.arrivalDate) && (
                  <div className="otv2-delivery-row">
                    <b>ARRIVED</b>
                    <span>{formatDate(deliveryRecord.arrivalDate)}</span>
                  </div>
                )}
                {deliveryRecord.error && (
                  <div className="otv2-delivery-row">
                    <b>NOTES</b>
                    <span>{deliveryRecord.error}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="otv2-toggle-container">
        <button
          type="button"
          className={`otv2-toggle-btn ${!showAlerts ? 'inactive' : ''}`}
          onClick={() => setShowAlerts(!showAlerts)}
        >
          {showAlerts ? 'Hide Alerts' : 'Show Alerts'}
        </button>
        <button
          type="button"
          className={`otv2-toggle-btn ${!showResults ? 'inactive' : ''}`}
          onClick={() => setShowResults(!showResults)}
        >
          {showResults ? 'Hide Results' : 'Show Results'}
        </button>
      </div>
    </div>
  );
};
