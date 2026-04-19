import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const MILESTONES = [
  {
    label: 'The First Step',
    text: 'Darshan Transport began with a small step: a single mini cargo Nissan single-cabin van. In the early days, the company handled deliveries of medicine and essential supplies for a clinic in Dimuwa, a small town in Parbat.',
  },
  {
    label: 'Scaling Up',
    text: 'As demand grew, operations expanded. In mid-2063 B.S., the company added its first Eicher truck, marking a shift from small deliveries to larger cargo movement. Over time, more trucks were added, routes expanded, and new branches were established.',
  },
  {
    label: 'Where We Are Today',
    text: 'From a single-vehicle operation to a growing logistics network, Darshan Transport has steadily built its presence across Nepal, focusing on consistency, reliability, and structured cargo movement.',
  },
];

export const ApproachStorySection: React.FC = () => (
  <section className="relative bg-[#fafaf8] py-24 px-8 max-md:py-16 max-md:px-5">
    <div className="relative z-10 max-w-[1200px] mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <motion.div variants={fadeUp} custom={0} className="text-center mb-12">
          <span className="text-primary text-xs font-bold tracking-[0.22em] uppercase">
            How It All Started
          </span>
          <h3 className="mt-3 text-[2rem] font-extrabold text-secondary leading-[1.2] max-md:text-[1.5rem]">
            From a single van to a growing network
          </h3>
        </motion.div>

        {/* Timeline milestones */}
        <div className="relative max-w-[820px] mx-auto">
          {/* Vertical timeline line */}
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent max-md:left-[11px]" />

          <div className="space-y-10">
            {MILESTONES.map((milestone, index) => (
              <motion.div
                key={milestone.label}
                variants={fadeUp}
                custom={index + 1}
                className="relative pl-12 max-md:pl-9"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-1.5 w-[31px] h-[31px] rounded-full border-[3px] border-primary/30 bg-[#fafaf8] flex items-center justify-center max-md:w-[23px] max-md:h-[23px] max-md:border-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary max-md:w-2 max-md:h-2" />
                </div>
                <span className="block text-primary text-xs font-bold tracking-[0.18em] uppercase mb-2">
                  {milestone.label}
                </span>
                <p className="text-text-medium text-base leading-[1.85]">
                  {milestone.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
