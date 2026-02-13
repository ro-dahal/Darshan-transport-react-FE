import React from 'react';
import { ContactMap } from '../../contact/components/ContactMap';
import { ContactDirectoryTable } from '../../contact/components/ContactDirectoryTable';
import { useContactDirectory } from '../../contact/hooks/useContactDirectory';
import { Seo } from '../../shared/components/Seo';
import headerBg from '../../../../assets/img/1.jpg';

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
    <section>
      <Seo
        title="Get a Quote"
        description="Request a free quote for your delivery and logistics needs."
      />
      <section
        id="about-us-header"
        className="w-full h-[30vh] bg-cover bg-center flex justify-center text-center flex-col p-3.5 relative max-md:h-[25vh] max-md:p-5 mb-8"
        style={{ backgroundImage: `url(${headerBg})` }}
      >
         <div className="absolute inset-0 bg-black/40 z-0"></div>
         <h1 className="text-white text-[50px] [text-shadow:3px_3px_8px_rgba(0,0,0,0.7)] max-md:text-4xl max-sm:text-[28px] relative z-10 font-bold">Get a Quote</h1>
      </section>

      <div className="px-5">
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
    </section>
  );
};
