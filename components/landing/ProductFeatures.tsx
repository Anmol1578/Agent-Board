import React from "react";
import {
  Sparkles,
  Workflow,
  Check,
  Code2,
} from "lucide-react";

export function ProductFeatures() {
  const capabilities = [
    {
      badge: "AI ARCHITECT",
      title: "Synthesize architectures in real time",
      description:
        "Describe your system in plain English. Watch the AI Architect generate node topologies, position layout hierarchies, and route connections across the canvas live.",
      bullets: [
        "Streaming canvas generation — watch nodes materialize in real time",
        "Attach diagrams, specs, or PDFs to auto-extract system topologies",
        "Iteratively refine layouts with natural language follow-up prompts",
      ],
      preview: {
        type: "prompt",
        text: '"Build an agentic RAG pipeline with Qdrant vector search, GitHub MCP, and automated validation"',
        status: "Streaming 6 nodes onto canvas...",
      },
    },
    {
      badge: "SCENARIO PLAYBACK",
      title: "Step through execution flows visually",
      description:
        "Don't just draw static boxes. Define scenarios and play back execution traces step by step with animated pulse edges, inspectable payloads, and error fallbacks.",
      bullets: [
        "5 Typed connection styles: Request, Streaming, Async, Tool Call & Error",
        "Step through decision trees and inspect state payloads at every hop",
        "Simulate edge cases, parallel agent branches, and automatic recovery paths",
      ],
      preview: {
        type: "connections",
        styles: [
          { name: "Request / Response", color: "bg-purple-400", style: "border-purple-400" },
          { name: "Streaming Token SSE", color: "bg-indigo-400", style: "border-indigo-400" },
          { name: "Async Event Queue", color: "bg-blue-400", style: "border-blue-400 border-dashed" },
          { name: "MCP Tool Call", color: "bg-amber-400", style: "border-amber-400" },
          { name: "Fallback / Error Catch", color: "bg-red-400", style: "border-red-400 border-dotted" },
        ],
      },
    },
    {
      badge: "COLLABORATIVE WORKSPACE",
      title: "Share, embed, and export to code",
      description:
        "Transform visual canvas designs into production code. Share live interactive read-only snapshots, embed diagrams in documentation, or export to LangGraph and Docker Compose.",
      bullets: [
        "One-click shareable URLs with frozen snapshots — no login required",
        "Responsive, interactive iframe embedding for docs, Notion, and wikis",
        "Export production boilerplate: TypeScript, Python, Terraform, and Docker",
      ],
      preview: {
        type: "export",
        formats: ["TypeScript / LangGraph", "Python / CrewAI", "Docker Compose", "Vector SVG / PNG"],
      },
    },
  ];

  return (
    <section id="product" className="relative py-20 md:py-32 px-4 sm:px-6 max-w-7xl mx-auto z-10 border-t border-white/6">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 font-mono text-[11px] uppercase tracking-widest text-primary mb-3 shadow-[0_0_15px_-3px_oklch(0.68_0.22_285/0.25)]">
          <span>◆</span>
          <span>Core Architecture</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground max-w-3xl leading-tight mb-4">
          More than a diagramming tool — an executable agentic canvas
        </h2>
        <p className="max-w-2xl text-muted-foreground text-sm sm:text-base leading-relaxed">
          Traditional whiteboard tools produce dead drawings. Agent-Board pairs interactive visual architecture
          design with real agent execution, typed scenario playback, and bidirectional code synchronization.
        </p>
      </div>

      {/* Alternating Visual Feature Blocks */}
      <div className="space-y-12">
        {capabilities.map((cap, idx) => {
          const isEven = idx % 2 === 1;
          return (
            <div
              key={cap.badge}
              className={`rounded-2xl border border-white/8 bg-[#110f17]/70 p-6 sm:p-10 backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:bg-[#14111d] hover:shadow-[0_0_40px_-10px_oklch(0.68_0.22_285/0.2)] flex flex-col ${
                isEven ? "lg:flex-row-reverse" : "lg:flex-row"
              } items-center gap-8 lg:gap-12`}
            >
              {/* Text Description */}
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-primary">
                  <span>◆</span>
                  <span>{cap.badge}</span>
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-foreground leading-snug">
                  {cap.title}
                </h3>

                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {cap.description}
                </p>

                <ul className="space-y-2.5 pt-2">
                  {cap.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/85">
                      <div className="flex size-4.5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary mt-0.5">
                        <Check className="size-3 stroke-[2.5]" />
                      </div>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interactive Visual Card */}
              <div className="w-full lg:w-1/2 rounded-xl border border-white/10 bg-[#0a0810] p-6 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                {cap.preview.type === "prompt" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/8 pb-3">
                      <div className="flex items-center gap-2 font-mono text-xs text-primary font-medium">
                        <Sparkles className="size-3.5" />
                        <span>AI ARCHITECT PROMPT</span>
                      </div>
                      <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400 font-semibold">
                        LIVE GENERATING
                      </span>
                    </div>

                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 font-mono text-xs text-foreground/90 leading-relaxed shadow-inner">
                      <p className="text-primary/70 mb-1 font-semibold text-[10px]">Natural Language Spec:</p>
                      <p>{cap.preview.text}</p>
                    </div>

                    <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground pt-1">
                      <span className="flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                        <span>{cap.preview.status}</span>
                      </span>
                      <span className="text-foreground/70 font-semibold">Layout: Auto-DAG</span>
                    </div>
                  </div>
                )}

                {cap.preview.type === "connections" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/8 pb-3">
                      <div className="flex items-center gap-2 font-mono text-xs text-primary font-medium">
                        <Workflow className="size-3.5" />
                        <span>TYPED DATAFLOW CHANNELS</span>
                      </div>
                      <span className="font-mono text-[10px] text-muted-foreground">5 PROTOCOLS</span>
                    </div>

                    <div className="space-y-2.5 font-mono text-xs">
                      {cap.preview.styles?.map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center justify-between p-2 rounded-md bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors"
                        >
                          <span className="text-foreground/80">{item.name}</span>
                          <div className="flex items-center gap-2 w-36">
                            <div className={`h-0.5 flex-1 border-t-2 ${item.style}`} />
                            <span className={`size-2 rounded-full ${item.color}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {cap.preview.type === "export" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/8 pb-3">
                      <div className="flex items-center gap-2 font-mono text-xs text-primary font-medium">
                        <Code2 className="size-3.5" />
                        <span>PRODUCTION READY ARTIFACTS</span>
                      </div>
                      <span className="rounded bg-primary/15 px-2 py-0.5 font-mono text-[10px] text-primary font-semibold">
                        ZERO DRIFT
                      </span>
                    </div>

                    <p className="font-mono text-xs text-muted-foreground">
                      Deploy your visual architecture canvas directly to code repositories or run in cloud sandboxes.
                    </p>

                    <div className="grid grid-cols-2 gap-2.5 pt-2">
                      {cap.preview.formats?.map((fmt) => (
                        <div
                          key={fmt}
                          className="flex items-center gap-2 p-2.5 rounded-lg border border-white/8 bg-white/[0.03] font-mono text-xs text-foreground/90 hover:border-primary/40 hover:bg-primary/5 transition-all"
                        >
                          <span className="text-primary text-[10px]">◆</span>
                          <span className="truncate">{fmt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ProductFeatures;
