import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * Resets the window scroll position to the top whenever the route changes.
 * This is essential for single-page applications (SPAs) where navigation
 * doesn't automatically trigger a scroll reset.
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top of the page when the path changes.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // Use 'instant' for a clean reset, avoiding jitter during transitions.
    });
  }, [pathname]);

  return null; // This component doesn't render any UI.
};
