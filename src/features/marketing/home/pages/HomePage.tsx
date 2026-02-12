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
import { ReachSection } from '../components/ReachSection';
import { ClientsSection } from '../components/ClientsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { CallToActionSection } from '../components/CallToActionSection';
import OurServices from '../components/OurServices';
import MajorLocation from '../components/majorlocation';
import HowItWorks from '../components/HowItWorks';

import { Seo } from '../../shared/components/Seo';

export const HomePage: React.FC = () => (
  <>
    <Seo
      title="Home"
      description="Fast, safe and reliable transport for businesses and individuals across Nepal. Your goods move. You stay stress-free."
      structuredData={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Darshan Transport",
        "image": "https://darshantransport.com.np/LogoTab.png",
        "@id": "https://darshantransport.com.np",
        "url": "https://darshantransport.com.np",
        "telephone": "+9779809991233",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Gyaneshwor",
          "addressLocality": "Kathmandu",
          "addressRegion": "Bagmati",
          "postalCode": "44600",
          "addressCountry": "NP"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 27.7111,
          "longitude": 85.3333
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "00:00",
          "closes": "23:59"
        },
        "sameAs": [
          "https://www.facebook.com/people/Darshan-transport/100064806130243/",
          "https://www.instagram.com/darshantransportnp/",
          "https://www.linkedin.com/company/darshan-transport-np/"
        ]
      }}
    />
    <HeroSection description={HOME_HERO_DESCRIPTION} />
    <AboutSection
      description={HOME_ABOUT_DESCRIPTION}
      stats={HOME_STATS}
      animationSrc={HOME_ASSETS.heroAnimation}
    />
    <ReachSection />
    <ClientsSection logos={HOME_CLIENT_LOGOS} />
    <OurServices />
    <MajorLocation />
    <HowItWorks />
    <TestimonialsSection videos={HOME_VIDEO_TESTIMONIALS} reviews={HOME_REVIEW_TESTIMONIALS} />
    <CallToActionSection />
  </>
);
