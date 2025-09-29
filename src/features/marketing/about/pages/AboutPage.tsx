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
import { ClientsSection } from '../../home/components/ClientsSection';
import { ReachSection } from '../../shared/components/ReachSection';

export const AboutPage: React.FC = () => (
  <>
    <PageHeader />
    <StorySection description={ABOUT_DESCRIPTION} stats={ABOUT_STATS} animationSrc={ABOUT_ASSETS.animation} />
    <FounderSection profiles={ABOUT_FOUNDERS} />
    <ReachSection mapImage={ABOUT_ASSETS.nepalMap} />
    <ClientsSection logos={ABOUT_CLIENT_LOGOS} />
    <CoreValuesSection values={ABOUT_CORE_VALUES} />
  </>
);
