import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransition } from '../hooks/useTransition';
import { getTransitionNavigationMode } from './transitionLinkUtils';

interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  className?: string;
  children: React.ReactNode;
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({
  to,
  children,
  className,
  onClick,
  ...props
}) => {
  const navigate = useNavigate();
  const { startTransition } = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    if (e.defaultPrevented) {
      return;
    }

    const navigationMode = getTransitionNavigationMode({
      currentPathname: window.location.pathname,
      to,
      target: props.target,
      download: props.download,
      event: {
        button: e.button,
        metaKey: e.metaKey,
        altKey: e.altKey,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
      },
    });

    if (navigationMode === 'browser') {
      return;
    }

    e.preventDefault();

    if (navigationMode === 'ignore') {
      return;
    }

    if (navigationMode === 'instant') {
      navigate(to);
      return;
    }

    startTransition(() => navigate(to));
  };

  return (
    <a href={to} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};
