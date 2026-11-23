"use client";

import React, { useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Loader2, CreditCard } from "lucide-react";
import { PLAN_KEYS } from "@/lib/plan-limits";

interface ClerkPlanItem {
  id?: string;
  slug?: string;
  key?: string;
}

interface PricingPlansProps {
  onCheckoutStart?: () => void;
  highlightedPlan?: string;
}

export function PricingPlans({ onCheckoutStart, highlightedPlan = PLAN_KEYS.PRO }: PricingPlansProps) {
  const clerk = useClerk();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const plans = [
    {
      name: "Pro Builder",
      planKey: PLAN_KEYS.PRO,
      price: "$15",
      cadence: "per month",
      description: "For engineers and builders shipping production software with agent-assisted workflows.",
      features: [
        "200 AI Agent prompts per month",
        "Unlimited project workspaces",
        "Voice input & natural dictation",
        "Public share links for live specs",
        "High-resolution PDF & canvas export",
        "Real-time multiplayer collaboration",
        "Priority agent synthesis queue",
      ],
      cta: "Upgrade to Pro",
      highlighted: true,
    },
    {
      name: "Enterprise",
      planKey: PLAN_KEYS.ENTERPRISE,
      price: "$99",
      cadence: "per month",
      description: "For engineering teams and scaling organizations building complex systems with AI agents.",
      features: [
        "800 AI Agent prompts per month",
        "Unlimited project workspaces",
        "Voice input with multi-turn prompt refinement",
        "Public share links & interactive view-only decks",
        "High-resolution PDF, SVG & JSON exports",
        "Live multiplayer collaboration & team permissions",
        "Dedicated agent throughput & priority compute",
        "Direct founder support & architecture reviews",
      ],
      cta: "Get Enterprise",
      highlighted: false,
    },
  ];

  const handleSelectPlan = async (planKey: string) => {
    setLoadingPlan(planKey);
    // Close the dialog first so it does not capture pointer events or block Clerk's drawer
    onCheckoutStart?.();

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anyClerk = clerk as any;
      if (anyClerk?.billing?.getPlans) {
        try {
          const res = await anyClerk.billing.getPlans({ for: "user" });
          const clerkPlans = (res?.data || res || []) as ClerkPlanItem[];
          const matched = clerkPlans.find(
            (p) => p.slug === planKey || p.key === planKey || p.id === planKey
          );
          if (matched && typeof anyClerk.__internal_openCheckout === "function") {
            anyClerk.__internal_openCheckout({
              planId: matched.id,
              planPeriod: "month",
              newSubscriptionRedirectUrl: "/dashboard",
            });
            setLoadingPlan(null);
            return;
          }
        } catch (fetchErr) {
          console.warn("Clerk getPlans query skipped:", fetchErr);
        }
      }

      if (typeof anyClerk?.__internal_openCheckout === "function") {
        anyClerk.__internal_openCheckout({
          planId: planKey,
          planPeriod: "month",
          newSubscriptionRedirectUrl: "/dashboard",
        });
      }
    } catch (err) {
      console.warn("Clerk checkout direct invocation failed:", err);
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full pt-2">
      {plans.map((tier) => {
        const isSelected = tier.planKey === highlightedPlan || tier.highlighted;
        const isLoading = loadingPlan === tier.planKey;

        return (
          <div
            key={tier.planKey}
            className={`relative flex flex-col justify-between rounded-xl p-6 backdrop-blur-xl transition-all duration-200 ${
              isSelected
                ? "border-2 border-primary bg-[#131018] shadow-[0_0_35px_-5px_oklch(0.68_0.22_285/0.25)] ring-1 ring-primary/40"
                : "border border-white/8 bg-[#0d0c0f]/90 hover:border-white/20 hover:bg-[#111015]"
            }`}
          >
            {isSelected && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-primary-foreground shadow-md">
                <Sparkles className="size-2.5" />
                <span>Recommended</span>
              </div>
            )}

            <div>
              <div className="mb-3">
                <h4 className="font-heading text-lg font-bold text-foreground">
                  {tier.name}
                </h4>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <div className="mb-4 flex items-baseline gap-1.5">
                <span className="font-mono text-3xl font-extrabold text-foreground">
                  {tier.price}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  / {tier.cadence}
                </span>
              </div>

              <ul className="space-y-2.5 border-t border-white/6 pt-4 mb-6">
                {tier.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Check className="size-3.5 shrink-0 text-primary mt-0.5" />
                    <span className="leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              onClick={() => handleSelectPlan(tier.planKey)}
              disabled={isLoading}
              variant={isSelected ? "default" : "outline"}
              className={`w-full font-medium h-9 cursor-pointer gap-2 ${
                isSelected
                  ? "bg-primary text-primary-foreground hover:bg-primary/85 shadow-md shadow-primary/20"
                  : "border-white/10 hover:bg-white/5"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>Opening checkout...</span>
                </>
              ) : (
                <>
                  <CreditCard className="size-3.5" />
                  <span>{tier.cta}</span>
                </>
              )}
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default PricingPlans;
