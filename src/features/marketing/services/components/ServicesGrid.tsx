import React from 'react';
import type { ServiceCard } from '../data/servicesContent';

export interface ServicesGridProps {
  services: ServiceCard[];
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ services }) => (
  <section className="py-16 px-5 bg-bg-light">
    <div className="max-w-[1200px] mx-auto text-center">
      <div className="text-primary text-lg font-semibold mb-2">Who We Serve</div>
      <div className="text-3xl font-bold text-text-dark mb-10">We work with:</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100"
            key={service.label}
          >
            <div className="w-16 h-16 bg-bg-icon rounded-full flex items-center justify-center mb-6 text-primary text-3xl">
              {service.iconType === 'image' ? (
                <img
                  src={service.icon}
                  alt={`${service.label} icon`}
                  className="w-9 h-auto"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                service.icon
              )}
            </div>
            <h4 className="text-xl font-bold text-text-dark mb-0">{service.label}</h4>
            {/* <p className="text-text-medium mt-4 text-sm leading-relaxed">{service.description}</p> */}
          </div>
        ))}
      </div>
    </div>
  </section>
);
