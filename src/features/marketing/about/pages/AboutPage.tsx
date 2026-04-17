import React, { useEffect, useState } from 'react';
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
import { CoreValuesSection } from '../components/CoreValuesSection';
import { FounderSection } from '../components/FounderSection';
import { StatsBanner } from '../components/StatsBanner';
import { ClientsSection } from '../components/ClientsSection';
import { CtaSection } from '../components/CtaSection';
import { MetaTags } from '../../../../core/components/MetaTags';
import { AboutImageDevEditorPanel } from '../components/AboutImageDevEditorPanel';
import type {
  AboutImageDevEditor,
  AboutImageSelection,
  AboutImageTransform,
} from '../aboutImageEditorUtils';
import {
  EMPTY_ABOUT_IMAGE_TRANSFORM_OVERRIDES,
  areAboutImageTransformsEqual,
  buildAboutTransformExportText,
  normalizeAboutImageTransform,
  parseStoredAboutImageOverrides,
  setAboutImageOverride,
} from '../aboutImageEditorUtils';
import companyHeroImage from '../../../../assets/img/company-hero-logistics-yard.jpg';

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
const ABOUT_IMAGE_EDITOR_STORAGE_KEY =
  'darshan-about-page-image-editor-overrides';

const ABOUT_HERO_SELECTION: AboutImageSelection = {
  kind: 'heroImage',
  targetId: 'about-hero',
  label: 'About hero background',
  defaultTransform: normalizeAboutImageTransform(),
  imageSrc: companyHeroImage,
  imageAlt: 'Darshan Transport logistics yard',
  previewAspectRatio: '16 / 10',
};

type ActiveDragState = {
  selection: AboutImageSelection;
  pointerStartX: number;
  pointerStartY: number;
  width: number;
  height: number;
  startingTransform: AboutImageTransform;
};

const ABOUT_EXPORT_ENTRIES = [
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

const getOverrideRecordForKind = (
  selection: AboutImageSelection,
  overrides: typeof EMPTY_ABOUT_IMAGE_TRANSFORM_OVERRIDES
) =>
  selection.kind === 'founderPortrait'
    ? overrides.founderPortraits
    : overrides.heroImages;

export const AboutPage: React.FC = () => {
  const [currentOverrides, setCurrentOverrides] = useState(
    EMPTY_ABOUT_IMAGE_TRANSFORM_OVERRIDES
  );
  const [savedOverrides, setSavedOverrides] = useState(
    EMPTY_ABOUT_IMAGE_TRANSFORM_OVERRIDES
  );
  const [selectedTarget, setSelectedTarget] =
    useState<AboutImageSelection | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [activeDragState, setActiveDragState] =
    useState<ActiveDragState | null>(null);

  useEffect(() => {
    if (!IS_DEV_ABOUT_IMAGE_EDITOR_ENABLED) {
      return;
    }

    const storedOverrides = parseStoredAboutImageOverrides(
      window.localStorage.getItem(ABOUT_IMAGE_EDITOR_STORAGE_KEY)
    );

    setCurrentOverrides(storedOverrides);
    setSavedOverrides(storedOverrides);
  }, []);

  useEffect(() => {
    if (!activeDragState) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const deltaX = event.clientX - activeDragState.pointerStartX;
      const deltaY = event.clientY - activeDragState.pointerStartY;

      setCurrentOverrides((previousOverrides) =>
        setAboutImageOverride(previousOverrides, activeDragState.selection, {
          xPercent:
            activeDragState.startingTransform.xPercent +
            (deltaX / activeDragState.width) * 100,
          yPercent:
            activeDragState.startingTransform.yPercent +
            (deltaY / activeDragState.height) * 100,
          scale: activeDragState.startingTransform.scale,
        })
      );
    };

    const stopDragging = () => {
      setActiveDragState(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', stopDragging);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', stopDragging);
    };
  }, [activeDragState]);

  const exportText = buildAboutTransformExportText(
    ABOUT_EXPORT_ENTRIES,
    currentOverrides
  );

  const writeOverridesToStorage = (
    nextOverrides: typeof EMPTY_ABOUT_IMAGE_TRANSFORM_OVERRIDES
  ) => {
    if (!IS_DEV_ABOUT_IMAGE_EDITOR_ENABLED) {
      return;
    }

    window.localStorage.setItem(
      ABOUT_IMAGE_EDITOR_STORAGE_KEY,
      JSON.stringify(nextOverrides)
    );
  };

  const getTransformForTarget = (selection: AboutImageSelection) =>
    normalizeAboutImageTransform(
      getOverrideRecordForKind(selection, currentOverrides)[
        selection.targetId
      ] ?? selection.defaultTransform
    );

  const isTargetSaved = (selection: AboutImageSelection) => {
    const currentTransform = normalizeAboutImageTransform(
      getOverrideRecordForKind(selection, currentOverrides)[
        selection.targetId
      ] ?? selection.defaultTransform
    );
    const savedTransform = normalizeAboutImageTransform(
      getOverrideRecordForKind(selection, savedOverrides)[selection.targetId] ??
        selection.defaultTransform
    );

    return areAboutImageTransformsEqual(currentTransform, savedTransform);
  };

  const copyExportToClipboard = async () => {
    try {
      await window.navigator.clipboard.writeText(exportText);
      setNotice('Copied About page transform export.');
    } catch {
      setNotice(
        'Clipboard access failed. You can still copy from the export box.'
      );
    }
  };

  const devEditor: AboutImageDevEditor | undefined =
    IS_DEV_ABOUT_IMAGE_EDITOR_ENABLED
      ? {
          isEnabled: true,
          selectedTarget,
          getTransform: getTransformForTarget,
          isSelected: (selection) =>
            selectedTarget?.kind === selection.kind &&
            selectedTarget.targetId === selection.targetId,
          selectTarget: (selection) => {
            setSelectedTarget(selection);
            setNotice(null);
          },
          startDrag: (event, selection, transform) => {
            const bounds = event.currentTarget.getBoundingClientRect();

            setSelectedTarget(selection);
            setActiveDragState({
              selection,
              pointerStartX: event.clientX,
              pointerStartY: event.clientY,
              width: Math.max(bounds.width, 1),
              height: Math.max(bounds.height, 1),
              startingTransform: transform,
            });
          },
        }
      : undefined;

  const selectedTransform = selectedTarget
    ? getTransformForTarget(selectedTarget)
    : null;

  return (
    <div className="about-page">
      <MetaTags
        title="About Darshan Transport | Logistics & Transport Company in Nepal"
        description="Learn about Darshan Transport, a Nepal-based logistics company offering bulk cargo transport, full-truck shipments, warehousing, and distribution support for businesses."
        canonical="https://darshantransport.com/about"
        structuredData={ABOUT_PAGE_STRUCTURED_DATA}
      />
      <HeroSection
        imageTransform={devEditor?.getTransform(ABOUT_HERO_SELECTION)}
        isImageSelected={devEditor?.isSelected(ABOUT_HERO_SELECTION)}
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
      <CoreValuesSection values={ABOUT_CORE_VALUES} />
      <FounderSection profiles={ABOUT_FOUNDERS} devEditor={devEditor} />
      <StatsBanner />
      <ClientsSection logos={ABOUT_CLIENT_LOGOS} />
      <CtaSection />

      {selectedTarget && selectedTransform ? (
        <AboutImageDevEditorPanel
          selection={selectedTarget}
          transform={selectedTransform}
          imageSrc={selectedTarget.imageSrc ?? ''}
          imageAlt={selectedTarget.imageAlt ?? ''}
          notice={notice}
          isSaved={isTargetSaved(selectedTarget)}
          exportText={exportText}
          onClose={() => {
            setSelectedTarget(null);
            setActiveDragState(null);
            setNotice(null);
          }}
          onReset={() => {
            setCurrentOverrides((previousOverrides) =>
              setAboutImageOverride(
                previousOverrides,
                selectedTarget,
                selectedTarget.defaultTransform
              )
            );
            setNotice('Reset to the code-defined default transform.');
          }}
          onSave={() => {
            writeOverridesToStorage(currentOverrides);
            setSavedOverrides(currentOverrides);
            setNotice('Saved current About page image overrides locally.');
          }}
          onTransformChange={(nextTransform) => {
            setCurrentOverrides((previousOverrides) =>
              setAboutImageOverride(
                previousOverrides,
                selectedTarget,
                nextTransform
              )
            );
            setSelectedTarget(selectedTarget);
          }}
          onCopyExport={() => {
            void copyExportToClipboard();
          }}
        />
      ) : null}
    </div>
  );
};
