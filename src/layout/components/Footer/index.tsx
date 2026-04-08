import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import logo from '../../../assets/img/logo1.png';
import { FOOTER_COLUMNS } from './footerLinks';
import { CONTACT_CONFIG } from '../../../core/config/contactConfig';
import { buildWhatsAppUrl } from '../../../core/utils/whatsapp';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  Facebook: <FaFacebook className="h-5 w-5" />,
  Instagram: <FaInstagram className="h-5 w-5" />,
  WhatsApp: <FaWhatsapp className="h-5 w-5" />,
  LinkedIn: <FaLinkedin className="h-5 w-5" />,
};

export const Footer: React.FC = () => {
  const companyCol = FOOTER_COLUMNS[0];
  const servicesCol = FOOTER_COLUMNS[1];
  const connectCol = FOOTER_COLUMNS[2];

  const socialLinks = connectCol.links.filter((l) => SOCIAL_ICONS[l.label]);
  const contactLinks = connectCol.links.filter((l) => !SOCIAL_ICONS[l.label]);

  return (
    <footer className="relative bg-[#0a0a0a] text-white overflow-hidden">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 sm:px-10 lg:px-20">
        {/* Main grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12"
        >
          {/* Brand column */}
          <motion.div custom={0} variants={fadeUp} className="lg:col-span-4">
            <img
              src={logo}
              alt="Darshan Transport Logo"
              loading="lazy"
              decoding="async"
              className="h-14 w-auto mb-5"
            />
            <p className="text-sm leading-relaxed text-white/50 max-w-xs mb-6">
              Nepal's trusted partner for warehousing, nationwide delivery, and
              3PL solutions. Reliable, safe, and on-time logistics for
              businesses of all sizes.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => {
                let href = link.href;
                if (link.label === 'WhatsApp')
                  href = buildWhatsAppUrl(CONTACT_CONFIG.whatsapp);

                return (
                  <a
                    key={link.label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/60 transition-all duration-200 hover:bg-primary/20 hover:text-primary hover:border-primary/30"
                  >
                    {SOCIAL_ICONS[link.label]}
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Company column */}
          <motion.div custom={1} variants={fadeUp} className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[3px] text-white/40 mb-5">
              {companyCol.title}
            </h4>
            <ul className="space-y-3">
              {companyCol.links.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/') ? (
                    <Link
                      to={link.href}
                      className="text-sm text-white/60 transition-colors duration-200 hover:text-primary no-underline"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-white/60 transition-colors duration-200 hover:text-primary no-underline"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services column */}
          <motion.div custom={2} variants={fadeUp} className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[3px] text-white/40 mb-5">
              {servicesCol.title}
            </h4>
            <ul className="space-y-3">
              {servicesCol.links.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/') ? (
                    <Link
                      to={link.href}
                      className="text-sm text-white/60 transition-colors duration-200 hover:text-primary no-underline"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-white/60 transition-colors duration-200 hover:text-primary no-underline"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact column */}
          <motion.div custom={3} variants={fadeUp} className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[3px] text-white/40 mb-5">
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${CONTACT_CONFIG.phone.replace(/\s/g, '')}`}
                  className="flex items-start gap-3 text-sm text-white/60 transition-colors duration-200 hover:text-primary no-underline group"
                >
                  <FaPhoneAlt className="h-4 w-4 mt-0.5 shrink-0 text-primary/60 group-hover:text-primary transition-colors" />
                  <span>{CONTACT_CONFIG.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_CONFIG.email}`}
                  className="flex items-start gap-3 text-sm text-white/60 transition-colors duration-200 hover:text-primary no-underline group"
                >
                  <FaEnvelope className="h-4 w-4 mt-0.5 shrink-0 text-primary/60 group-hover:text-primary transition-colors" />
                  <span>{CONTACT_CONFIG.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/60">
                <FaMapMarkerAlt className="h-4 w-4 mt-0.5 shrink-0 text-primary/60" />
                <span>{CONTACT_CONFIG.address}</span>
              </li>
              {contactLinks.map((link) => {
                // Skip phone/email since handled above
                if (link.label.startsWith('+977') || link.label.includes('@'))
                  return null;
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/60 transition-colors duration-200 hover:text-primary no-underline"
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="mt-14 h-px bg-white/[0.06]" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Darshan Transport. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy-policy"
              className="text-xs text-white/30 transition-colors duration-200 hover:text-white/60 no-underline"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-conditions"
              className="text-xs text-white/30 transition-colors duration-200 hover:text-white/60 no-underline"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
