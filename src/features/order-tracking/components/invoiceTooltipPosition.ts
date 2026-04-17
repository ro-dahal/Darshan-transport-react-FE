const TOOLTIP_GAP = 16;
const VIEWPORT_GUTTER = 16;
const MIN_TOOLTIP_WIDTH = 140;
const MAX_TOOLTIP_WIDTH = 620;
const PREFERRED_TOOLTIP_MAX_HEIGHT = 560;
const MIN_TOOLTIP_MAX_HEIGHT = 220;
const MIN_TOOLTIP_MEASURED_HEIGHT = 260;
const TOOLTIP_CHROME_HEIGHT = 24;
const TOOLTIP_IMAGE_ASPECT_RATIO = 877 / 1241;
const TOOLTIP_FRAME_WIDTH = 18;

type TooltipPlacement = 'top' | 'bottom';

export type InvoiceTooltipAnchorRect = {
  top: number;
  right: number;
  bottom: number;
};

type InvoiceTooltipViewport = {
  width: number;
  height: number;
};

export type InvoiceTooltipPosition = {
  left: number;
  top: number;
  width: number;
  maxHeight: number;
  imageMaxHeight: number;
  placement: TooltipPlacement;
};

type GetInvoiceTooltipPositionArgs = {
  viewport: InvoiceTooltipViewport;
  buttonRect: InvoiceTooltipAnchorRect;
  panelHeight: number;
};

const clamp = (value: number, min: number, max: number) => {
  if (max <= min) {
    return min;
  }

  return Math.min(max, Math.max(min, value));
};

const getTooltipWidthCap = (viewportWidth: number) => {
  if (viewportWidth <= 420) {
    return 280;
  }

  if (viewportWidth <= 640) {
    return 320;
  }

  if (viewportWidth <= 900) {
    return 360;
  }

  if (viewportWidth <= 1180) {
    return 440;
  }

  return MAX_TOOLTIP_WIDTH;
};

const getTooltipMinWidth = (viewportWidth: number) => {
  if (viewportWidth <= 420) {
    return 140;
  }

  if (viewportWidth <= 900) {
    return 160;
  }

  return 180;
};

const getTooltipWidth = (viewportWidth: number, imageMaxHeight: number) => {
  const availableWidth = Math.max(0, viewportWidth - VIEWPORT_GUTTER * 2);
  const widthCap = getTooltipWidthCap(viewportWidth);
  const widthFloor = getTooltipMinWidth(viewportWidth);
  const contentWidth =
    imageMaxHeight * TOOLTIP_IMAGE_ASPECT_RATIO + TOOLTIP_FRAME_WIDTH;

  if (availableWidth <= MIN_TOOLTIP_WIDTH) {
    return availableWidth;
  }

  return Math.min(
    widthCap,
    availableWidth,
    Math.max(widthFloor, Math.round(contentWidth))
  );
};

const getTooltipMaxHeightCap = (
  viewportHeight: number,
  viewportWidth: number
) => {
  if (viewportWidth <= 420) {
    return Math.min(420, viewportHeight - VIEWPORT_GUTTER * 2);
  }

  if (viewportWidth <= 900) {
    return Math.min(480, viewportHeight - VIEWPORT_GUTTER * 2);
  }

  return PREFERRED_TOOLTIP_MAX_HEIGHT;
};

const getTooltipMaxHeight = (viewportHeight: number, viewportWidth: number) => {
  const availableHeight = Math.max(0, viewportHeight - VIEWPORT_GUTTER * 2);
  const maxHeightCap = getTooltipMaxHeightCap(viewportHeight, viewportWidth);

  if (availableHeight <= MIN_TOOLTIP_MAX_HEIGHT) {
    return availableHeight;
  }

  return Math.min(maxHeightCap, availableHeight);
};

export const getInvoiceTooltipPosition = ({
  viewport,
  buttonRect,
  panelHeight,
}: GetInvoiceTooltipPositionArgs): InvoiceTooltipPosition => {
  const maxHeight = getTooltipMaxHeight(viewport.height, viewport.width);
  const imageMaxHeight = Math.max(96, maxHeight - TOOLTIP_CHROME_HEIGHT);
  const width = getTooltipWidth(viewport.width, imageMaxHeight);
  const requiredHeight = Math.min(
    Math.max(panelHeight, MIN_TOOLTIP_MEASURED_HEIGHT),
    maxHeight
  );
  const bottomSpace =
    viewport.height - buttonRect.bottom - TOOLTIP_GAP - VIEWPORT_GUTTER;
  const topSpace = buttonRect.top - TOOLTIP_GAP - VIEWPORT_GUTTER;
  const shouldPlaceAbove =
    bottomSpace < requiredHeight && topSpace > bottomSpace;

  const left = clamp(
    buttonRect.right - width,
    VIEWPORT_GUTTER,
    viewport.width - VIEWPORT_GUTTER - width
  );

  if (shouldPlaceAbove) {
    return {
      left,
      top: clamp(
        buttonRect.top - TOOLTIP_GAP - maxHeight,
        VIEWPORT_GUTTER,
        viewport.height - VIEWPORT_GUTTER - maxHeight
      ),
      width,
      maxHeight,
      imageMaxHeight,
      placement: 'top',
    };
  }

  return {
    left,
    top: clamp(
      buttonRect.bottom + TOOLTIP_GAP,
      VIEWPORT_GUTTER,
      viewport.height - VIEWPORT_GUTTER - maxHeight
    ),
    width,
    maxHeight,
    imageMaxHeight,
    placement: 'bottom',
  };
};
