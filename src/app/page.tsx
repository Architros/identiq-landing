import { CtaBand } from "@/components/landing/cta-band";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingNav } from "@/components/landing/landing-nav";

export default function LandingPage() {
  return (
    <>
      <LandingNav />
      <main>
        <HeroSection />
        <HowItWorks />
        <CtaBand />
      </main>
      <LandingFooter />
    </>
  );
}
