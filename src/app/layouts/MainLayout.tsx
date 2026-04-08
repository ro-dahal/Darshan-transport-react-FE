import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../../layout/components/Navbar';
import { Footer } from '../../layout/components/Footer';
import WhatsAppFloat from '../../features/marketing/shared/components/WhatsAppFloat';
import { CONTACT_CONFIG } from '../../core/config/contactConfig';
import { ImportantNoticePopup } from '../../core/components/ImportantNoticePopup';

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
    <WhatsAppFloat phoneNumber={CONTACT_CONFIG.whatsapp} />
    <ImportantNoticePopup />
  </div>
);
