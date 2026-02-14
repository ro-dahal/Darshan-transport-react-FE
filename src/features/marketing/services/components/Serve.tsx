import React from 'react';

const serveData = [
  {
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
        <path
          d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm-1 15-5-5 1.41-1.42L11 13.17l5.59-5.59L18 9Z"
          fill="#111"
        />
      </svg>
    ),
    label: 'FMCG',
  },
  {
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
        <path
          d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8Zm-1-13h2v6h-2Zm0 8h2v2h-2Z"
          fill="#111"
        />
      </svg>
    ),
    label: 'Pharma',
  },
  {
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
        <path
          d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm0 16H5V5h14ZM7 7h10v2H7Zm0 4h10v2H7Zm0 4h7v2H7Z"
          fill="#111"
        />
      </svg>
    ),
    label: 'Electronics',
  },
  {
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
        <path
          d="M16.24 11.51a6.5 6.5 0 1 0-8.48 0A7.5 7.5 0 0 0 12 21a7.5 7.5 0 0 0 4.24-9.49ZM12 19a5.5 5.5 0 0 1-4.47-8.74l.71-.71a4.5 4.5 0 0 1 7.52 0l.71.71A5.5 5.5 0 0 1 12 19Zm-1-7h2v2h-2Z"
          fill="#111"
        />
      </svg>
    ),
    label: 'E-Electronics',
  },
  {
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
        <path
          d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8Zm-1-13h2v6h-2Zm0 8h2v2h-2Z"
          fill="#111"
        />
      </svg>
    ),
    label: 'Retail & Wholesale',
  },
  {
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
        <path
          d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8Zm-1-13h2v6h-2Zm0 8h2v2h-2Z"
          fill="#111"
        />
      </svg>
    ),
    label: 'Manufacturing',
  },
];

const Serve: React.FC = () => (
  <section className="bg-white text-[#222] py-14 pb-12 text-center">
    <h2 className="text-[2rem] font-extrabold text-primary mb-10 tracking-[0.5px] max-sm:text-[1.2rem] max-sm:mb-4.5">
      INDUSTRIES WE SERVE
    </h2>
    <div className="grid grid-cols-3 gap-y-12 gap-x-[30px] justify-items-center items-center max-w-[1000px] mx-auto px-5 max-lg:grid-cols-2 max-lg:gap-y-8 max-lg:gap-x-[18px] max-sm:grid-cols-1">
      {serveData.map((item, idx) => (
        <div
          className="bg-primary text-[#111] rounded-md shadow-[6px_8px_0_0_#e0e0e0] flex flex-col items-start justify-start w-full max-w-[280px] h-[185px] p-7 pt-7 pb-[18px] relative transition-all duration-200 text-left hover:shadow-[10px_14px_0_0_#e0e0e0] hover:-translate-y-1 hover:scale-[1.03] max-sm:p-5"
          key={idx}
        >
          <div className="mb-[18px]">{item.icon}</div>
          <div className="text-[1.08rem] font-semibold text-white tracking-wide">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Serve;
