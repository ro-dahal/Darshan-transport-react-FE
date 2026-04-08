import React from 'react';
import {
  ABOUT_CLIENT_LOGOS,
  ABOUT_DESCRIPTION,
  ABOUT_FOUNDERS,
  ABOUT_CORE_VALUES,
  ABOUT_ASSETS,
} from '../data/aboutContent';
import { HeroSectionV2 } from '../components/v2/HeroSectionV2';
import { StorySectionV2 } from '../components/v2/StorySectionV2';
import { MissionVisionV2 } from '../components/v2/MissionVisionV2';
import { CoreValuesSectionV2 } from '../components/v2/CoreValuesSectionV2';
import { FounderSectionV2 } from '../components/v2/FounderSectionV2';
import { StatsBannerV2 } from '../components/v2/StatsBannerV2';
import { ClientsSectionV2 } from '../components/v2/ClientsSectionV2';
import { CtaSectionV2 } from '../components/v2/CtaSectionV2';
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

export const AboutPageV2: React.FC = () => {
  return (
    <div className="about-v2">
      <MetaTags
        title="About Darshan Transport | Logistics & Transport Company in Nepal"
        description="Learn about Darshan Transport, a Nepal-based logistics company offering bulk cargo transport, full-truck shipments, warehousing, and distribution support for businesses."
        canonical="https://darshantransport.com/about"
        structuredData={ABOUT_PAGE_STRUCTURED_DATA}
      />
      <HeroSectionV2 />
      <StorySectionV2
        description={ABOUT_DESCRIPTION}
        animationSrc={ABOUT_ASSETS.animation}
      />
      <MissionVisionV2 />
      <CoreValuesSectionV2 values={ABOUT_CORE_VALUES} />
      <FounderSectionV2 profiles={ABOUT_FOUNDERS} />
      <StatsBannerV2 />
      <ClientsSectionV2 logos={ABOUT_CLIENT_LOGOS} />
      <CtaSectionV2 />
    </div>
  );
};
