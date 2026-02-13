import React from "react";
import NepalMap from "../../../../layout/components/MapOfNepal/map";

export const ReachSection: React.FC = () => (
  <section className="relative bg-text-medium text-white text-center py-20 px-5 pt-20 pb-[60px] overflow-hidden max-md:py-[60px] max-md:px-[15px]">
    <div className="absolute top-0 left-0 w-full leading-[0]">
      <svg viewBox="0 0 1440 150" preserveAspectRatio="none" className="block w-full h-20">
        <path
          d="M0,64 C360,160 1080,0 1440,96 L1440,0 L0,0 Z"
          fill="#ffffff"
        ></path>
      </svg>
    </div>
    <h2 className="text-[1.8rem] mb-10 text-white max-md:text-[1.5rem] max-sm:text-[1.3rem]">Our Reach</h2>
    <NepalMap style={{ maxWidth: "100%", margin: "0 auto" }} />
  </section>
);
