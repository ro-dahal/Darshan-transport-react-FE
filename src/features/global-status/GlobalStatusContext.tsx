import React, { useEffect, useMemo, useState, useCallback } from "react";
import type { PropsWithChildren } from "react";
import { createApiClient } from "../../core/api/apiClient";
import { GlobalStatusContext } from "./globalStatusInternal";

export const GlobalStatusProvider: React.FC<
  PropsWithChildren<{ pollingIntervalMs?: number }>
> = ({ children, pollingIntervalMs = 30000 }) => {
  const [siteHealthy, setSiteHealthy] = useState<boolean>(true);
  const [lastChecked, setLastChecked] = useState<Date | undefined>(undefined);

  const client = useMemo(() => createApiClient(), []);

  const checkNow = useCallback(async () => {
    try {
      // call a lightweight health endpoint; we don't care about the body
      await client.get("/api/health");
      setSiteHealthy(true);
      setLastChecked(new Date());
    } catch (err) {
      // log for diagnostics
      console.debug("Health check failed", err);
      setSiteHealthy(false);
      setLastChecked(new Date());
    }
  }, [client]);

  useEffect(() => {
    let mounted = true;
    // Do initial check immediately
    checkNow();

    // Poll periodically
    const id = setInterval(() => {
      if (!mounted) return;
      checkNow();
    }, pollingIntervalMs);

    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [checkNow, pollingIntervalMs]);

  const value = useMemo(
    () => ({ siteHealthy, lastChecked, checkNow }),
    [siteHealthy, lastChecked, checkNow]
  );

  return (
    <GlobalStatusContext.Provider value={value}>
      {children}
    </GlobalStatusContext.Provider>
  );
};
