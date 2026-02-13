import React from 'react';

export interface GrowthSectionProps {
  stats: { value: string; label: string }[];
}

export const GrowthSection: React.FC<GrowthSectionProps> = ({ stats }) => (
  <section className="bg-[#757575] text-white py-12 px-0 text-center max-sm:py-8 max-sm:pb-6">
    <div className="mb-[68px]">
      <h4 className="text-primary text-2xl font-normal tracking-[1px] mb-2 m-0">Our Growth</h4>
      <h2 className="text-[30px] font-bold m-0 text-white">Driven by Results</h2>
      <div className="flex justify-center gap-[60px] max-md:flex-col max-md:gap-7 mt-8">
        {stats.map((stat) => (
          <div className="flex flex-col items-center" key={stat.label}>
            <div className="text-primary text-[2rem] font-bold mb-1">{stat.value}</div>
            <div className="text-white text-base font-normal opacity-90">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
