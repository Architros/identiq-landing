export const LANDING_COPY = {
  nav: {
    cta: "Get Started",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Channels", href: "#channels" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  announcement: "Secure the $5 launch offer",
  hero: {
    headline: {
      before: "The ",
      highlight: "brand",
      after: " OS layer for ambitious companies.",
    },
    subheadline:
      "Identity, assets, and on-brand campaigns in one system — from first logo to launch.",
    registerPlaceholder: "Register your brand",
    registerCta: "Create brand",
    mediaCard: {
      title: "See what you can ship on day one.",
      linkLabel: "Browse the showcase",
      href: "#showcase",
    },
  },
  howItWorks: {
    cta: "Create your kit",
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
  integrations: {
    eyebrow: "Channels",
    title: "From brand kit to every channel.",
    description:
      "Define your identity in Identiq once — ship on-brand posts and assets to the platforms your team uses.",
    cardTitle: "One brand system, every destination",
    cardDescription:
      "Your colors, logo, and templates flow from a single kit into Instagram, LinkedIn, X, and the rest — ready to publish.",
    cta: "Ship everywhere",
    platforms: [
      "instagram",
      "linkedin",
      "x",
      "facebook",
      "tiktok",
      "youtube",
      "pinterest",
      "threads",
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Plans that scale with your brand output.",
    description:
      "Same packs and token amounts as in the app — pick a plan after you sign in and checkout securely with Stripe.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Common questions",
    description: "Everything you need to know before you launch your first brand kit.",
    footer: "Need a plan first?",
    footerCta: "View pricing",
    footerCtaHref: "#pricing",
  },
  ctaBand: {
    title: "Ready to build your brand?",
    description:
      "Sign in and launch your first brand kit in minutes. No design files required.",
    cta: "Sign in to launch",
  },
} as const;
