type SiteFlagsEnv = {
  PROD?: boolean;
  VITE_ENABLE_TEAM_PAGE?: string;
};

const getSiteFlagsEnv = (): SiteFlagsEnv | undefined =>
  (import.meta as ImportMeta & { env?: SiteFlagsEnv }).env;

export function isTeamPageEnabled(env = getSiteFlagsEnv()): boolean {
  const explicitValue = env?.VITE_ENABLE_TEAM_PAGE?.trim().toLowerCase();

  if (explicitValue === 'true') {
    return true;
  }

  if (explicitValue === 'false') {
    return false;
  }

  // Enable the Team page by default (including in production), unless
  // explicitly overridden via `VITE_ENABLE_TEAM_PAGE`.
  return true;
}
