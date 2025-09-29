import React from 'react';
import { SERVICES_HERO, SERVICES_STATS, SERVICES_CARDS } from '../data/servicesContent';
import { ServicesHero } from '../components/ServicesHero';
import { GrowthSection } from '../components/GrowthSection';
import { ServicesGrid } from '../components/ServicesGrid';

export const ServicesPage: React.FC = () => (
  <>
    <ServicesHero
      backgroundImage={SERVICES_HERO.backgroundImage}
      title={SERVICES_HERO.title}
      description={SERVICES_HERO.description}
    />
    <GrowthSection stats={SERVICES_STATS} />
    <ServicesGrid services={SERVICES_CARDS} />
  </>
);
