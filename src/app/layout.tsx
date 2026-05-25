import type { Metadata } from "next";
import { displayFont, geistSans } from "@/lib/fonts";
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
        url: "/hero/hiker-misty-mountains.png",
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
      className={`${geistSans.variable} ${displayFont.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
