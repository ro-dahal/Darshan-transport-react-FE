export type NavbarInteractionContext = 'desktop' | 'mobile';

interface NavbarDropdownClickBehaviorOptions {
  hasDropdown: boolean;
  context: NavbarInteractionContext;
}

export function getNavbarDropdownClickBehavior({
  hasDropdown,
  context,
}: NavbarDropdownClickBehaviorOptions): 'navigate' | 'toggle-dropdown' {
  if (!hasDropdown) {
    return 'navigate';
  }

  if (context === 'desktop') {
    return 'navigate';
  }

  return 'toggle-dropdown';
}
