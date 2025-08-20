import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Preloader: React.FC = () => {
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const initialTimerRef = useRef<number | null>(null);
  const navTimerRef = useRef<number | null>(null);
  const firstLoadRef = useRef(true);

  useEffect(() => {
    // initial page load: show preloader for 1s
    initialTimerRef.current = window.setTimeout(() => {
      setHidden(true);
      firstLoadRef.current = false;
    }, 1000);

    return () => {
      if (initialTimerRef.current) {
        clearTimeout(initialTimerRef.current);
      }
      if (navTimerRef.current) {
        clearTimeout(navTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // skip the effect on the very first mount (we already handled initial loader)
    if (firstLoadRef.current) return;

    // show preloader on route change, then hide after a short delay
    setHidden(false);

    if (navTimerRef.current) {
      clearTimeout(navTimerRef.current);
    }

    navTimerRef.current = window.setTimeout(() => {
      setHidden(true);
    }, 600); // adjust duration as desired for UX

    return () => {
      if (navTimerRef.current) {
        clearTimeout(navTimerRef.current);
      }
    };
  }, [location]);

  return (
    <div
      id="preloader"
  className={hidden ? 'hidden' : ''}
    >
      <div className="loader"></div>
    </div>
  );
};

export default Preloader;