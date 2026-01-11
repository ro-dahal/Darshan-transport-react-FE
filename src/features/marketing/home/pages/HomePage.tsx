import React from 'react';
import {
  HOME_ASSETS,
  HOME_STATS,
  HOME_CLIENT_LOGOS,
  HOME_VIDEO_TESTIMONIALS,
  HOME_REVIEW_TESTIMONIALS,
  HOME_HERO_DESCRIPTION,
  HOME_ABOUT_DESCRIPTION,
} from '../data/homeContent';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
// import { ReachSection } from '../components/ReachSection';
import { ClientsSection } from '../components/ClientsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { CallToActionSection } from '../components/CallToActionSection';
import OurServices from '../components/OurServices';

export const HomePage: React.FC = () => (
  <>
    <HeroSection description={HOME_HERO_DESCRIPTION} />
    <AboutSection
      description={HOME_ABOUT_DESCRIPTION}
      stats={HOME_STATS}
      animationSrc={HOME_ASSETS.heroAnimation}
    />
    {/* <ReachSection mapImage={HOME_ASSETS.nepalMap} /> */}
    <ClientsSection logos={HOME_CLIENT_LOGOS} />
    <OurServices />
    <TestimonialsSection videos={HOME_VIDEO_TESTIMONIALS} reviews={HOME_REVIEW_TESTIMONIALS} />
    <CallToActionSection />
  </>
);
