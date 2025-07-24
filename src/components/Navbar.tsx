import React, { useState } from 'react';
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

  return (
    <section id="headerr">
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