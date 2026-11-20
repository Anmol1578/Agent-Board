"use client";

import React from "react";
import { ArchitectureCanvas } from "./architecture/ArchitectureCanvas";
import { IsometricFeatureGrid } from "./architecture/IsometricFeatureGrid";

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative py-24 md:py-36 px-4 sm:px-6 max-w-7xl mx-auto z-10 border-t border-white/6"
    >
      {/* 1. Technical Section Header without // */}
      <div className="flex flex-col items-center text-center mb-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 font-mono text-[11px] uppercase tracking-widest text-primary mb-3 shadow-[0_0_15px_-3px_oklch(0.68_0.22_285/0.25)]">
          <span>◆</span>
          <span>How It Works — System Architecture</span>
        </div>

        <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground max-w-3xl leading-tight mb-4">
          Flexible by design — built for autonomous execution
        </h2>

        <p className="max-w-2xl text-muted-foreground text-sm sm:text-base leading-relaxed">
          Agent-Board is an interconnected environment where your agent, tools, memory,
          and workflows work together continuously.
        </p>
      </div>

      {/* 2. Primary Animated Architecture Canvas (5-Layer Live Dataflow) */}
      <div className="mb-8">
        <ArchitectureCanvas />
      </div>

      {/* 3. Four Isometric Modular Architecture Cards */}
      <IsometricFeatureGrid />
    </section>
  );
}

export default HowItWorksSection;
