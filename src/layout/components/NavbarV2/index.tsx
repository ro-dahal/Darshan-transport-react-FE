import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../../assets/img/optimized/logo-bar.webp';
import { NAV_LINKS_V2 } from './navLinksV2';
import { useNavbarController } from '../Navbar/useNavbarController';
import { TransitionLink } from '../../../core/components/TransitionLink';

export const NavbarV2: React.FC = () => {
  const { headerRef, menuOpen, toggleMenu, closeMenu, activePath } =
    useNavbarController();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setActiveDropdown(null);
    setHoveredDropdown(null);
  }, [location.pathname]);

  const isDropdownOpen = (to: string) =>
    activeDropdown === to || hoveredDropdown === to;

  return (
    <header
      id="header"
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-[1000] w-full will-change-transform transition-transform duration-300 ease-in-out"
    >
      {/* Glassmorphism bar */}
      <div className="mx-auto flex items-center justify-between px-6 py-3 sm:px-10 lg:px-20 xl:px-[135px] bg-[#0d0d0d]/80 backdrop-blur-xl border-b border-white/[0.06]">
        {/* Logo */}
        <TransitionLink to="/v2" className="shrink-0">
          <img
            src={logo}
            className="h-10 w-auto sm:h-11 lg:h-12"
            alt="Darshan Transport Logo"
            fetchPriority="high"
          />
        </TransitionLink>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS_V2.map((link) => {
              const isActive = activePath === link.to;
              const dropOpen = isDropdownOpen(link.to);
              const highlighted = isActive || dropOpen;

              return (
                <li
                  key={link.to}
                  className="relative"
                  onMouseEnter={() =>
                    link.dropdown && setHoveredDropdown(link.to)
                  }
                  onMouseLeave={() => link.dropdown && setHoveredDropdown(null)}
                >
                  <TransitionLink
                    to={link.to}
                    className={`relative flex items-center gap-1 px-4 py-2 text-[13px] font-semibold uppercase tracking-[1.5px] rounded-full transition-all duration-200 ${
                      highlighted
                        ? 'text-primary bg-primary/10'
                        : 'text-white/70 hover:text-white hover:bg-white/[0.05]'
                    }`}
                    onClick={(e) => {
                      if (link.dropdown) {
                        e.preventDefault();
                        setActiveDropdown(
                          activeDropdown === link.to ? null : link.to
                        );
                      }
                    }}
                  >
                    {link.label}
                    {link.dropdown && (
                      <svg
                        className={`h-3 w-3 transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`}
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2.5 4.5L6 8L9.5 4.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    {/* Active indicator dot */}
                    {isActive && !link.dropdown && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary"
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </TransitionLink>

                  {/* Desktop dropdown */}
                  {link.dropdown && (
                    <>
                      {/* Invisible bridge */}
                      <div className="absolute top-full left-0 right-0 h-3" />
                      <AnimatePresence>
                        {dropOpen && (
                          <motion.ul
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{
                              duration: 0.2,
                              ease: [0.22, 1, 0.36, 1] as [
                                number,
                                number,
                                number,
                                number,
                              ],
                            }}
                            className="absolute top-[calc(100%+12px)] left-0 min-w-[260px] bg-[#141414]/95 backdrop-blur-xl border border-white/[0.08] rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.4)] py-2 z-[9999]"
                          >
                            {link.dropdown.map((item) => (
                              <li key={item.to}>
                                <TransitionLink
                                  to={item.to}
                                  className={`block px-5 py-3 text-sm font-medium transition-all duration-150 ${
                                    activePath === item.to
                                      ? 'text-primary bg-primary/10'
                                      : 'text-white/70 hover:text-white hover:bg-white/[0.05]'
                                  }`}
                                  onClick={() => {
                                    const anchor = item.to.split('#')[1];
                                    if (
                                      location.pathname === '/services/v2' &&
                                      anchor
                                    ) {
                                      if (
                                        window.location.hash === `#${anchor}`
                                      ) {
                                        window.location.hash = '';
                                        setTimeout(() => {
                                          window.location.hash = `#${anchor}`;
                                        }, 0);
                                      } else {
                                        window.location.hash = `#${anchor}`;
                                      }
                                    }
                                    closeMenu();
                                    setActiveDropdown(null);
                                    setHoveredDropdown(null);
                                  }}
                                >
                                  {item.label}
                                </TransitionLink>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CTA button (desktop) */}
        <TransitionLink
          to="/order/v2"
          className="hidden md:inline-flex items-center gap-2 bg-primary text-[#0d0d0d] text-xs font-bold uppercase tracking-[2px] px-6 py-2.5 rounded-full hover:bg-primary/90 transition-colors duration-200"
        >
          Track Order
          <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10m0 0L9 4m4 4L9 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </TransitionLink>

        {/* Mobile menu button */}
        <button
          className="flex md:hidden flex-col items-center justify-center w-10 h-10 rounded-lg bg-transparent border border-white/10 cursor-pointer transition-colors duration-200 hover:bg-white/[0.05]"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          aria-controls="navbar-v2"
        >
          <span
            className={`block w-5 h-[2px] bg-white/80 rounded-full transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-[6px]' : ''
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-white/80 rounded-full my-1 transition-all duration-300 ${
              menuOpen ? 'opacity-0 scale-x-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-white/80 rounded-full transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-[6px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="navbar-v2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.25,
              ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
            }}
            className="md:hidden overflow-hidden bg-[#0d0d0d]/95 backdrop-blur-xl border-b border-white/[0.06]"
          >
            <ul className="flex flex-col py-4 px-6">
              {NAV_LINKS_V2.map((link, i) => {
                const isActive = activePath === link.to;
                const dropOpen = isDropdownOpen(link.to);

                return (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                    className="border-b border-white/[0.06] last:border-b-0"
                  >
                    <TransitionLink
                      to={link.to}
                      className={`flex items-center justify-between py-3.5 text-[15px] font-semibold tracking-wide transition-colors duration-200 ${
                        isActive
                          ? 'text-primary'
                          : 'text-white/80 hover:text-white'
                      }`}
                      onClick={(e) => {
                        if (link.dropdown) {
                          e.preventDefault();
                          setActiveDropdown(
                            activeDropdown === link.to ? null : link.to
                          );
                        } else {
                          closeMenu();
                        }
                      }}
                    >
                      {link.label}
                      {link.dropdown && (
                        <svg
                          className={`h-4 w-4 transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`}
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M2.5 4.5L6 8L9.5 4.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </TransitionLink>

                    {/* Mobile dropdown */}
                    <AnimatePresence>
                      {link.dropdown && dropOpen && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-4 pb-2"
                        >
                          {link.dropdown.map((item) => (
                            <li key={item.to}>
                              <TransitionLink
                                to={item.to}
                                className={`block py-2.5 text-sm transition-colors duration-150 ${
                                  activePath === item.to
                                    ? 'text-primary'
                                    : 'text-white/50 hover:text-white/80'
                                }`}
                                onClick={() => {
                                  closeMenu();
                                  setActiveDropdown(null);
                                }}
                              >
                                {item.label}
                              </TransitionLink>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}

              {/* Mobile CTA */}
              <motion.li
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: NAV_LINKS_V2.length * 0.04,
                  duration: 0.25,
                }}
                className="pt-4"
              >
                <TransitionLink
                  to="/order/v2"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 w-full bg-primary text-[#0d0d0d] text-sm font-bold uppercase tracking-[2px] px-6 py-3 rounded-full"
                >
                  Track Order
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10m0 0L9 4m4 4L9 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </TransitionLink>
              </motion.li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
