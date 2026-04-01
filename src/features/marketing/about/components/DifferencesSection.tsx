import React from 'react';

export const DifferencesSection: React.FC = () => (
  <section className="px-5 pb-[60px]">
    <div className="mx-auto max-w-[1180px] border-t border-border-light pt-10">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="min-w-0">
          <h4 className="text-primary text-sm font-bold tracking-[0.18em] uppercase">
            Our Mission
          </h4>
          <p className="mt-4 max-w-[520px] text-base leading-[1.9] text-text-dark">
            To simplify cargo movement for businesses across Nepal through
            structured transport, dependable delivery, and practical logistics
            support.
          </p>
          <div className="mt-5 h-1 w-[56px] bg-primary" />
        </div>

        <div className="min-w-0">
          <h4 className="text-primary text-sm font-bold tracking-[0.18em] uppercase">
            Our Vision
          </h4>
          <p className="mt-4 max-w-[560px] text-base leading-[1.9] text-text-dark">
            To become a trusted logistics partner for businesses across Nepal by
            building a strong transport network, improving service reliability,
            and supporting long-term business growth through dependable
            logistics solutions.
          </p>
          <div className="mt-5 h-1 w-[56px] bg-primary" />
        </div>
      </div>
    </div>
  </section>
);

export default DifferencesSection;
