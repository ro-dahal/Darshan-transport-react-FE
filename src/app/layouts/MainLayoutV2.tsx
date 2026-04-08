import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavbarV2 } from '../../layout/components/NavbarV2';
import { FooterV2 } from '../../layout/components/FooterV2';
import WhatsAppFloat from '../../features/marketing/shared/components/WhatsAppFloat';
import { VersionSwitcher } from '../../features/marketing/shared/components/VersionSwitcher';
import { CONTACT_CONFIG } from '../../core/config/contactConfig';
import { ImportantNoticePopup } from '../../core/components/ImportantNoticePopup';

export const MainLayoutV2: React.FC = () => (
  <div className="app-container">
    <a
      href="#main-content"
      className="absolute -top-20 left-4 z-[2000] bg-primary text-black font-semibold px-4 py-2 rounded-md transition-all focus:top-4"
    >
      Skip to main content
    </a>
    <NavbarV2 />
    <main id="main-content" className="main-content">
      <Outlet />
    </main>
    <FooterV2 />
    <WhatsAppFloat phoneNumber={CONTACT_CONFIG.whatsapp} />
    <VersionSwitcher />
    <ImportantNoticePopup />
  </div>
);
