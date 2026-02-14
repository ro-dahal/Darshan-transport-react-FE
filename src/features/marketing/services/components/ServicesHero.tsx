import React from 'react';

export interface ServicesHeroProps {
  backgroundImage: string;
  title: string;
  description: string;
}

export const ServicesHero: React.FC<ServicesHeroProps> = ({
  backgroundImage,
  title,
  description,
}) => (
  <section
    className="relative h-[60vh] md:h-[50vh] flex items-center justify-center bg-cover bg-center text-white text-center px-4"
    style={{
      backgroundImage: `url(${backgroundImage})`,
    }}
  >
    <div className="absolute inset-0 bg-black/50 z-0"></div>
    <div className="relative z-10 max-w-3xl animate-[fadeIn_0.5s_ease-out]">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
      <p className="text-lg md:text-xl mb-6">{description}</p>
      <a
        href="/contact"
        className="bg-primary text-white py-3 px-8 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-primary hover:shadow-lg inline-block mt-6"
      >
        Contact Us
      </a>
    </div>
  </section>
);
