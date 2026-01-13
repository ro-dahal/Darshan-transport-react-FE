import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../../layout/components/Navbar';
import { Preloader } from '../../layout/components/Preloader';
import { ScrollToTop } from '../../layout/components/Scroll/ScrollToTop';
import { Footer } from '../../layout/components/Footer';
import WhatsAppFloat from '../../features/marketing/shared/components/WhatsAppFloat';

export const MainLayout: React.FC = () => (
  <>
    <ScrollToTop />
    <Preloader />
    <Navbar />
    <Outlet />
    <Footer />
    <WhatsAppFloat 
      phoneNumber="+9779847688471" 
      message="Hello! I'm interested in your transport services." 
    />
  </>
);
