import React from 'react';
import type { StatItem } from '../data/homeContent';
import fastPickupDeliveryIcon from '../../../../assets/img/Fast_Pickup__Delivery.png';
import liveTrackingIcon from '../../../../assets/img/live_tracking.png';
import professionalHandlingIcon from '../../../../assets/img/professional_handelling.png';
import supportIcon from '../../../../assets/img/support.png';

export interface AboutSectionProps {
  description: string;
  stats: StatItem[];
  animationSrc: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  description,
  animationSrc,
}) => (
  <section className="flex flex-col py-[60px] px-5 max-lg:py-10 max-lg:px-[30px] max-md:py-[30px] max-md:px-[15px]">
    <div className="flex-[1_1_500px] px-25">
      <h1 className="text-[28px] font-bold text-[#2c3e50] mb-[50px] text-primary">
        Your Cargo Deserves Care
      </h1>
      <div className="grid grid-cols-[1.2fr_0.8fr] items-center gap-10 mb-10 max-lg:grid-cols-1 max-lg:gap-[30px] max-md:gap-5 [&>*]:min-w-0">
        <p className="text-justify text-base leading-[1.6] mb-10">
          {description}
        </p>
        <img
          className="w-full max-w-[520px] rounded-lg object-contain mx-auto max-md:max-w-full"
          src={animationSrc}
          alt="Our operations animated"
          loading="lazy"
          decoding="async"
        />
      </div>
      <h3 className="text-[28px] font-bold text-[#2c3e50] mb-[50px] text-center max-lg:text-4xl max-md:text-[28px] max-sm:text-2xl">
        Why People Choose Us
      </h3>
      <ul className="list-none p-0 mt-6 flex gap-6 justify-between flex-wrap items-start max-lg:justify-center max-lg:gap-x-5 max-lg:gap-y-[30px]">
        {[
          {
            iconSrc: fastPickupDeliveryIcon,
            text: 'Fast Pickup & Delivery',
          },
          {
            iconSrc: liveTrackingIcon,
            text: 'Live Tracking',
          },
          {
            iconSrc: professionalHandlingIcon,
            text: 'Professional Handling',
          },
          {
            iconSrc: supportIcon,
            text: 'Support When You Need It',
          },
        ].map((feature) => (
          <li
            key={feature.text}
            className="flex flex-col items-center gap-2 flex-[1_1_22%] max-w-[220px] text-center max-lg:flex-[1_1_40%] max-lg:max-w-[180px]"
          >
            <span className="w-16 h-16 flex items-center justify-center">
              <img
                className="w-16 h-16 object-contain"
                src={feature.iconSrc}
                alt=""
                loading="lazy"
                decoding="async"
                aria-hidden="true"
              />
            </span>
            <span className="text-sm font-semibold text-text-dark">
              {feature.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
