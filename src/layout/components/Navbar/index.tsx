import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../../assets/img/logo-bar.png';
import { NAV_LINKS } from './navLinks';
import { useNavbarController } from './useNavbarController';


export const Navbar: React.FC = () => {
  const { headerRef, menuOpen, toggleMenu, closeMenu, activePath } = useNavbarController();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

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
            <li
              key={link.to}
              className={`${link.dropdown ? 'has-dropdown' :  ''} ${
                activeDropdown === link.to ? 'active-dropdown' : ''
              }`}
              onMouseEnter={() => link.dropdown && setActiveDropdown(link.to)}
              onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
              onClick={() => {
                if (link. dropdown && window.innerWidth <= 768) {
                  setActiveDropdown(activeDropdown === link.to ? null : link.to);
                }
              }}
            >
              <Link
                to={link.to}
                className={activePath === link.to ? 'active' : ''}
                onClick={(e) => {
                  if (link.dropdown && window.innerWidth <= 768) {
                    e.preventDefault();
                  } else if (! link.dropdown) {
                    closeMenu();
                  }
                }}
                style={{ display: 'flex', alignItems: 'center', gap: '1px' }}
              >
                {link.label}
                {link.dropdown && (
                  <span className="dropdown-arrow">
                    {activeDropdown === link.to ? '▲' : '▼'}
                  </span>
                )}
              </Link>
              {link.dropdown && (
                <ul className="dropdown-menu">
                  {link.dropdown.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className={activePath === item.to ? 'active' : ''}
                        onClick={e => {
                          e.preventDefault();
                          const anchor = item.to.split('#')[1];
                          if (location.pathname === '/services' && anchor) {
                            // Always update the hash and trigger scroll
                            if (window.location.hash === `#${anchor}`) {
                              window.location.hash = '';
                              setTimeout(() => {
                                window.location.hash = `#${anchor}`;
                              }, 0);
                            } else {
                              window.location.hash = `#${anchor}`;
                            }
                          } else {
                            // Navigate to /services#anchor
                            navigate(item.to);
                          }
                          closeMenu();
                        }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};