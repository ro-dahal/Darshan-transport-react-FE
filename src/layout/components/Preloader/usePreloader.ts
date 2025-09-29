import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function usePreloader() {
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const initialTimerRef = useRef<number | null>(null);
  const navTimerRef = useRef<number | null>(null);
  const firstLoadRef = useRef(true);

  useEffect(() => {
    initialTimerRef.current = window.setTimeout(() => {
      setHidden(true);
      firstLoadRef.current = false;
    }, 1000);

    return () => {
      if (initialTimerRef.current) {
        window.clearTimeout(initialTimerRef.current);
      }
      if (navTimerRef.current) {
        window.clearTimeout(navTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (firstLoadRef.current) {
      return;
    }

    setHidden(false);

    if (navTimerRef.current) {
      window.clearTimeout(navTimerRef.current);
    }

    navTimerRef.current = window.setTimeout(() => {
      setHidden(true);
    }, 600);

    return () => {
      if (navTimerRef.current) {
        window.clearTimeout(navTimerRef.current);
      }
    };
  }, [location]);

  return { hidden };
}
