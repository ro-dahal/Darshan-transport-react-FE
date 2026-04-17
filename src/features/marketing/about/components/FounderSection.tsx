import React from 'react';
import { motion } from 'framer-motion';
import type { FounderProfile } from '../data/aboutContent';
import type {
  AboutImageDevEditor,
  AboutImageSelection,
} from '../aboutImageEditorUtils';
import {
  getAboutImageTransformStyle,
  normalizeAboutImageTransform,
} from '../aboutImageEditorUtils';

const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const imgReveal = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    clipPath: 'inset(8% 8% 8% 8% round 16px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: 'inset(0% 0% 0% 0% round 16px)',
    transition: { duration: 0.8, ease: easeOut },
  },
};

interface FounderSectionProps {
  profiles: FounderProfile[];
  devEditor?: AboutImageDevEditor;
}

const buildFounderSelection = (
  profile: FounderProfile
): AboutImageSelection => ({
  kind: 'founderPortrait',
  targetId: profile.signatureLabel,
  label: profile.signatureLabel,
  defaultTransform: normalizeAboutImageTransform(profile.imageTransform),
  imageSrc: profile.image,
  imageAlt: `${profile.signatureLabel} portrait`,
  previewAspectRatio: '4 / 5',
});

export const FounderSection: React.FC<FounderSectionProps> = ({
  profiles,
  devEditor,
}) => (
  <section className="px-8 py-24 max-md:px-5 max-md:py-16">
    <div className="mx-auto max-w-[1200px]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="mb-20 text-center max-md:mb-12"
      >
        <motion.span
          variants={fadeIn}
          className="mb-4 block text-xs font-bold uppercase tracking-[0.22em] text-primary"
        >
          Leadership
        </motion.span>
        <motion.h2
          variants={fadeIn}
          className="text-[2.4rem] font-extrabold leading-[1.12] text-[#1a1a1a] max-md:text-[1.8rem]"
        >
          The people behind{' '}
          <span className="text-primary">Darshan Transport</span>
        </motion.h2>
      </motion.div>

      <div className="space-y-24 max-md:space-y-16">
        {profiles.map((profile, index) => {
          const isEven = index % 2 === 0;
          const selection = buildFounderSelection(profile);
          const effectiveTransform = devEditor
            ? devEditor.getTransform(selection)
            : selection.defaultTransform;
          const isSelected = devEditor?.isSelected(selection) ?? false;

          const handlePointerDown = (
            event: React.PointerEvent<HTMLDivElement>
          ) => {
            if (!devEditor?.isEnabled) {
              return;
            }

            if (!isSelected) {
              devEditor.selectTarget(selection);
              return;
            }

            devEditor.startDrag(event, selection, effectiveTransform);
          };

          return (
            <motion.div
              key={profile.signatureLabel}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className={`flex items-center gap-16 max-lg:flex-col max-lg:gap-10 ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              <motion.div
                variants={imgReveal}
                className="relative w-full max-w-[420px] flex-shrink-0 max-lg:max-w-[360px]"
              >
                <div className={`relative ${isEven ? 'pl-6' : 'pr-6'}`}>
                  <div
                    aria-hidden="true"
                    className={`absolute top-6 bottom-6 hidden w-[4px] rounded-full bg-primary/55 lg:block ${
                      isEven ? 'left-0' : 'right-0'
                    }`}
                  />
                  <div
                    onPointerDown={handlePointerDown}
                    className={`relative overflow-hidden rounded-2xl bg-gray-100 shadow-lg ${
                      devEditor?.isEnabled
                        ? isSelected
                          ? 'cursor-grab ring-2 ring-primary/30'
                          : 'cursor-pointer'
                        : ''
                    }`}
                  >
                    <img
                      src={profile.image}
                      alt={`${profile.signatureLabel} portrait`}
                      className="w-full aspect-[4/5] object-cover"
                      style={getAboutImageTransformStyle(effectiveTransform)}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="min-w-0 flex-1">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  {profile.role}
                </span>
                <h3 className="mt-3 text-[1.8rem] font-bold text-[#1a1a1a] max-md:text-[1.4rem]">
                  {profile.signatureLabel}
                </h3>

                <div className="relative mt-6 pl-6 pr-8 pb-8">
                  <span className="absolute -top-2 -left-1 select-none font-serif text-5xl leading-none text-primary/20">
                    &ldquo;
                  </span>
                  <p className="whitespace-pre-line text-justify text-base leading-[1.85] text-text-medium">
                    {profile.quote.replace(/^"\s*/, '')}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <div className="h-px w-12 bg-primary/40" />
                  <div>
                    <p className="text-sm font-bold text-text-dark">
                      {profile.signatureLabel}
                    </p>
                    <p className="mt-0.5 text-xs text-text-medium">
                      {profile.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);
