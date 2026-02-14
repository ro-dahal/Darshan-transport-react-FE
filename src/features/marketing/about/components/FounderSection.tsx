import React from 'react';
import type { FounderProfile } from '../data/aboutContent';

export interface FounderSectionProps {
  profiles: FounderProfile[];
}

export const FounderSection: React.FC<FounderSectionProps> = ({ profiles }) => (
  <>
    {profiles.map((profile, index) => {
      const isEven = index % 2 === 0;
      return (
        <section
          key={profile.signatureLabel}
          className="bg-[#f2f2f2] py-[60px] px-5 max-md:py-10 max-md:px-[15px]"
        >
          <div className="max-w-[1200px] mx-auto">
            <div
              className={`flex flex-col gap-12 items-center lg:items-start ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
            >
              {/* Text Column */}
              <div className="flex-1 order-2 lg:order-1 self-center">
                <h2 className="text-[2.5rem] font-bold text-black mb-6 text-center lg:text-left max-lg:text-[2rem] max-md:text-[1.8rem] max-sm:text-[1.5rem]">
                  {profile.role}
                </h2>
                <p className="text-base leading-[1.8] text-text-dark mb-[30px] text-justify">
                  {profile.quote}
                </p>
                <div className="mt-8 text-center lg:text-left">
                  <p className="text-gray-400 mb-2 tracking-widest">
                    .................................................................
                  </p>
                  <h4 className="text-[1.1rem] font-bold text-black">
                    {profile.signatureLabel}
                  </h4>
                  <span className="text-sm text-gray-600 block mt-1">
                    (
                    {profile.role.includes('Co-founder')
                      ? 'Co-founder'
                      : profile.role}
                    )
                  </span>
                </div>
              </div>

              {/* Image Column */}
              <div
                className={`flex-1 order-1 lg:order-2 flex justify-center ${isEven ? 'lg:justify-end' : 'lg:justify-start'}`}
              >
                <img
                  src={profile.image}
                  alt={`${profile.signatureLabel} portrait`}
                  className="w-full max-w-[450px] shadow-[0_4px_12px_rgba(0,0,0,0.15)] border-4 border-white rounded-sm"
                />
              </div>
            </div>
          </div>
        </section>
      );
    })}
  </>
);
