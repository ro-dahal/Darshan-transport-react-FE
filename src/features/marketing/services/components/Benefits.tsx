import React from 'react';

const benefitsList = [
  'Nationwide coverage across major cities & districts',
  'End-to-end logistics: Store → Load → Deliver',
  'Lower operational cost',
  'Fast same-day dispatch',
  'Real-time stock & delivery visibility',
  'Fewer errors & smoother flow',
  'Scales as you grow',
];

const Benefits: React.FC = () => (
  <section className="bg-[#757575] text-white py-12 px-5 text-center max-sm:py-8 max-sm:pb-6">
    <h2 className="text-primary text-2xl font-bold mb-8 tracking-[0.5px] max-sm:text-[22px] max-sm:mb-6">
      BENEFITS OF CHOOSING DARSHAN LOGISTICS
    </h2>
    <ul className="list-disc max-w-[600px] mx-auto p-0 text-left pl-6 max-sm:pl-8">
      {benefitsList.map((item, idx) => (
        <li
          key={idx}
          className="text-white text-xl font-normal mb-3.5 leading-[1.6] max-sm:text-base max-sm:mb-2.5"
        >
          {item}
        </li>
      ))}
    </ul>
  </section>
);

export default Benefits;
