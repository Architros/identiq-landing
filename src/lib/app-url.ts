const DEFAULT_APP_URL = "https://app.tryidentiq.com";

export function getAppBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (!raw) return DEFAULT_APP_URL;
  return raw.replace(/\/$/, "");
}

export function appUrl(path: string): string {
  const base = getAppBaseUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export const APP_LINKS = {
  login: () => appUrl("/login"),
  startBrand: () => appUrl("/login?next=/new-brand"),
  privacy: () => appUrl("/privacy"),
  terms: () => appUrl("/terms"),
} as const;
