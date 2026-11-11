"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function SiteHeader() {
  const pathname = usePathname();
  const isLandingPage = pathname === "/" || !pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex flex-col">
      {/* Armature Tech Telemetry Announcement Bar */}
      <div className="w-full bg-[#090808] border-b border-[#2A2724] text-[#F6F2EF] px-4 py-1 text-center font-mono text-[10px] sm:text-[11px] font-medium tracking-wider flex items-center justify-center gap-3 overflow-hidden select-none">
        <span className="inline-flex items-center gap-1.5 font-bold text-[#ff6b35]">
          <span className="size-1.5 rounded-full bg-[#c8410d] animate-pulse" />
          AX_STATUS:
        </span>
        <span className="truncate">
          AGENT WORKSPACE OBSERVABILITY &amp; MCP RELIABILITY · ZERO-LATENCY SYNCHRONIZATION
        </span>
        <span className="hidden md:inline font-mono text-[10px] text-emerald-400 font-semibold">
          [100% EVALS PASSING]
        </span>
      </div>

      {/* Main Header */}
      <div className="h-14 border-b border-[rgba(9,8,8,0.10)] bg-[#F6F2EF]/95 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Brand Logo & Surgical Status */}
          <div className="flex items-center gap-3">
            <Link href="/" className="group inline-flex items-center gap-2.5 select-none">
              <div className="flex items-center font-sans font-bold tracking-tight text-[#090808] text-base">
                <span>Agent</span>
                <span className="text-[#c8410d] px-0.5">-</span>
                <span>Board</span>
              </div>
            </Link>
            <div className="hidden sm:inline-flex items-center gap-1.5 rounded-xs border border-[rgba(9,8,8,0.12)] bg-white px-2 py-0.5 font-mono text-[9px] text-[#c8410d] font-medium">
              <span className="size-1.5 rounded-full bg-[#c8410d]" />
              <span>TELEMETRY LIVE</span>
            </div>
          </div>

          {/* Center Minimal Navigation */}
          {isLandingPage && (
            <nav className="hidden md:flex items-center gap-7 font-sans text-xs text-[#5C5852]">
              <Link
                href="#product"
                className="transition-colors hover:text-[#090808] font-medium"
              >
                Workspace
              </Link>
              <Link
                href="#how-it-works"
                className="transition-colors hover:text-[#090808] font-medium"
              >
                Reasoning Trace
              </Link>
              <Link
                href="#pricing"
                className="transition-colors hover:text-[#090808] font-medium"
              >
                Pricing
              </Link>
              <a
                href="https://github.com/Anmol1578/Agent-Board"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 transition-colors hover:text-[#090808] font-medium text-[#8A857D]"
              >
                GitHub
                <ArrowUpRight className="size-3 opacity-60" />
              </a>
            </nav>
          )}

          {/* Right Section */}
          <div className="flex items-center gap-3 font-sans text-xs">
            <button
              type="button"
              className="font-sans text-xs font-medium text-[#5C5852] hover:text-[#090808] transition-colors px-2.5 py-1"
            >
              Sign in
            </button>

            <Button
              size="sm"
              className="h-8 rounded-xs bg-[#c8410d] px-3.5 font-sans text-xs font-semibold text-white hover:bg-[#b3380a] shadow-xs transition-all"
            >
              Get started →
            </Button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-1.5 text-[#5C5852] hover:text-[#090808]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[rgba(9,8,8,0.10)] bg-[#F6F2EF] px-4 py-4 space-y-3 font-sans text-xs">
          <Link
            href="#product"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#5C5852] hover:text-[#090808] py-1"
          >
            Workspace
          </Link>
          <Link
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#5C5852] hover:text-[#090808] py-1"
          >
            Reasoning Trace
          </Link>
          <Link
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#5C5852] hover:text-[#090808] py-1"
          >
            Pricing
          </Link>
          <a
            href="https://github.com/Anmol1578/Agent-Board"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#c8410d] font-semibold py-1"
          >
            GitHub Repo →
          </a>
        </div>
      )}
    </header>
  );
}

export default SiteHeader;
