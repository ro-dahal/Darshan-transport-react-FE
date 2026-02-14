import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../../layout/components/Navbar';
import { Footer } from '../../layout/components/Footer';
import WhatsAppFloat from '../../features/marketing/shared/components/WhatsAppFloat';

import { CONTACT_CONFIG } from '../../core/config/contactConfig';

export const MainLayout: React.FC = () => (
  <div className="app-container">
    <Navbar />
    <main className="main-content">
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
