"use client";

import { useCallback, useMemo, useState } from "react";
import { BillingIntervalToggle } from "@/components/billing/billing-interval-toggle";
import { PlanPackCard } from "@/components/billing/plan-pack-card";
import { CustomPackTeaserCard } from "@/components/billing/custom-pack-teaser-card";
import { CustomPackDetailView } from "@/components/billing/custom-pack-detail-view";
import { WelcomeOfferBanner } from "@/components/billing/welcome-offer-banner";
import {
  formatUsd,
  listDisplayPacks,
  toDisplayPack,
  WELCOME_PACK,
  type BillingInterval,
} from "@/lib/billing/plan-catalog";
import { CUSTOM_PACK_TIERS } from "@/lib/billing/custom-pack-pricing";
import type { ScaleTier } from "@/lib/billing/scale-tiers";
import { APP_LINKS } from "@landing/lib/app-url";
import { cn } from "@/lib/utils";

/** Same discrete tiers as app custom-pack pricing (annual = 10× monthly price). */
const STATIC_SCALE_TIERS: ScaleTier[] = CUSTOM_PACK_TIERS.map((tier) => ({
  monthlyTokens: tier.monthlyTokens,
  monthlyPriceCents: tier.monthlyPriceCents,
  annualPriceCents: tier.monthlyPriceCents * 10,
}));

function buildDisplayPacks(interval: BillingInterval) {
  return listDisplayPacks().map((definition) => toDisplayPack(definition, interval));
}

type LandingStaticBillingPlansProps = {
  className?: string;
};

/**
 * Marketing pricing grid — identical UI to app BillingPlansSection (marketing),
 * but plan rows are computed locally from the billing catalog (no fetch).
 */
export function LandingStaticBillingPlans({ className }: LandingStaticBillingPlansProps) {
  const [interval, setInterval] = useState<BillingInterval>("monthly");
  const [view, setView] = useState<"plans" | "custom">("plans");

  const packs = useMemo(() => buildDisplayPacks(interval), [interval]);

  const redirectToApp = useCallback(() => {
    window.location.assign(APP_LINKS.startBrand());
  }, []);

  const redirectToBilling = useCallback(() => {
    window.location.assign(APP_LINKS.billing());
  }, []);

  return (
    <div className={cn("overflow-visible", className)}>
      <WelcomeOfferBanner
        priceLabel={formatUsd(WELCOME_PACK.priceCents)}
        tokenAmount={WELCOME_PACK.tokenAmount}
        storedAssetLimit={WELCOME_PACK.storedAssetLimit}
        loading={false}
        claimable
        onClaim={redirectToBilling}
      />

      <div className="mt-8 flex justify-center">
        <BillingIntervalToggle value={interval} onChange={setInterval} />
      </div>

      {view === "plans" ? (
        <div className="mt-6 grid grid-cols-1 gap-4 overflow-visible pt-3 sm:grid-cols-2 sm:gap-y-6 xl:grid-cols-4">
          {packs.map((pack) => (
            <PlanPackCard
              key={`${pack.id}-${interval}`}
              pack={pack}
              interval={interval}
              highlighted={pack.badge === "most_popular"}
              loading={false}
              onBuy={redirectToApp}
            />
          ))}
          <CustomPackTeaserCard
            interval={interval}
            scaleTiers={STATIC_SCALE_TIERS}
            onCustomize={() => setView("custom")}
          />
        </div>
      ) : (
        <CustomPackDetailView
          interval={interval}
          scaleTiers={STATIC_SCALE_TIERS}
          loading={false}
          error={null}
          onBack={() => setView("plans")}
          onBuy={() => redirectToApp()}
        />
      )}
    </div>
  );
}
