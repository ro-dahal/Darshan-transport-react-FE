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

    // Run immediately and on resize
    updateTrack();
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
    <div className="flex items-center justify-between max-w-3xl mx-auto select-none relative pt-6 px-2.5 max-sm:flex-col max-sm:gap-4" ref={containerRef}>
      {/* Track Background */}
      <div
        className="absolute h-1.5 bg-gray-200 rounded-full z-0 block max-sm:hidden transition-all duration-300"
        style={{
          left: 'var(--track-left, 28px)',
          right: 'var(--track-right, 28px)',
          top: 'var(--track-top, 38px)',
        }}
        aria-hidden="true"
      ></div>

      {/* Progress Bar */}
      <div
        className="absolute h-1.5 bg-gradient-to-r from-yellow-400 to-primary rounded-full z-10 transition-[width] duration-300 ease-out max-sm:hidden"
        style={{
          left: 'var(--track-left, 28px)',
          top: 'var(--track-top, 38px)',
          width: 'var(--track-progress, 0px)',
        }}
        aria-hidden="true"
      ></div>

      {steps.map((step, index) => {
        const isCompleted = index < clampedIndex;
        const isActive = index === clampedIndex;

        // Base circle classes
        let circleClasses = "timeline-circle w-14 h-14 rounded-full bg-white border-[3px] border-gray-200 flex justify-center items-center text-[1.35rem] text-gray-200 transition-all duration-300 relative z-20";
        if (isCompleted || isActive) circleClasses = circleClasses.replace("border-gray-200", "border-primary").replace("text-gray-200", "text-primary");
        if (isActive) circleClasses += " scale-105 shadow-[0_0_12px_rgba(252,175,23,0.4)]";

        // Connector lines (between circles) - simplified as one separate line per gap
        let lineClasses = "timeline-line h-[3px] w-full bg-gray-200 absolute top-7 left-1/2 transform translate-x-0 z-10 max-sm:hidden";
        if (isCompleted) lineClasses = lineClasses.replace("bg-gray-200", "bg-primary");

        return (
          <div className="flex flex-col items-center relative flex-1 min-w-[110px] max-sm:flex-row max-sm:justify-start max-sm:gap-3 max-sm:w-full" key={step.key}>
            <div className={circleClasses} aria-current={isActive ? 'step' : undefined}>
              {buildStepIcon(step)}
            </div>

            {/* The individual connector lines were in the original code?
                Actually original code had a separate `.timeline-line` in the loop.
                I will keep it for visual consistency if needed, but the main track is handled by the absolute bars above.
                Wait, the original code had BOTH: a global track/progress AND individual lines between steps?
                Let's check the original code.
                Original: `<div className="timeline-track"></div>`, `<div className="timeline-progress"></div>`, AND `{index < steps.length - 1 && <span className={connectorClassName}></span>}`
                The connectorClassName was `timeline-line`.
                BUT: `.timeline-line` style was: `height: 3px; width: 100%; background: var(--muted); position: absolute; top: 28px; left: 50%; ...`
                This looks like it connects the center of one circle to the next?
                Actually `left: 50%` suggests it goes from the center of the current step to the right?
                If `flex: 1` fits the space, it might work.
                The global track usually supersedes individual lines in modern implementations, but maybe the lines were for specific styling or fallback.
                However, if I keep the global track logic, simpler is better.
                The global track logic uses JS to calculate widths.
                The individual lines might be redundant visual noise or essential structure depending on how `flex` works.
                Given the JS `updateTrack` logic specifically manipulates `--track-left/right/progress`, it seems the global bars are the MAIN visual for the track.
                The individual `timeline-line` might be covering the gaps or vice-versa.
                I will include them but hidden if the global track is working, or keep them as is.
                Tailwind: `hidden` by default or visible? Original: `display: block`.
                I'll allow them but they are `max-sm:hidden`.
            */}
             {index < steps.length - 1 && (
                <span className={lineClasses}></span>
             )}

            <span className="mt-3 font-semibold text-[#333] text-[0.95rem] max-sm:m-0 max-sm:text-base">{step.label}</span>
          </div>
        );
      })}
    </div>
  );
};
