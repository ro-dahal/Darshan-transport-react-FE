import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../../assets/img/optimized/logo-bar.webp';
import { NAV_LINKS } from './navLinks';
import { useNavbarController } from './useNavbarController';
import { TransitionLink } from '../../../core/components/TransitionLink';

export const Navbar: React.FC = () => {
  const { headerRef, menuOpen, toggleMenu, closeMenu, activePath } =
    useNavbarController();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  return (
    <section
      id="headerr"
      ref={headerRef}
      className="flex items-center justify-between px-[135px] py-2.5 bg-[#1a1a1a] shadow-[0_5px_15px_rgba(0,0,0,0.1)] z-[1000] fixed top-0 left-0 right-0 w-full box-border will-change-transform transition-transform duration-300 ease-in-out max-xl:px-10 max-lg:px-10 max-md:px-5 max-sm:px-[15px]"
    >
      <TransitionLink to="/">
        <img
          src={logo}
          className="max-h-[8vh] max-w-full max-lg:max-w-[140px] max-sm:max-w-[120px]"
          alt="Darshan Transport Logo"
          fetchPriority="high"
        />
      </TransitionLink>
      <div className="relative">
        <button
          className={`hidden max-md:flex flex-col bg-none border-none cursor-pointer p-3 z-[1001] relative rounded-md transition-all duration-300 hover:bg-[rgba(252,176,23,0.377)] ${menuOpen ? 'active' : ''}`}
          id="mobileMenuToggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span
            className={`w-6 h-0.5 bg-primary my-[3px] block rounded-sm transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] ${menuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-primary my-[3px] block rounded-sm transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] ${menuOpen ? 'opacity-0 -translate-x-5' : ''}`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-primary my-[3px] block rounded-sm transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] ${menuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}
          ></span>
        </button>
        <ul
          id="navbar"
          className={`flex items-center justify-center max-md:fixed max-md:top-[var(--head-height,56px)] max-md:left-0 max-md:right-0 max-md:w-full max-md:flex-col max-md:p-0 max-md:m-0 max-md:bg-[#1a1a1a] max-md:rounded-b-xl max-md:shadow-[0_8px_24px_rgba(0,0,0,0.3)] max-md:z-[1000] ${
            menuOpen
              ? 'max-md:!flex max-md:opacity-100 max-md:translate-y-0 max-md:py-5'
              : 'max-md:hidden max-md:opacity-0 max-md:-translate-y-2.5'
          } max-md:transition-all max-md:duration-[250ms] max-md:ease-[cubic-bezier(0.4,0,0.2,1)]`}
        >
          {NAV_LINKS.map((link) => (
            <li
              key={link.to}
              className={`list-none px-5 relative max-lg:px-2.5 max-md:m-0 max-md:p-0 max-md:w-full max-md:border-b max-md:border-white/10 max-md:transition-all max-md:duration-300 max-md:last:border-b-0 max-md:hover:bg-white/5 ${link.dropdown ? 'group' : ''} ${
                activeDropdown === link.to ? '' : ''
              }`}
            >
              <TransitionLink
                to={link.to}
                className={`no-underline text-base font-semibold text-white opacity-70 transition-all duration-200 hover:text-primary max-lg:text-sm max-md:text-lg max-md:font-semibold max-md:py-4 max-md:px-6 max-md:block max-md:text-white/90 max-md:opacity-100 max-md:tracking-[0.5px] max-md:hover:text-primary max-sm:text-base max-sm:font-medium max-sm:py-4 max-sm:px-7 max-sm:flex max-sm:items-center max-sm:justify-center max-sm:min-h-[52px] flex items-center justify-center gap-px ${
                  activePath === link.to
                    ? '!text-primary !opacity-100 max-md:bg-white/5'
                    : ''
                }`}
                onClick={(e) => {
                  if (link.dropdown && window.innerWidth <= 768) {
                    e.preventDefault();
                    setActiveDropdown(
                      activeDropdown === link.to ? null : link.to
                    );
                  } else if (!link.dropdown) {
                    closeMenu();
                  }
                }}
              >
                {link.label}
                {link.dropdown && (
                  <span
                    className={`text-xs ml-1 transition-colors duration-200 ${
                      activeDropdown === link.to
                        ? 'text-primary'
                        : 'text-white max-md:text-white/70'
                    }`}
                  >
                    {activeDropdown === link.to ? '▲' : '▼'}
                  </span>
                )}
              </TransitionLink>
              {link.dropdown && (
                <ul
                  className={`absolute top-[calc(100%+15px)] left-0 bg-[#1a1a1a] min-w-[280px] shadow-[0_8px_16px_rgba(0,0,0,0.3)] list-none m-0 z-[9999] rounded-lg overflow-hidden transition-all duration-300 block max-md:static max-md:shadow-none max-md:bg-white/5 max-md:pl-0 max-md:rounded-none max-md:border-white/10 group-hover:max-h-[500px] group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:py-[15px] ${
                    activeDropdown === link.to
                      ? 'max-h-[500px] opacity-100 visible pointer-events-auto py-[15px] max-md:border-t'
                      : 'max-h-0 opacity-0 invisible pointer-events-none py-0'
                  }`}
                >
                  {link.dropdown.map((item) => (
                    <li key={item.to} className="p-0 m-0 block w-full static">
                      <TransitionLink
                        to={item.to}
                        className={`block py-3 px-[25px] text-white opacity-80 no-underline transition-all duration-200 whitespace-nowrap w-full text-[15px] font-medium hover:bg-[rgba(252,175,23,0.2)] hover:!text-primary hover:opacity-100 max-md:py-3.5 max-md:px-4 max-md:text-white/80 max-md:text-base max-md:text-center max-md:border-b max-md:border-white/10 max-md:last:border-b-0 ${
                          activePath === item.to
                            ? '!bg-white/10 !text-primary !opacity-100'
                            : ''
                        }`}
                        onClick={() => {
                          const anchor = item.to.split('#')[1];
                          if (location.pathname === '/services' && anchor) {
                            if (window.location.hash === `#${anchor}`) {
                              window.location.hash = '';
                              setTimeout(() => {
                                window.location.hash = `#${anchor}`;
                              }, 0);
                            } else {
                              window.location.hash = `#${anchor}`;
                            }
                          }
                          closeMenu();
                        }}
                      >
                        {item.label}
                      </TransitionLink>
                    </li>
                  ))}
                </ul>
              )}
              {/* Invisible bridge to prevent dropdown from closing */}
              {link.dropdown && (
                <div className="absolute top-full left-0 right-0 h-[15px] bg-transparent max-md:hidden" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
