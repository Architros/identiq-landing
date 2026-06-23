export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://tryidentiq.com"
  );
}

export const SITE_NAME = "Identiq";

export const SITE_HEADLINE =
  "Generate social posts, ad creatives, and brand assets that always stay on brand.";

export const SITE_DESCRIPTION =
  "Identiq is an AI brand system for startups and teams. Build your brand kit, generate on-brand social posts and ad creatives, and ship consistent assets across every channel.";

export const SITE_KEYWORDS = [
  "on-brand marketing",
  "AI brand assets",
  "social media post generator",
  "ad creative generator",
  "brand kit",
  "brand identity",
  "marketing design AI",
  "consistent branding",
  "Instagram post generator",
  "LinkedIn creatives",
  "brand templates",
  "Identiq",
] as const;

export const SITE_OG_IMAGE = {
  url: "/thumbnail.png",
  width: 500,
  height: 274,
  alt: "Identiq — on-brand social posts, ad creatives, and brand assets",
} as const;
