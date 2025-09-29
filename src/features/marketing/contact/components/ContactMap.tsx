import React from 'react';

export interface ContactMapProps {
  mapUrl: string;
  loading: boolean;
  mapRef: React.RefObject<HTMLDivElement | null>;
}

export const ContactMap: React.FC<ContactMapProps> = ({ mapUrl, loading, mapRef }) => (
  <div className="contact-map" ref={mapRef} style={{ position: 'relative' }}>
    <iframe
      id="locationMap"
      src={mapUrl}
      width="100%"
      height="400"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      title="Office location map"
    />
    {loading && (
      <div className="map-loading" id="mapLoading">
        <p>Loading map...</p>
      </div>
    )}
  </div>
);
