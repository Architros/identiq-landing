import { CtaBand } from "@/components/landing/cta-band";
import { FeatureSections } from "@/components/landing/feature-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingNav } from "@/components/landing/landing-nav";
import { ShowcaseSection } from "@/components/landing/showcase-section";

export default function LandingPage() {
  return (
    <>
      <LandingNav />
      <main>
        <HeroSection />
        <FeatureSections />
        <HowItWorks />
        <ShowcaseSection />
        <CtaBand />
      </main>
      <LandingFooter />
    </>
  );
}
