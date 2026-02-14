import React from 'react';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa';
import type { ContactChannel, SocialLink } from '../data/contactInfo';

const CONTACT_ICONS: Record<ContactChannel['icon'], React.ReactElement> = {
  email: <FaEnvelope className="text-[1.3rem] mb-1.5" />,
  phone: <FaPhone className="text-[1.3rem] mb-1.5" />,
  location: <FaMapMarkerAlt className="text-[1.3rem] mb-1.5" />,
  // fallback or other icons if added
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

export const ContactCard: React.FC<ContactCardProps> = ({
  channels,
  socialLinks,
}) => (
  <aside className="bg-primary text-white rounded-md p-7 px-5 text-center max-[900px]:order-2 h-fit">
    <h2 className="m-[0_0_12px] text-[1.8rem] font-bold">Get in touch!</h2>
    <p className="m-[0_0_25px] text-base">We’d love to hear from you.</p>

    {channels.map((channel) => (
      <div key={channel.label} className="mb-[22px] flex flex-col items-center">
        {CONTACT_ICONS[channel.icon]}
        <div className="opacity-90">{channel.label}</div>
        <div className="font-medium text-lg">{channel.value}</div>
      </div>
    ))}

    <div className="mt-6 text-[1.3rem] flex justify-center gap-[30px]">
      {socialLinks.map((link) => (
        <a
          key={link.key}
          href={link.href}
          aria-label={link.label}
          className="text-inherit cursor-pointer hover:text-white/80 hover:scale-110 transition-all"
        >
          {SOCIAL_ICON_MAP[link.key]}
        </a>
      ))}
    </div>
  </aside>
);
