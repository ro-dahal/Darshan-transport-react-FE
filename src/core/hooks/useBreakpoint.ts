import { useState, useEffect } from 'react';
import {
  getBreakpointState,
  getViewportWidth,
  type BreakpointValues,
} from './breakpointUtils';

export type { Breakpoint } from './breakpointUtils';

export const useBreakpoint = (): BreakpointValues => {
  const [width, setWidth] = useState(() => getViewportWidth(globalThis.window));

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return getBreakpointState(width);
};
