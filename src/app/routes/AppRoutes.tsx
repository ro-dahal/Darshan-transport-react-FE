import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { HomePage } from '../../features/marketing/home/pages/HomePage';
import { AboutPage } from '../../features/marketing/about/pages/AboutPage';
import { ServicesPage } from '../../features/marketing/services/pages/ServicesPage';
import { ContactPage } from '../../features/marketing/contact/pages/ContactPage';
import { GetQuotePage } from '../../features/marketing/get-quote/pages/GetQuotePage';
import { OrderTrackingPage } from '../../features/order-tracking/pages/OrderTrackingPage';

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/order" element={<OrderTrackingPage />} />
      <Route path="/get-quote" element={<GetQuotePage />} />
    </Route>
  </Routes>
);
