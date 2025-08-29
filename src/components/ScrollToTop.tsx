import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop
 * Scrolls window to top on every pathname change.
 * Keeps behavior simple and predictable (instant jump).
 */
export default function ScrollToTop(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instant scroll to top to avoid partial-scroll positions on navigation
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}
