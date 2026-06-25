import type { MetadataRoute } from "next";
import { buildLandingSitemap } from "@landing/lib/landing-sitemap";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildLandingSitemap();
}
