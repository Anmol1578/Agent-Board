"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { SignUpButton, Show } from "@clerk/nextjs";

export function PricingSection() {
  const tiers = [
    {
      name: "Hobbyist",
      price: "$0",
      cadence: "forever free",
      description: "For individual builders and developers exploring agent workflows.",
      features: [
        "1 Active Agent Swarm",
        "5 Ephemeral cloud execution sandboxes",
        "Community Model Context Protocol (MCP) servers",
        "Real-time visual canvas with markdown",
        "Public workspace sharing",
      ],
      cta: "Start building free",
      href: "/sign-up",
      highlighted: false,
    },
    {
      name: "Pro Builder",
      price: "$20",
      cadence: "per month",
      description: "For engineers shipping production software with parallel agents.",
      features: [
        "Unlimited concurrent agent swarms",
        "High-performance 8-core isolated cloud boxes",
        "Zero-latency automated port forwarding",
        "Custom private MCP integrations",
        "Priority reasoning model routing (Claude 3.7 / o3)",
        "Deterministic trace checkpoints & rollbacks",
      ],
      cta: "Upgrade to Pro",
      href: "/sign-up",
      highlighted: true,
    },
    {
      name: "Enterprise BYOC",
      price: "Custom",
      cadence: "annual billing",
      description: "Deploy Agent-Board inside your own AWS/GCP cloud boundary.",
      features: [
        "Bring Your Own Compute (AWS SSM / Pulumi)",
        "Zero data leaves your corporate VPC",
        "Custom VPC peering & private subnet isolation",
        "SSO / SAML & granular team RBAC",
        "99.99% uptime SLA & dedicated engineer support",
      ],
      cta: "Contact Sales",
      href: "mailto:founders@agent-board.dev",
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-20 md:py-32 px-4 sm:px-6 max-w-7xl mx-auto z-10 border-t border-white/6">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary mb-3">
          <span>◆</span>
          <span>Transparent Pricing</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-foreground max-w-3xl leading-tight mb-4">
          Start free, scale into your own cloud
        </h2>
        <p className="max-w-2xl text-muted-foreground text-sm sm:text-base leading-relaxed">
          Predictable compute pricing with zero lock-in. Run on our managed cloud or connect your own AWS account.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier) => (
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

              <div className="mb-6 flex items-baseline gap-2">
                <span className="font-mono text-4xl font-extrabold text-foreground">
                  {tier.price}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  / {tier.cadence}
                </span>
              </div>

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

            {/* Action Button wired to Clerk SignUp / Dashboard */}
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
              <Button
                asChild
                variant={tier.highlighted ? "default" : "outline"}
                className={`w-full font-medium h-10 cursor-pointer ${
                  tier.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/85 shadow-lg shadow-primary/20"
                    : "border-white/10 hover:bg-white/5"
                }`}
              >
                <Link href="/dashboard">{tier.cta}</Link>
              </Button>
            </Show>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PricingSection;
