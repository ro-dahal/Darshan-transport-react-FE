import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/img/logo.png';
import { NAV_LINKS } from './navLinks';
import { useNavbarController } from './useNavbarController';

export const Navbar: React.FC = () => {
  const { headerRef, menuOpen, toggleMenu, closeMenu, activePath } = useNavbarController();

  return (
    <section id="headerr" ref={headerRef}>
      <Link to="/">
        <img src={logo} className="logo" alt="Darshan Transport Logo" />
      </Link>
      <div className="nav-container">
        <button
          className={`mobile-menu-toggle${menuOpen ? ' active' : ''}`}
          id="mobileMenuToggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul id="navbar" className={menuOpen ? 'show' : ''}>
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={activePath === link.to ? 'active' : ''}
                onClick={closeMenu}
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
