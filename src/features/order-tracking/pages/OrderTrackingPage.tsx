import React from 'react';
import { useOrderTracking } from '../hooks/useOrderTracking';
import { ORDER_STATUS_STEPS } from '../data/statusSteps';
import { CONTACT_CHANNELS, SOCIAL_LINKS } from '../data/contactInfo';
import { OrderHero } from '../components/OrderHero';
import { ContactCard } from '../components/ContactCard';
import { OrderLocationSelector } from '../components/OrderLocationSelector';
import { OrderStatusForm } from '../components/OrderStatusForm';
import { DeliveryInfoCard } from '../components/DeliveryInfoCard';

export const OrderTrackingPage: React.FC = () => {
  const {
    state: { seriesList, selectedSeries, invoiceNumber, deliveryRecord, error, isLoading, isReady },
    actions: { selectSeries, updateInvoiceNumber, submit },
  } = useOrderTracking();

  return (
    <>
      <OrderHero />

      <section id="pageNotReadyBanner1">
        <div className="order-layout">
          <ContactCard channels={CONTACT_CHANNELS} socialLinks={SOCIAL_LINKS} />

          <div className="order-right">
            <OrderLocationSelector
              seriesList={seriesList}
              selectedSeries={selectedSeries}
              onSelect={selectSeries}
            />

            <OrderStatusForm
              invoiceNumber={invoiceNumber}
              onInvoiceChange={updateInvoiceNumber}
              onSubmit={submit}
              loading={isLoading || !isReady}
              error={error}
            />

            {deliveryRecord && <DeliveryInfoCard record={deliveryRecord} steps={ORDER_STATUS_STEPS} />}
          </div>
        </div>

        <style>
          {`
          :root { --accent: #fcaf17; --muted: #e6e6e6; }

          .order-layout {
            max-width: 1000px;
            margin: 30px auto 20px auto;
            padding: 0 16px;
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 20px;
          }

          .order-contact-box {
            background: #fcaf17;
            color: #fff;
            border-radius: 6px;
            padding: 28px 20px;
            text-align: center;
          }

          .timeline-box {
            border: 1px solid #fcaf17;
            border-radius: 6px;
            padding: 22px 10px 18px 10px;
            background: #fff;
            margin-bottom: 18px;
          }

          .delivery-info-box {
            border: 1px solid #fcaf17;
            border-radius: 6px;
            padding: 18px 16px;
            background: #fff;
            font-size: 1.08rem;
          }

          .delivery-title {
            color: #fcaf17;
            font-size: 1.25rem;
            font-weight: bold;
            margin-bottom: 8px;
            display: block;
          }

          .timeline-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            max-width: 720px;
            margin: 0 auto;
            user-select: none;
            position: relative;
            padding: 22px 10px 0;
          }

          .timeline-track {
            position: absolute;
            top: var(--track-top, 38px);
            left: var(--track-left, 28px);
            right: var(--track-right, 28px);
            height: 6px;
            background: var(--muted);
            border-radius: 3px;
            z-index: 0;
            display: block;
          }

          .timeline-progress {
            position: absolute;
            top: var(--track-top, 38px);
            left: var(--track-left, 28px);
            height: 6px;
            background: linear-gradient(90deg, #f3b33a, var(--accent));
            border-radius: 3px;
            z-index: 1;
            width: var(--track-progress, 0px);
            transition: width 0.25s ease;
          }

          .timeline-step {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            flex: 1;
            min-width: 110px;
          }

          .timeline-circle {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: white;
            border: 3px solid var(--muted);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.35rem;
            color: var(--muted);
            transition: all 0.3s ease;
            position: relative;
            z-index: 2;
          }

          .timeline-circle.done,
          .timeline-circle.active {
            border-color: var(--accent);
            color: var(--accent);
          }

          .timeline-circle.active {
            transform: scale(1.05);
            box-shadow: 0 0 12px rgba(252, 175, 23, 0.4);
          }

          .timeline-line {
            height: 3px;
            width: 100%;
            background: var(--muted);
            position: absolute;
            top: 28px;
            left: 50%;
            transform: translateX(0);
            z-index: 1;
          }

          .timeline-line.done {
            background: var(--accent);
          }

          .timeline-label {
            margin-top: 12px;
            font-weight: 600;
            color: #333;
            font-size: 0.95rem;
          }

          @media (max-width: 900px) {
            .order-layout {
              grid-template-columns: 1fr;
            }

            .order-contact-box {
              order: 2;
            }
          }

          @media (max-width: 600px) {
            .timeline-container {
              flex-direction: column;
              gap: 16px;
            }

            .timeline-track,
            .timeline-progress {
              display: none;
            }

            .timeline-step {
              flex-direction: row;
              justify-content: flex-start;
              gap: 12px;
            }

            .timeline-line {
              display: none;
            }

            .timeline-label {
              margin-top: 0;
            }
          }
        `}
        </style>
      </section>
    </>
  );
};
