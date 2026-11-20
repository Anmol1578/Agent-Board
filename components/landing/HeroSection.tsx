"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { SignUpButton, Show } from "@clerk/nextjs";
import { WorkspaceStudioMockup } from "@/components/landing/WorkspaceStudioMockup";

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 md:pt-18 md:pb-28 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-7xl mx-auto z-10">
      {/* 1. Main Headline */}
      <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-extrabold tracking-tight text-foreground max-w-5xl leading-[1.07] sm:leading-[1.05] drop-shadow-sm mb-6">
        An{" "}
        <span className="text-primary bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_oklch(0.68_0.22_285/0.45)]">
          Agent-Board
        </span>{" "}
        for whatever you&apos;re building
      </h1>

      {/* 3. Subtitle */}
      <p className="max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground font-normal leading-relaxed mb-8">
        One agent draws on a live canvas and writes living specs, synced in real time for everyone
        in your organization. Diagram in. Executable architecture out.
      </p>

      {/* 4. Two Primary Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3.5 mb-14 w-full sm:w-auto">
        {/* Button 1: Start building free wired to Clerk SignUp / Dashboard */}
        <Show when="signed-out">
          <SignUpButton mode="modal">
            <Button
              size="lg"
              className="h-11 sm:h-12 px-7 rounded-lg font-medium text-sm sm:text-base bg-primary text-primary-foreground hover:bg-primary/85 shadow-[0_0_25px_-4px_oklch(0.68_0.22_285/0.45)] hover:shadow-[0_0_35px_-2px_oklch(0.68_0.22_285/0.65)] transition-all gap-2 group w-full sm:w-auto cursor-pointer"
            >
              <span>Start building free</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <Button
            asChild
            size="lg"
            className="h-11 sm:h-12 px-7 rounded-lg font-medium text-sm sm:text-base bg-primary text-primary-foreground hover:bg-primary/85 shadow-[0_0_25px_-4px_oklch(0.68_0.22_285/0.45)] hover:shadow-[0_0_35px_-2px_oklch(0.68_0.22_285/0.65)] transition-all gap-2 group w-full sm:w-auto cursor-pointer"
          >
            <Link href="/dashboard">
              <span>Start building free</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </Show>

        {/* Button 2: See how it works to #how-it-works */}
        <Button
          asChild
          variant="outline"
          size="lg"
          className="h-11 sm:h-12 px-7 rounded-lg font-medium text-sm sm:text-base border-white/12 bg-white/[0.03] hover:bg-white/[0.08] hover:text-foreground backdrop-blur-sm transition-all gap-2 w-full sm:w-auto cursor-pointer"
        >
          <Link href="#how-it-works">
            <Play className="size-3.5 fill-current opacity-70" />
            <span>See how it works</span>
          </Link>
        </Button>
      </div>

      {/* 5. Live Interactive Workspace Studio Instrument */}
      <div className="w-full max-w-5xl mx-auto px-2 sm:px-0">
        <div className="survey-frame">
          <div className="scroll-tilt">
            <WorkspaceStudioMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
