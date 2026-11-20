import React from "react";

export function TechStackBar() {
  const stacks = [
    { name: "Model Context Protocol (MCP)", badge: "Native" },
    { name: "Anthropic Claude 3.7 / 3.5", badge: "Live" },
    { name: "OpenAI o3 & GPT-4.5", badge: "Ready" },
    { name: "Google Gemini 2.5 Pro", badge: "Fast" },
    { name: "Vercel AI SDK", badge: "v4" },
    { name: "Docker & Firecracker", badge: "Isolated" },
    { name: "BYOC on AWS / GCP", badge: "Secure" },
  ];

  return (
    <section className="relative border-y border-white/6 bg-black/40 py-8 backdrop-blur-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-center font-mono text-[11px] sm:text-xs uppercase tracking-widest text-muted-foreground/80 mb-6">
          Powering multi-agent runtimes across modern AI infrastructure
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
          {stacks.map((item) => (
            <div
              key={item.name}
              className="inline-flex items-center gap-2 rounded-md border border-white/8 bg-white/[0.02] px-3.5 py-1.5 font-mono text-xs text-foreground/80 transition-colors hover:border-white/16 hover:bg-white/[0.05]"
            >
              <span>{item.name}</span>
              <span className="rounded bg-primary/15 px-1.5 py-0.5 text-[9px] font-semibold text-primary uppercase">
                {item.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechStackBar;
