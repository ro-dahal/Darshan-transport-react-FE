import React from 'react';
import { OUR_SERVICES_DATA } from '../data/homeContent';

export const OurServices: React.FC = () => (
  <section className="py-14 bg-[#f0f0f0] px-4 md:px-0">
    <div className="max-w-[1100px] mx-auto px-4 md:px-5">
      <h2 className="text-center text-primary tracking-[1px] font-light text-[25px] leading-[1.2] mb-1.5">OUR SERVICES</h2>
      <h3 className="text-center text-primary mb-9 text-[25px] font-bold">WE MOVE EVERYTHING THAT MATTERS.</h3>

      <div className="grid grid-cols-2 gap-x-10 gap-y-9 max-md:grid-cols-1 max-md:px-2">
        {OUR_SERVICES_DATA.map((s) => (
          <article className="flex gap-[18px] items-start bg-white p-5 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-default" key={s.title}>
            <span className="flex-shrink-0" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-primary">
                <rect x="1" y="4" width="14" height="11" rx="1.5" />
                <path d="M15 8h4l3 3v4" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="6.5" cy="17.5" r="1.5" />
                <circle cx="18.5" cy="17.5" r="1.5" />
              </svg>
            </span>
            <div>
              <h4 className="m-0 mb-1.5 text-base font-bold text-black">{s.title}</h4>
              <p className="m-0 text-[#666] text-[13px]">{s.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default OurServices;
