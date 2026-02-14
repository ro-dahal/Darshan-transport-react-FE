import React from 'react';

const processSteps = [
  {
    title: 'Onboarding',
    description: 'Understand routes, products, volume.',
  },
  {
    title: 'Setup',
    description: 'Assign warehouse space, SKUs & codes.',
  },
  {
    title: 'Daily Operations',
    description: 'Pick, pack, dispatch, return handling.',
  },
  {
    title: 'Reporting',
    description: 'Stock levels, shipment updates.',
  },
  {
    title: 'Scale',
    description: 'Add more cities or product lines anytime.',
  },
];

interface ProcessStep {
  title: string;
  description: string;
}

// Re-implementing with Flexbox to ensure exact layout match (3 top, 2 bottom centered)
const ProcessFixed: React.FC = () => (
  <section className="bg-white text-[#222] py-14 pb-12 text-center">
    <h2 className="text-[2.1rem] font-bold text-primary mb-10 tracking-[0.5px] max-lg:text-2xl max-lg:mb-6">
      How Our Process Works
    </h2>

    <div className="flex flex-col gap-9 max-w-[1000px] mx-auto items-center px-4">
      {/* Top Row */}
      <div className="flex justify-center gap-9 flex-wrap w-full max-md:gap-5">
        {processSteps.slice(0, 3).map((step, idx) => (
          <ProcessCard step={step} idx={idx} key={idx} />
        ))}
      </div>

      {/* Bottom Row */}
      <div className="flex justify-center gap-9 flex-wrap w-full max-md:gap-5">
        {processSteps.slice(3).map((step, idx) => (
          <ProcessCard step={step} idx={idx + 3} key={idx + 3} />
        ))}
      </div>
    </div>
  </section>
);

const ProcessCard = ({ step, idx }: { step: ProcessStep; idx: number }) => (
  <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] py-8 px-[18px] pb-7 w-[200px] flex flex-col items-center transition-all duration-200 hover:-translate-y-2 hover:scale-[1.04] hover:shadow-[0_8px_32px_rgba(252,175,23,0.18)] max-xl:w-[160px] max-xl:p-[18px_8px_14px] max-sm:w-full">
    <div className="bg-primary text-white text-[1.7rem] font-bold w-12 h-12 rounded-full flex items-center justify-center mb-[18px] shadow-[0_2px_8px_rgba(252,175,23,0.18)]">
      {idx + 1}
    </div>
    <div className="flex flex-col items-center">
      <div className="text-[1.2rem] font-bold mb-2 text-[#222] max-xl:text-[1rem]">
        {step.title}
      </div>
      <div className="text-base text-[#555] leading-[1.5] max-xl:text-sm">
        {step.description}
      </div>
    </div>
  </div>
);

export default ProcessFixed;
