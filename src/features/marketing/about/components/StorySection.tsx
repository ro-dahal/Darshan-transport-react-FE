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
  <section className="py-[60px] px-5 max-lg:py-10 max-lg:px-[30px] max-md:py-[30px] max-md:px-[15px]">
    <div className="mx-auto max-w-[1180px]">
      <div className="max-w-[760px]">
        <span className="text-primary text-sm font-bold tracking-[0.18em] uppercase">
          About Darshan Transport
        </span>
        <h2 className="mt-3 text-[32px] font-bold leading-[1.2] text-[#2c3e50] max-md:text-[26px]">
          A logistics partner built for dependable cargo movement across Nepal
        </h2>
        <p className="mt-5 max-w-[680px] text-[1.02rem] leading-[1.8] text-gray-600">
          We support business logistics with structured transport operations,
          bulk cargo expertise, and reliable delivery coordination across major
          commercial routes.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] items-start gap-12 max-lg:grid-cols-1 max-lg:gap-8">
        <div className="min-w-0">
          <span className="text-primary text-sm font-bold tracking-[0.18em] uppercase">
            Who We Are
          </span>
          <h3 className="mt-3 max-w-[14ch] text-[26px] font-bold leading-[1.25] text-[#2c3e50] max-md:text-[21px]">
            Reliable bulk cargo transport across Nepal
          </h3>
          <div className="mt-8 max-w-[680px] space-y-6 text-base leading-[1.9] text-text-medium">
            {description.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <img
            className="w-full max-w-[520px] object-contain"
            src={animationSrc}
            alt="Our operations animated"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div className="mt-14 border-t border-border-light pt-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0">
            <h4 className="text-primary text-sm font-bold tracking-[0.18em] uppercase">
              What We Do
            </h4>
            <p className="mt-4 max-w-[540px] text-base leading-[1.85] text-text-medium">
              We provide transport and logistics services for businesses that
              require regular, large-scale, or organized cargo movement. Our
              operations are built to handle bulk goods, support distribution
              networks, and improve delivery coordination across Nepal.
            </p>
          </div>

          <div className="min-w-0">
            <h4 className="text-primary text-sm font-bold tracking-[0.18em] uppercase">
              Our Approach to Logistics
            </h4>
            <div className="mt-4 max-w-[560px] space-y-4 text-base leading-[1.85] text-text-medium">
              <p>
                We focus on practical logistics solutions that support business
                operations. Our approach is based on clear planning, efficient
                transport coordination, and reliable delivery performance.
              </p>
              <p>
                Instead of one-time delivery services, we support businesses
                with structured transport systems that can handle ongoing cargo
                movement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
