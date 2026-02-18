import React from 'react';
import {
  HOME_STATS,
  HOME_CLIENT_LOGOS,
  HOME_REVIEW_TESTIMONIALS,
  HOME_HERO_DESCRIPTION,
  HOME_ABOUT_DESCRIPTION,
  HOME_ASSETS,
} from '../data/homeContent';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ReachSection } from '../components/ReachSection';
import { ClientsSection } from '../components/ClientsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { CallToActionSection } from '../components/CallToActionSection';
import OurServices from '../components/OurServices';
import MajorLocation from '../components/majorlocation';
import HowItWorks from '../components/HowItWorks';
import { MetaTags } from '../../../../core/components/MetaTags';

const HOME_PAGE_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Darshan Transport',
  url: 'https://darshantransport.com',
  logo: 'https://darshantransport.com/LogoTab.png',
  description:
    'Fast, safe and reliable transport for businesses and individuals across Nepal.',
  areaServed: 'NP',
};

export const HomePage: React.FC = () => (
  <div className="flex flex-col min-h-screen">
    <MetaTags
      title="Darshan Transport | Logistics & Supply Chain Nepal"
      description="Fast, safe and reliable transport for businesses and individuals across Nepal. Your goods move. You stay stress-free."
      canonical="https://darshantransport.com/"
      structuredData={HOME_PAGE_STRUCTURED_DATA}
    />
    <HeroSection description={HOME_HERO_DESCRIPTION} />
    <div className="section-optimize">
      <AboutSection
        description={HOME_ABOUT_DESCRIPTION}
        stats={HOME_STATS}
        animationSrc={HOME_ASSETS.heroAnimation}
      />
    </div>
    <div className="section-optimize">
      <ReachSection />
    </div>
    <div className="section-optimize">
      <ClientsSection logos={HOME_CLIENT_LOGOS} />
    </div>
    <OurServices />
    <MajorLocation />
    <HowItWorks />
    <div className="section-optimize">
      <TestimonialsSection reviews={HOME_REVIEW_TESTIMONIALS} />
    </div>
    <CallToActionSection />
  </div>
);
