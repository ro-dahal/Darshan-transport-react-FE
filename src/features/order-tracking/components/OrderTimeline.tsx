import React, { useEffect, useRef } from 'react';
import { FaClipboardCheck, FaShippingFast, FaTruck } from 'react-icons/fa';
import type { DeliveryStatusKey } from '../types/DeliveryRecord';
import type { OrderStatusStep } from '../data/statusSteps';

const STEP_ICONS: Record<string, React.ReactElement> = {
  waiting: <FaClipboardCheck />,
  ongoing: <FaShippingFast />,
  delivered: <FaTruck />,
};

function buildStepIcon(step: OrderStatusStep): React.ReactElement {
  return STEP_ICONS[step.key] ?? STEP_ICONS.waiting;
}

export interface OrderTimelineProps {
  status: DeliveryStatusKey;
  steps: OrderStatusStep[];
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ status, steps }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateTrack = () => {
      const circles = container.querySelectorAll<HTMLElement>('.timeline-circle');
      if (circles.length === 0) {
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const firstCircleRect = circles[0].getBoundingClientRect();
      const lastCircleRect = circles[circles.length - 1].getBoundingClientRect();

      const firstCenterX = firstCircleRect.left - containerRect.left + firstCircleRect.width / 2;
      const lastCenterX = lastCircleRect.left - containerRect.left + lastCircleRect.width / 2;
      const centerY = firstCircleRect.top - containerRect.top + firstCircleRect.height / 2;

      const trackHeight = 6;
      const left = Math.max(0, firstCenterX);
      const right = Math.max(0, containerRect.width - lastCenterX);
      const top = Math.max(0, centerY - trackHeight / 2);

      const clampedIndex = Math.max(
        0,
        Math.min(
          steps.findIndex((step) => step.key === status),
          steps.length - 1
        )
      );

      let progressWidth = 0;
      if (clampedIndex >= 0 && clampedIndex < circles.length) {
        const currentRect = circles[clampedIndex].getBoundingClientRect();
        const currentCenterX = currentRect.left - containerRect.left + currentRect.width / 2;
        progressWidth = Math.max(0, currentCenterX - firstCenterX);
      }

      container.style.setProperty('--track-left', `${left}px`);
      container.style.setProperty('--track-right', `${right}px`);
      container.style.setProperty('--track-top', `${top}px`);
      container.style.setProperty('--track-progress', `${progressWidth}px`);
    };

    const frame = requestAnimationFrame(updateTrack);

    const onResize = () => {
      requestAnimationFrame(updateTrack);
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
    };
  }, [status, steps]);

  const clampedIndex = Math.max(
    0,
    Math.min(
      steps.findIndex((step) => step.key === status),
      steps.length - 1
    )
  );

  return (
    <div className="timeline-container" ref={containerRef}>
      <div className="timeline-track" aria-hidden="true"></div>
      <div className="timeline-progress" aria-hidden="true"></div>

      {steps.map((step, index) => {
        let circleClassName = 'timeline-circle';
        if (index < clampedIndex) circleClassName += ' done';
        else if (index === clampedIndex) circleClassName += ' active';

        let connectorClassName = 'timeline-line';
        if (index < clampedIndex) connectorClassName += ' done';

        return (
          <div className="timeline-step" key={step.key}>
            <div className={circleClassName} aria-current={index === clampedIndex ? 'step' : undefined}>
              {buildStepIcon(step)}
            </div>
            {index < steps.length - 1 && <span className={connectorClassName}></span>}
            <span className="timeline-label">{step.label}</span>
          </div>
        );
      })}
    </div>
  );
};
