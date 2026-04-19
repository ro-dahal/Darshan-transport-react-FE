import React from 'react';
import { DevImageEditorPanel } from '../../shared/dev-image-editor/DevImageEditorPanel';
import type {
  AboutImageSelection,
  AboutImageTransform,
} from '../aboutImageEditorUtils';

interface AboutImageDevEditorPanelProps {
  selection: AboutImageSelection;
  transform: AboutImageTransform;
  imageSrc: string;
  imageAlt: string;
  notice: string | null;
  isSaved: boolean;
  exportText: string;
  onClose: () => void;
  onReset: () => void;
  onSave: () => void;
  onTransformChange: (nextTransform: AboutImageTransform) => void;
  onCopyExport: () => void;
}

const getAboutImageKindLabel = (kind: AboutImageSelection['kind']) =>
  kind === 'founderPortrait' ? 'Founder Portrait' : 'Hero Image';

const getSourceName = (imageSrc: string) => {
  if (!imageSrc) {
    return 'Unspecified source';
  }

  try {
    const url = new URL(imageSrc, 'https://darshantransport.local');

    return url.pathname.split('/').filter(Boolean).pop() ?? imageSrc;
  } catch {
    return imageSrc.split('/').filter(Boolean).pop() ?? imageSrc;
  }
};

export const AboutImageDevEditorPanel: React.FC<
  AboutImageDevEditorPanelProps
> = ({
  selection,
  transform,
  imageSrc,
  imageAlt,
  notice,
  isSaved,
  exportText,
  onClose,
  onReset,
  onSave,
  onTransformChange,
  onCopyExport,
}) => {
  return (
    <DevImageEditorPanel
      selectionLabel={selection.label ?? selection.targetId}
      selectionKindLabel={getAboutImageKindLabel(selection.kind)}
      transform={transform}
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      sourceName={getSourceName(imageSrc)}
      previewAspectRatio={selection.previewAspectRatio ?? '4 / 5'}
      notice={notice}
      isSaved={isSaved}
      exportSections={[
        {
          title: 'About Page Transforms',
          exportText,
          onCopy: onCopyExport,
        },
      ]}
      onClose={onClose}
      onReset={onReset}
      onSave={onSave}
      onTransformChange={onTransformChange}
    />
  );
};
