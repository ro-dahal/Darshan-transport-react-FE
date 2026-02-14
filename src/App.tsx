import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProviders } from './app/providers/AppProviders';
import { AppRoutes } from './app/routes/AppRoutes';
import { ScrollToTop } from './core/components/ScrollToTop';
import { Preloader } from './layout/components/Preloader';
import { TransitionProvider } from './core/contexts/TransitionContext';

const App: React.FC = () => (
  <BrowserRouter>
    <TransitionProvider>
      <ScrollToTop />
      <Preloader />
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </TransitionProvider>
  </BrowserRouter>
);

export default App;
