import React from 'react';
import {
  ABOUT_CLIENT_LOGOS,
  ABOUT_DESCRIPTION,
  ABOUT_FOUNDERS,
  ABOUT_CORE_VALUES,
  ABOUT_ASSETS,
} from '../data/aboutContent';
import { HeroSection } from '../components/HeroSection';
import { StorySection } from '../components/StorySection';
import { MissionVision } from '../components/MissionVision';
import { CoreValuesSection } from '../components/CoreValuesSection';
import { FounderSection } from '../components/FounderSection';
import { StatsBanner } from '../components/StatsBanner';
import { ClientsSection } from '../components/ClientsSection';
import { CtaSection } from '../components/CtaSection';
import { MetaTags } from '../../../../core/components/MetaTags';

const ABOUT_PAGE_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Darshan Transport',
  url: 'https://darshantransport.com/about',
  description:
    'Learn about Darshan Transport, a Nepal-based logistics company offering bulk cargo transport, full-truck shipments, warehousing, and distribution support for businesses.',
  publisher: {
    '@type': 'Organization',
    name: 'Darshan Transport',
  },
};

export const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <MetaTags
        title="About Darshan Transport | Logistics & Transport Company in Nepal"
        description="Learn about Darshan Transport, a Nepal-based logistics company offering bulk cargo transport, full-truck shipments, warehousing, and distribution support for businesses."
        canonical="https://darshantransport.com/about"
        structuredData={ABOUT_PAGE_STRUCTURED_DATA}
      />
      <HeroSection />
      <StorySection
        description={ABOUT_DESCRIPTION}
        animationSrc={ABOUT_ASSETS.animation}
      />
      <MissionVision />
      <CoreValuesSection values={ABOUT_CORE_VALUES} />
      <FounderSection profiles={ABOUT_FOUNDERS} />
      <StatsBanner />
      <ClientsSection logos={ABOUT_CLIENT_LOGOS} />
      <CtaSection />
    </div>
  );
};
