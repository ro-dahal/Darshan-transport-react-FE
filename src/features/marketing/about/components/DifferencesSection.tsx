import React from 'react';

export const DifferencesSection: React.FC = () => (
  <section className="py-10 px-5 pb-[60px] max-w-[1200px] mx-auto mb-10">
    <div className="grid grid-cols-[1fr_8px_1fr] gap-10 items-start max-lg:grid-cols-1">
      <div className="flex flex-col gap-[18px]">
        <h4 className="text-primary text-sm font-bold mb-1.5">MISSION</h4>

        {[1, 2, 3].map((i) => (
          <div key={`mission-${i}`} className="bg-transparent py-2">
            <p className="text-[15px] leading-[1.6] text-text-dark my-2.5 text-justify">
              To provide reliable, large-scale transport solutions that help
              Nepal's major businesses move faster, reduce delays, and
              strengthen their supply chain.
            </p>
            <div className="h-1 bg-gradient-to-r from-primary to-primary w-[50px] my-1.5" />
          </div>
        ))}
      </div>

      <div
        className="w-1 bg-gradient-to-b from-primary to-primary rounded self-stretch justify-self-center max-lg:hidden"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-[18px]">
        <h4 className="text-primary text-sm font-bold mb-1.5">VISION</h4>

        {[1, 2, 3].map((i) => (
          <div key={`vision-${i}`} className="bg-transparent py-2">
            <p className="text-[15px] leading-[1.6] text-text-dark my-2.5 text-justify">
              To become Nepal's most trusted heavy-load logistics partner by
              creating a modern, tech-enabled cargo network that supports
              nationwide growth.
            </p>
            <div className="h-1 bg-gradient-to-r from-primary to-primary w-[50px] my-1.5" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default DifferencesSection;
