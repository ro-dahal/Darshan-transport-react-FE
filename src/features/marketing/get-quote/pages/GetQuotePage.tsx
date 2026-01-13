import React from 'react';
import './GetQuotePage.css';
import { ContactMap } from '../../contact/components/ContactMap';
import { ContactDirectoryTable } from '../../contact/components/ContactDirectoryTable';
import { useContactDirectory } from '../../contact/hooks/useContactDirectory';

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
    <section className="get-quote-section">
      <h2>Get a Quote</h2>
      <div className="get-quote-map-area">
        <ContactMap mapUrl={mapUrl} loading={loading} mapRef={mapRef} />
      </div>
      <div className="get-quote-directory-area">
        <ContactDirectoryTable
          title="Booking Area"
          type="booking"
          offices={bookingOffices}
          selected={selectedBooking}
          isActive={lastSelectedType === 'booking'}
          onSelect={selectOffice}
        />
        <ContactDirectoryTable
          title="Delivery Area"
          type="delivery"
          offices={deliveryOffices}
          selected={selectedDelivery}
          isActive={lastSelectedType === 'delivery'}
          onSelect={selectOffice}
        />
      </div>
    </section>
  );
};
