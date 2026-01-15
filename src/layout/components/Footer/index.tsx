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
        <div className={`footer-column${column.title === 'Services' ? ' footer-column-services' : ''}`} key={column.title}>
          <h4>{column.title}</h4>
          <ul>
            {column.title === 'Connect'
              ? column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                      {link.label === 'Facebook' && (
                        <span className="footer-social-icon">
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 10.995 10.125 11.854v-8.385H7.078v-3.47h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.953.926-1.953 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.068 24 18.092 24 12.073z" fill="#1877F3"/>
                            <path d="M16.671 15.543l.532-3.47h-3.328v-2.25c0-.948.462-1.874 1.953-1.874h1.513V5.979s-1.374-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669v2.089H7.078v3.47h3.047v8.385a12.07 12.07 0 0 0 3.75 0v-8.385h2.796z" fill="#fff"/>
                          </svg>
                        </span>
                      )}
                      {link.label === 'Instagram' && (
                        <span className="footer-social-icon">
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                              <linearGradient id="instagram-gradient" x1="0.5" y1="0" x2="0.5" y2="1">
                                <stop offset="0%" stopColor="#f9ce34" />
                                <stop offset="50%" stopColor="#ee2a7b" />
                                <stop offset="100%" stopColor="#6228d7" />
                              </linearGradient>
                            </defs>
                            <rect width="24" height="24" rx="6" fill="url(#instagram-gradient)" />
                            <path d="M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6zm0 7.8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6.4-8.1a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0z" fill="#fff"/>
                            <path d="M21.6 6.4a5.2 5.2 0 0 0-1.44-3.68A5.2 5.2 0 0 0 16.48 1.6C15.12 1.2 12 1.2 12 1.2s-3.12 0-4.48.4A5.2 5.2 0 0 0 3.84 2.72 5.2 5.2 0 0 0 2.4 6.4C2 7.76 2 10.88 2 10.88s0 3.12.4 4.48a5.2 5.2 0 0 0 1.44 3.68 5.2 5.2 0 0 0 3.68 1.44c1.36.4 4.48.4 4.48.4s3.12 0 4.48-.4a5.2 5.2 0 0 0 3.68-1.44 5.2 5.2 0 0 0 1.44-3.68c.4-1.36.4-4.48.4-4.48s0-3.12-.4-4.48zM12 17.6a5.6 5.6 0 1 1 0-11.2 5.6 5.6 0 0 1 0 11.2z" fill="#fff" fillOpacity="0.3"/>
                          </svg>
                        </span>
                      )}
                      {link.label === 'WhatsApp' && (
                        <span className="footer-social-icon">
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" fill="#25D366"/>
                          </svg>
                        </span>
                      )}
                      {link.label === 'LinkedIn' && (
                        <span className="footer-social-icon">
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" rx="4" fill="#0A66C2"/>
                            <path d="M6.94 6.5a1.44 1.44 0 1 1 0 2.88 1.44 1.44 0 0 1 0-2.88ZM8.18 9.75H5.7V18h2.48V9.75ZM12.25 13.13c0-.97.44-1.53 1.29-1.53.8 0 1.18.56 1.18 1.53V18h2.48v-5.13c0-2.13-1.14-3.12-2.66-3.12-1.23 0-1.78.68-2.09 1.16v-1H9.1V18h2.48v-4.87ZM18.3 7.5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z" fill="#fff"/>
                          </svg>
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
