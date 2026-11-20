import React from "react";
import { ArchitectureNodeData } from "./types";
import { X } from "lucide-react";

interface ArchitectureTooltipProps {
  node: ArchitectureNodeData | null;
  onClose: () => void;
}

export function ArchitectureTooltip({ node, onClose }: ArchitectureTooltipProps) {
  if (!node) return null;

  return (
    <div className="absolute top-4 right-4 z-30 w-72 sm:w-80 rounded-xl border border-white/12 bg-[#0c0d13]/95 p-4 shadow-[0_0_40px_-10px_oklch(0.68_0.22_285/0.3)] backdrop-blur-2xl transition-all duration-300 animate-in fade-in zoom-in-95">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-white/8 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="size-2 rounded-full animate-pulse"
              style={{ backgroundColor: node.color }}
            />
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {node.layerName}
            </span>
          </div>
          <h4 className="mt-1 font-heading text-sm font-bold text-foreground">
            {node.label}
          </h4>
          <p className="font-mono text-[11px] text-primary">{node.subtitle}</p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors cursor-pointer"
          aria-label="Close details"
        >
          <X className="size-3.5" />
        </button>
      </div>

      {/* Description */}
      <div className="py-3 text-xs leading-relaxed text-muted-foreground font-sans">
        {node.description}
      </div>

      {/* Clean Status Footer */}
      <div className="flex items-center justify-between border-t border-white/8 pt-3 font-mono text-[11px] text-muted-foreground">
        <span>Type: <strong className="text-foreground capitalize">{node.type}</strong></span>
        <span className="flex items-center gap-1.5 font-medium" style={{ color: node.color }}>
          <span className="size-1.5 rounded-full" style={{ backgroundColor: node.color }} />
          Online
        </span>
      </div>
    </div>
  );
}

export default ArchitectureTooltip;
