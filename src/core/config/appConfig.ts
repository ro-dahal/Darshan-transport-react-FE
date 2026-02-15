const LOCAL_HOST_PATTERN = /^(localhost|127\.0\.0\.1|\[::1\])$/i;

function isLocalHost(hostname: string): boolean {
  return LOCAL_HOST_PATTERN.test(hostname);
}

function parseEnvBaseUrl(): string {
  const raw = (import.meta.env.VITE_API_BASE_URL ?? '').toString().trim();
  if (!raw) {
    return '';
  }

  try {
    return new URL(raw).toString();
  } catch {
    // eslint-disable-next-line no-console
    console.warn(
      '[appConfig] Invalid VITE_API_BASE_URL value, falling back to window.origin'
    );
    return '';
  }
}

function resolveBrowserOrigin(): string {
  if (typeof window === 'undefined' || !window.location) {
    return '';
  }
  return window.location.origin;
}

export function resolveApiBaseUrl(): string {
  const origin = resolveBrowserOrigin();
  const envBase = parseEnvBaseUrl();

  if (!envBase) {
    return origin;
  }

  const pageIsLocal =
    typeof window !== 'undefined'
      ? isLocalHost(window.location.hostname)
      : false;
  const envHostIsLocal = isLocalHost(new URL(envBase).hostname);

  if (envHostIsLocal && !pageIsLocal) {
    return origin;
  }

  return envBase;
}

export const appConfig = {
  get apiBaseUrl(): string {
    return resolveApiBaseUrl();
  },
};
