import React from 'react';
import { PageHeader } from '../../about/components/PageHeader';
import { CallToAction } from '../../about/components/Calltoaction';
import { MetaTags } from '../../../../core/components/MetaTags';
import person1 from '../../../../assets/img/person1.jpg';
import person2 from '../../../../assets/img/person2.png';
import person3 from '../../../../assets/img/person3.jpg';
import userPlaceholder from '../../../../assets/img/user.png';

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
      },
      {
        name: 'Anup Acharya',
        role: 'Co-Founder & Director of Transport',
        img: person2,
        description:
          'Expert in fleet management and supply chain optimization.',
      },
      {
        name: 'Bishnu Prasad Poudyal',
        role: 'Co-Founder & Financial Controller',
        img: person3,
        description:
          'Dedicated financial strategist ensuring sustainable growth.',
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
      },
      {
        name: 'Hari Thapa',
        role: 'Fleet Manager',
        img: userPlaceholder,
        description: 'Maintains vehicle health and ensures safe transport.',
      },
      {
        name: 'Sita Sharma',
        role: 'Logistics Coordinator',
        img: userPlaceholder,
        description: 'Synchronizes client requirements with field teams.',
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
      },
      {
        name: 'Rina Shrestha',
        role: 'Support Lead',
        img: userPlaceholder,
        description: 'Dedicated to resolving client queries quickly.',
      },
      {
        name: 'Binod Tamang',
        role: 'Client Relations',
        img: userPlaceholder,
        description: 'Builds lasting relationships with key stakeholders.',
      },
    ],
  },
];

const TEAM_PAGE_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Our Team - Darshan Transport',
  url: 'https://darshantransport.com/team',
  description: 'Meet the dedicated team behind Darshan Transport.',
  publisher: {
    '@type': 'Organization',
    name: 'Darshan Transport',
  },
};

export const TeamPage: React.FC = () => (
  <div className="team-page-wrapper">
    <MetaTags
      title="Meet Our Team | Darshan Transport"
      description="Meet the dedicated and experienced team behind Darshan Transport driving logistics excellence across Nepal."
      canonical="https://darshantransport.com/team"
      structuredData={TEAM_PAGE_STRUCTURED_DATA}
    />
    <PageHeader
      title="Our Team"
      subtitle="The professionals dedicated to delivering excellence."
    />
    <div className="container mx-auto px-4 py-16">
      {TEAM_DEPARTMENTS.map((dept, deptIdx) => (
        <div key={deptIdx} className="mb-16 last:mb-0">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {dept.department}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {dept.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dept.members.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-w-1 aspect-h-1 w-full h-80 relative overflow-hidden bg-gray-100">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    <div className="section-optimize">
      <CallToAction />
    </div>
  </div>
);
