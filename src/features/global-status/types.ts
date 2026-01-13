export interface GlobalStatusContextValue {
  siteHealthy: boolean;
  lastChecked?: Date;
  checkNow(): Promise<void>;
}
