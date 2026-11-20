import React from "react";
import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="relative border-t border-white/6 py-8 px-4 sm:px-6 z-10 text-xs font-mono text-muted-foreground bg-[#090808]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          © {new Date().getFullYear()} Agent-Board. All rights reserved.
        </div>

        <div className="flex flex-wrap items-center gap-6 text-[12px]">
          <Link href="#product" className="hover:text-foreground transition-colors">
            Product
          </Link>
          <Link href="#how-it-works" className="hover:text-foreground transition-colors">
            How it works
          </Link>
          <Link href="#pricing" className="hover:text-foreground transition-colors">
            Pricing
          </Link>
          <a
            href="https://github.com/Anmol1578/Agent-Board"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <Link href="#top" className="hover:text-foreground transition-colors">
            Back to top ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default LandingFooter;
