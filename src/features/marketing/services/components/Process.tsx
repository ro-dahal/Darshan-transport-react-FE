import React from 'react';
import './Process.css';

const processSteps = [
  {
    title: 'Onboarding',
    description: 'Understand routes, products, volume.'
  },
  {
    title: 'Setup',
    description: 'Assign warehouse space, SKUs & codes.'
  },
  {
    title: 'Daily Operations',
    description: 'Pick, pack, dispatch, return handling.'
  },
  {
    title: 'Reporting',
    description: 'Stock levels, shipment updates.'
  },
  {
    title: 'Scale',
    description: 'Add more cities or product lines anytime.'
  }
];


const Process: React.FC = () => (
  <section className="process-section">
    <h2 className="process-title">How Our Process Works</h2>
    <div className="process-steps-custom">
      <div className="process-steps-row process-steps-row-top">
        <div className="process-step"><div className="process-step-number">1</div><div className="process-step-content"><div className="process-step-title">{processSteps[0].title}</div><div className="process-step-description">{processSteps[0].description}</div></div></div>
        <div className="process-step"><div className="process-step-number">2</div><div className="process-step-content"><div className="process-step-title">{processSteps[1].title}</div><div className="process-step-description">{processSteps[1].description}</div></div></div>
        <div className="process-step"><div className="process-step-number">3</div><div className="process-step-content"><div className="process-step-title">{processSteps[2].title}</div><div className="process-step-description">{processSteps[2].description}</div></div></div>
      </div>
      <div className="process-steps-row process-steps-row-bottom">
        <div className="process-step process-step-spacer" />
        <div className="process-step"><div className="process-step-number">4</div><div className="process-step-content"><div className="process-step-title">{processSteps[3].title}</div><div className="process-step-description">{processSteps[3].description}</div></div></div>
        <div className="process-step"><div className="process-step-number">5</div><div className="process-step-content"><div className="process-step-title">{processSteps[4].title}</div><div className="process-step-description">{processSteps[4].description}</div></div></div>
      </div>
    </div>
  </section>
);

export default Process;
