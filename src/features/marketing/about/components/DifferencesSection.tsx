import React from 'react';

export const DifferencesSection: React.FC = () => (
  <section className="py-10 px-5 pb-[60px] max-w-[1200px] mx-auto mb-10">
    <div className="grid grid-cols-[1fr_8px_1fr] gap-10 items-start max-lg:grid-cols-1 max-lg:gap-6 max-md:gap-4">
      <div className="flex flex-col gap-[18px]">
        <h4 className="text-primary text-sm font-bold mb-1.5">OUR MISSION</h4>
        <div className="bg-transparent py-2">
          <p className="text-[15px] leading-[1.6] text-text-dark my-2.5 text-justify">
            To simplify cargo movement for businesses across Nepal through
            structured transport, dependable delivery, and practical logistics
            support.
          </p>
          <div className="h-1 bg-gradient-to-r from-primary to-primary w-[50px] my-1.5" />
        </div>
      </div>

      <div
        className="w-1 bg-gradient-to-b from-primary to-primary rounded self-stretch justify-self-center max-lg:hidden"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-[18px]">
        <h4 className="text-primary text-sm font-bold mb-1.5">OUR VISION</h4>
        <div className="bg-transparent py-2">
          <p className="text-[15px] leading-[1.6] text-text-dark my-2.5 text-justify">
            To become a trusted logistics partner for businesses across Nepal by
            building a strong transport network, improving service reliability,
            and supporting long-term business growth through dependable
            logistics solutions.
          </p>
          <div className="h-1 bg-gradient-to-r from-primary to-primary w-[50px] my-1.5" />
        </div>
      </div>
    </div>
  </section>
);

export default DifferencesSection;
