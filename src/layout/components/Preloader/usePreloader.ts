import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTransition } from '../../../core/hooks/useTransition';

export function usePreloader() {
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const { isTransitioning } = useTransition();
  const [lastPathname, setLastPathname] = useState(location.pathname);

  const initialTimerRef = useRef<number | null>(null);
  const navTimerRef = useRef<number | null>(null);
  const firstLoadRef = useRef(true);

  // Synchronously show preloader when route changes during render
  // This is a safety net, but TransitionContext should handle the primary fade-in
  if (location.pathname !== lastPathname) {
    setLastPathname(location.pathname);
    if (!firstLoadRef.current) {
      // Logic handled by effect below/context
    }
  }

  // Effect to handle manual transition trigger (Fade In)
  useEffect(() => {
    if (isTransitioning) {
      setHidden(false);
    }
  }, [isTransitioning]);

  useEffect(() => {
    // Initial load timer (500ms)
    initialTimerRef.current = window.setTimeout(() => {
      setHidden(true);
      firstLoadRef.current = false;
    }, 500);

    return () => {
      if (initialTimerRef.current) {
        window.clearTimeout(initialTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (firstLoadRef.current) {
      return;
    }

    // When location changes (navigation complete) or transition ends, handle Fade Out
    // We want to HOLD for 300ms then Fade Out (setHidden(true))

    if (navTimerRef.current) {
      window.clearTimeout(navTimerRef.current);
    }

    // Only hide if we aren't currently transitioning (waiting for next page)
    if (!isTransitioning) {
      navTimerRef.current = window.setTimeout(() => {
        setHidden(true);
      }, 300); // 300ms Hold Time
    }

    return () => {
      if (navTimerRef.current) {
        window.clearTimeout(navTimerRef.current);
      }
    };
  }, [location, isTransitioning]);

  return { hidden };
}
