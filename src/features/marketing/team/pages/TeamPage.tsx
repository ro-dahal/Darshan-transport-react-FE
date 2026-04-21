import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CtaSection } from '../../about/components/CtaSection';
import { MetaTags } from '../../../../core/components/MetaTags';
import { DevImageEditorPanel } from '../../shared/dev-image-editor/DevImageEditorPanel';
import {
  getImageTransformStyle,
  normalizeImageTransform,
} from '../../shared/dev-image-editor/imageTransformUtils';
import financeDepartmentHeader from '@assets/generated/marketing/team/team-finance-department-header.webp';
import teamDemoMember1Portrait from '@assets/marketing/team/team-demo-member-1.jpg';
import teamDemoMember2Portrait from '@assets/marketing/team/team-demo-member-2.jpg';
import arunKumarShresthaPortrait from '@assets/marketing/team/arun-kumar-shrestha.jpg';
import ramKumarShresthaPortrait from '@assets/marketing/team/ram-kumar-shrestha.jpg';
import laxmanKumarShresthaPortrait from '@assets/marketing/team/laxman-kumar-shrestha.jpg';
import sadeepShresthaPortrait from '@assets/marketing/team/sadeep-shrestha.jpg';
import anjilaKarkiPortrait from '@assets/marketing/team/anjila-karki.jpg';
import kamalBahadurDhamiPortrait from '@assets/marketing/team/kamal-bahadur-dhami.jpg';
import kanchanThapaPortrait from '@assets/marketing/team/kanchan-thapa.jpg';
import kripeshShresthaPortrait from '@assets/marketing/team/kripesh-shrestha.jpg';
import subinGurungPortrait from '@assets/marketing/team/subin-gurung.jpg';
import rohanDahalPortrait from '@assets/marketing/team/rohan-dahal.jpg';
import sharonShresthaPortrait from '@assets/marketing/team/sharon-shrestha.jpg';
import susamThapaPortrait from '@assets/marketing/team/susam-thapa.jpg';
import founderHariBahadurShresthaPortrait from '@assets/marketing/team/team-founder-hari-bahadur-shrestha.jpg';
import {
  buildDepartmentTargetId,
  buildMemberTargetId,
  getTeamImageKindLabel,
  type TeamDepartment as Department,
  type TeamImageSelection as DevEditorSelection,
  type TeamMember,
} from '../teamImageEditorUtils';
import {
  useTeamImageDevEditor,
  type TeamImageDevEditor,
} from '../useTeamImageDevEditor';
import teamOperationsDispatchHeader from '@assets/generated/marketing/team/team-operations-dispatch-header.webp';
import tikMayaGurungPortrait from '@assets/marketing/team/tik-maya-gurung.jpg';
import sajanGurungPortrait from '@assets/marketing/team/sajan-gurung.jpg';
import nandalalPudasainiPortrait from '@assets/marketing/team/nandalal-pudasaini.jpg';
import rohitGurungPortrait from '@assets/marketing/team/rohit-gurung.jpg';
import ramPrasadGurungPortrait from '@assets/marketing/team/ram-prasad-gurung.jpg';
import laluKCPortrait from '@assets/marketing/team/lalu-k-c.jpg';
import anitaShresthaPortrait from '@assets/marketing/team/anita-shrestha.jpg';
import sobitaThapaPortrait from '@assets/marketing/team/sobita-thapa.jpg';
import thaneshworGaudelPortrait from '@assets/marketing/team/thaneshwor-gaudel.jpg';
import rajKumarShresthaPortrait from '@assets/marketing/team/raj-kumar-shrestha.jpg';
import teamItDigitalTeamHeader from '@assets/generated/marketing/team/team-it-digital-team-header.webp';
import pujaGhimirePortrait from '@assets/marketing/team/puja-ghimire.jpg';
import teamBranchOperationsHeader from '@assets/generated/marketing/team/team-branch-operations-header.webp';
import teamDispatchSupervisorsHeader from '@assets/generated/marketing/team/team-dispatch-supervisors-header.webp';
import teamFleetManagementHeader from '@assets/generated/marketing/team/team-fleet-management-header.webp';
import teamSupportStaffHeader from '@assets/generated/marketing/team/team-support-staff-header.webp';

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
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

/* ------------------------------------------------------------------ */
/*  Team Data                                                          */
/* ------------------------------------------------------------------ */

const TEAM_DEPARTMENTS: Department[] = [
  {
    department: 'Executive Leadership',
    description:
      'Visionary leaders guiding Darshan Transport towards excellence in logistics across Nepal.',
    icon: '👑',
    members: [
      {
        name: 'Hari Bahadur Shrestha',
        role: 'Founder & Chairman',
        portraitSrc: founderHariBahadurShresthaPortrait,
        portraitAssetPath:
          'src/assets/marketing/team/team-founder-hari-bahadur-shrestha.jpg',
        portraitAlt: 'Portrait of Hari Bahadur Shrestha',
      },
      {
        name: 'Arun Kumar Shrestha',
        role: 'Executive Director',
        portraitSrc: arunKumarShresthaPortrait,
        portraitAssetPath: 'src/assets/marketing/team/arun-kumar-shrestha.jpg',
        portraitAlt: 'Portrait of Arun Kumar Shrestha',
      },
      {
        name: 'Sukman Shrestha',
        role: 'Executive Member',
        portraitSrc: teamDemoMember1Portrait,
        portraitAssetPath: 'src/assets/marketing/team/team-demo-member-1.jpg',
        portraitAlt: 'Portrait of Sukman Shrestha',
      },
      { name: 'Shrawan Kumar Shrestha', role: 'Executive Member' },
      {
        name: 'Ram Kumar Shrestha',
        role: 'Executive Member',
        portraitSrc: ramKumarShresthaPortrait,
        portraitAssetPath: 'src/assets/marketing/team/ram-kumar-shrestha.jpg',
        portraitAlt: 'Portrait of Ram Kumar Shrestha',
      },
      {
        name: 'Laxman Kumar Shrestha',
        role: 'Executive Member & Branch Head',
        portraitSrc: laxmanKumarShresthaPortrait,
        portraitAssetPath:
          'src/assets/marketing/team/laxman-kumar-shrestha.jpg',
        portraitAlt: 'Portrait of Laxman Kumar Shrestha',
      },
      { name: 'Sandesh Shrestha', role: 'Executive Member' },
      {
        name: 'Sadeep Shrestha',
        role: 'Head of Operations & Technology',
        portraitSrc: sadeepShresthaPortrait,
        portraitAssetPath: 'src/assets/marketing/team/sadeep-shrestha.jpg',
        portraitAlt: 'Portrait of Sadeep Shrestha',
      },
    ],
  },
  {
    department: 'Finance Department',
    description:
      'Managing billing, accounts, and financial operations that keep the business running smoothly.',
    icon: '💰',
    headerImageSrc: financeDepartmentHeader,
    headerImageAssetPath:
      'src/assets/generated/marketing/team/team-finance-department-header.webp',
    headerImageAlt: 'Finance department header',
    members: [
      {
        name: 'Anjila Karki',
        role: 'Finance Head',
        portraitSrc: anjilaKarkiPortrait,
        portraitAssetPath: 'src/assets/marketing/team/anjila-karki.jpg',
        portraitAlt: 'Portrait of Anjila Karki',
        portraitTransform: {
          xPercent: 11.3,
          yPercent: -16.33,
          scale: 1,
        },
      },
      {
        name: 'Kamal Bahadur Dhami',
        role: 'Finance Assistant',
        portraitSrc: kamalBahadurDhamiPortrait,
        portraitAssetPath: 'src/assets/marketing/team/kamal-bahadur-dhami.jpg',
        portraitAlt: 'Portrait of Kamal Bahadur Dhami',
        portraitTransform: {
          xPercent: 2.82,
          yPercent: -30.66,
          scale: 1,
        },
      },
      {
        name: 'Tik Maya Gurung',
        role: 'Finance Assistant',
        portraitSrc: tikMayaGurungPortrait,
        portraitAssetPath: 'src/assets/marketing/team/tik-maya-gurung.jpg',
        portraitTransform: {
          xPercent: 2.05,
          yPercent: -35.67,
          scale: 1,
        },
      },
      {
        name: 'Puja Ghimire',
        role: 'Accounts & Operations Support',
        portraitSrc: pujaGhimirePortrait,
        portraitAssetPath: 'src/assets/marketing/team/puja-ghimire.jpg',
        portraitTransform: {
          xPercent: 1.03,
          yPercent: -24.33,
          scale: 1,
        },
      },
      {
        name: 'Kanchan Thapa',
        role: 'Billing & Collection Officer',
        portraitSrc: kanchanThapaPortrait,
        portraitAssetPath: 'src/assets/marketing/team/kanchan-thapa.jpg',
        portraitAlt: 'Portrait of Kanchan Thapa',
        portraitTransform: {
          xPercent: 1.28,
          yPercent: -19,
          scale: 1,
        },
      },
      { name: 'Manoj Acharya', role: 'Billing & Collection Officer' },
    ],
  },
  {
    department: 'Operations & Dispatch',
    description:
      'The backbone of daily cargo movement, coordinating pickups, bookings, and dispatches across Nepal.',
    icon: '🚛',
    headerImageSrc: teamOperationsDispatchHeader,
    headerImageAssetPath:
      'src/assets/generated/marketing/team/team-operations-dispatch-header.webp',
    members: [
      {
        name: 'Anita Shrestha',
        role: 'Dispatch & Delivery Coordinator',
        portraitSrc: anitaShresthaPortrait,
        portraitAssetPath: 'src/assets/marketing/team/anita-shrestha.jpg',
        portraitTransform: {
          xPercent: 3.6,
          yPercent: -34.33,
          scale: 1,
        },
      },
      { name: 'Bikash Pariyar', role: 'Dispatch & Delivery Coordinator' },
      { name: 'Jagat Pun', role: 'Dispatch & Delivery Coordinator' },
      { name: 'Krishna Karki', role: 'Booking Supervisor' },
      {
        name: 'Ram Prasad Gurung',
        role: 'Dispatch & Delivery Coordinator',
        portraitSrc: ramPrasadGurungPortrait,
        portraitAssetPath: 'src/assets/marketing/team/ram-prasad-gurung.jpg',
        portraitTransform: {
          xPercent: 1.54,
          yPercent: -19,
          scale: 1,
        },
      },
      {
        name: 'Kripesh Shrestha',
        role: 'Booking Supervisor',
        portraitSrc: kripeshShresthaPortrait,
        portraitAssetPath: 'src/assets/marketing/team/kripesh-shrestha.jpg',
        portraitAlt: 'Portrait of Kripesh Shrestha',
        portraitTransform: {
          xPercent: 4.37,
          yPercent: -31.33,
          scale: 1,
        },
      },
      {
        name: 'Nandalal Pudasaini',
        role: 'Operations Supervisor',
        portraitSrc: nandalalPudasainiPortrait,
        portraitAssetPath: 'src/assets/marketing/team/nandalal-pudasaini.jpg',
        portraitTransform: {
          xPercent: 0.51,
          yPercent: -19.33,
          scale: 1,
        },
      },
      {
        name: 'Sajan Gurung',
        role: 'Operations Supervisor',
        portraitSrc: sajanGurungPortrait,
        portraitAssetPath: 'src/assets/marketing/team/sajan-gurung.jpg',
        portraitTransform: {
          xPercent: 8.73,
          yPercent: -43.33,
          scale: 1,
        },
      },
      {
        name: 'Bishal Prasad Yadav',
        role: 'Booking & Dispatch Executive',
      },
      {
        name: 'Rohit Gurung',
        role: 'Booking & Dispatch Executive',
        portraitSrc: rohitGurungPortrait,
        portraitAssetPath: 'src/assets/marketing/team/rohit-gurung.jpg',
        portraitTransform: {
          xPercent: 6.94,
          yPercent: -28,
          scale: 1,
        },
      },
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
    headerImageSrc: teamBranchOperationsHeader,
    headerImageAssetPath:
      'src/assets/generated/marketing/team/team-branch-operations-header.webp',
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
    headerImageSrc: teamDispatchSupervisorsHeader,
    headerImageAssetPath:
      'src/assets/generated/marketing/team/team-dispatch-supervisors-header.webp',
    members: [
      {
        name: 'Chandra Bahadur Magar',
        role: 'Branch Dispatch Supervisor',
      },
      {
        name: 'Lalu K.C',
        role: 'Branch Dispatch Supervisor',
        portraitSrc: laluKCPortrait,
        portraitAssetPath: 'src/assets/marketing/team/lalu-k-c.jpg',
        portraitTransform: {
          xPercent: 3.6,
          yPercent: -38.33,
          scale: 1,
        },
      },
      {
        name: 'Raj Kumar Shrestha',
        role: 'Branch Dispatch Supervisor',
        portraitSrc: rajKumarShresthaPortrait,
        portraitAssetPath: 'src/assets/marketing/team/raj-kumar-shrestha.jpg',
      },
      {
        name: 'Sobita Thapa',
        role: 'Branch Dispatch Supervisor',
        portraitSrc: sobitaThapaPortrait,
        portraitAssetPath: 'src/assets/marketing/team/sobita-thapa.jpg',
      },
      { name: 'Suman Darai', role: 'Branch Dispatch Supervisor' },
      {
        name: 'Thaneshwor Gaudel',
        role: 'Branch Dispatch Supervisor',
        portraitSrc: thaneshworGaudelPortrait,
        portraitAssetPath: 'src/assets/marketing/team/thaneshwor-gaudel.jpg',
        portraitTransform: {
          xPercent: 3.86,
          yPercent: -50,
          scale: 1,
        },
      },
      { name: 'Baburam Shrestha', role: 'Branch Dispatch Supervisor' },
    ],
  },
  {
    department: 'Fleet Management',
    description:
      'Keeping our vehicles running safely and reliably through expert maintenance.',
    icon: '🔧',
    headerImageSrc: teamFleetManagementHeader,
    headerImageAssetPath:
      'src/assets/generated/marketing/team/team-fleet-management-header.webp',
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
    headerImageSrc: teamItDigitalTeamHeader,
    headerImageAssetPath:
      'src/assets/generated/marketing/team/team-it-digital-team-header.webp',
    members: [
      {
        name: 'Subin Gurung',
        role: 'Lead Developer',
        portraitSrc: subinGurungPortrait,
        portraitAssetPath: 'src/assets/marketing/team/subin-gurung.jpg',
        portraitAlt: 'Portrait of Subin Gurung',
        portraitTransform: {
          xPercent: 2.57,
          yPercent: -16.67,
          scale: 1,
        },
      },
      {
        name: 'Rohan Dahal',
        role: 'UI/UX & Creative Designer',
        portraitSrc: rohanDahalPortrait,
        portraitAssetPath: 'src/assets/marketing/team/rohan-dahal.jpg',
        portraitAlt: 'Portrait of Rohan Dahal',
        portraitTransform: {
          xPercent: 3.6,
          yPercent: -27.33,
          scale: 1,
        },
      },
      {
        name: 'Sharon Shrestha',
        role: 'Digital Marketing & Content Manager',
        portraitSrc: sharonShresthaPortrait,
        portraitAssetPath: 'src/assets/marketing/team/sharon-shrestha.jpg',
        portraitAlt: 'Portrait of Sharon Shrestha',
        portraitTransform: {
          xPercent: 1.28,
          yPercent: -22.33,
          scale: 1,
        },
      },
      {
        name: 'Susam Thapa',
        role: 'QA & Support Engineer',
        portraitSrc: susamThapaPortrait,
        portraitAssetPath: 'src/assets/marketing/team/susam-thapa.jpg',
        portraitAlt: 'Portrait of Susam Thapa',
        portraitTransform: {
          xPercent: 5.65,
          yPercent: -50,
          scale: 1,
        },
      },
    ],
  },
  {
    department: 'Support Staff',
    description:
      'Ensuring smooth day-to-day office operations and workplace support.',
    icon: '🤝',
    headerImageSrc: teamSupportStaffHeader,
    headerImageAssetPath:
      'src/assets/generated/marketing/team/team-support-staff-header.webp',
    members: [
      { name: 'Bhesh Maya Gurung', role: 'Office Assistant' },
      { name: 'Urmila Lama', role: 'Office Assistant' },
    ],
  },
];

const DEPARTMENT_HEADER_IMAGES = [
  {
    src: financeDepartmentHeader,
    alt: 'Finance department header',
  },
  {
    src: teamDemoMember2Portrait,
    alt: 'Operations team header',
  },
  {
    src: founderHariBahadurShresthaPortrait,
    alt: 'Branch operations header',
  },
  {
    src: teamDemoMember1Portrait,
    alt: 'Department team header',
  },
] as const;

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
    'Meet the dedicated team behind Darshan Transport: 45+ professionals driving logistics excellence across Nepal.',
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
          its destination safely across every route in Nepal.
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
  { value: '20+', label: 'Years Combined' },
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

const MemberPortraitCard: React.FC<{
  departmentName: string;
  member: TeamMember;
  minHeightClassName?: string;
  devEditor?: TeamImageDevEditor;
}> = ({
  departmentName,
  member,
  minHeightClassName = 'min-h-[320px]',
  devEditor,
}) => {
  const portraitSrc = member.portraitSrc ?? teamDemoMember1Portrait;
  const portraitAlt = member.portraitAlt ?? `Portrait of ${member.name}`;
  const defaultTransform = normalizeImageTransform(member.portraitTransform);
  const targetId = buildMemberTargetId(departmentName, member.name);
  const selection: DevEditorSelection = {
    kind: 'memberPortrait',
    targetId,
    departmentName,
    memberName: member.name,
    label: `${departmentName} -> ${member.name}`,
    defaultTransform,
    defaultImageSrc: portraitSrc,
    defaultImageAlt: portraitAlt,
    assetRelativePath: member.portraitAssetPath ?? null,
    assetDisplayPath: member.portraitAssetPath ?? '',
    saveTargetKind: member.portraitAssetPath
      ? 'existing-asset'
      : 'new-member-asset',
    previewAspectRatio: '3 / 4',
  };
  const imageSource = devEditor?.getImageSource(selection);
  const effectivePortraitSrc = imageSource?.src ?? portraitSrc;
  const effectivePortraitAlt = imageSource?.alt ?? portraitAlt;
  const effectiveTransform = devEditor
    ? devEditor.getTransform(selection)
    : defaultTransform;
  const isSelected = devEditor?.isSelected(selection) ?? false;
  const isDragging = devEditor?.isDragging(selection) ?? false;

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!devEditor?.isEnabled) {
      return;
    }

    if (!isSelected) {
      devEditor.selectTarget(selection);
      return;
    }

    devEditor.startDrag(event, selection, effectiveTransform);
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      className={`group relative overflow-hidden rounded-2xl border bg-[#111] select-none transition-[box-shadow,border-color] duration-500 hover:shadow-[0_24px_70px_rgba(0,0,0,0.24)] shadow-[0_18px_55px_rgba(0,0,0,0.18)] ${
        devEditor?.isEnabled
          ? isDragging
            ? 'cursor-grabbing border-primary/70 ring-2 ring-primary/40'
            : isSelected
              ? 'cursor-grab border-primary/60 ring-2 ring-primary/30'
              : 'cursor-pointer border-gray-200'
          : 'border-gray-200'
      } ${minHeightClassName}`}
    >
      <img
        src={effectivePortraitSrc}
        alt={effectivePortraitAlt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          ...getImageTransformStyle(effectiveTransform),
          ...(isDragging ? { willChange: 'transform' } : undefined),
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/12 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/82 via-black/50 via-58% to-transparent backdrop-blur-md [mask-image:linear-gradient(to_top,black_0%,black_58%,transparent_100%)]" />

      <div className="relative z-10 flex h-full items-end p-6">
        <div>
          <h3 className="text-[1.1rem] font-bold text-white leading-snug mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
            {member.name}
          </h3>
          <p className="text-[0.82rem] text-white/85 leading-tight tracking-[-0.01em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] md:whitespace-nowrap">
            {member.role}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Executive Leadership Section (Featured)                            */
/* ------------------------------------------------------------------ */

const ExecutiveSection: React.FC<{
  department: Department;
  devEditor?: TeamImageDevEditor;
}> = ({ department, devEditor }) => (
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
        {department.members.map((member) => (
          <MemberPortraitCard
            key={member.name}
            departmentName={department.department}
            member={member}
            minHeightClassName="min-h-[340px]"
            devEditor={devEditor}
          />
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
  devEditor?: TeamImageDevEditor;
}> = ({ department, index, devEditor }) => {
  const isEven = index % 2 === 0;
  const fallbackHeaderImage =
    DEPARTMENT_HEADER_IMAGES[(index - 1) % DEPARTMENT_HEADER_IMAGES.length];
  const headerImageSrc = department.headerImageSrc ?? fallbackHeaderImage.src;
  const headerImageAlt = department.headerImageAlt ?? fallbackHeaderImage.alt;
  const hasHeaderImage = Boolean(headerImageSrc);
  const headerSurfaceHex = isEven ? '#ffffff' : '#fafaf8';
  const headerSurfaceRgb = isEven ? '255,255,255' : '250,250,248';
  const imageOnLeft = index % 2 === 0;
  const headerImageSideClass = imageOnLeft
    ? 'left-0 w-1/2 max-md:w-[56%]'
    : 'right-0 w-1/2 max-md:w-[56%]';
  const headerDefaultTransform = normalizeImageTransform(
    department.headerImageTransform
  );
  const headerTargetId = buildDepartmentTargetId(department.department);
  const headerSelection: DevEditorSelection = {
    kind: 'departmentHeader',
    targetId: headerTargetId,
    departmentName: department.department,
    label: `${department.department} header`,
    defaultTransform: headerDefaultTransform,
    defaultImageSrc: headerImageSrc,
    defaultImageAlt: headerImageAlt ?? department.department,
    assetRelativePath: department.headerImageAssetPath ?? null,
    assetDisplayPath: department.headerImageAssetPath ?? '',
    saveTargetKind: department.headerImageAssetPath
      ? 'existing-asset'
      : 'new-header-asset',
    previewAspectRatio: '16 / 5',
  };
  const imageSource = devEditor?.getImageSource(headerSelection);
  const effectiveHeaderImageSrc = imageSource?.src ?? headerImageSrc;
  const effectiveHeaderImageAlt =
    imageSource?.alt ?? headerImageAlt ?? department.department;
  const headerTransform = devEditor
    ? devEditor.getTransform(headerSelection)
    : headerDefaultTransform;
  const isHeaderSelected = devEditor?.isSelected(headerSelection) ?? false;
  const isHeaderDragging = devEditor?.isDragging(headerSelection) ?? false;

  const handleHeaderPointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!devEditor?.isEnabled || !hasHeaderImage) {
      return;
    }

    if (!isHeaderSelected) {
      devEditor.selectTarget(headerSelection);
      return;
    }

    devEditor.startDrag(event, headerSelection, headerTransform);
  };

  return (
    <section
      id={`dept-${index}`}
      className={`py-20 px-8 max-md:py-14 max-md:px-5 ${isEven ? 'bg-white' : 'bg-[#fafaf8]'}`}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Department info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mb-7 w-full"
        >
          <div
            onPointerDown={handleHeaderPointerDown}
            className={`relative overflow-hidden select-none ${hasHeaderImage ? 'rounded-[28px]' : ''} ${
              devEditor?.isEnabled && hasHeaderImage
                ? isHeaderDragging
                  ? 'cursor-grabbing ring-2 ring-primary/40'
                  : isHeaderSelected
                    ? 'cursor-grab ring-2 ring-primary/30'
                    : 'cursor-pointer'
                : ''
            }`}
            style={{ backgroundColor: headerSurfaceHex }}
          >
            {hasHeaderImage ? (
              <>
                <div className={`absolute inset-y-0 ${headerImageSideClass}`}>
                  <img
                    src={effectiveHeaderImageSrc}
                    alt={effectiveHeaderImageAlt ?? department.department}
                    className={`absolute inset-0 h-full w-full object-cover opacity-[0.88] ${
                      imageOnLeft ? 'object-left' : 'object-center'
                    }`}
                    style={{
                      ...getImageTransformStyle(headerTransform),
                      ...(isHeaderDragging
                        ? { willChange: 'transform' }
                        : undefined),
                    }}
                  />
                </div>
                <div
                  className="absolute inset-0"
                  style={{
                    background: imageOnLeft
                      ? `linear-gradient(270deg, rgba(${headerSurfaceRgb},0.99) 0%, rgba(${headerSurfaceRgb},0.98) 42%, rgba(${headerSurfaceRgb},0.9) 56%, rgba(${headerSurfaceRgb},0.42) 70%, rgba(${headerSurfaceRgb},0.06) 100%)`
                      : `linear-gradient(90deg, rgba(${headerSurfaceRgb},0.99) 0%, rgba(${headerSurfaceRgb},0.98) 42%, rgba(${headerSurfaceRgb},0.9) 56%, rgba(${headerSurfaceRgb},0.42) 70%, rgba(${headerSurfaceRgb},0.06) 100%)`,
                  }}
                />
                <div
                  className={`absolute inset-y-0 w-[18%] backdrop-blur-xl max-md:w-[24%] ${
                    imageOnLeft
                      ? 'left-[41%] max-md:left-[36%]'
                      : 'right-[41%] max-md:right-[36%]'
                  }`}
                  style={{
                    background: imageOnLeft
                      ? `linear-gradient(270deg, rgba(${headerSurfaceRgb},0) 0%, rgba(${headerSurfaceRgb},0.16) 28%, rgba(${headerSurfaceRgb},0.34) 52%, rgba(${headerSurfaceRgb},0.02) 100%)`
                      : `linear-gradient(90deg, rgba(${headerSurfaceRgb},0) 0%, rgba(${headerSurfaceRgb},0.16) 28%, rgba(${headerSurfaceRgb},0.34) 52%, rgba(${headerSurfaceRgb},0.02) 100%)`,
                    maskImage: imageOnLeft
                      ? 'linear-gradient(to left, transparent 0%, black 20%, black 82%, transparent 100%)'
                      : 'linear-gradient(to right, transparent 0%, black 20%, black 82%, transparent 100%)',
                  }}
                />
              </>
            ) : null}

            <div
              className={`relative z-10 flex bg-transparent ${
                imageOnLeft ? 'justify-end' : 'justify-start'
              } ${hasHeaderImage ? 'px-2 py-2 max-md:px-0 max-md:py-0' : ''}`}
            >
              {imageOnLeft ? (
                <div className="grid grid-cols-[minmax(0,1fr)_140px] items-stretch gap-3 w-full max-w-[700px] max-md:grid-cols-[minmax(0,1fr)_88px] max-md:gap-3">
                  <div className="min-w-0 text-right">
                    <div className="px-3 py-1 max-md:px-1 max-md:py-0.5">
                      <h2 className="text-[1.4rem] font-bold text-[#1a1a1a] leading-tight max-md:text-[1.2rem]">
                        {department.department}
                      </h2>
                    </div>
                    <div className="px-3 py-2 max-md:px-1 max-md:py-1.5">
                      <p className="text-text-medium text-[0.92rem] leading-[1.7]">
                        {department.description}
                      </p>
                    </div>
                    <div className="px-3 py-1 max-md:px-1 max-md:py-0.5">
                      <span className="text-sm font-bold text-primary whitespace-nowrap">
                        {department.members.length}{' '}
                        {department.members.length === 1 ? 'member' : 'members'}
                      </span>
                    </div>
                  </div>
                  <div className="flex min-h-[132px] items-center justify-center max-md:min-h-[88px]">
                    <span className="text-[2.4rem] leading-none">
                      {department.icon}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-[140px_minmax(0,1fr)] items-stretch gap-3 w-full max-w-[700px] max-md:grid-cols-[88px_minmax(0,1fr)] max-md:gap-3">
                  <div className="flex min-h-[132px] items-center justify-center max-md:min-h-[88px]">
                    <span className="text-[2.4rem] leading-none">
                      {department.icon}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="px-3 py-1 max-md:px-1 max-md:py-0.5">
                      <h2 className="text-[1.4rem] font-bold text-[#1a1a1a] leading-tight max-md:text-[1.2rem]">
                        {department.department}
                      </h2>
                    </div>
                    <div className="px-3 py-2 max-md:px-1 max-md:py-1.5">
                      <p className="text-text-medium text-[0.92rem] leading-[1.7]">
                        {department.description}
                      </p>
                    </div>
                    <div className="px-3 py-1 max-md:px-1 max-md:py-0.5">
                      <span className="text-sm font-bold text-primary whitespace-nowrap">
                        {department.members.length}{' '}
                        {department.members.length === 1 ? 'member' : 'members'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Members list */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {department.members.map((member) => (
            <MemberPortraitCard
              key={member.name}
              departmentName={department.department}
              member={member}
              minHeightClassName="min-h-[300px]"
              devEditor={devEditor}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Team Overview Section (all departments at a glance)                */
/* ------------------------------------------------------------------ */

const TeamOverview: React.FC = () => (
  <section className="relative overflow-hidden py-6 px-8 bg-secondary max-md:py-5 max-md:px-5">
    <div
      className="absolute inset-0 opacity-[0.28]"
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.14) 1px, transparent 1px)',
        backgroundSize: '34px 34px',
      }}
    />
    <div
      className="absolute inset-0 opacity-[0.18]"
      style={{
        backgroundImage:
          'radial-gradient(circle at 1px 1px, rgba(252,175,23,0.5) 1.2px, transparent 0)',
        backgroundSize: '34px 34px',
      }}
    />
    <div className="absolute -top-8 right-[10%] h-32 w-32 rounded-full bg-primary/28 blur-3xl" />
    <div className="absolute bottom-0 left-[6%] h-24 w-44 rounded-full bg-white/12 blur-3xl" />

    <div className="relative z-10 max-w-[1080px] mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="text-center mb-4"
      >
        <motion.p
          variants={fadeUp}
          custom={0}
          className="text-primary text-[0.66rem] font-semibold tracking-[0.24em] uppercase"
        >
          Organization
        </motion.p>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mt-1.5 text-[1.3rem] font-semibold text-white max-md:text-[1.1rem]"
        >
          How We&apos;re Organized
        </motion.h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-3 gap-2.5 max-lg:grid-cols-2 max-md:grid-cols-1"
      >
        {TEAM_DEPARTMENTS.slice(1).map((dept) => (
          <motion.div
            key={dept.department}
            variants={cardFade}
            className="group rounded-xl bg-white/8 px-3.5 py-3 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-white font-medium text-[0.84rem] leading-snug">
                  {dept.department}
                </h3>
                <span className="mt-1 block text-primary text-[0.68rem] font-semibold tracking-[0.14em] uppercase">
                  {dept.members.length} members
                </span>
              </div>
              <span className="text-base leading-none text-white/70 flex-shrink-0">
                {dept.icon}
              </span>
            </div>
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
  const devEditor = useTeamImageDevEditor(TEAM_DEPARTMENTS);
  const selectedImageSource = devEditor?.selectedTarget
    ? devEditor.getImageSource(devEditor.selectedTarget)
    : null;

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
        <ExecutiveSection
          department={TEAM_DEPARTMENTS[0]}
          devEditor={devEditor}
        />
      </div>

      {/* Organization overview */}
      <TeamOverview />

      {/* All other departments */}
      {TEAM_DEPARTMENTS.slice(1).map((dept, i) => (
        <DepartmentSection
          key={dept.department}
          department={dept}
          index={i + 1}
          devEditor={devEditor}
        />
      ))}

      {devEditor?.selectedTarget ? (
        <DevImageEditorPanel
          selectionLabel={devEditor.selectedTarget.label}
          selectionKindLabel={getTeamImageKindLabel(
            devEditor.selectedTarget.kind
          )}
          transform={devEditor.getTransform(devEditor.selectedTarget)}
          imageSrc={selectedImageSource?.src ?? ''}
          imageAlt={selectedImageSource?.alt ?? ''}
          sourceName={selectedImageSource?.sourceName ?? ''}
          previewAspectRatio={devEditor.selectedTarget.previewAspectRatio}
          hasCustomImage={selectedImageSource?.hasCustomImage ?? false}
          customImageLabel={selectedImageSource?.statusLabel}
          sourceHelperText={selectedImageSource?.sourceHelperText}
          notice={devEditor.notice}
          isSaved={devEditor.isTargetSaved(devEditor.selectedTarget)}
          exportSections={[
            {
              title: 'Portrait Transforms',
              exportText: devEditor.portraitExportText,
              onCopy: devEditor.copyPortraitExport,
            },
            {
              title: 'Header Transforms',
              exportText: devEditor.headerExportText,
              onCopy: devEditor.copyHeaderExport,
            },
          ]}
          fileInputId="team-dev-image-picker"
          onClose={devEditor.closeSelection}
          onReset={() => devEditor.resetTarget(devEditor.selectedTarget!)}
          onSave={() => {
            void devEditor.saveOverrides();
          }}
          onTransformChange={(nextTransform) =>
            devEditor.updateTargetTransform(
              devEditor.selectedTarget!,
              nextTransform
            )
          }
          onClearImageOverride={() =>
            devEditor.clearImageOverride(devEditor.selectedTarget!)
          }
        />
      ) : null}

      {devEditor?.isEnabled ? (
        <input
          id="team-dev-image-picker"
          ref={devEditor.imagePickerInputRef}
          type="file"
          accept="image/*"
          onChange={devEditor.handleImagePickerChange}
          className="sr-only"
        />
      ) : null}

      <CtaSection variant="team" />
    </div>
  );
};
