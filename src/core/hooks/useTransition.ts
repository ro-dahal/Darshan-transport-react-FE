import { useContext } from 'react';
import { TransitionContext } from '../contexts/transitionContextBase';

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
};
