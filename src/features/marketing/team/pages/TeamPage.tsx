import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CtaSection } from '../../about/components/CtaSection';
import { MetaTags } from '../../../../core/components/MetaTags';
import headerBg from '../../../../assets/img/company-hero-logistics-yard.jpg';
import placeholderImg from '../../../../assets/img/team-placeholder-user.png';

/* ------------------------------------------------------------------ */
/*  Types & Data                                                       */
/* ------------------------------------------------------------------ */

interface TeamMember {
  name: string;
  role: string;
}

interface Department {
  department: string;
  description: string;
  members: TeamMember[];
}

const TEAM_DEPARTMENTS: Department[] = [
  {
    department: 'Executive Leadership',
    description:
      'Visionary leaders guiding Darshan Transport towards excellence in logistics across Nepal.',
    members: [
      { name: 'Hari Bahadur Shrestha', role: 'Founder & Chairman' },
      { name: 'Arun Kumar Shrestha', role: 'Executive Director' },
      { name: 'Sukman Shrestha', role: 'Executive Member' },
      { name: 'Shrawan Kumar Shrestha', role: 'Executive Member' },
      { name: 'Ram Kumar Shrestha', role: 'Executive Member' },
      {
        name: 'Laxman Kumar Shrestha',
        role: 'Executive Member & Branch Head',
      },
      { name: 'Sandesh Shrestha', role: 'Executive Member' },
      { name: 'Sadeep Shrestha', role: 'Head of Operations & Technology' },
    ],
  },
  {
    department: 'Finance Department',
    description:
      'Managing billing, accounts, and financial operations that keep the business running smoothly.',
    members: [
      { name: 'Anjila Karki', role: 'Finance Head' },
      { name: 'Kamal Bahadur Dhami', role: 'Finance Assistant' },
      { name: 'Tik Maya Gurung', role: 'Finance Assistant' },
      { name: 'Puja Ghimire', role: 'Accounts & Operations Support' },
      { name: 'Kanchan Thapa', role: 'Billing & Collection Officer' },
      { name: 'Manoj Acharya', role: 'Billing & Collection Officer' },
    ],
  },
  {
    department: 'Operations & Dispatch',
    description:
      'The backbone of daily cargo movement — coordinating pickups, bookings, and dispatches across Nepal.',
    members: [
      { name: 'Anita Shrestha', role: 'Dispatch & Delivery Coordinator' },
      { name: 'Bikash Pariyar', role: 'Dispatch & Delivery Coordinator' },
      { name: 'Jagat Pun', role: 'Dispatch & Delivery Coordinator' },
      {
        name: 'Ram Prasad Gurung',
        role: 'Dispatch & Delivery Coordinator',
      },
      { name: 'Kripesh Shrestha', role: 'Booking Supervisor' },
      { name: 'Nandalal Pudasaini', role: 'Operations Supervisor' },
      { name: 'Sajan Gurung', role: 'Operations Supervisor' },
      {
        name: 'Bishal Prasad Yadav',
        role: 'Booking & Dispatch Executive',
      },
      { name: 'Rohit Gurung', role: 'Booking & Dispatch Executive' },
      { name: 'Sanjeev Chatri', role: 'Booking & Dispatch Executive' },
      {
        name: 'Sushil Kumar Nepal',
        role: 'Booking & Dispatch Executive',
      },
    ],
  },
  {
    department: 'Branch Operations',
    description:
      'Leading regional branches to ensure consistent service quality across the country.',
    members: [
      { name: 'Deepak Lamichhane', role: 'Branch Manager' },
      { name: 'Govinda Shrestha', role: 'Branch Manager' },
      { name: 'Rajesh Patel', role: 'Branch Manager' },
    ],
  },
  {
    department: 'Dispatch Supervisors',
    description:
      'Overseeing branch-level dispatch operations and ensuring timely cargo movement.',
    members: [
      {
        name: 'Chandra Bahadur Magar',
        role: 'Branch Dispatch Supervisor',
      },
      { name: 'Lalu K.C', role: 'Branch Dispatch Supervisor' },
      { name: 'Raj Kumar Shrestha', role: 'Branch Dispatch Supervisor' },
      { name: 'Sobita Thapa', role: 'Branch Dispatch Supervisor' },
      { name: 'Suman Darai', role: 'Branch Dispatch Supervisor' },
      { name: 'Thaneshwor Gaudel', role: 'Branch Dispatch Supervisor' },
      { name: 'Baburam Shrestha', role: 'Branch Dispatch Supervisor' },
    ],
  },
  {
    department: 'Fleet Management',
    description:
      'Keeping our vehicles running safely and reliably through expert maintenance.',
    members: [
      { name: 'Nur Islam Hawari', role: 'Lead Mechanic' },
      { name: 'Esrafil Alam', role: 'Mechanic' },
    ],
  },
  {
    department: 'IT & Digital Team',
    description:
      'Driving technology, design, and digital growth for Darshan Transport.',
    members: [
      { name: 'Subin Gurung', role: 'Lead Developer' },
      { name: 'Rohan Dahal', role: 'UI/UX & Creative Designer' },
      {
        name: 'Sharon Shrestha',
        role: 'Digital Marketing & Content Manager',
      },
      { name: 'Susam Thapa', role: 'QA & Support Engineer' },
    ],
  },
  {
    department: 'Support Staff',
    description:
      'Ensuring smooth day-to-day office operations and workplace support.',
    members: [
      { name: 'Bhesh Maya Gurung', role: 'Office Assistant' },
      { name: 'Urmila Lama', role: 'Office Assistant' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Structured Data                                                    */
/* ------------------------------------------------------------------ */

const TEAM_PAGE_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Our Team - Darshan Transport',
  url: 'https://darshantransport.com/team',
  description:
    'Meet the dedicated team behind Darshan Transport — 45+ professionals driving logistics excellence across Nepal.',
  publisher: {
    '@type': 'Organization',
    name: 'Darshan Transport',
  },
};

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

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
          Our People
        </span>
        <h1 className="text-white text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Meet Our Team
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto text-lg md:text-xl font-light">
          The dedicated professionals ensuring your cargo always reaches its
          destination safely — across every department and every route in Nepal.
        </p>
      </motion.div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export const TeamPage: React.FC = () => {
  return (
    <div className="team-page-wrapper bg-gray-50 min-h-screen font-sans">
      <MetaTags
        title="Meet Our Team | Darshan Transport"
        description="Meet the 45+ dedicated professionals behind Darshan Transport driving logistics excellence across Nepal."
        canonical="https://darshantransport.com/team"
        structuredData={TEAM_PAGE_STRUCTURED_DATA}
      />

      <HeroSectionTeam />

      <main className="container mx-auto px-4 py-24 max-w-[1400px]">
        {TEAM_DEPARTMENTS.map((dept, deptIdx) => {
          return (
            <div
              key={deptIdx}
              className="mb-24 last:mb-10 lg:grid lg:grid-cols-12 lg:gap-12 items-start"
            >
              {/* Department Sticky Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-4 lg:sticky lg:top-32 text-left mb-10 lg:mb-0"
              >
                <div className="inline-flex items-center space-x-4 mb-4">
                  <span className="h-1 w-12 bg-primary rounded-full" />
                  <span className="text-primary font-bold uppercase tracking-widest text-sm">
                    Department
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
                  {dept.department}
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-3">
                  {dept.description}
                </p>
                <span className="inline-block text-sm font-semibold text-gray-400">
                  {dept.members.length}{' '}
                  {dept.members.length === 1 ? 'member' : 'members'}
                </span>
              </motion.div>

              {/* Members Grid */}
              <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {dept.members.map((member, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{
                      duration: 0.4,
                      delay: Math.min(idx * 0.05, 0.4),
                    }}
                    className="group bg-white rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-xl overflow-hidden transition-all duration-300"
                  >
                    {/* Portrait */}
                    <div className="w-full aspect-[3/4] overflow-hidden bg-gray-100">
                      <img
                        src={placeholderImg}
                        alt={member.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Info */}
                    <div className="p-4 text-center">
                      <div className="w-8 h-0.5 bg-primary mx-auto mb-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <h3 className="font-bold text-gray-900 text-sm leading-snug">
                        {member.name}
                      </h3>
                      <p className="text-primary font-medium text-xs mt-1 leading-tight">
                        {member.role}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </main>

      <CtaSection />
    </div>
  );
};
