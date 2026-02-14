import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransition } from '../contexts/TransitionContext';

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
    e.preventDefault();
    if (onClick) {
      onClick(e);
    }

    // Check if it's the current page (ignoring hash) to avoid redundant transitions
    // OR if it's a hash link on the same page
    const currentPath = window.location.pathname;
    const targetPath = to.split('#')[0] || '/';

    if (currentPath === targetPath && to.includes('#')) {
      // Allow default behavior (or simple navigation) for anchors on same page
      // But we preventDefault above. So we must handle it or return early to let caller handle it?
      // Since `handleClick` calls `e.preventDefault()`, we can just fallback to `navigate(to)` WITHOUT transition
      // essentially instant jump/scroll.
      navigate(to);
      return;
    }

    if (window.location.pathname === to) {
      return;
    }

    startTransition(() => {
      navigate(to);
    });
  };

  return (
    <a href={to} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};
