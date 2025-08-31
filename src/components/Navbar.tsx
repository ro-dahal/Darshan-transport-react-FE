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
  const [hidden, setHidden] = useState(false);
  const lastY = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const setVar = () => {
      const h = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--head-height', `${Math.ceil(h)}px`);
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
    const onScroll = () => {
      if (rafRef.current) return; // already scheduled

      rafRef.current = window.requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset;
        const delta = y - lastY.current;
        const threshold = 10; // minimal scroll before toggling

        if (y < 50) {
          // near top, always show
          setHidden(false);
        } else {
          if (delta > threshold) {
            // scrolling down -> hide
            setHidden(true);
          } else if (delta < -threshold) {
            // scrolling up -> show
            setHidden(false);
          }
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
  }, []);

  return (
  <section id="headerr" ref={headerRef} className={hidden ? 'hidden' : ''}>
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