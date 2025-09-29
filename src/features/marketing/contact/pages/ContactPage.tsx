import React from 'react';
import { ContactIntro } from '../components/ContactIntro';
import { ContactForm } from '../components/ContactForm';
import { ContactDirectoryTable } from '../components/ContactDirectoryTable';
import { ContactMap } from '../components/ContactMap';
import { useContactDirectory } from '../hooks/useContactDirectory';

export const ContactPage: React.FC = () => {
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
    <section className="contact-section">
      <div className="contact-container">
        <ContactIntro />
        <ContactForm onSubmit={() => window.alert('Message sent! (Demo only)')} />
      </div>
      <ContactMap mapUrl={mapUrl} loading={loading} mapRef={mapRef} />
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
    </section>
  );
};
