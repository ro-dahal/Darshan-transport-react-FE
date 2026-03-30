import React from 'react';
import parcelCourierDeliveryIcon from '../../../../assets/img/Parcel & Courier Delivery.png';

const serveData = [
  {
    icon: parcelCourierDeliveryIcon,
    label: 'FMCG',
  },
  {
    icon: parcelCourierDeliveryIcon,
    label: 'Pharma',
  },
  {
    icon: parcelCourierDeliveryIcon,
    label: 'Electronics',
  },
  {
    icon: parcelCourierDeliveryIcon,
    label: 'E-Electronics',
  },
  {
    icon: parcelCourierDeliveryIcon,
    label: 'Retail & Wholesale',
  },
  {
    icon: parcelCourierDeliveryIcon,
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
          <div className="mb-[18px]">
            <img
              src={item.icon}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="w-10 h-10 object-contain"
            />
          </div>
          <div className="text-[1.08rem] font-semibold text-white tracking-wide">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Serve;
