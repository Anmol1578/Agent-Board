"use client";

import React, { useState } from "react";
import {
  Share2,
  MousePointer,
  Hand,
  Square,
  ArrowUpRight,
  Type,
  Trash2,
  Sparkles,
  Check,
} from "lucide-react";

export function WorkspaceStudioMockup() {
  const [activeTab, setActiveTab] = useState<"both" | "doc" | "canvas">("both");
  const [selectedEntity, setSelectedEntity] = useState<string | null>("nextjs");
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShare = () => {
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl border border-white/12 bg-[#0c0a12]/95 backdrop-blur-2xl shadow-[0_0_60px_-15px_oklch(0.68_0.22_285/0.25)] overflow-hidden ring-1 ring-white/5 select-none transition-all">
      {/* 1. Window Frame Chrome */}
      <div className="flex items-center border-b border-white/8 px-4 py-3 bg-black/60 font-mono text-xs select-none">
        <div className="flex items-center gap-2.5">
          <span className="size-2.5 rounded-full bg-red-500/80 inline-block" />
          <span className="size-2.5 rounded-full bg-yellow-500/80 inline-block" />
          <span className="size-2.5 rounded-full bg-emerald-500/80 inline-block" />
          <span className="ml-2 text-muted-foreground text-[11px] hidden sm:inline">
            agent-board.workspace · worktree-alpha
          </span>
        </div>
      </div>

      {/* 2. Workspace Inner Toolbar */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/6 px-4 py-2.5 bg-[#0e0c15] text-xs font-mono gap-3">
        {/* Breadcrumb Title */}
        <div className="flex items-center gap-2">
          <div className="flex size-5 items-center justify-center rounded bg-primary/20 text-primary">
            <Sparkles className="size-3" />
          </div>
          <span className="font-semibold text-foreground/90">Agent-Board</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">Launch plan</span>
        </div>

        {/* View Switcher: [Doc] [Both] [Canvas] */}
        <div className="flex items-center rounded-lg border border-white/10 bg-black/50 p-0.5">
          <button
            type="button"
            onClick={() => setActiveTab("doc")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
              activeTab === "doc"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Doc
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("both")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
              activeTab === "both"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Both
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("canvas")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
              activeTab === "canvas"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Canvas
          </button>
        </div>

        {/* Multiplayer Avatars & Share */}
        <div className="flex items-center gap-3">
          <div className="flex items-center -space-x-1.5 overflow-hidden">
            <div className="flex size-6 items-center justify-center rounded-full bg-purple-600 text-[10px] font-bold text-white ring-2 ring-[#0e0c15]">
              S
            </div>
            <div className="flex size-6 items-center justify-center rounded-full bg-amber-600 text-[10px] font-bold text-white ring-2 ring-[#0e0c15]">
              Y
            </div>
            <div className="flex size-6 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white ring-2 ring-[#0e0c15]">
              A
            </div>
            <div className="flex size-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground ring-2 ring-[#0e0c15]">
              AI
            </div>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-all cursor-pointer shadow-sm shadow-primary/30"
          >
            {copiedShare ? <Check className="size-3" /> : <Share2 className="size-3" />}
            <span>{copiedShare ? "Copied" : "Share"}</span>
          </button>
        </div>
      </div>

      {/* 3. Dual Workspace Surface (Doc + Canvas) */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 min-h-[520px] sm:min-h-[560px] bg-[#08070d]">
        {/* LEFT PANEL: BlockNote Architecture Spec */}
        {(activeTab === "both" || activeTab === "doc") && (
          <div
            className={`p-6 sm:p-8 font-sans overflow-y-auto text-left border-b lg:border-b-0 lg:border-r border-white/8 transition-all ${
              activeTab === "doc" ? "lg:col-span-12 max-w-4xl mx-auto" : "lg:col-span-5"
            }`}
          >
            {/* Title & Agent Tag */}
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Architecture spec
            </h2>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-amber-400 mb-6">
              <Sparkles className="size-3 text-amber-400" />
              <span>Drafted by Agent from the canvas</span>
            </div>

            {/* Overview Section with Live Cursor */}
            <div className="mb-6">
              <h3 className="font-heading text-sm font-semibold text-foreground/90 uppercase tracking-wider mb-2">
                Overview
              </h3>
              <div className="relative rounded-lg p-3 bg-white/[0.02] border border-white/5 font-sans text-xs sm:text-sm text-foreground/80 leading-relaxed">
                <span>
                  One agent draws on a tldraw canvas and writes BlockNote docs, synced live for everyone in the org.
                </span>
                {/* Simulated Multiplayer Cursor */}
                <span className="relative inline-block ml-1 align-middle">
                  <span className="inline-block size-2 rounded-full bg-purple-400 animate-pulse" />
                  <span className="absolute -top-6 -left-2 rounded bg-purple-600 px-1.5 py-0.5 font-mono text-[9px] text-white font-medium shadow-md">
                    Sam
                  </span>
                </span>
              </div>
            </div>

            {/* Services List with Interactive Hover State */}
            <div className="mb-6">
              <h3 className="font-heading text-sm font-semibold text-foreground/90 uppercase tracking-wider mb-2.5">
                Services
              </h3>
              <ul className="space-y-1.5 font-mono text-xs">
                <li
                  onClick={() => setSelectedEntity("nextjs")}
                  className={`p-2 rounded-md transition-colors cursor-pointer flex items-center justify-between ${
                    selectedEntity === "nextjs"
                      ? "bg-primary/20 border border-primary/40 text-primary-foreground"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <span>• <strong className="text-foreground">Next.js 16</strong> App Router and Server Actions</span>
                  <span className="text-[10px] text-primary">Client/Server</span>
                </li>
                <li
                  onClick={() => setSelectedEntity("auth")}
                  className={`p-2 rounded-md transition-colors cursor-pointer flex items-center justify-between ${
                    selectedEntity === "auth"
                      ? "bg-primary/20 border border-primary/40 text-primary-foreground"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <span>• <strong className="text-foreground">Authentication</strong> users, orgs and billing</span>
                  <span className="text-[10px] text-amber-400">Clerk</span>
                </li>
                <li
                  onClick={() => setSelectedEntity("gemini")}
                  className={`p-2 rounded-md transition-colors cursor-pointer flex items-center justify-between ${
                    selectedEntity === "gemini"
                      ? "bg-primary/20 border border-primary/40 text-primary-foreground"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <span>• <strong className="text-foreground">Gemini</strong> tool calls through AI SDK</span>
                  <span className="text-[10px] text-purple-400">Agent API</span>
                </li>
                <li
                  onClick={() => setSelectedEntity("realtime")}
                  className={`p-2 rounded-md transition-colors cursor-pointer flex items-center justify-between ${
                    selectedEntity === "realtime"
                      ? "bg-primary/20 border border-primary/40 text-primary-foreground"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <span>• <strong className="text-foreground">tldraw sync</strong> live canvas rooms</span>
                  <span className="text-[10px] text-emerald-400">WebSocket</span>
                </li>
                <li
                  onClick={() => setSelectedEntity("realtime")}
                  className="p-2 rounded-md text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>• <strong className="text-foreground">Supabase Realtime</strong> Yjs doc sync</span>
                  <span className="text-[10px] text-emerald-400">CRDT Sync</span>
                </li>
                <li
                  onClick={() => setSelectedEntity("data")}
                  className={`p-2 rounded-md transition-colors cursor-pointer flex items-center justify-between ${
                    selectedEntity === "data"
                      ? "bg-primary/20 border border-primary/40 text-primary-foreground"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <span>• <strong className="text-foreground">Prisma</strong> on Supabase Postgres</span>
                  <span className="text-[10px] text-blue-400">ORM</span>
                </li>
              </ul>
            </div>

            {/* Data Model Section */}
            <div>
              <h3 className="font-heading text-sm font-semibold text-foreground/90 uppercase tracking-wider mb-2.5">
                Data model
              </h3>
              <ul className="space-y-1.5 font-mono text-xs text-muted-foreground">
                <li className="p-1.5 rounded hover:bg-white/5 transition-colors">
                  • <strong className="text-foreground/90">Workspace</strong> status, shareToken
                </li>
                <li className="p-1.5 rounded hover:bg-white/5 transition-colors">
                  • <strong className="text-foreground/90">Doc</strong> BlockNote JSON + Yjs state
                </li>
                <li className="p-1.5 rounded hover:bg-white/5 transition-colors">
                  • <strong className="text-foreground/90">Canvas</strong> tldraw snapshot
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* RIGHT PANEL: tldraw Interactive Canvas */}
        {(activeTab === "both" || activeTab === "canvas") && (
          <div
            className={`relative p-6 sm:p-8 overflow-hidden bg-[#07060b] flex flex-col justify-between ${
              activeTab === "canvas" ? "lg:col-span-12" : "lg:col-span-7"
            }`}
          >
            {/* Canvas Dot Matrix Pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-25"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(168, 85, 247, 0.45) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />

            {/* System Topology Diagram Nodes Layer */}
            <div className="relative z-10 w-full space-y-6">
              {/* Row 1: Browser -> Next.js 16 -> Auth / Gemini */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                {/* Node: Browser Client */}
                <div
                  onClick={() => setSelectedEntity("browser")}
                  className="rounded-xl border border-white/10 bg-[#120f1a] p-3 text-left shadow-lg hover:border-primary/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-muted-foreground mb-1">
                    <span className="size-1.5 rounded-full bg-amber-400" />
                    <span>CLIENT_SURFACE</span>
                  </div>
                  <h4 className="font-heading text-xs font-semibold text-foreground">Browser</h4>
                  <p className="font-mono text-[10px] text-muted-foreground">React 19 Client</p>
                </div>

                {/* Node: Next.js 16 Core Router */}
                <div
                  onClick={() => setSelectedEntity("nextjs")}
                  className={`rounded-xl border p-3 text-left shadow-lg transition-all cursor-pointer ${
                    selectedEntity === "nextjs"
                      ? "border-primary bg-primary/15 shadow-[0_0_20px_oklch(0.68_0.22_285/0.3)] ring-1 ring-primary"
                      : "border-white/10 bg-[#120f1a] hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-primary mb-1">
                    <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                    <span>APP_ROUTER</span>
                  </div>
                  <h4 className="font-heading text-xs font-semibold text-foreground">Next.js 16</h4>
                  <p className="font-mono text-[10px] text-muted-foreground">App Routes + Actions</p>
                </div>

                {/* Stack: Auth & Gemini */}
                <div className="space-y-2.5">
                  <div
                    onClick={() => setSelectedEntity("auth")}
                    className={`rounded-xl border p-2.5 text-left shadow-md transition-all cursor-pointer ${
                      selectedEntity === "auth"
                        ? "border-amber-500 bg-amber-500/15"
                        : "border-white/8 bg-[#120f1a] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-1 font-mono text-[9px] text-amber-400">
                      <span className="size-1.5 rounded-full bg-amber-400" />
                      <span>Authentication</span>
                    </div>
                    <p className="font-mono text-[9px] text-muted-foreground">Users · Orgs · Billing</p>
                  </div>

                  <div
                    onClick={() => setSelectedEntity("gemini")}
                    className={`rounded-xl border p-2.5 text-left shadow-md transition-all cursor-pointer ${
                      selectedEntity === "gemini"
                        ? "border-purple-400 bg-purple-500/15"
                        : "border-white/8 bg-[#120f1a] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-1 font-mono text-[9px] text-purple-400">
                      <span className="size-1.5 rounded-full bg-purple-400" />
                      <span>Gemini</span>
                    </div>
                    <p className="font-mono text-[9px] text-muted-foreground">AI SDK tool calls</p>
                  </div>
                </div>
              </div>

              {/* Row 2: Realtime Layer & Data Layer Containers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Realtime Layer Box (Dashed Teal Border) */}
                <div
                  onClick={() => setSelectedEntity("realtime")}
                  className={`rounded-xl border-2 border-dashed p-3.5 bg-[#0e1614]/40 transition-all cursor-pointer ${
                    selectedEntity === "realtime"
                      ? "border-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(52,211,153,0.2)]"
                      : "border-emerald-500/40 hover:border-emerald-400"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[9px] text-emerald-400 font-bold mb-2">
                    <span className="rounded bg-emerald-500/20 px-1.5 py-0.5">Realtime layer</span>
                    <span>Yjs + WebSocket</span>
                  </div>
                  <div className="space-y-1.5 font-mono text-[10px]">
                    <div className="rounded bg-black/40 p-2 border border-emerald-500/20 flex items-center justify-between">
                      <span className="text-foreground/90">• Supabase Realtime</span>
                      <span className="text-muted-foreground text-[9px]">Yjs doc sync</span>
                    </div>
                    <div className="rounded bg-black/40 p-2 border border-emerald-500/20 flex items-center justify-between">
                      <span className="text-foreground/90">• tldraw sync</span>
                      <span className="text-muted-foreground text-[9px]">Live canvas rooms</span>
                    </div>
                  </div>
                </div>

                {/* Data Layer Box (Dashed Blue Border) */}
                <div
                  onClick={() => setSelectedEntity("data")}
                  className={`rounded-xl border-2 border-dashed p-3.5 bg-[#0e121a]/40 transition-all cursor-pointer ${
                    selectedEntity === "data"
                      ? "border-blue-400 bg-blue-500/10 shadow-[0_0_20px_rgba(96,165,250,0.2)]"
                      : "border-blue-500/40 hover:border-blue-400"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[9px] text-blue-400 font-bold mb-2">
                    <span className="rounded bg-blue-500/20 px-1.5 py-0.5">Data layer</span>
                    <span>Postgres + Storage</span>
                  </div>
                  <div className="space-y-1.5 font-mono text-[10px]">
                    <div className="rounded bg-black/40 p-2 border border-blue-500/20 flex items-center justify-between">
                      <span className="text-foreground/90">• Prisma</span>
                      <span className="text-muted-foreground text-[9px]">Typed ORM</span>
                    </div>
                    <div className="rounded bg-black/40 p-2 border border-blue-500/20 flex items-center justify-between">
                      <span className="text-foreground/90">• Supabase</span>
                      <span className="text-muted-foreground text-[9px]">Postgres DB</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Entity Schemas (Workspace, Doc, Canvas) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {/* Schema Card: Workspace */}
                <div className="rounded-xl border border-white/10 bg-[#14111d] p-3 text-left shadow-md">
                  <div className="flex items-center justify-between font-mono text-[9px] text-primary font-bold border-b border-white/8 pb-1.5 mb-2">
                    <span>🗄 Workspace</span>
                    <span className="text-muted-foreground">Table</span>
                  </div>
                  <div className="space-y-1 font-mono text-[10px] text-muted-foreground">
                    <div className="flex justify-between">
                      <span className="text-foreground/80">id</span>
                      <span className="text-amber-400 text-[9px]">String 🔑</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/80">name</span>
                      <span className="text-[9px]">String</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/80">status</span>
                      <span className="text-[9px]">Enum</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/80">shareToken</span>
                      <span className="text-[9px]">String?</span>
                    </div>
                  </div>
                </div>

                {/* Schema Card: Doc */}
                <div className="rounded-xl border border-white/10 bg-[#14111d] p-3 text-left shadow-md">
                  <div className="flex items-center justify-between font-mono text-[9px] text-primary font-bold border-b border-white/8 pb-1.5 mb-2">
                    <span>📄 Doc</span>
                    <span className="text-muted-foreground">Table</span>
                  </div>
                  <div className="space-y-1 font-mono text-[10px] text-muted-foreground">
                    <div className="flex justify-between">
                      <span className="text-foreground/80">id</span>
                      <span className="text-amber-400 text-[9px]">String 🔑</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/80">workspaceId</span>
                      <span className="text-blue-400 text-[9px]">String 🔗</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/80">content</span>
                      <span className="text-[9px]">Json</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/80">yjsState</span>
                      <span className="text-[9px]">Bytes</span>
                    </div>
                  </div>
                </div>

                {/* Schema Card: Canvas */}
                <div className="rounded-xl border border-white/10 bg-[#14111d] p-3 text-left shadow-md">
                  <div className="flex items-center justify-between font-mono text-[9px] text-primary font-bold border-b border-white/8 pb-1.5 mb-2">
                    <span>🎨 Canvas</span>
                    <span className="text-muted-foreground">Table</span>
                  </div>
                  <div className="space-y-1 font-mono text-[10px] text-muted-foreground">
                    <div className="flex justify-between">
                      <span className="text-foreground/80">id</span>
                      <span className="text-amber-400 text-[9px]">String 🔑</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/80">workspaceId</span>
                      <span className="text-blue-400 text-[9px]">String 🔗</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/80">content</span>
                      <span className="text-[9px]">Json</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating tldraw Bottom Toolbar */}
            <div className="relative z-10 mt-6 pt-4 flex items-center justify-center">
              <div className="inline-flex items-center gap-1.5 rounded-xl border border-white/12 bg-black/80 px-3 py-1.5 backdrop-blur-xl shadow-2xl">
                <button type="button" className="p-1.5 rounded-lg bg-white/10 text-primary hover:bg-white/15 transition-colors">
                  <MousePointer className="size-3.5" />
                </button>
                <button type="button" className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors">
                  <Hand className="size-3.5" />
                </button>
                <button type="button" className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors">
                  <Square className="size-3.5" />
                </button>
                <button type="button" className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors">
                  <ArrowUpRight className="size-3.5" />
                </button>
                <button type="button" className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors">
                  <Type className="size-3.5" />
                </button>
                <div className="h-4 w-px bg-white/15 mx-1" />
                <button type="button" className="p-1.5 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-white/5 transition-colors">
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Center Floating Badge */}
      <div className="relative z-10 flex items-center justify-center py-2 bg-gradient-to-r from-transparent via-primary/10 to-transparent border-t border-white/6">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-primary font-medium">
          <Sparkles className="size-3 text-primary animate-pulse" />
          <span>Diagram in. Written spec out.</span>
        </div>
      </div>
    </div>
  );
}

export default WorkspaceStudioMockup;
