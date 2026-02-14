import React, { createContext, useCallback, useContext, useState } from 'react';

interface TransitionContextType {
  isTransitioning: boolean;
  startTransition: (callback: () => void) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(
  undefined
);

export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = useCallback((callback: () => void) => {
    setIsTransitioning(true);
    // Wait for fade-in (600ms) then navigate
    setTimeout(() => {
      callback();
      // We don't immediately set isTransitioning to false here.
      // The optimization in usePreloader or the route change will handle the "loading" state.
      // However, to be safe and cleaner, we can reset it after a small delay or rely on the effect.
      // Actually, once navigation happens, the component might re-render.
      // Let's reset it after a safety delay or let the route change logic take over.
      // For now, we'll reset it to allow the "hold" phase to be managed by the new route's mounting.
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 600);
  }, []);

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
};
