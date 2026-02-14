import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const DOWN_THRESHOLD = 8;
const UP_THRESHOLD = 14;

export function useNavbarController() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const headerHeightRef = useRef<number>(0);
  const lastScrollY = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const location = useLocation();

  const toggleMenu = useCallback(() => {
    setMenuOpen((open) => !open);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    const element = headerRef.current;
    if (!element) return;

    const updateHeight = () => {
      const height = element.getBoundingClientRect().height;
      headerHeightRef.current = Math.ceil(height);
      document.documentElement.style.setProperty(
        '--head-height',
        `${headerHeightRef.current}px`
      );
      element.style.removeProperty('transform');
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
      document.documentElement.style.removeProperty('--head-height');
    };
  }, []);

  useEffect(() => {
    const element = headerRef.current;
    if (!element) return;

    const show = () => {
      element.classList.remove('nav-hidden');
      element.style.pointerEvents = 'auto';
      element.style.transform = 'translateY(0)';
    };

    const hide = (distance: number) => {
      element.classList.add('nav-hidden');
      element.style.pointerEvents = 'none';
      element.style.transform = `translateY(-${Math.max(0, Math.ceil(distance))}px)`;
    };

    const handleScroll = () => {
      if (rafRef.current) return;

      rafRef.current = window.requestAnimationFrame(() => {
        const currentY = window.scrollY || window.pageYOffset;
        const maxHeight =
          headerHeightRef.current ||
          element.getBoundingClientRect().height ||
          0;

        if (menuOpen) {
          show();
          lastScrollY.current = currentY;
          if (rafRef.current) {
            window.cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
          }
          return;
        }

        if (currentY <= 0) {
          show();
          lastScrollY.current = 0;
          if (rafRef.current) {
            window.cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
          }
          return;
        }

        const delta = currentY - lastScrollY.current;
        if (delta > DOWN_THRESHOLD && currentY > maxHeight + 10) {
          hide(maxHeight);
        } else if (delta < -UP_THRESHOLD) {
          show();
        }

        lastScrollY.current = currentY;
        if (rafRef.current) {
          window.cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [menuOpen]);

  useEffect(() => {
    const element = headerRef.current;
    if (!element) return;

    // Force show navbar on route change
    element.classList.remove('nav-hidden');
    element.style.pointerEvents = 'auto';
    element.style.transform = 'translateY(0)';

    // Sync lastScrollY to current scroll position immediately
    // This prevents the scroll handler from seeing a large "delta" if the browser
    // restored a scroll position before this effect ran.
    lastScrollY.current = window.scrollY;

    setMenuOpen(false);

    // Double check visibility after a short delay to counter persistent scroll restoration
    const timer = setTimeout(() => {
      if (window.scrollY === 0) {
        element.classList.remove('nav-hidden');
        element.style.transform = 'translateY(0)';
        lastScrollY.current = 0;
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return {
    headerRef,
    menuOpen,
    toggleMenu,
    closeMenu,
    activePath: location.pathname,
  };
}
