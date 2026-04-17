export type TransitionNavigationMode =
  | 'browser'
  | 'instant'
  | 'transition'
  | 'ignore';

type TransitionClickEventState = {
  button: number;
  metaKey: boolean;
  altKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
};

interface TransitionNavigationOptions {
  currentPathname: string;
  to: string;
  target?: string;
  download?: string | boolean;
  event: TransitionClickEventState;
}

const ABSOLUTE_URL_PATTERN = /^(?:[a-z][a-z\d+\-.]*:)?\/\//i;

export function isModifiedEvent(event: TransitionClickEventState): boolean {
  return (
    event.button !== 0 ||
    event.metaKey ||
    event.altKey ||
    event.ctrlKey ||
    event.shiftKey
  );
}

function isBrowserHandledLink(
  to: string,
  target?: string,
  download?: string | boolean
) {
  return (
    Boolean(download) ||
    target === '_blank' ||
    target === '_parent' ||
    target === '_top' ||
    ABSOLUTE_URL_PATTERN.test(to) ||
    to.startsWith('mailto:') ||
    to.startsWith('tel:')
  );
}

export function getTransitionNavigationMode({
  currentPathname,
  to,
  target,
  download,
  event,
}: TransitionNavigationOptions): TransitionNavigationMode {
  if (isModifiedEvent(event) || isBrowserHandledLink(to, target, download)) {
    return 'browser';
  }

  const [rawPathname] = to.split('#');
  const targetPathname = rawPathname || currentPathname;
  const isHashLink = to.includes('#');

  if (currentPathname === targetPathname && isHashLink) {
    return 'instant';
  }

  if (currentPathname === to || currentPathname === targetPathname) {
    return 'ignore';
  }

  return 'transition';
}
