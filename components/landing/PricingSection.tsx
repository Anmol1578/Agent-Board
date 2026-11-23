"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Loader2, CreditCard } from "lucide-react";
import { SignUpButton, Show, useClerk, useUser, PricingTable } from "@clerk/nextjs";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface PricingTier {
  name: string;
  planKey: string;
  price: string;
  cadence: string;
  billingNote?: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

export function PricingSection() {
  const router = useRouter();
  const clerk = useClerk();
  const { isSignedIn } = useUser();

  const [billingCadence, setBillingCadence] = useState<"monthly" | "annual">("monthly");
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [selectedPlanKey, setSelectedPlanKey] = useState<string>("pro_builder");

  const monthlyTiers: PricingTier[] = [
    {
      name: "Free",
      planKey: "free_user",
      price: "$0",
      cadence: "forever free",
      description: "For individual builders exploring visual architecture design and living spec drafting.",
      features: [
        "5 AI Agent prompts per month",
        "Up to 3 active project workspaces",
        "Live collaboration on docs & canvas",
        "Interactive tldraw & BlockNote editor",
        "Standard community exports (Markdown / JSON)",
      ],
      cta: "Start building free",
      highlighted: false,
    },
    {
      name: "Pro Builder",
      planKey: "pro_builder",
      price: "$15",
      cadence: "per month",
      billingNote: "Billed monthly ($15/mo)",
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
      planKey: "enterprise",
      price: "$99",
      cadence: "per month",
      billingNote: "Billed monthly ($99/mo)",
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

  const annualTiers: PricingTier[] = [
    {
      name: "Free",
      planKey: "free_user",
      price: "$0",
      cadence: "forever free",
      description: "For individual builders exploring visual architecture design and living spec drafting.",
      features: [
        "5 AI Agent prompts per month",
        "Up to 3 active project workspaces",
        "Live collaboration on docs & canvas",
        "Interactive tldraw & BlockNote editor",
        "Standard community exports (Markdown / JSON)",
      ],
      cta: "Start building free",
      highlighted: false,
    },
    {
      name: "Pro Builder",
      planKey: "pro_builder",
      price: "$12",
      cadence: "per month",
      billingNote: "Billed annually ($144/yr) · Save $36",
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
      planKey: "enterprise",
      price: "$79",
      cadence: "per month",
      billingNote: "Billed annually ($948/yr) · Save $240",
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

  // Clerk Upgrade Action Handler
  const handleUpgradeAction = async (tier: PricingTier) => {
    if (tier.planKey === "free_user") {
      router.push("/dashboard");
      return;
    }

    setLoadingPlan(tier.planKey);
    setSelectedPlanKey(tier.planKey);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anyClerk = clerk as any;

      // 1. Check if Clerk's billing API is available to fetch plan ID
      if (anyClerk?.billing?.getPlans) {
        try {
          const res = await anyClerk.billing.getPlans({ for: "user" });
          const plans = res?.data || res || [];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const matched = plans.find((p: any) => {
            return (
              p.slug === tier.planKey ||
              p.key === tier.planKey ||
              p.id === tier.planKey ||
              (p.name && p.name.toLowerCase().includes(tier.name.toLowerCase()))
            );
          });

          if (matched && typeof anyClerk.__internal_openCheckout === "function") {
            anyClerk.__internal_openCheckout({
              planId: matched.id,
              planPeriod: billingCadence === "annual" ? "annual" : "month",
              newSubscriptionRedirectUrl: "/dashboard",
            });
            setLoadingPlan(null);
            return;
          }
        } catch (fetchErr) {
          console.warn("Clerk getPlans query skipped:", fetchErr);
        }
      }

      // 2. Direct __internal_openCheckout attempt with planKey
      if (typeof anyClerk?.__internal_openCheckout === "function") {
        try {
          anyClerk.__internal_openCheckout({
            planId: tier.planKey,
            planPeriod: billingCadence === "annual" ? "annual" : "month",
            newSubscriptionRedirectUrl: "/dashboard",
          });
          setLoadingPlan(null);
          return;
        } catch (checkoutErr) {
          console.warn("Direct checkout open fallback:", checkoutErr);
        }
      }

      // 3. Official Clerk Modal Fallback with <PricingTable />
      setIsCheckoutModalOpen(true);
    } catch (err) {
      console.warn("Clerk upgrade error:", err);
      setIsCheckoutModalOpen(true);
    } finally {
      setLoadingPlan(null);
    }
  };

  const renderPricingCard = (tier: PricingTier) => {
    const isLoading = loadingPlan === tier.planKey;

    return (
      <div
        key={tier.name}
        className={`relative flex flex-col justify-between rounded-xl p-8 backdrop-blur-xl transition-all duration-200 ${
          tier.highlighted
            ? "border-2 border-primary bg-[#131018] shadow-[0_0_40px_-5px_oklch(0.68_0.22_285/0.3)] ring-1 ring-primary/40"
            : "border border-white/8 bg-[#0d0c0f]/80 hover:border-white/20 hover:bg-[#111015]"
        }`}
      >
        {tier.highlighted && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-md">
            <Sparkles className="size-3" />
            <span>Most Popular</span>
          </div>
        )}

        <div>
          <div className="mb-4">
            <h3 className="font-heading text-xl font-bold text-foreground">
              {tier.name}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {tier.description}
            </p>
          </div>

          <div className="mb-2 flex items-baseline gap-2">
            <span className="font-mono text-4xl font-extrabold text-foreground">
              {tier.price}
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              / {tier.cadence}
            </span>
          </div>

          {tier.billingNote ? (
            <div className="mb-6 font-mono text-[11px] text-primary/90 font-medium">
              {tier.billingNote}
            </div>
          ) : (
            <div className="mb-6 h-[17px]" />
          )}

          {/* Feature List */}
          <ul className="space-y-3 border-t border-white/6 pt-6 mb-8">
            {tier.features.map((feat) => (
              <li key={feat} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                <Check className="size-4 shrink-0 text-primary mt-0.5" />
                <span className="leading-relaxed">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button: Signed-out vs Signed-in with Clerk Upgrade */}
        <div>
          <Show when="signed-out">
            <SignUpButton mode="modal">
              <Button
                variant={tier.highlighted ? "default" : "outline"}
                className={`w-full font-medium h-10 cursor-pointer ${
                  tier.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/85 shadow-lg shadow-primary/20"
                    : "border-white/10 hover:bg-white/5"
                }`}
              >
                {tier.cta}
              </Button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            {tier.planKey === "free_user" ? (
              <Button
                asChild
                variant="outline"
                className="w-full font-medium h-10 border-white/10 hover:bg-white/5 cursor-pointer"
              >
                <Link href="/dashboard">Go to Workspace</Link>
              </Button>
            ) : (
              <Button
                onClick={() => handleUpgradeAction(tier)}
                disabled={isLoading}
                variant={tier.highlighted ? "default" : "outline"}
                className={`w-full font-medium h-10 cursor-pointer gap-2 ${
                  tier.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/85 shadow-lg shadow-primary/20"
                    : "border-white/10 hover:bg-white/5"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Connecting to Clerk...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="size-4" />
                    <span>{tier.cta}</span>
                  </>
                )}
              </Button>
            )}
          </Show>
        </div>
      </div>
    );
  };

  return (
    <section id="pricing" className="relative py-20 md:py-32 px-4 sm:px-6 max-w-7xl mx-auto z-10 border-t border-white/6">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary mb-3 shadow-[0_0_15px_-3px_oklch(0.68_0.22_285/0.25)]">
          <span>◆</span>
          <span>Transparent Plans & Billing</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-foreground max-w-3xl leading-tight mb-4">
          Simple, predictable pricing for builders
        </h2>
        <p className="max-w-2xl text-muted-foreground text-sm sm:text-base leading-relaxed">
          Design architectures on canvas, synthesize living specs, and orchestrate agent execution with zero hidden fees. Powered securely by Clerk Billing.
        </p>
      </div>

      {/* Billing Switcher with shadcn Tabs */}
      <Tabs
        defaultValue="monthly"
        onValueChange={(val) => {
          if (val === "monthly" || val === "annual") {
            setBillingCadence(val);
          }
        }}
        className="w-full flex flex-col items-center"
      >
        <TabsList className="mb-12 border border-white/10 bg-black/60 p-1 backdrop-blur-md rounded-xl h-auto">
          <TabsTrigger
            value="monthly"
            className="px-5 py-2 font-mono text-xs font-medium rounded-lg cursor-pointer transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:shadow-primary/25"
          >
            Monthly billing
          </TabsTrigger>
          <TabsTrigger
            value="annual"
            className="px-5 py-2 font-mono text-xs font-medium rounded-lg cursor-pointer transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:shadow-primary/25 gap-2"
          >
            <span>Annual billing</span>
            <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
              Save 20%
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {monthlyTiers.map((tier) => renderPricingCard(tier))}
          </div>
        </TabsContent>

        <TabsContent value="annual" className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {annualTiers.map((tier) => renderPricingCard(tier))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Subscribed User Clerk Portal Shortcut */}
      {isSignedIn && (
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <p className="text-xs text-muted-foreground">
            Already subscribed or need to manage invoices & payment methods?
          </p>
          <button
            onClick={() => clerk.openUserProfile()}
            type="button"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-primary hover:text-primary/80 transition-colors underline underline-offset-4 cursor-pointer"
          >
            <span>Open Clerk Billing & Account Portal</span>
            <span>→</span>
          </button>
        </div>
      )}

      {/* Clerk Billing Checkout Dialog Modal */}
      <Dialog open={isCheckoutModalOpen} onOpenChange={setIsCheckoutModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0d0c0f] border-white/10 text-foreground p-6 sm:p-8">
          <DialogHeader className="mb-4">
            <DialogTitle className="font-heading text-2xl font-bold flex items-center gap-2">
              <CreditCard className="size-5 text-primary" />
              <span>Complete Your Upgrade with Clerk</span>
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
              Select your plan below to open the secure Stripe checkout powered directly by Clerk.
            </DialogDescription>
          </DialogHeader>

          <div className="clerk-modal-pricing-wrapper rounded-xl border border-white/8 bg-black/40 p-4">
            <PricingTable
              for="user"
              highlightedPlan={selectedPlanKey}
              newSubscriptionRedirectUrl="/dashboard"
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default PricingSection;
