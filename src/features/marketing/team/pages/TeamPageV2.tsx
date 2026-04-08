import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaLinkedinIn, FaEnvelope } from 'react-icons/fa';
import { CtaSectionV2 } from '../../about/components/v2/CtaSectionV2';
import { MetaTags } from '../../../../core/components/MetaTags';
import person1 from '../../../../assets/img/person1.jpg';
import person2 from '../../../../assets/img/person2.png';
import person3 from '../../../../assets/img/person3.jpg';
import userPlaceholder from '../../../../assets/img/user.png';
import headerBg from '../../../../assets/img/DSC00400.jpg';

const TEAM_DEPARTMENTS = [
  {
    department: 'Leadership & Executive',
    description:
      'Visionary leaders guiding Darshan Transport to new heights in logistics.',
    members: [
      {
        name: 'Bishal Poudel',
        role: 'Founder & Managing Director',
        img: person1,
        description: 'Visionary leader with a decade of logistics experience.',
        social: {
          linkedin: '#',
          email: 'mailto:bishal@darshantransport.com',
        },
      },
      {
        name: 'Anup Acharya',
        role: 'Co-Founder & Director of Transport',
        img: person2,
        description:
          'Expert in fleet management and supply chain optimization.',
        social: {
          linkedin: '#',
          email: 'mailto:anup@darshantransport.com',
        },
      },
      {
        name: 'Bishnu Prasad Poudyal',
        role: 'Co-Founder & Financial Controller',
        img: person3,
        description:
          'Dedicated financial strategist ensuring sustainable growth.',
        social: {
          linkedin: '#',
          email: 'mailto:bishnu@darshantransport.com',
        },
      },
    ],
  },
  {
    department: 'Operations & Fleet Management',
    description:
      'The backbone of our timely deliveries and robust vehicle fleet.',
    members: [
      {
        name: 'Ram Kumar',
        role: 'Operations Head',
        img: userPlaceholder,
        description: 'Oversees daily cargo movement and national operations.',
        social: {
          linkedin: '#',
        },
      },
      {
        name: 'Hari Thapa',
        role: 'Fleet Manager',
        img: userPlaceholder,
        description: 'Maintains vehicle health and ensures safe transport.',
        social: {
          email: 'mailto:hari@darshantransport.com',
        },
      },
      {
        name: 'Sita Sharma',
        role: 'Logistics Coordinator',
        img: userPlaceholder,
        description: 'Synchronizes client requirements with field teams.',
        social: {},
      },
    ],
  },
  {
    department: 'Customer Service & Technology',
    description:
      'Connecting you to our services and providing top-notch tech solutions.',
    members: [
      {
        name: 'Arjun Karki',
        role: 'IT Director',
        img: userPlaceholder,
        description: 'Drives technological innovation and internal systems.',
        social: {
          linkedin: '#',
          email: 'mailto:arjun@darshantransport.com',
        },
      },
      {
        name: 'Rina Shrestha',
        role: 'Support Lead',
        img: userPlaceholder,
        description: 'Dedicated to resolving client queries quickly.',
        social: {
          email: 'mailto:support@darshantransport.com',
        },
      },
      {
        name: 'Binod Tamang',
        role: 'Client Relations',
        img: userPlaceholder,
        description: 'Builds lasting relationships with key stakeholders.',
        social: {
          linkedin: '#',
        },
      },
    ],
  },
];

const TEAM_PAGE_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Our Team - Darshan Transport',
  url: 'https://darshantransport.com/team/v2',
  description: 'Meet the dedicated team behind Darshan Transport.',
  publisher: {
    '@type': 'Organization',
    name: 'Darshan Transport',
  },
};

const HeroSectionTeam: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section
      ref={ref}
      className="relative w-full h-[60vh] min-h-[400px] overflow-hidden flex items-center justify-center"
    >
      <motion.div
        className="absolute inset-0 w-full h-full bg-center bg-cover"
        style={{ backgroundImage: `url(${headerBg})`, y: bgY }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 text-center px-4"
      >
        <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
          Behind The Wheel
        </span>
        <h1 className="text-white text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Meet Our Team
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto text-lg md:text-xl font-light">
          The brilliant minds and dedicated professionals ensuring your cargo
          always reaches its destination safely.
        </p>
      </motion.div>
    </section>
  );
};

export const TeamPageV2: React.FC = () => {
  return (
    <div className="team-page-wrapper bg-gray-50 min-h-screen font-sans">
      <MetaTags
        title="Meet Our Team | Darshan Transport"
        description="Meet the dedicated and experienced team behind Darshan Transport driving logistics excellence across Nepal."
        canonical="https://darshantransport.com/team/v2"
        structuredData={TEAM_PAGE_STRUCTURED_DATA}
      />

      <HeroSectionTeam />

      <main className="container mx-auto px-4 py-24 max-w-[1400px]">
        {TEAM_DEPARTMENTS.map((dept, deptIdx) => (
          <div
            key={deptIdx}
            className="mb-32 last:mb-10 lg:grid lg:grid-cols-12 lg:gap-12 items-start"
          >
            {/* Department Sticky Sidebar Area */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4 lg:sticky lg:top-32 text-left mb-12 lg:mb-0"
            >
              <div className="inline-flex items-center space-x-4 mb-4">
                <span className="h-1 w-12 bg-primary rounded-full"></span>
                <span className="text-primary font-bold uppercase tracking-widest text-sm">
                  Department
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
                {dept.department}
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                {dept.description}
              </p>
            </motion.div>

            {/* Members Grid Area */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {dept.members.map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl border border-gray-100/50 overflow-hidden transition-all duration-500"
                >
                  <div className="w-full h-80 relative overflow-hidden bg-gray-100">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700"
                    />

                    {/* Social/Contact Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      {member.social?.linkedin && (
                        <a
                          href={member.social.linkedin}
                          className="w-12 h-12 rounded-full bg-white/20 hover:bg-primary text-white flex items-center justify-center backdrop-blur-sm transition-colors duration-300"
                          aria-label={`${member.name}'s LinkedIn`}
                        >
                          <FaLinkedinIn size={20} />
                        </a>
                      )}
                      {member.social?.email && (
                        <a
                          href={member.social.email}
                          className="w-12 h-12 rounded-full bg-white/20 hover:bg-primary text-white flex items-center justify-center backdrop-blur-sm transition-colors duration-300"
                          aria-label={`Email ${member.name}`}
                        >
                          <FaEnvelope size={20} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="p-8 pb-10 text-center relative bg-white">
                    {/* Decorative Top Border */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-b-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary font-semibold mb-4 text-sm uppercase tracking-wider">
                      {member.role}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </main>

      <CtaSectionV2 />
    </div>
  );
};
