import React from "react";
import { useOrderTracking } from "../hooks/useOrderTracking";
import { ORDER_STATUS_STEPS } from "../data/statusSteps";
import { CONTACT_CHANNELS, SOCIAL_LINKS } from "../data/contactInfo";
import { OrderHero } from "../components/OrderHero";
import { ContactCard } from "../components/ContactCard";
import { OrderLocationSelector } from "../components/OrderLocationSelector";
import { OrderStatusForm } from "../components/OrderStatusForm";
import { DeliveryInfoCard } from "../components/DeliveryInfoCard";
import { ServiceStatusAlert } from "../components/ServiceStatusAlert";
import { Seo } from "../../marketing/shared/components/Seo";

export const OrderTrackingPage: React.FC = () => {
  const {
    state: {
      seriesList,
      selectedSeries,
      invoiceNumber,
      deliveryRecord,
      error,
      isLoading,
      isReady,
    },
    actions: { selectSeries, updateInvoiceNumber, submit },
  } = useOrderTracking();

  const isServiceDown = error?.startsWith("SERVICE_UNAVAILABLE|");
  const isServerError = error?.startsWith("SERVER_ERROR|");

  return (
    <>
      <Seo
        title="Track Your Order"
        description="Real-time order tracking for your shipments."
      />
      <OrderHero />

      <section id="pageNotReadyBanner1">
        <div className="max-w-[1000px] mx-auto mt-[30px] mb-5 px-4 grid grid-cols-[1fr_2fr] gap-5 max-[900px]:grid-cols-1">
          <ContactCard channels={CONTACT_CHANNELS} socialLinks={SOCIAL_LINKS} />

          <div className="max-[900px]:order-1">
            {isServiceDown && (
              <ServiceStatusAlert
                message={error.split("|")[1]}
                type="unavailable"
              />
            )}

            {isServerError && (
              <ServiceStatusAlert message={error.split("|")[1]} type="error" />
            )}

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
              // Only pass simpler errors to form; specialized alerts handled above
              error={!isServiceDown && !isServerError ? error : undefined}
            />

            {deliveryRecord && (
              <DeliveryInfoCard
                record={deliveryRecord}
                steps={ORDER_STATUS_STEPS}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};
