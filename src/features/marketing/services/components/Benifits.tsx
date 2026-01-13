import React from 'react';
import './Benifits.css';

const benifitsList = [
  'Nationwide coverage across major cities & districts',
  'End-to-end logistics: store → pack → ship → deliver',
  'Lower operational cost',
  'Fast same-day dispatch',
  'Real-time stock & delivery visibility',
  'Fewer errors & smoother flow',
  'Scales as you grow',
];

const Benifits: React.FC = () => (
  <section className="benifits-section">
    <h2 className="benifits-title">BENIFITS OF CHOOSING DARSHAN LOGISTICS</h2>
    <ul className="benifits-list">
      {benifitsList.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  </section>
);

export default Benifits;
