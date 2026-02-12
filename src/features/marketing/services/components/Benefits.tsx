import React from 'react';
import './Benefits.css';

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
  <section className="benefits-section">
    <h2 className="benefits-title">BENEFITS OF CHOOSING DARSHAN LOGISTICS</h2>
    <ul className="benefits-list">
      {benefitsList.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  </section>
);

export default Benefits;
