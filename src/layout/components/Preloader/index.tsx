import React from 'react';
import { usePreloader } from './usePreloader';

export const Preloader: React.FC = () => {
  const { hidden } = usePreloader();

  return (
    <div id="preloader" className={hidden ? 'hidden' : ''}>
      <div className="loader"></div>
    </div>
  );
};
