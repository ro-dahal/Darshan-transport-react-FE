import React from 'react';
import { Link } from 'react-router-dom';

export const CallToActionSection: React.FC = () => (
  <section className="bg-primary py-9 px-4 flex justify-center items-center">
    <div className="flex flex-wrap items-center justify-between max-w-[1200px] w-full max-md:flex-col max-md:text-center max-md:gap-5">
      <h2 className="text-4xl max-md:text-[28px] max-sm:text-2xl font-black text-black m-0 leading-[1.2]">
        Ready to send your Goods?
        <br />
        We'll handle the heavy lifting.
      </h2>
      <Link
        to="/contact"
        className="bg-white text-[#666] font-bold no-underline py-3.5 px-7 rounded-[10px] text-base transition-all duration-300 mt-3.5 hover:bg-[#e6e6e6] hover:text-black max-md:mt-[30px] max-sm:py-3 max-sm:px-[25px] max-sm:text-sm max-sm:min-h-[44px]"
      >
        Book a Delivery
      </Link>
      <Link
        to="/order"
        className="bg-white text-[#666] font-bold no-underline py-3.5 px-7 rounded-[10px] text-base transition-all duration-300 mt-3.5 hover:bg-[#e6e6e6] hover:text-black max-md:mt-[30px] max-sm:py-3 max-sm:px-[25px] max-sm:text-sm max-sm:min-h-[44px]"
      >
        Track Your Shipment
      </Link>
    </div>
  </section>
);
