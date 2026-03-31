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
import { FAQSection } from '../components/FAQSection';
import { MetaTags } from '../../../../core/components/MetaTags';

const HOME_PAGE_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Darshan Transport',
  url: 'https://darshantransport.com',
  logo: 'https://darshantransport.com/LogoTab.png',
  description:
    'Darshan Transport provides bulk cargo transport, full-truck shipments, warehousing, and logistics services across Nepal for businesses that need reliable delivery support.',
  areaServed: 'NP',
};

export const HomePage: React.FC = () => (
  <div className="flex flex-col min-h-screen">
    <MetaTags
      title="Transport & Logistics Company in Nepal | Bulk Cargo & 3PL | Darshan Transport"
      description="Darshan Transport provides bulk cargo transport, full-truck shipments, warehousing, and logistics services across Nepal for businesses that need reliable delivery support."
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
    <FAQSection />
    <CallToActionSection />
  </div>
);
