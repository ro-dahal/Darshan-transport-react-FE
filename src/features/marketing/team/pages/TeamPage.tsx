import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CtaSection } from '../../about/components/CtaSection';
import { MetaTags } from '../../../../core/components/MetaTags';

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */

const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.1,
      ease: easeOut,
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardFade = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

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
  icon: string;
  members: TeamMember[];
}

const TEAM_DEPARTMENTS: Department[] = [
  {
    department: 'Executive Leadership',
    description:
      'Visionary leaders guiding Darshan Transport towards excellence in logistics across Nepal.',
    icon: '👑',
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
    icon: '💰',
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
    icon: '🚛',
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
    icon: '🏢',
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
    icon: '📋',
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
    icon: '🔧',
    members: [
      { name: 'Nur Islam Hawari', role: 'Lead Mechanic' },
      { name: 'Esrafil Alam', role: 'Mechanic' },
    ],
  },
  {
    department: 'IT & Digital Team',
    description:
      'Driving technology, design, and digital growth for Darshan Transport.',
    icon: '💻',
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
    icon: '🤝',
    members: [
      { name: 'Bhesh Maya Gurung', role: 'Office Assistant' },
      { name: 'Urmila Lama', role: 'Office Assistant' },
    ],
  },
];

const TOTAL_MEMBERS = TEAM_DEPARTMENTS.reduce(
  (acc, d) => acc + d.members.length,
  0
);

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

const HeroSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const decorY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section
      ref={ref}
      className="relative w-full py-32 bg-[#1a1a1a] overflow-hidden max-md:py-20"
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Decorative circle */}
      <motion.div
        style={{ y: decorY }}
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 -translate-y-1/2 translate-x-1/4"
      />
      <motion.div
        style={{ y: decorY }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/3 translate-y-1/2 -translate-x-1/4"
      />

      <div className="max-w-[1200px] mx-auto px-8 relative z-10 max-md:px-5">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-primary text-sm font-semibold tracking-[3px] uppercase mb-4"
        >
          Our People
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-white text-[3.5rem] leading-[1.1] font-extrabold max-w-[650px] max-lg:text-[2.6rem] max-md:text-[2rem]"
        >
          The People Behind{' '}
          <span className="text-primary">Darshan Transport</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-5 text-white/60 text-lg max-w-[520px] leading-relaxed max-md:text-base"
        >
          {TOTAL_MEMBERS}+ dedicated professionals ensuring your cargo reaches
          its destination safely — across every route in Nepal.
        </motion.p>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Stats Banner                                                       */
/* ------------------------------------------------------------------ */

const STATS = [
  { value: `${TOTAL_MEMBERS}+`, label: 'Team Members' },
  { value: `${TEAM_DEPARTMENTS.length}`, label: 'Departments' },
  { value: '3', label: 'Regional Branches' },
  { value: '25+', label: 'Years Combined' },
];

const StatsBanner: React.FC = () => (
  <section className="relative -mt-10 z-20 px-8 max-md:px-5">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="max-w-[1000px] mx-auto bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-gray-100 grid grid-cols-4 max-md:grid-cols-2 divide-x divide-gray-100 max-md:divide-x-0"
    >
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          variants={fadeUp}
          custom={i}
          className="py-8 px-6 text-center max-md:py-6 max-md:border-b max-md:border-gray-100 last:border-b-0"
        >
          <p className="text-[2rem] font-extrabold text-[#1a1a1a] leading-none max-md:text-[1.6rem]">
            {stat.value}
          </p>
          <p className="mt-2 text-sm text-text-medium font-medium">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Department Nav Pills                                               */
/* ------------------------------------------------------------------ */

const DepartmentNav: React.FC<{
  activeIdx: number;
  onSelect: (idx: number) => void;
}> = ({ activeIdx, onSelect }) => (
  <div className="sticky top-[90px] z-30 bg-white/90 backdrop-blur-md border-b border-gray-100">
    <div className="max-w-[1200px] mx-auto px-8 max-md:px-4">
      <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
        {TEAM_DEPARTMENTS.map((dept, i) => (
          <button
            key={dept.department}
            onClick={() => onSelect(i)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border cursor-pointer ${
              activeIdx === i
                ? 'bg-primary text-white border-primary shadow-sm'
                : 'bg-transparent text-text-medium border-gray-200 hover:border-primary/40 hover:text-[#1a1a1a]'
            }`}
          >
            <span className="mr-1.5">{dept.icon}</span>
            {dept.department}
          </button>
        ))}
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Member Initials Avatar                                             */
/* ------------------------------------------------------------------ */

const AVATAR_COLORS = [
  'bg-primary/12 text-primary',
  'bg-secondary/12 text-secondary',
  'bg-emerald-100 text-emerald-700',
  'bg-rose-100 text-rose-700',
  'bg-violet-100 text-violet-700',
  'bg-amber-100 text-amber-700',
  'bg-sky-100 text-sky-700',
  'bg-teal-100 text-teal-700',
];

const getInitials = (name: string) => {
  const parts = name.split(' ');
  if (parts.length >= 2)
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  return name.slice(0, 2).toUpperCase();
};

const getColorClass = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

/* ------------------------------------------------------------------ */
/*  Executive Leadership Section (Featured)                            */
/* ------------------------------------------------------------------ */

const ExecutiveSection: React.FC<{ department: Department }> = ({
  department,
}) => (
  <section className="py-20 px-8 max-md:py-14 max-md:px-5">
    <div className="max-w-[1200px] mx-auto">
      {/* Section header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="text-center mb-14 max-md:mb-10"
      >
        <motion.span
          variants={fadeUp}
          custom={0}
          className="inline-block text-primary text-xs font-bold tracking-[0.22em] uppercase mb-4 bg-primary/8 px-4 py-1.5 rounded-full"
        >
          {department.department}
        </motion.span>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="text-[2.4rem] font-extrabold leading-[1.12] text-[#1a1a1a] max-md:text-[1.8rem]"
        >
          Guiding <span className="text-primary">Vision & Strategy</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-4 text-text-medium text-base max-w-[560px] mx-auto leading-[1.7]"
        >
          {department.description}
        </motion.p>
      </motion.div>

      {/* Executive cards - prominent layout */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-4 gap-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1"
      >
        {department.members.map((member, idx) => (
          <motion.div
            key={member.name}
            variants={cardFade}
            className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary/30 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(252,175,23,0.1)] transition-all duration-500"
          >
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/60 group-hover:via-primary group-hover:to-primary/60 transition-all duration-500" />

            {/* Avatar */}
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold mb-5 ${getColorClass(member.name)} transition-all duration-300 ring-1 ring-gray-100 group-hover:ring-primary/20`}
            >
              {getInitials(member.name)}
            </div>

            {/* Rank number */}
            <span className="absolute top-4 right-5 text-[2.5rem] font-black text-gray-100 leading-none select-none pointer-events-none group-hover:text-primary/8 transition-colors duration-500">
              {String(idx + 1).padStart(2, '0')}
            </span>

            <h3 className="text-[1rem] font-bold text-[#1a1a1a] leading-snug mb-1.5">
              {member.name}
            </h3>
            <p className="text-sm text-text-medium leading-tight">
              {member.role}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Department Section (Compact)                                       */
/* ------------------------------------------------------------------ */

const DepartmentSection: React.FC<{
  department: Department;
  index: number;
}> = ({ department, index }) => {
  const isEven = index % 2 === 0;

  return (
    <section
      id={`dept-${index}`}
      className={`py-20 px-8 max-md:py-14 max-md:px-5 ${isEven ? 'bg-white' : 'bg-[#fafaf8]'}`}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-start">
          {/* Department info - left side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="lg:col-span-4 lg:sticky lg:top-40 mb-10 lg:mb-0"
          >
            <span className="text-3xl mb-4 block">{department.icon}</span>
            <h2 className="text-[1.8rem] font-extrabold text-[#1a1a1a] leading-tight mb-3 max-md:text-[1.5rem]">
              {department.department}
            </h2>
            <p className="text-text-medium text-[0.92rem] leading-[1.7] mb-4">
              {department.description}
            </p>
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-sm font-bold text-primary">
                {department.members.length}{' '}
                {department.members.length === 1 ? 'member' : 'members'}
              </span>
            </div>
          </motion.div>

          {/* Members list - right side */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {department.members.map((member) => (
              <motion.div
                key={member.name}
                variants={cardFade}
                className="group flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-100 hover:border-primary/25 hover:shadow-md transition-all duration-300"
              >
                {/* Initials avatar */}
                <div
                  className={`w-11 h-11 rounded-lg flex-shrink-0 flex items-center justify-center text-sm font-bold ${getColorClass(member.name)} group-hover:scale-105 transition-transform duration-300`}
                >
                  {getInitials(member.name)}
                </div>

                {/* Info */}
                <div className="min-w-0">
                  <h3 className="text-[0.92rem] font-bold text-[#1a1a1a] leading-snug truncate">
                    {member.name}
                  </h3>
                  <p className="text-xs text-text-medium mt-0.5 leading-tight truncate">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Team Overview Section (all departments at a glance)                */
/* ------------------------------------------------------------------ */

const TeamOverview: React.FC = () => (
  <section className="py-20 px-8 bg-[#1a1a1a] max-md:py-14 max-md:px-5">
    <div className="max-w-[1200px] mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="text-center mb-14"
      >
        <motion.p
          variants={fadeUp}
          custom={0}
          className="text-primary text-sm font-semibold tracking-[3px] uppercase"
        >
          Organization
        </motion.p>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mt-3 text-[2.4rem] font-extrabold text-white max-md:text-[1.8rem]"
        >
          How We&apos;re Organized
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-4 text-white/50 text-base max-w-[520px] mx-auto leading-[1.7]"
        >
          Each team plays a critical role in ensuring seamless logistics across
          Nepal.
        </motion.p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1"
      >
        {TEAM_DEPARTMENTS.slice(1).map((dept) => (
          <motion.div
            key={dept.department}
            variants={cardFade}
            className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-primary/30 hover:bg-white/8 transition-all duration-400"
          >
            <span className="text-2xl mb-3 block">{dept.icon}</span>
            <h3 className="text-white font-bold text-[0.95rem] mb-1.5">
              {dept.department}
            </h3>
            <p className="text-white/40 text-sm leading-[1.6] mb-3">
              {dept.description.length > 80
                ? dept.description.slice(0, 80) + '…'
                : dept.description}
            </p>
            <span className="text-primary text-xs font-bold">
              {dept.members.length} members
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export const TeamPage: React.FC = () => {
  const [activeDept, setActiveDept] = useState(0);

  const handleNavSelect = (idx: number) => {
    setActiveDept(idx);
    const el = document.getElementById(`dept-${idx}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="team-page-wrapper bg-white min-h-screen font-sans">
      <MetaTags
        title="Meet Our Team | Darshan Transport"
        description="Meet the 45+ dedicated professionals behind Darshan Transport driving logistics excellence across Nepal."
        canonical="https://darshantransport.com/team"
        structuredData={TEAM_PAGE_STRUCTURED_DATA}
      />

      <HeroSection />
      <StatsBanner />

      {/* Executive Leadership - featured section */}
      <div id="dept-0">
        <ExecutiveSection department={TEAM_DEPARTMENTS[0]} />
      </div>

      {/* Organization overview */}
      <TeamOverview />

      {/* Department nav */}
      <DepartmentNav activeIdx={activeDept} onSelect={handleNavSelect} />

      {/* All other departments */}
      {TEAM_DEPARTMENTS.slice(1).map((dept, i) => (
        <DepartmentSection
          key={dept.department}
          department={dept}
          index={i + 1}
        />
      ))}

      <CtaSection />
    </div>
  );
};
