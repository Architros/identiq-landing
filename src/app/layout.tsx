import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { displayFont, geistSans } from "@landing/lib/fonts";
import { HERO_MARQUEE_IMAGES } from "@landing/content/landing-media";
import {
  getSiteUrl,
  SITE_DESCRIPTION,
  SITE_HEADLINE,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_OG_IMAGE,
} from "@landing/lib/site-seo";
import "./globals.css";

const siteUrl = getSiteUrl();
const pageTitle = `${SITE_NAME} — On-Brand Social Posts, Ad Creatives & Brand Assets`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: pageTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [...SITE_KEYWORDS],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: siteUrl }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: pageTitle,
    description: SITE_HEADLINE,
    type: "website",
    url: siteUrl,
    siteName: SITE_NAME,
    locale: "en_US",
    images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: SITE_HEADLINE,
    images: [SITE_OG_IMAGE.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${displayFont.variable} antialiased`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/hero/hiker-misty-mountains.webp"
          fetchPriority="high"
        />
        {HERO_MARQUEE_IMAGES.map((image, index) => (
          <link
            key={image.id}
            rel="preload"
            as="image"
            href={image.imageUrl}
            fetchPriority={index < 4 ? "high" : "auto"}
          />
        ))}
      </head>
      <body className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
