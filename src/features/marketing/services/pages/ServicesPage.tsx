import React, { useEffect } from 'react';
import {
  SERVICES_HERO,
  SERVICES_STATS,
  SERVICES_CARDS,
} from '../data/servicesContent';
import { ServicesHero } from '../components/ServicesHero';
import { GrowthSection } from '../components/GrowthSection';
import { ServicesGrid } from '../components/ServicesGrid';
import Benefits from '../components/Benefits';
import Process from '../components/Process';
import { MetaTags } from '../../../../core/components/MetaTags';
import Services from '../components/Services';
import Serve from '../components/Serve';
import { useLocation } from 'react-router-dom';
import { ReachSection } from '../components/ReachSection';
// ...existing code...
import CtaSection from '../components/Cta';

export const ServicesPage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add('services-page');
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const anchor = hash.replace('#', '');
        // Try to find the anchor in the whole page
        setTimeout(() => {
          const el = document.getElementById(anchor);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 200);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      document.body.classList.remove('services-page');
    };
  }, [location.hash]);

  return (
    <div className="services-page-wrapper">
      <MetaTags
        title="Our Services | Darshan Transport Nepal"
        description="Warehousing, Distribution, 3PL, Packaging & Handling, and Fleet Services across Nepal. Your goods move. You stay stress-free."
      />
      <ServicesHero
        backgroundImage={SERVICES_HERO.backgroundImage}
        title={SERVICES_HERO.title}
        description={SERVICES_HERO.description}
      />
      <GrowthSection stats={SERVICES_STATS} />
      <ServicesGrid services={SERVICES_CARDS} />
      <Benefits />
      <Process />
      <Services />
      <ReachSection />
      <Serve />
      <CtaSection />
    </div>
  );
};
