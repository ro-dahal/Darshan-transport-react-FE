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
            {column.links.map((link) => (
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
