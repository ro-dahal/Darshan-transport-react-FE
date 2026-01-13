import React from 'react';
import { ContactIntro } from '../components/ContactIntro';
import { ContactForm } from '../components/ContactForm';
import { useContactDirectory } from '../hooks/useContactDirectory';
import { PageHeader } from '../components/pageheader';
import { Pagedesc } from '../components/pagedesc';
import { OfficeLocationsSection } from '../components/OfficeLocationsSection';
export const ContactPage: React.FC = () => {
  const { 
  } = useContactDirectory();

  return (
    <section>
      <PageHeader />
      <Pagedesc />
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
