import React from 'react';
import logo from '../../../assets/img/logo1.png';
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
        <div className="footer-column" key={column.title}>
          <h4>{column.title}</h4>
          <ul>
            {column.title === 'Connect'
              ? column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                      {link.label === 'Facebook' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h5v-7H9v-3h3V9.5A3.5 3.5 0 0 1 15.5 6H18v3h-2.5A.5.5 0 0 0 15 9.5V12h3l-.5 3H15v7h2a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5z" fill="#1877F3"/></svg>
                      )}
                      {link.label    === 'Instagram' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                          <radialGradient id="insta-gradient" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stop-color="#f9ce34" />
                            <stop offset="45%" stop-color="#ee2a7b" />
                            <stop offset="100%" stop-color="#6228d7" />
                          </radialGradient>
                          <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#insta-gradient)" />
                          <circle cx="12" cy="12" r="5" fill="none" stroke="#fff" stroke-width="2" />
                          <circle cx="17" cy="7" r="1.2" fill="#fff" />
                        </svg>
                      )}
                      {link.label === 'WhatsApp' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" fill="#25D366"/></svg>
                      )}
                      {link.label === 'LinkedIn' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#0A66C2"/><path d="M7.5 17V10.5H9.75V17H7.5ZM8.625 9.375C7.875 9.375 7.5 8.875 7.5 8.25C7.5 7.625 7.875 7.125 8.625 7.125C9.375 7.125 9.75 7.625 9.75 8.25C9.75 8.875 9.375 9.375 8.625 9.375ZM10.875 17V13.25C10.875 12.25 11.25 11.5 12.375 11.5C13.125 11.5 13.5 12 13.5 12.75V17H11.25V13.5C11.25 13.125 11.25 12.75 10.875 12.75C10.5 12.75 10.5 13.125 10.5 13.5V17H10.875ZM15.75 17V13.25C15.75 12.25 16.125 11.5 17.25 11.5C18 11.5 18.375 12 18.375 12.75V17H16.125V13.5C16.125 13.125 16.125 12.75 15.75 12.75C15.375 12.75 15.375 13.125 15.375 13.5V17H15.75Z" fill="#fff"/></svg>
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
