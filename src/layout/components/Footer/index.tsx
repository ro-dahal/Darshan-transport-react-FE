import React from 'react';
import logo from '../../../assets/img/logo1.png';
import facebookIcon from '../../../assets/img/facebook.png';
import instagramIcon from '../../../assets/img/instagram.png';
import whatsappIcon from '../../../assets/img/whatsapp.png';
import linkedinIcon from '../../../assets/img/linkedin.png';
import { FOOTER_COLUMNS } from './footerLinks';

export const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer-container">

      {/* LOGO + PARAGRAPH GROUP */}
      <div className="footer-brand">
        <img src={logo} alt="Darshan Transport Logo" />
        <p>
          Nepal’s trusted partner for warehousing, nationwide delivery, and 3PL solutions.
          Reliable, safe, and on-time logistics for businesses of all sizes.
        </p>
      </div>

      {/* OTHER COLUMNS */}
      {FOOTER_COLUMNS.map((column) => (
        <div className={`footer-column${column.title === 'Services' ? ' footer-column-services' : ''}`} key={column.title}>
          <h4>{column.title}</h4>
          <ul>
            {column.title === 'Connect'
              ? column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                      {link.label === 'Facebook' && (
                        <span className="footer-social-icon">
                          <img src={facebookIcon} alt="Facebook" width={24} height={24} />
                        </span>
                      )}
                      {link.label === 'Instagram' && (
                        <span className="footer-social-icon">
                          <img src={instagramIcon} alt="Instagram" width={24} height={24} />
                        </span>
                      )}
                      {link.label === 'WhatsApp' && (
                        <span className="footer-social-icon">
                          <img src={whatsappIcon} alt="WhatsApp" width={24} height={24} />
                        </span>
                      )}
                      {link.label === 'LinkedIn' && (
                        <span className="footer-social-icon">
                          <img src={linkedinIcon} alt="LinkedIn" width={24} height={24} />
                        </span>
                      )}
                      <span className="footer-social-label">{link.label}</span>
                    </a>
                  </li>
                ))
              : column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
          </ul>
        </div>
      ))}

    </div>

    <div className="footer-bottom">
      <p>
        Copyright © {new Date().getFullYear()} Darshan Transport |
        <a href="#"> Privacy Policy</a> |
        <a href="#"> Terms & Conditions</a>
      </p>
    </div>
  </footer>
);
