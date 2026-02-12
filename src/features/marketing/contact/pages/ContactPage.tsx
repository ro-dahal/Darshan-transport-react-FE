import React from 'react';
import { ContactIntro } from '../components/ContactIntro';
import { ContactForm } from '../components/ContactForm';
import { useContactDirectory } from '../hooks/useContactDirectory';
import { PageHeader } from '../components/PageHeader';
import { PageDesc } from '../components/PageDesc';
import { OfficeLocationsSection } from '../components/OfficeLocationsSection';
import { Seo } from '../../shared/components/Seo';

export const ContactPage: React.FC = () => {
  useContactDirectory();

  return (
    <section>
      <Seo
        title="Contact Us"
        description="Get in touch with Darshan Transport. We are here to help with all your logistics needs."
      />
      <PageHeader />
      <PageDesc />
    <section className="contact-section">
      <div className="contact-container">
        <ContactIntro />
        <ContactForm onSubmit={() => window.alert('Message sent! (Demo only)')} />
      </div>
    </section>
    <OfficeLocationsSection />
    </section>
  );
};
