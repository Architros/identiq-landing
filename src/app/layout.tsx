import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { displayFont, geistSans } from "@landing/lib/fonts";
import { HERO_MARQUEE_IMAGES } from "@landing/content/landing-media";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://tryidentiq.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "identiq — AI Brand System",
  description:
    "Build your brand kit, remix premium templates, and ship on-brand assets with AI.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "identiq — AI Brand System",
    description:
      "Build your brand kit, remix premium templates, and ship on-brand assets with AI.",
    type: "website",
    images: [
      {
        url: "/thumbnail.png",
        width: 500,
        height: 274,
        alt: "identiq — Generate Everything On-brand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "identiq — AI Brand System",
    description:
      "Build your brand kit, remix premium templates, and ship on-brand assets with AI.",
    images: ["/thumbnail.png"],
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
