import { useEffect, useRef, useState } from 'react';
import { BOOKING_OFFICES, DELIVERY_OFFICES } from '../data/contactDirectory';
import type { OfficeRow } from '../data/contactDirectory';

type DirectoryType = 'booking' | 'delivery';

function buildMapUrl(search: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(search)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
}

export function useContactDirectory() {
  const [selectedBooking, setSelectedBooking] = useState<OfficeRow>(BOOKING_OFFICES[0]);
  const [selectedDelivery, setSelectedDelivery] = useState<OfficeRow>(DELIVERY_OFFICES[0]);
  const [lastSelectedType, setLastSelectedType] = useState<DirectoryType>('booking');
  const [mapUrl, setMapUrl] = useState<string>(buildMapUrl(BOOKING_OFFICES[0].search));
  const [loading, setLoading] = useState<boolean>(false);
  const firstLoadRef = useRef(true);
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (firstLoadRef.current) {
      firstLoadRef.current = false;
      return;
    }

    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 1200);

    const query = lastSelectedType === 'booking' ? selectedBooking.search : selectedDelivery.search;
    setMapUrl(buildMapUrl(query));

    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return () => {
      window.clearTimeout(timer);
    };
  }, [lastSelectedType, selectedBooking, selectedDelivery]);

  const selectOffice = (office: OfficeRow, type: DirectoryType) => {
    if (type === 'booking') {
      setSelectedBooking(office);
    } else {
      setSelectedDelivery(office);
    }
    setLastSelectedType(type);
  };

  return {
    bookingOffices: BOOKING_OFFICES,
    deliveryOffices: DELIVERY_OFFICES,
    selectedBooking,
    selectedDelivery,
    lastSelectedType,
    selectOffice,
    mapUrl,
    loading,
    mapRef,
  };
}
