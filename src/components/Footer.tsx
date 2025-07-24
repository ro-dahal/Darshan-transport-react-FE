import React from 'react';
import logo from '../assets/img/logo.png';

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-column footer-logo">
        <img src={logo} alt="Darshan Transport Logo" className="logo" />
      </div>
      <div className="footer-column">
        <h4>Our team</h4>
        <ul>
          <li><a href="#">About us</a></li>
          <li><a href="#">Team</a></li>
          <li><a href="#">What we do</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <div className="footer-column">
        <h4>More</h4>
        <ul>
          <li><a href="#">Projects</a></li>
          <li><a href="#">Events</a></li>
          <li><a href="#">Blog</a></li>
        </ul>
      </div>
      <div className="footer-column">
        <h4>Connect</h4>
        <ul>
          <li><a href="#">Facebook</a></li>
          <li><a href="#">Instagram</a></li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <p>
        Copyright © 2024 Darshan Transport |
        <a href="#">Privacy Policy</a> |
        <a href="#">Terms & Conditions</a>
      </p>
    </div>
  </footer>
);

export default Footer;