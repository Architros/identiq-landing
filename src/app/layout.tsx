import type { Metadata } from "next";
import { displayFont, geistSans } from "@landing/lib/fonts";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://tryidentiq.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "identiq — AI Brand System",
  description:
    "Build your brand kit, remix premium templates, and ship on-brand assets with AI.",
  openGraph: {
    title: "identiq — AI Brand System",
    description:
      "Build your brand kit, remix premium templates, and ship on-brand assets with AI.",
    images: [
      {
        url: "/hero/hiker-misty-mountains.webp",
        width: 1920,
        height: 1080,
        alt: "identiq",
      },
    ],
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
      <head><link rel="preload" as="image" href="/hero/hiker-misty-mountains.webp" fetchPriority="high" /></head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
