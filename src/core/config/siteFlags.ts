function resolveIsProd(): boolean {
  return Boolean(
    (
      import.meta as ImportMeta & {
        env?: {
          PROD?: boolean;
        };
      }
    ).env?.PROD
  );
}

export function isTeamPageEnabled(isProd: boolean = resolveIsProd()): boolean {
  return !isProd;
}

export const TEAM_PAGE_ENABLED = isTeamPageEnabled();
