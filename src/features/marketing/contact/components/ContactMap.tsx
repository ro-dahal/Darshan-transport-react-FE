import React from 'react';

export interface ContactMapProps {
  mapUrl: string;
  loading: boolean;
  mapRef: React.RefObject<HTMLDivElement | null>;
}

export const ContactMap: React.FC<ContactMapProps> = ({
  mapUrl,
  loading,
  mapRef,
}) => (
  <div
    className="w-full h-[400px] rounded-xl overflow-hidden shadow-md relative bg-gray-100 border border-gray-200"
    ref={mapRef}
  >
    <iframe
      id="locationMap"
      src={mapUrl}
      className="w-full h-full border-0 block"
      allowFullScreen
      loading="lazy"
      title="Office location map"
    />
    {loading && (
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading map...</p>
        </div>
      </div>
    )}
  </div>
);
