import React from 'react';
import type { StatItem } from '../data/aboutContent';

export interface StorySectionProps {
  description: string[];
  stats: StatItem[];
  animationSrc: string;
}

export const StorySection: React.FC<StorySectionProps> = ({
  description,
  animationSrc,
}) => (
  <section className="flex flex-col py-[60px] px-5 max-lg:py-10 max-lg:px-[30px] max-md:py-[30px] max-md:px-[15px]">
    <div className="flex-[1_1_500px] px-25 max-xl:px-16 max-lg:px-10 max-md:px-5 max-sm:px-3">
      <h2 className="text-[32px] font-bold text-[#2c3e50] mb-3 max-md:text-[26px]">
        About Darshan Transport
      </h2>
      <p className="text-base leading-[1.6] text-gray-600 mb-12 max-w-[700px]">
        A transport and logistics company in Nepal focused on bulk cargo,
        business logistics, and reliable delivery across major routes.
      </p>

      <h4 className="text-primary text-sm mb-2.5">WHO WE ARE</h4>
      <h3 className="text-[24px] font-bold text-[#2c3e50] mb-[50px] max-md:text-[20px]">
        Reliable bulk cargo transport across Nepal
      </h3>
      <div className="grid grid-cols-[1.2fr_0.8fr] items-center gap-10 mb-10 max-lg:grid-cols-1 max-lg:gap-[30px] max-md:gap-5 [&>*]:min-w-0">
        <div className="text-justify text-base leading-[1.6] mb-10">
          {description.map((para, i) => (
            <p key={i} className="mb-[2.2em]">
              {para}
            </p>
          ))}
        </div>
        <img
          className="w-full max-w-[520px] rounded-lg object-contain mx-auto max-md:max-w-full"
          src={animationSrc}
          alt="Our operations animated"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="mt-10 mb-10">
        <h4 className="text-primary text-sm mb-2.5">WHAT WE DO</h4>
        <p className="text-justify text-base leading-[1.6] mb-6">
          We provide transport and logistics services for businesses that
          require regular, large-scale, or organized cargo movement. Our
          operations are built to handle bulk goods, support distribution
          networks, and improve delivery coordination across Nepal.
        </p>
      </div>

      <div className="mb-10">
        <h4 className="text-primary text-sm mb-2.5">
          OUR APPROACH TO LOGISTICS
        </h4>
        <p className="text-justify text-base leading-[1.6] mb-4">
          We focus on practical logistics solutions that support business
          operations. Our approach is based on clear planning, efficient
          transport coordination, and reliable delivery performance.
        </p>
        <p className="text-justify text-base leading-[1.6]">
          Instead of one-time delivery services, we support businesses with
          structured transport systems that can handle ongoing cargo movement.
        </p>
      </div>
    </div>
  </section>
);
