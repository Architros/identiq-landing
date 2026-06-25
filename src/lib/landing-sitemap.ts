import type { MetadataRoute } from "next";
import { LANDING_COPY } from "@landing/content/landing-copy";
import { getSiteUrl } from "@landing/lib/site-seo";

type SitemapEntry = {
  /** Path or hash on tryidentiq.com (e.g. `/#pricing`). */
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

function addEntry(
  map: Map<string, SitemapEntry>,
  entry: SitemapEntry,
): void {
  const existing = map.get(entry.path);
  if (!existing || entry.priority > existing.priority) {
    map.set(entry.path, entry);
  }
}

/** Canonical landing URLs for tryidentiq.com (single-page sections + home). */
export function buildLandingSitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();
  const entries = new Map<string, SitemapEntry>();

  addEntry(entries, { path: "", changeFrequency: "weekly", priority: 1 });
  addEntry(entries, { path: "/#hero", changeFrequency: "weekly", priority: 0.95 });

  for (const link of LANDING_COPY.nav.links) {
    addEntry(entries, {
      path: `/${link.href}`,
      changeFrequency: link.href === "#pricing" ? "weekly" : "monthly",
      priority: link.href === "#pricing" ? 0.9 : 0.85,
    });
  }

  addEntry(entries, {
    path: `/${LANDING_COPY.hero.mediaCard.href}`,
    changeFrequency: "monthly",
    priority: 0.8,
  });

  return [...entries.values()].map((entry) => ({
    url: entry.path ? `${siteUrl}${entry.path}` : siteUrl,
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
