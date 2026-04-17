export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface BreakpointValues {
  screenWidth: number;
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

interface ViewportLike {
  innerWidth: number;
}

export function getViewportWidth(viewport?: ViewportLike): number {
  return viewport?.innerWidth ?? 0;
}

export function getBreakpoint(width: number): Breakpoint {
  if (width < 640) return 'xs';
  if (width < 768) return 'sm';
  if (width < 1024) return 'md';
  if (width < 1280) return 'lg';
  if (width < 1536) return 'xl';
  return '2xl';
}

export function getBreakpointState(width: number): BreakpointValues {
  return {
    screenWidth: width,
    breakpoint: getBreakpoint(width),
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
  };
}
