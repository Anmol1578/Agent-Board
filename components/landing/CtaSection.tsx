"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SignUpButton, Show } from "@clerk/nextjs";

export function CtaSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 max-w-5xl mx-auto z-10 text-center">
      <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#15121c] to-[#0c0a12] p-8 sm:p-14 overflow-hidden shadow-2xl">
        {/* Subtle radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-primary/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Centered Agent-Board Logo before text starts */}
          <div className="mb-8 flex justify-center">
            <Image
              src="/brand/logo-navbar-purple.png"
              alt="Agent-Board"
              width={480}
              height={180}
              className="h-16 sm:h-20 md:h-24 w-auto drop-shadow-[0_0_45px_oklch(0.68_0.22_285/0.5)]"
              priority
            />
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-foreground max-w-2xl mx-auto mb-4">
            Stop waiting on local builds. Let agents build for you.
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Offload dev servers, spin up parallel swarms, and trace every model decision without leaving your editor.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Show when="signed-out">
              <SignUpButton mode="modal">
                <Button
                  size="lg"
                  className="h-11 px-8 rounded-lg font-medium text-sm bg-primary text-primary-foreground hover:bg-primary/85 shadow-lg shadow-primary/20 gap-2 group cursor-pointer"
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
                className="h-11 px-8 rounded-lg font-medium text-sm bg-primary text-primary-foreground hover:bg-primary/85 shadow-lg shadow-primary/20 gap-2 group cursor-pointer"
              >
                <Link href="/dashboard">
                  <span>Start building free</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </Show>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 px-6 rounded-lg font-medium text-sm border-white/10 bg-white/[0.03] hover:bg-white/[0.08] cursor-pointer"
            >
              <Link href="#how-it-works">See how it works</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtaSection;
