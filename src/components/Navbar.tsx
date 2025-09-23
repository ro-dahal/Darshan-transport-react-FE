import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/img/logo.png';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/services', label: 'Services' },
    { to: '/contact', label: 'Contact' },
    { to: '/order', label: 'Track My Order' },
  ];

  const headerRef = useRef<HTMLElement | null>(null);
  const lastY = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const headerHeightRef = useRef<number>(0);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const setVar = () => {
  const h = el.getBoundingClientRect().height;
  headerHeightRef.current = Math.ceil(h);
  document.documentElement.style.setProperty('--head-height', `${headerHeightRef.current}px`);
  // let CSS control transform; clear any inline value
  el.style.removeProperty('transform');
    };

    // set initially
    setVar();

    // update on resize
    window.addEventListener('resize', setVar);

    return () => {
      window.removeEventListener('resize', setVar);
      document.documentElement.style.removeProperty('--head-height');
    };
  }, []);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const DOWN_THRESHOLD = 8; // pixels
    const UP_THRESHOLD = 14;  // pixels to avoid jitter

    const show = () => {
      el.classList.remove('nav-hidden');
      el.style.pointerEvents = 'auto';
      el.style.transform = 'translateY(0)';
    };
    const hide = (distance: number) => {
      el.classList.add('nav-hidden');
      el.style.pointerEvents = 'none';
      el.style.transform = `translateY(-${Math.max(0, Math.ceil(distance))}px)`;
    };

    const onScroll = () => {
      if (rafRef.current) return; // already scheduled
      rafRef.current = window.requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset;
        const maxH = headerHeightRef.current || el.getBoundingClientRect().height || 0;

        if (menuOpen) {
          show();
          lastY.current = y;
          if (rafRef.current) {
            window.cancelAnimationFrame(rafRef.current);
          }
          rafRef.current = null;
          return;
        }

        if (y <= 0) {
          show();
          lastY.current = 0;
          if (rafRef.current) {
            window.cancelAnimationFrame(rafRef.current);
          }
          rafRef.current = null;
          return;
        }

        const dy = y - lastY.current;
        if (dy > DOWN_THRESHOLD && y > maxH + 10) {
          hide(maxH);
        } else if (dy < -UP_THRESHOLD) {
          show();
        }

        lastY.current = y;
        if (rafRef.current) {
          window.cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [menuOpen]);

  // Ensure header is visible after route changes so content starts under it
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    el.classList.remove('nav-hidden');
    el.style.pointerEvents = 'auto';
    el.style.transform = 'translateY(0)';
    lastY.current = 0;
  }, [location.pathname]);

  return (
  <section id="headerr" ref={headerRef}>
      <Link to="/"><img src={logo} className="logo" alt="Darshan Transport Logo" /></Link>
      <div className="nav-container">
        <button
          className={`mobile-menu-toggle${menuOpen ? ' active' : ''}`}
          id="mobileMenuToggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul id="navbar" className={menuOpen ? 'show' : ''}>
          {navLinks.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={location.pathname === link.to ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Navbar;