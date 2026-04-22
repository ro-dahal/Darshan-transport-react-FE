import React from 'react';
import {
  ABOUT_CLIENT_LOGOS,
  ABOUT_DESCRIPTION,
  ABOUT_FOUNDERS,
  ABOUT_CORE_VALUES,
  ABOUT_ASSETS,
} from '../data/aboutContent';
import { HeroSection } from '../components/HeroSection';
import { StorySection } from '../components/StorySection';
import { MissionVision } from '../components/MissionVision';
import { ApproachStorySection } from '../components/ApproachStorySection';
import { CoreValuesSection } from '../components/CoreValuesSection';
import { FounderSection } from '../components/FounderSection';
import { StatsBanner } from '../components/StatsBanner';
import { ClientsSection } from '../components/ClientsSection';
import { CtaSection } from '../components/CtaSection';
import { MetaTags } from '../../../../core/components/MetaTags';
import { AboutImageDevEditorPanel } from '../components/AboutImageDevEditorPanel';
import type { AboutImageSelection } from '../aboutImageEditorUtils';
import { normalizeAboutImageTransform } from '../aboutImageEditorUtils';
import {
  useAboutImageDevEditor,
  type AboutExportEntry,
} from '../useAboutImageDevEditor';
import companyHeroImage from '@assets/marketing/shared/company-hero-logistics-yard.jpg';

const ABOUT_PAGE_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Darshan Transport',
  url: 'https://darshantransport.com/about',
  description:
    'Learn about Darshan Transport, a Nepal-based logistics company offering bulk cargo transport, full-truck shipments, warehousing, and distribution support for businesses.',
  publisher: {
    '@type': 'Organization',
    name: 'Darshan Transport',
  },
};

const IS_DEV_ABOUT_IMAGE_EDITOR_ENABLED = import.meta.env.DEV;

const ABOUT_HERO_SELECTION: AboutImageSelection = {
  kind: 'heroImage',
  targetId: 'about-hero',
  label: 'About hero background',
  defaultTransform: normalizeAboutImageTransform(),
  defaultImageSrc: companyHeroImage,
  defaultImageAlt: 'Darshan Transport logistics yard',
  defaultSourceName: 'company-hero-logistics-yard.jpg',
  imageSrc: companyHeroImage,
  imageAlt: 'Darshan Transport logistics yard',
  previewAspectRatio: '16 / 10',
};

const ABOUT_EXPORT_ENTRIES: AboutExportEntry[] = [
  {
    kind: ABOUT_HERO_SELECTION.kind,
    label: ABOUT_HERO_SELECTION.label ?? ABOUT_HERO_SELECTION.targetId,
    targetId: ABOUT_HERO_SELECTION.targetId,
  },
  ...ABOUT_FOUNDERS.map((profile) => ({
    kind: 'founderPortrait' as const,
    label: profile.signatureLabel,
    targetId: profile.signatureLabel,
  })),
];

export const AboutPage: React.FC = () => {
  const devEditorState = IS_DEV_ABOUT_IMAGE_EDITOR_ENABLED
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useAboutImageDevEditor(ABOUT_EXPORT_ENTRIES)
    : undefined;

  // `devEditorState` satisfies the `AboutImageDevEditor` interface directly.
  const devEditor = devEditorState;

  const selectedTarget = devEditorState?.selectedTarget ?? null;
  const selectedTransform = selectedTarget
    ? (devEditorState?.getTransform(selectedTarget) ?? null)
    : null;
  const resolvedHeroImage =
    devEditorState?.getImageSource(ABOUT_HERO_SELECTION);

  return (
    <div className="about-page">
      <MetaTags
        title="About Darshan Transport | Logistics & Transport Company in Nepal"
        description="Learn about Darshan Transport, a Nepal-based logistics company offering bulk cargo transport, full-truck shipments, warehousing, and distribution support for businesses."
        canonical="https://darshantransport.com/about"
        structuredData={ABOUT_PAGE_STRUCTURED_DATA}
      />
      {devEditorState?.fileInputId ? (
        <input
          id={devEditorState.fileInputId}
          type="file"
          accept="image/*"
          className="sr-only"
          tabIndex={-1}
          aria-hidden
          onChange={devEditorState.handleImagePickerChange}
        />
      ) : null}
      <HeroSection
        imageTransform={devEditor?.getTransform(ABOUT_HERO_SELECTION)}
        imageOverrideSrc={resolvedHeroImage?.src}
        isImageSelected={devEditor?.isSelected(ABOUT_HERO_SELECTION)}
        isImageDragging={devEditor?.isDragging(ABOUT_HERO_SELECTION)}
        onImagePointerDown={
          devEditor
            ? (event) => {
                if (!devEditor.isSelected(ABOUT_HERO_SELECTION)) {
                  devEditor.selectTarget(ABOUT_HERO_SELECTION);
                  return;
                }

                devEditor.startDrag(
                  event,
                  ABOUT_HERO_SELECTION,
                  devEditor.getTransform(ABOUT_HERO_SELECTION)
                );
              }
            : undefined
        }
      />
      <StorySection
        description={ABOUT_DESCRIPTION}
        animationSrc={ABOUT_ASSETS.animation}
      />
      <MissionVision />
      <ApproachStorySection />
      <CoreValuesSection values={ABOUT_CORE_VALUES} />
      <FounderSection profiles={ABOUT_FOUNDERS} devEditor={devEditor} />
      <StatsBanner />
      <ClientsSection logos={ABOUT_CLIENT_LOGOS} />
      <CtaSection />

      {selectedTarget && selectedTransform && devEditorState ? (
        <AboutImageDevEditorPanel
          selection={selectedTarget}
          transform={selectedTransform}
          imageSrc={devEditorState.getImageSource(selectedTarget).src}
          imageAlt={devEditorState.getImageSource(selectedTarget).alt}
          notice={devEditorState.notice}
          isSaved={devEditorState.isSaved}
          exportText={devEditorState.exportText}
          fileInputId={devEditorState.fileInputId}
          hasCustomImage={
            devEditorState.getImageSource(selectedTarget).hasCustomImage
          }
          sourceHelperText={
            devEditorState.getImageSource(selectedTarget).sourceName
          }
          onClose={devEditorState.closeEditor}
          onReset={() => devEditorState.resetTarget(selectedTarget)}
          onSave={() => {
            void devEditorState.saveOverrides();
          }}
          onTransformChange={(nextTransform) =>
            devEditorState.updateTargetTransform(selectedTarget, nextTransform)
          }
          onCopyExport={() => {
            void window.navigator.clipboard
              .writeText(devEditorState.exportText)
              .catch(() => undefined);
          }}
          onPickImage={() => devEditorState.openImagePicker()}
          onClearImageOverride={() =>
            devEditorState.clearImageOverride(selectedTarget)
          }
        />
      ) : null}
    </div>
  );
};
