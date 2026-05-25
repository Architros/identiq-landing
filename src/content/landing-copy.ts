export const LANDING_COPY = {
  announcement: "AI brand system — from logo to launch-ready assets",
  hero: {
    headline: {
      before: "The ",
      highlight: "brand",
      after: " OS layer for ambitious companies.",
    },
    subheadline:
      "Identity, assets, and on-brand campaigns in one system — from first logo to launch.",
    cta: "Start your brand",
    mediaCard: {
      title: "See what you can ship on day one.",
      linkLabel: "Browse the showcase",
      href: "#showcase",
    },
  },
  logoStrip: {
    label: "Built for teams who need brand consistency at speed",
    items: ["Startups", "Agencies", "Creators", "E-commerce", "SaaS"],
  },
  features: [
    {
      id: "brand-kit",
      eyebrow: "Brand kit",
      title: "Define your identity once. Generate on-brand forever.",
      description:
        "Walk through a guided wizard — name, feeling, colors, fonts, and logo — then let AI produce a cohesive starter pack you can refine.",
      cta: "Create a brand kit",
      imageCount: 4,
      imageOffset: 0,
    },
    {
      id: "library",
      eyebrow: "Library",
      title: "Remix premium layouts with your brand applied.",
      description:
        "Browse real campaign templates and apply your colors, typography, and logo in one click — no starting from a blank canvas.",
      cta: "Explore the library",
      imageCount: 4,
      imageOffset: 4,
    },
    {
      id: "studio",
      eyebrow: "Studio",
      title: "Ship social posts, ads, and formats at scale.",
      description:
        "Preset sizes for feeds and stories, ad layouts, and a multi-preset studio — all grounded in your brand system.",
      cta: "Open the studio",
      imageCount: 4,
      imageOffset: 8,
    },
  ],
  showcase: {
    eyebrow: "Showcase",
    title: "Campaign-ready assets, generated with your brand.",
    description:
      "Templates and outputs from the Identiq library — swap in your kit and ship.",
  },
  ctaBand: {
    title: "Ready to build your brand?",
    description:
      "Sign in and launch your first brand kit in minutes. No design files required.",
    cta: "Get started free",
  },
} as const;
