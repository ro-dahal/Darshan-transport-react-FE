import { useEffect, useRef, useState } from 'react';
import { BOOKING_OFFICES, DELIVERY_OFFICES } from '../data/contactDirectory';
import type { OfficeRow } from '../data/contactDirectory';

type DirectoryType = 'booking' | 'delivery';

function buildMapUrl(
  office: Pick<OfficeRow, 'search' | 'mapTarget' | 'mapZoom'>
): string {
  const query = office.mapTarget ?? office.search;
  const zoom = office.mapZoom ?? 13;

  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;
}

function getOfficeMapTarget(
  office: OfficeRow
): Pick<OfficeRow, 'search' | 'mapTarget' | 'mapZoom'> {
  return {
    search: office.search,
    mapTarget: office.mapTarget,
    mapZoom: office.mapZoom,
  };
}

export function useContactDirectory() {
  const [selectedBooking, setSelectedBooking] = useState<OfficeRow>(
    BOOKING_OFFICES[0]
  );
  const [selectedDelivery, setSelectedDelivery] = useState<OfficeRow>(
    DELIVERY_OFFICES[0]
  );
  const [lastSelectedType, setLastSelectedType] =
    useState<DirectoryType>('booking');
  const [mapUrl, setMapUrl] = useState<string>(
    buildMapUrl(getOfficeMapTarget(BOOKING_OFFICES[0]))
  );
  const [loading, setLoading] = useState<boolean>(false);
  const firstLoadRef = useRef(true);
  const mapRef = useRef<HTMLDivElement | null>(null);

  const [isManual, setIsManual] = useState(false);

  useEffect(() => {
    if (firstLoadRef.current) {
      firstLoadRef.current = false;
      return;
    }

    // Only scroll if it was a manual user interaction
    if (!isManual) return;

    setLoading(true);
    const timer = window.setTimeout(() => {
      setLoading(false);
      setIsManual(false); // Reset after loading finishes
    }, 1200);

    const query =
      lastSelectedType === 'booking'
        ? getOfficeMapTarget(selectedBooking)
        : getOfficeMapTarget(selectedDelivery);
    setMapUrl(buildMapUrl(query));

    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return () => {
      window.clearTimeout(timer);
    };
  }, [lastSelectedType, selectedBooking, selectedDelivery, isManual]);

  const selectOffice = (office: OfficeRow, type: DirectoryType) => {
    setIsManual(true);
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
