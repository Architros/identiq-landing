import { CtaBand } from "@landing/components/landing/cta-band";
import { FaqSection } from "@landing/components/landing/faq-section";
import { HeroSection } from "@landing/components/landing/hero-section";
import { HowItWorks } from "@landing/components/landing/how-it-works";
import { IntegrationsSection } from "@landing/components/landing/integrations-section";
import { PricingSection } from "@landing/components/landing/pricing-section";
import { LandingFooter } from "@landing/components/landing/landing-footer";
import { LandingNav } from "@landing/components/landing/landing-nav";
import { APP_LINKS } from "@landing/lib/app-url";
import {
  getSiteUrl,
  SITE_DESCRIPTION,
  SITE_HEADLINE,
  SITE_NAME,
} from "@landing/lib/site-seo";

function buildStructuredData() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en-US",
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: SITE_NAME,
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/brand/logo-identiq.svg`,
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#application`,
        name: SITE_NAME,
        applicationCategory: "DesignApplication",
        operatingSystem: "Web",
        description: SITE_HEADLINE,
        url: siteUrl,
        offers: {
          "@type": "Offer",
          price: "5.00",
          priceCurrency: "USD",
          description: "One-time welcome pack for new customers",
        },
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: SITE_HEADLINE,
        description: SITE_DESCRIPTION,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#application` },
        inLanguage: "en-US",
      },
    ],
  };
}

export default function LandingPage() {
  const structuredData = buildStructuredData();

  return (
    <div className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <a
        href={APP_LINKS.startBrand()}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-foreground"
      >
        Skip to create your brand
      </a>
      <LandingNav />
      <main className="overflow-x-clip">
        <HeroSection />
        <HowItWorks />
        <IntegrationsSection />
        <PricingSection />
        <FaqSection />
        <CtaBand />
      </main>
      <LandingFooter />
    </div>
  );
}
