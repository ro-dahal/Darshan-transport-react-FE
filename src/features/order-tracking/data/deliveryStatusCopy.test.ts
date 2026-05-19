import assert from 'node:assert/strict';
import test from 'node:test';

import { DEMO_SCENARIOS } from './demoData.ts';
import { DELIVERED_STATUS_COPY } from './deliveryStatusCopy.ts';
import { ORDER_STATUS_STEPS } from './statusSteps.ts';

test('defines pickup-ready copy for the delivered tracking state', () => {
  assert.deepEqual(DELIVERED_STATUS_COPY, {
    stepLabel: 'Arrived at Warehouse',
    bannerTitle: 'Arrived at Warehouse',
    timelineDescription: 'Ready for pickup',
    detailMessage: 'Ready for pickup',
  });
});

test('keeps the delivered step label and demo message aligned with the shared copy', () => {
  const deliveredStep = ORDER_STATUS_STEPS.find(
    (step) => step.key === 'delivered'
  );
  const deliveredScenario = DEMO_SCENARIOS.find(
    (scenario) => scenario.key === 'delivered'
  );

  assert.equal(deliveredStep?.label, DELIVERED_STATUS_COPY.stepLabel);
  assert.equal(deliveredScenario?.label, DELIVERED_STATUS_COPY.stepLabel);
  assert.equal(
    deliveredScenario?.record.message,
    DELIVERED_STATUS_COPY.detailMessage
  );
});
