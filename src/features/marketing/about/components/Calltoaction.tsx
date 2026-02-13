import React from 'react';

export const CallToAction: React.FC = () => (
  <section className="bg-primary py-9 px-4 flex justify-center items-center">
    <div className="flex flex-wrap items-center justify-between max-w-[1200px] w-full max-md:flex-col max-md:text-center max-md:gap-5">
      <h2 className="text-4xl max-md:text-[28px] max-sm:text-2xl font-black text-black m-0 leading-[1.2]">
        "Want to partner with us?"
      </h2>
      <a
        href="/contact"
        className="bg-white text-[#666] font-bold no-underline py-3.5 px-7 rounded-[10px] text-base transition-all duration-300 mt-3.5 hover:bg-[#e6e6e6] hover:text-black"
      >
        Talk to Leadership
      </a>
    </div>
  </section>
);
