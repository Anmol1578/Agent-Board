"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export function TerminalShowcase() {
  const [activeTab, setActiveTab] = useState<"swarm" | "mcp" | "byoc">("swarm");
  const [copied, setCopied] = useState(false);

  const snippets = {
    swarm: {
      cmd: "agent swarm --parallel=4 --worktree=git",
      output: `[00:01:04] ✦ Initializing Swarm Orchestrator v0.9.4...
[00:01:05] → Dispatched Agent #1 (Architect): drafting architecture & schemas
[00:01:06] → Dispatched Agent #2 (Coder): generating API endpoints & types
[00:01:07] → Dispatched Agent #3 (Tester): provisioning isolated test container
[00:01:08] → Dispatched Agent #4 (Reviewer): static analysis & security linting
[00:01:12] ✔ Isolated sandbox sync complete. 0ms local freeze.
[00:01:14] ★ Live port mapped: http://localhost:3000 -> cloud-box:3000`,
    },
    mcp: {
      cmd: "agent mcp discover --auto-mount",
      output: `[00:00:02] ✦ Scanning local and cloud Model Context Protocol servers...
[00:00:03] ✔ Found: postgres-mcp (12 schemas, 48 queries indexed)
[00:00:04] ✔ Found: github-mcp (authorized for repository: Agent-Board)
[00:00:04] ✔ Found: puppeteer-browser-mcp (headless chromium ready)
[00:00:05] ✔ Mounted 3 servers into agent context window.
[00:00:06] ✦ Zero configuration needed. Agent tools ready for invocation.`,
    },
    byoc: {
      cmd: "agent byoc connect --aws-ssm --region=us-east-1",
      output: `[00:00:01] ✦ Authenticating AWS Systems Manager Session...
[00:00:02] ✔ AWS VPC Peering active: vpc-0a8b928192
[00:00:03] ✔ EC2 Spot Box (c7g.4xlarge) allocated in private subnet
[00:00:04] ✔ Pulumi state synchronized. Security boundary validated.
[00:00:05] ★ All source code and credentials remain within your corporate VPC.`,
    },
  };

  const current = snippets[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 max-w-5xl mx-auto z-10">
      <div className="rounded-xl border border-white/10 bg-[#0a0908] p-1 shadow-2xl backdrop-blur-xl">
        {/* Terminal Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/8 px-4 py-3 bg-black/40">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="size-2.5 rounded-full bg-yellow-500/80 inline-block" />
            <span className="size-2.5 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 font-mono text-xs text-muted-foreground">
              agent-board-cli ~ bash
            </span>
          </div>

          {/* Interactive Tabs */}
          <div className="flex items-center gap-1.5 mt-2 sm:mt-0">
            <button
              type="button"
              onClick={() => setActiveTab("swarm")}
              className={`rounded px-2.5 py-1 font-mono text-xs transition-colors cursor-pointer ${
                activeTab === "swarm"
                  ? "bg-primary/20 text-primary font-semibold border border-primary/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              swarm:run
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("mcp")}
              className={`rounded px-2.5 py-1 font-mono text-xs transition-colors cursor-pointer ${
                activeTab === "mcp"
                  ? "bg-primary/20 text-primary font-semibold border border-primary/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              mcp:discover
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("byoc")}
              className={`rounded px-2.5 py-1 font-mono text-xs transition-colors cursor-pointer ${
                activeTab === "byoc"
                  ? "bg-primary/20 text-primary font-semibold border border-primary/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              byoc:aws
            </button>
          </div>
        </div>

        {/* Command Line Prompt */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-black/60 font-mono text-xs">
          <div className="flex items-center gap-2 text-foreground/90 overflow-x-auto">
            <span className="text-primary font-bold">➜</span>
            <span className="text-muted-foreground">~</span>
            <span className="text-amber-400 font-semibold">{current.cmd}</span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 rounded bg-white/5 px-2 py-1 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0 ml-2"
          >
            {copied ? (
              <>
                <Check className="size-3 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Console Log Output */}
        <div className="p-5 font-mono text-xs text-muted-foreground/95 bg-[#070605] overflow-x-auto min-h-[180px]">
          <pre className="whitespace-pre-wrap leading-relaxed">
            <code>{current.output}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}

export default TerminalShowcase;
