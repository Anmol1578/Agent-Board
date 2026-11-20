import React from "react";
import { TextureBackground } from "@/components/landing/TextureBackground";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { CtaSection } from "@/components/landing/CtaSection";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* 
        All 5 textures from public/textures combined in one layered canvas with motion:
        1. circuit-nodes.svg (pulsing neural paths & amber nodes)
        2. cyber-grid.svg (drifting telemetry coordinate matrix)
        3. dot-matrix.svg (subtle breathing canvas dot matrix)
        4. orbital-rings.svg (continuous slow celestial rotation)
        5. topo.svg (undulating elevation contours & amber glow mask)
      */}
      <TextureBackground />

      <main className="relative z-10 flex flex-col">
        {/* Hero Section */}
        <HeroSection />

        {/* How It Works Architecture Pipeline */}
        <HowItWorksSection />

        {/* Transparent Compute & BYOC Pricing */}
        <PricingSection />

        {/* Closing Call to Action */}
        <CtaSection />
      </main>

      {/* Global Developer Footer */}
      <LandingFooter />
    </div>
  );
}
