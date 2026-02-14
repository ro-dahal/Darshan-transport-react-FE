import React from 'react';
import type { CoreValueItem } from '../data/aboutContent';

export interface CoreValuesSectionProps {
  values: CoreValueItem[];
}

import infoImg from '../../../../../src/assets/img/optimized/infog.webp';

export const CoreValuesSection: React.FC<CoreValuesSectionProps> = ({
  values,
}) => (
  <section className="bg-bg-light py-20 px-5 flex flex-col items-center">
    <div className="text-center mt-8 mb-[50px]">
      <h2 className="text-[#414042] text-[2.1rem] font-extrabold m-0">
        Why Choose Us
      </h2>
    </div>
    <div className="grid grid-cols-2 gap-x-[60px] gap-y-10 max-w-[1100px] mx-auto px-6 max-lg:grid-cols-1 max-lg:gap-7">
      {values.map((value, index) => {
        const isLastOdd =
          index === values.length - 1 && values.length % 2 !== 0;
        return (
          <div
            key={value.title}
            className={`flex items-start gap-7 bg-white rounded-[14px] shadow-[0_2px_12px_0_rgba(0,0,0,0.06)] py-7 px-6 min-h-[140px] transition-all duration-200 hover:shadow-[0_6px_24px_0_rgba(252,175,23,0.13)] hover:-translate-y-1 hover:scale-[1.01] max-sm:flex-col max-sm:items-start max-sm:py-[18px] max-sm:px-2.5 max-sm:gap-3 ${
              isLastOdd
                ? 'lg:col-span-2 lg:justify-self-center lg:w-full lg:max-w-[calc(50%-30px)]'
                : ''
            }`}
          >
            <div className="flex-[0_0_72px] flex items-center justify-center max-sm:w-14 max-sm:h-14 max-sm:mb-0">
              <span className="flex items-center justify-center w-[72px] h-[72px] bg-bg-icon rounded-2xl text-[2.7rem] text-secondary max-sm:w-14 max-sm:h-14 max-sm:text-[2rem] max-sm:rounded-[10px]">
                {value.icon}
              </span>
            </div>
            <div className="flex-[1_1_auto] flex flex-col justify-center">
              <h3 className="text-[1.18rem] font-bold mb-2 text-[#1a1a1a] m-0">
                {value.title}
              </h3>
              <p className="text-base text-[#444] m-0 leading-[1.6]">
                {value.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
    <div className="flex justify-center mt-[100px]">
      <img src={infoImg} alt="Info" className="max-w-[1080px] w-full h-auto" />
    </div>
  </section>
);
