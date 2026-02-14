import React from 'react';
import NepalMap from '../../../../layout/components/MapOfNepal/map';

export const ReachSection: React.FC = () => (
  <section className="relative bg-[#eee] text-white text-center py-20 px-5 pt-20 pb-[60px] overflow-hidden max-md:py-[60px] max-md:px-[15px]">
    <h2 className="text-[1.8rem] mb-10 text-primary font-bold max-md:text-[1.5rem] max-sm:text-[1.3rem]">
      Our Reach
    </h2>
    <div className="max-w-[1000px] mx-auto">
      <NepalMap style={{ maxWidth: '100%', margin: '0 auto' }} />
    </div>
  </section>
);
