import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import type { ContactChannel, SocialLink } from '../data/contactInfo';

const CONTACT_ICONS: Record<ContactChannel['icon'], React.ReactElement> = {
  email: <FaEnvelope style={{ fontSize: '1.3rem', marginBottom: 6 }} />,
  phone: <FaPhone style={{ fontSize: '1.3rem', marginBottom: 6 }} />,
  location: <FaMapMarkerAlt style={{ fontSize: '1.3rem', marginBottom: 6 }} />,
};

const SOCIAL_ICON_MAP: Record<SocialLink['key'], React.ReactElement> = {
  facebook: <FaFacebook />,
  linkedin: <FaLinkedin />,
  instagram: <FaInstagram />,
  youtube: <FaYoutube />,
};

export interface ContactCardProps {
  channels: ContactChannel[];
  socialLinks: SocialLink[];
}

export const ContactCard: React.FC<ContactCardProps> = ({ channels, socialLinks }) => (
  <aside className="order-contact-box">
    <h2 style={{ margin: '0 0 12px', fontSize: '1.8rem', fontWeight: 'bold' }}>Get in touch!</h2>
    <p style={{ margin: '0 0 25px', fontSize: '1rem' }}>We’d love to hear from you.</p>

    {channels.map((channel) => (
      <div key={channel.label} style={{ marginBottom: 22 }}>
        {CONTACT_ICONS[channel.icon]}
        <div>{channel.label}</div>
        <div style={{ fontWeight: 500 }}>{channel.value}</div>
      </div>
    ))}

    <div
      style={{
        marginTop: 24,
        fontSize: '1.3rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
      }}
    >
      {socialLinks.map((link) => (
        <a key={link.key} href={link.href} aria-label={link.label} style={{ color: 'inherit', cursor: 'pointer' }}>
          {SOCIAL_ICON_MAP[link.key]}
        </a>
      ))}
    </div>
  </aside>
);
