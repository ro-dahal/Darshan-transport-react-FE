import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../../layout/components/Navbar';
import { Footer } from '../../layout/components/Footer';
import WhatsAppFloat from '../../features/marketing/shared/components/WhatsAppFloat';

import { CONTACT_CONFIG } from '../../core/config/contactConfig';

export const MainLayout: React.FC = () => (
  <div className="app-container">
    <a
      href="#main-content"
      className="absolute -top-20 left-4 z-[2000] bg-primary text-black font-semibold px-4 py-2 rounded-md transition-all focus:top-4"
    >
      Skip to main content
    </a>
    <Navbar />
    <main id="main-content" className="main-content">
      <Outlet />
    </main>
    <Footer />
    {/* Global Floating WhatsApp Component */}
    <WhatsAppFloat
      phoneNumber={CONTACT_CONFIG.whatsapp}
      message="Hello Darshan Transport! I'd like to inquire about your services."
    />
  </div>
);
