import React from "react";
import { ArchitectureNodeData } from "./types";
import {
  IsometricAgentIcon,
  IsometricDatabaseIcon,
  IsometricOrchestratorIcon,
  IsometricWorkspaceIcon,
  IsometricMemoryIcon,
  IsometricToolIcon,
  IsometricOutputIcon,
} from "./IsometricSvgIcons";

interface ArchitectureNodeProps {
  node: ArchitectureNodeData;
  isHovered: boolean;
  isConnected: boolean;
  isDimmed: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

export function ArchitectureNode({
  node,
  isHovered,
  isConnected,
  isDimmed,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: ArchitectureNodeProps) {
  const { x, y, width, height, label, subtitle, type, color, status } = node;

  const renderIcon = () => {
    switch (type) {
      case "agent":
        return <IsometricAgentIcon className="w-6 h-6 shrink-0" color={color} highlight={isHovered} />;
      case "database":
        return <IsometricDatabaseIcon className="w-6 h-6 shrink-0" color={color} />;
      case "orchestrator":
        return <IsometricOrchestratorIcon className="w-6 h-6 shrink-0" color={color} />;
      case "workspace":
        return <IsometricWorkspaceIcon className="w-6 h-6 shrink-0" color={color} />;
      case "memory":
        return <IsometricMemoryIcon className="w-6 h-6 shrink-0" color={color} />;
      case "tool":
        return <IsometricToolIcon className="w-6 h-6 shrink-0" color={color} />;
      case "output":
        return <IsometricOutputIcon className="w-6 h-6 shrink-0" color={color} />;
      default:
        return <IsometricAgentIcon className="w-6 h-6 shrink-0" color={color} />;
    }
  };

  const isActive = isHovered || isConnected;

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      className="overflow-visible"
    >
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        className={`group relative h-full w-full select-none cursor-pointer rounded-xl border px-3 py-2 transition-all duration-300 backdrop-blur-md flex items-center justify-between gap-2 ${
          isActive
            ? "border-white/35 bg-[#12131b]/95 shadow-[0_0_25px_-5px_var(--glow-color)] -translate-y-1"
            : isDimmed
            ? "border-white/5 bg-[#090a0d]/60 opacity-30"
            : "border-white/10 bg-[#0c0d12]/90 hover:border-white/25 hover:bg-[#111218]"
        }`}
        style={
          {
            "--glow-color": `${color}40`,
          } as React.CSSProperties
        }
      >
        {/* Isometric Icon + Label + Subtitle */}
        <div className="flex items-center gap-2.5 overflow-hidden min-w-0">
          {renderIcon()}
          <div className="min-w-0">
            <div className="truncate font-mono text-[11px] font-semibold text-foreground tracking-tight leading-snug">
              {label}
            </div>
            <div className="truncate font-mono text-[9px] text-muted-foreground/80 leading-none">
              {subtitle}
            </div>
          </div>
        </div>

        {/* Active status pulse dot */}
        <span className="relative flex size-2 shrink-0">
          {status !== "idle" && (
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
              style={{ backgroundColor: color }}
            />
          )}
          <span
            className="relative inline-flex size-2 rounded-full"
            style={{ backgroundColor: color }}
          />
        </span>
      </div>
    </foreignObject>
  );
}

export default ArchitectureNode;
