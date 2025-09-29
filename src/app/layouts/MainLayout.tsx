import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../../layout/components/Navbar';
import { Preloader } from '../../layout/components/Preloader';
import { ScrollToTop } from '../../layout/components/Scroll/ScrollToTop';
import { Footer } from '../../layout/components/Footer';

export const MainLayout: React.FC = () => (
  <>
    <ScrollToTop />
    <Preloader />
    <Navbar />
    <Outlet />
    <Footer />
  </>
);
