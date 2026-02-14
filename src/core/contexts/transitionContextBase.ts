import { createContext } from 'react';

export interface TransitionContextType {
  isTransitioning: boolean;
  startTransition: (callback: () => void) => void;
}

export const TransitionContext = createContext<
  TransitionContextType | undefined
>(undefined);
