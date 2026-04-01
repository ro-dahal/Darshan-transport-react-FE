import React from 'react';

export interface ServicesHeroProps {
  backgroundImage: string;
  mobileBackgroundImage: string;
  title: string;
  description: string;
}

export const ServicesHero: React.FC<ServicesHeroProps> = ({
  backgroundImage,
  mobileBackgroundImage,
  title,
  description,
}) => (
  <section className="relative isolate flex min-h-[calc(100svh-var(--head-height,68px))] items-stretch overflow-hidden bg-[#111111] text-white md:min-h-[50vh]">
    <div className="absolute inset-0">
      <picture className="block h-full w-full">
        <source media="(max-width: 767px)" srcSet={mobileBackgroundImage} />
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
      </picture>
      <div className="absolute inset-0 bg-black/50" />
    </div>
    <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-10 text-center max-md:py-8">
      <h1 className="max-w-[12ch] text-4xl font-bold leading-tight md:max-w-none md:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-[30ch] text-base leading-relaxed md:max-w-3xl md:text-xl">
        {description}
      </p>
      <a
        href="/contact"
        className="mt-8 inline-block rounded-lg bg-primary px-8 py-3 text-lg font-semibold text-white transition-all duration-300 hover:bg-white hover:text-primary hover:shadow-lg max-md:mt-6 max-md:px-7 max-md:py-3 max-md:text-base"
      >
        Contact Us
      </a>
    </div>
  </section>
);
