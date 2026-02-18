import React from 'react';
import { ContactMap } from '../../contact/components/ContactMap';
import { ContactDirectoryTable } from '../../contact/components/ContactDirectoryTable';
import { useContactDirectory } from '../../contact/hooks/useContactDirectory';
import { MetaTags } from '../../../../core/components/MetaTags';
import { PageHeader } from '../../about/components/PageHeader';

const GET_QUOTE_PAGE_STRUCTURED_DATA = {
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
    <div className="get-quote-page-wrapper">
      <MetaTags
        title="Get a Quote"
        description="Request a free quote for your delivery and logistics needs."
        canonical="https://darshantransport.com/get-quote"
        structuredData={GET_QUOTE_PAGE_STRUCTURED_DATA}
      />
      <PageHeader title="Get a Quote" />

      <div className="px-5 py-12 md:py-16">
        <div className="max-w-[900px] mx-auto mb-8">
          <ContactMap mapUrl={mapUrl} loading={loading} mapRef={mapRef} />
        </div>
        <div className="flex flex-wrap gap-8 justify-center items-center max-[900px]:flex-col max-[900px]:gap-6">
          <div className="flex-1 min-w-[300px] max-w-xl">
            <ContactDirectoryTable
              title="Booking Area"
              type="booking"
              offices={bookingOffices}
              selected={selectedBooking}
              isActive={lastSelectedType === 'booking'}
              onSelect={selectOffice}
            />
          </div>
          <div className="flex-1 min-w-[300px] max-w-xl">
            <ContactDirectoryTable
              title="Delivery Area"
              type="delivery"
              offices={deliveryOffices}
              selected={selectedDelivery}
              isActive={lastSelectedType === 'delivery'}
              onSelect={selectOffice}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
