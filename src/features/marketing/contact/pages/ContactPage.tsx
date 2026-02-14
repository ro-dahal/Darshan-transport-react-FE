import React from 'react';
import { ContactIntro } from '../components/ContactIntro';
import { ContactForm } from '../components/ContactForm';
import { useContactDirectory } from '../hooks/useContactDirectory';
import { PageHeader } from '../components/PageHeader';
import { PageDesc } from '../components/PageDesc';
import { OfficeLocationsSection } from '../components/OfficeLocationsSection';
import { MetaTags } from '../../../../core/components/MetaTags';

export const ContactPage: React.FC = () => {
  useContactDirectory();

  return (
    <section>
      <MetaTags
        title="Contact Us | Darshan Transport"
        description="Get in touch with Darshan Transport. We are here to help with all your logistics needs. Find our office locations across Nepal."
      />
      <PageHeader />
      <PageDesc />
      <section className="py-16 bg-[#fafafa]">
        <div className="max-w-4xl mx-auto px-5 flex flex-col gap-12">
          <ContactIntro />
          <ContactForm
            onSubmit={() => window.alert('Message sent! (Demo only)')}
          />
        </div>
      </section>
      <OfficeLocationsSection />
    </section>
  );
};
