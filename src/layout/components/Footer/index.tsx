import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/img/optimized/logo1.webp';
import { FOOTER_COLUMNS } from './footerLinks';
import { CONTACT_CONFIG } from '../../../core/config/contactConfig';
import facebookIcon from '../../../assets/img/facebook.png';
import instagramIcon from '../../../assets/img/instagram.png';
import whatsappIcon from '../../../assets/img/whatsapp.png';
import linkedinIcon from '../../../assets/img/linkedin.png';

/**
 * Global Site Footer.
 * Organizes site navigation into columns and provides essential contact
 * and social media links. Responsive layout handles mobile centering
 * and tablet/desktop reorganization.
 */
export const Footer: React.FC = () => (
  <footer className="bg-[#5d5d5d] text-white pt-[50px] px-5 pb-5 font-sans">
    <div className="flex max-w-[1200px] mx-auto gap-[60px] items-start flex-wrap max-xl:flex-nowrap max-xl:gap-4 max-xl:justify-between max-sm:flex-col max-sm:items-center max-sm:gap-[30px]">
      {/* LOGO + PARAGRAPH GROUP */}
      <div className="flex items-start gap-px max-w-[420px] max-xl:max-w-[150px] max-xl:flex-col max-xl:items-start max-xl:shrink-0 max-xl:mr-0 max-sm:max-w-full max-sm:mb-5 max-sm:items-center">
        <img
          src={logo}
          alt="Darshan Transport Logo"
          loading="lazy"
          decoding="async"
          className="w-[120px] flex-shrink-0 max-xl:w-[120px] max-xl:mb-2.5 max-sm:w-[150px]"
        />
        <p className="m-0 text-sm leading-[1.6] text-[#ddd] mt-2.5 max-w-[230px] max-xl:w-full max-xl:max-w-full max-xl:mt-0 max-sm:max-w-full max-sm:mx-auto text-left max-sm:text-center">
          Nepal's trusted partner for warehousing, nationwide delivery, and 3PL
          solutions. Reliable, safe, and on-time logistics for businesses of all
          sizes.
        </p>
      </div>

      {/* OTHER COLUMNS */}
      {FOOTER_COLUMNS.map((column) => (
        <div
          className={`flex-1 min-w-[180px] max-xl:min-w-0 max-xl:w-auto max-sm:min-w-[180px] max-sm:text-center max-sm:w-full ${column.title === 'Services' ? 'xl:-ml-8' : ''}`}
          key={column.title}
        >
          <h4 className="text-base font-semibold mb-[15px] text-white">
            {column.title}
          </h4>
          <ul className="list-none p-0 m-0">
            {column.title === 'Connect'
              ? column.links.map((link) => {
                  let href = link.href;
                  if (link.label === 'WhatsApp')
                    href = `https://wa.me/${CONTACT_CONFIG.whatsapp}`;
                  if (link.label.includes('@'))
                    href = `mailto:${CONTACT_CONFIG.email}`;
                  if (link.label.startsWith('+977'))
                    href = `tel:${CONTACT_CONFIG.phone.replace(/\s/g, '')}`;

                  return (
                    <li key={link.label} className="mb-2">
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 no-underline text-inherit transition-colors duration-200 font-medium break-words max-sm:justify-center"
                      >
                        {link.label === 'Facebook' && (
                          <img
                            src={facebookIcon}
                            alt="Facebook"
                            className="w-[38px] h-[38px] object-contain transition-transform duration-200 hover:scale-110"
                          />
                        )}
                        {link.label === 'Instagram' && (
                          <img
                            src={instagramIcon}
                            alt="Instagram"
                            className="w-[38px] h-[38px] object-contain transition-transform duration-200 hover:scale-110"
                          />
                        )}
                        {link.label === 'WhatsApp' && (
                          <img
                            src={whatsappIcon}
                            alt="WhatsApp"
                            className="w-[38px] h-[38px] object-contain transition-transform duration-200 hover:scale-110"
                          />
                        )}
                        {link.label === 'LinkedIn' && (
                          <img
                            src={linkedinIcon}
                            alt="LinkedIn"
                            className="w-[38px] h-[38px] object-contain transition-transform duration-200 hover:scale-110"
                          />
                        )}
                        <span className="text-[#ccc] hover:text-white">
                          {link.label}
                        </span>
                      </a>
                    </li>
                  );
                })
              : column.links.map((link) => {
                  let href = link.href;
                  if (link.label === 'WhatsApp')
                    href = `https://wa.me/${CONTACT_CONFIG.whatsapp}`;
                  if (link.label.includes('@'))
                    href = `mailto:${CONTACT_CONFIG.email}`;
                  if (link.label.startsWith('+977'))
                    href = `tel:${CONTACT_CONFIG.phone.replace(/\s/g, '')}`;

                  return (
                    <li key={link.label} className="mb-2">
                      {href.startsWith('/') ? (
                        <Link
                          to={href}
                          className="text-[#ccc] no-underline transition-colors duration-300 hover:text-white"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={href}
                          target={
                            href.startsWith('http') ? '_blank' : undefined
                          }
                          rel={
                            href.startsWith('http')
                              ? 'noopener noreferrer'
                              : undefined
                          }
                          className="text-[#ccc] no-underline transition-colors duration-300 hover:text-white break-words"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  );
                })}
          </ul>
        </div>
      ))}
    </div>

    <div className="text-center pt-5 text-sm text-[#ccc]">
      <p>
        Copyright © {new Date().getFullYear()} Darshan Transport |
        <Link
          to="/privacy-policy"
          className="text-[#ccc] no-underline mx-[5px] hover:text-white"
        >
          {' '}
          Privacy Policy
        </Link>{' '}
        |
        <Link
          to="/terms-conditions"
          className="text-[#ccc] no-underline mx-[5px] hover:text-white"
        >
          {' '}
          Terms & Conditions
        </Link>
      </p>
    </div>
  </footer>
);
