import { CtaBand } from "@landing/components/landing/cta-band";
import { FaqSection } from "@landing/components/landing/faq-section";
import { HeroSection } from "@landing/components/landing/hero-section";
import { HowItWorks } from "@landing/components/landing/how-it-works";
import { IntegrationsSection } from "@landing/components/landing/integrations-section";
import { PricingSection } from "@landing/components/landing/pricing-section";
import { LandingFooter } from "@landing/components/landing/landing-footer";
import { LandingNav } from "@landing/components/landing/landing-nav";

export default function LandingPage() {
  return (
    <>
      <LandingNav />
      <main>
        <HeroSection />
        <HowItWorks />
        <IntegrationsSection />
        <PricingSection />
        <FaqSection />
        <CtaBand />
      </main>
      <LandingFooter />
    </>
  );
}
