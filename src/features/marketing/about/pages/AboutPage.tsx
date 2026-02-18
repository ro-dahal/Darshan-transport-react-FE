import React from 'react';
import {
  ABOUT_STATS,
  ABOUT_CLIENT_LOGOS,
  ABOUT_DESCRIPTION,
  ABOUT_FOUNDERS,
  ABOUT_CORE_VALUES,
  ABOUT_ASSETS,
} from '../data/aboutContent';
import { PageHeader } from '../components/PageHeader';
import { StorySection } from '../components/StorySection';
import { FounderSection } from '../components/FounderSection';
import { CoreValuesSection } from '../components/CoreValuesSection';
import { DifferencesSection } from '../components/DifferencesSection';
import { ClientsSection } from '../../home/components/ClientsSection';
import BusinessGrowthSection from '../components/BusinessGrowthSection';
import { CallToAction } from '../components/Calltoaction';

import { MetaTags } from '../../../../core/components/MetaTags';

const ABOUT_PAGE_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Darshan Transport',
  url: 'https://darshantransport.com/about',
  description:
    'Learn about Darshan Transport, our values, leadership, and nationwide delivery operations.',
  publisher: {
    '@type': 'Organization',
    name: 'Darshan Transport',
  },
};

export const AboutPage: React.FC = () => (
  <div className="about-page-wrapper">
    <MetaTags
      title="About Us | Darshan Transport"
      description="We keep it simple — clear communication, fair pricing, and on-time delivery. No hidden charges. No confusion."
      canonical="https://darshantransport.com/about"
      structuredData={ABOUT_PAGE_STRUCTURED_DATA}
    />
    <PageHeader />
    <div className="section-optimize">
      <StorySection
        description={ABOUT_DESCRIPTION}
        stats={ABOUT_STATS}
        animationSrc={ABOUT_ASSETS.animation}
      />
    </div>
    <div className="section-optimize">
      <DifferencesSection />
    </div>
    <div className="section-optimize">
      <CoreValuesSection values={ABOUT_CORE_VALUES} />
    </div>
    <div className="section-optimize">
      <FounderSection profiles={ABOUT_FOUNDERS} />
    </div>
    <div className="section-optimize">
      <BusinessGrowthSection />
    </div>
    <div className="section-optimize">
      <ClientsSection logos={ABOUT_CLIENT_LOGOS} />
    </div>
    <CallToAction />
  </div>
);
