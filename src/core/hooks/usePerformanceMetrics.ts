import { useEffect } from 'react';

/**
 * usePerformanceMetrics Hook
 * Automatically captures and logs key performance indicators for the current page.
 * Tracks metrics such as Time to First Byte (TTFB), DOM Ready, and Full Load Time.
 *
 * @param pageName - The name of the page being tracked
 */
export const usePerformanceMetrics = (pageName: string) => {
  useEffect(() => {
    // Only run in browser environments that support the Performance API
    if (typeof window === 'undefined' || !window.performance) return;

    const captureMetrics = () => {
      // Use the Navigation Timing API (v2)
      const navigationEntries =
        window.performance.getEntriesByType('navigation');
      if (navigationEntries.length === 0) return;

      const nav = navigationEntries[0] as PerformanceNavigationTiming;

      // Ensure loadEventEnd has completed (if not, we might get 0)
      if (nav.loadEventEnd <= 0) {
        // Retry in a moment if page is still loading
        setTimeout(captureMetrics, 1000);
        return;
      }

      const metrics = {
        page: pageName,
        // Time to First Byte: Speed of the server response
        ttfb: Math.round(nav.responseStart - nav.startTime),
        // DOM Content Loaded: Time until HTML is parsed and DOM is ready
        domReady: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
        // Load Event: Time until all assets (images, etc.) are fully loaded
        fullLoad: Math.round(nav.loadEventEnd - nav.startTime),
        // Network timing details
        dns: Math.round(nav.domainLookupEnd - nav.domainLookupStart),
        tcp: Math.round(nav.connectEnd - nav.connectStart),
      };

      // In a real production app, you would send this to an analytics endpoint
      // For now, we log it to the console in a structured format for monitoring
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.groupCollapsed(`⚡ [Performance] ${pageName}`);
        // eslint-disable-next-line no-console
        console.table(metrics);
        // eslint-disable-next-line no-console
        console.groupEnd();
      }
    };

    // Use requestIdleCallback to avoid blocking the main thread
    if ('requestIdleCallback' in window) {
      (
        window as unknown as { requestIdleCallback: (cb: () => void) => void }
      ).requestIdleCallback(() => captureMetrics());
    } else {
      // Fallback for browsers without requestIdleCallback
      const handleLoad = () => {
        // Delay slightly to ensure loadEventEnd is populated
        setTimeout(captureMetrics, 500);
      };

      if (document.readyState === 'complete') {
        handleLoad();
      } else {
        const win = window as Window;
        win.addEventListener('load', handleLoad);
        return () => win.removeEventListener('load', handleLoad);
      }
    }
  }, [pageName]);
};
