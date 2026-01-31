import React, { useEffect, useRef } from 'react';
import { SERVICES_HERO, SERVICES_STATS, SERVICES_CARDS } from '../data/servicesContent';
import { ServicesHero } from '../components/ServicesHero';
import { GrowthSection } from '../components/GrowthSection';
import { ServicesGrid } from '../components/ServicesGrid';
import Benifits from '../components/Benifits';
import Process from '../components/Process';
import Services from '../components/Services';
import Serve from '../components/Serve';
import { useLocation } from 'react-router-dom';
import { ReachSection } from '../components/ReachSection';
import { HOME_ASSETS } from '../../home/data/homeContent';
import CtaSection from '../components/Cta';


export const ServicesPage: React.FC = () => {
  const location = useLocation();
  const servicesRef = useRef<HTMLDivElement>(null);

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
    <>
      <ServicesHero
        backgroundImage={SERVICES_HERO.backgroundImage}
        title={SERVICES_HERO.title}
        description={SERVICES_HERO.description}
      />
      <GrowthSection stats={SERVICES_STATS} />
      <ServicesGrid services={SERVICES_CARDS} />
      <Benifits />
      <Process />
      <div ref={servicesRef}>
        <Services />
      </div>
      <ReachSection />
      <Serve />
      <CtaSection />
    </>
  );
};
