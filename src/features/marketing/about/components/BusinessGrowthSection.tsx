import React from 'react';

const growthStats = [
  { value: '10k', label: 'Warehousing Sq. ft' },
  { value: '5k', label: 'Delivery Partners' },
  { value: '2M', label: 'Orders Delivered' },
];

const BusinessGrowthSection: React.FC = () => {
  return (
    <section className="bg-[#757575] text-white pt-10 pb-[30px] text-center max-md:pt-8 max-md:pb-6">
      <div className="mb-[68px]">
        <span className="block text-primary text-[26px] font-normal tracking-[1px] mb-2">
          ABOUT GROWTH
        </span>
        <h2 className="text-[30px] font-bold m-0 text-white">
          Enablers for your business growth
        </h2>
      </div>
      <div className="flex justify-center gap-[60px] max-md:flex-col max-md:gap-7">
        {growthStats.map((stat, idx) => (
          <div className="flex flex-col items-center" key={idx}>
            <span className="text-primary text-[2rem] font-bold mb-1">
              {stat.value}
            </span>
            <span className="text-white text-base font-normal opacity-90">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BusinessGrowthSection;
