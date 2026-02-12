import { CONTACT_CONFIG } from "../../../../core/config/contactConfig";

export const ContactIntro: React.FC = () => (
  <div className="contact-info">
    <h2 className="about-us-header">Contact Us</h2>
    <p>We’re here to help you with all your logistics and transport needs.</p>
    <ul>
      <li>
        <strong>Address:</strong> {CONTACT_CONFIG.address}
      </li>
      <li>
        <strong>Phone:</strong> {CONTACT_CONFIG.phoneDisplay}
      </li>
      <li>
        <strong>Email:</strong> {CONTACT_CONFIG.email}
      </li>
    </ul>
  </div>
);
