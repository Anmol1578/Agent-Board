"use client";

import React, { useState, useMemo } from "react";
import { ARCHITECTURE_NODES, CONNECTIONS, LAYERS } from "./constants";
import { ArchitectureConnection } from "./ArchitectureConnection";
import { ArchitectureNode } from "./ArchitectureNode";
import { ArchitectureTooltip } from "./ArchitectureTooltip";
import { LayerId } from "./types";
import { Layers as LayersIcon } from "lucide-react";

export function ArchitectureCanvas() {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>("ai-agent");
  const [activeFilter, setActiveFilter] = useState<"all" | LayerId>("all");

  // Determine active node (hover takes precedence, fallback to selected)
  const activeNode = useMemo(() => {
    const id = hoveredNodeId || selectedNodeId;
    return ARCHITECTURE_NODES.find((n) => n.id === id) || null;
  }, [hoveredNodeId, selectedNodeId]);

  // Set of connected node IDs relative to the currently active node
  const connectedNodeIds = useMemo(() => {
    if (!activeNode) return new Set<string>();
    const ids = new Set<string>();
    CONNECTIONS.forEach((c) => {
      if (c.from === activeNode.id) ids.add(c.to);
      if (c.to === activeNode.id) ids.add(c.from);
    });
    return ids;
  }, [activeNode]);

  // Set of active connection IDs
  const activeConnectionIds = useMemo(() => {
    if (!activeNode) return new Set<string>();
    const ids = new Set<string>();
    CONNECTIONS.forEach((c) => {
      if (c.from === activeNode.id || c.to === activeNode.id) {
        ids.add(c.id);
      }
    });
    return ids;
  }, [activeNode]);

  return (
    <div className="relative w-full rounded-2xl border border-white/10 bg-[#060608] shadow-[0_0_60px_-15px_oklch(0.68_0.22_285/0.25)] overflow-hidden">
      {/* 1. Header Toolbar & Flow Filters */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/8 bg-black/60 px-5 py-3 gap-3 text-xs font-mono">
        {/* Left: Window Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-red-500/70 inline-block" />
            <span className="size-2.5 rounded-full bg-yellow-500/70 inline-block" />
            <span className="size-2.5 rounded-full bg-emerald-500/70 inline-block" />
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-2 text-muted-foreground">
            <LayersIcon className="size-3.5 text-primary" />
            <span className="text-foreground/90 font-medium hidden sm:inline">
              agent-board.topology
            </span>
            <span className="text-[11px] text-muted-foreground">
              · 5 Layers Connected
            </span>
          </div>
        </div>

        {/* Right: Layer Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
              activeFilter === "all"
                ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            }`}
          >
            All Flows
          </button>
          {LAYERS.map((layer) => (
            <button
              key={layer.id}
              type="button"
              onClick={() => setActiveFilter(layer.id)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer hidden md:inline-block ${
                activeFilter === layer.id
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              {layer.name.replace(" Layer", "")}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Interactive SVG Canvas Viewport */}
      <div className="relative w-full overflow-x-auto lg:overflow-hidden select-none bg-[#050507]">
        {/* Detail Tooltip Overlay */}
        <ArchitectureTooltip
          node={activeNode}
          onClose={() => {
            setHoveredNodeId(null);
            setSelectedNodeId(null);
          }}
        />

        <svg
          viewBox="0 0 1200 640"
          className="w-full min-w-[980px] h-auto block"
          style={{ minHeight: "530px" }}
        >
          <defs>
            {/* Fine Isometric Grid Pattern */}
            <pattern
              id="arch-iso-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 40 M 0 0 L 40 40"
                fill="none"
                stroke="#181820"
                strokeWidth="0.6"
                strokeOpacity="0.8"
              />
              <circle cx="20" cy="20" r="0.8" fill="#242430" />
            </pattern>
          </defs>

          {/* Background Grid Pattern */}
          <rect width="1200" height="640" fill="#050507" />
          <rect width="1200" height="640" fill="url(#arch-iso-grid)" />

          {/* Layer Boundary Columns with Clean Labels (NO //) */}
          <g className="font-mono text-[10px] select-none">
            {/* Layer 1: Workspace */}
            <line x1="235" y1="30" x2="235" y2="610" stroke="#1d1d26" strokeDasharray="3 3" />
            <text x="130" y="45" textAnchor="middle" fill="#6b7280" letterSpacing="1.5">
              01 WORKSPACE
            </text>

            {/* Layer 2: Orchestration */}
            <line x1="465" y1="30" x2="465" y2="610" stroke="#1d1d26" strokeDasharray="3 3" />
            <text x="350" y="45" textAnchor="middle" fill="#6b7280" letterSpacing="1.5">
              02 ORCHESTRATION
            </text>

            {/* Layer 3: One Central Agent */}
            <line x1="700" y1="30" x2="700" y2="610" stroke="#1d1d26" strokeDasharray="3 3" />
            <text x="582" y="45" textAnchor="middle" fill="#e8ebb2" letterSpacing="1.5" opacity="0.95">
              03 AGENT
            </text>

            {/* Layer 4: Infrastructure */}
            <line x1="930" y1="30" x2="930" y2="610" stroke="#1d1d26" strokeDasharray="3 3" />
            <text x="815" y="45" textAnchor="middle" fill="#6b7280" letterSpacing="1.5">
              04 INFRASTRUCTURE
            </text>

            {/* Layer 5: Output */}
            <text x="1040" y="45" textAnchor="middle" fill="#6b7280" letterSpacing="1.5">
              05 OUTPUT
            </text>
          </g>

          {/* 3. SVG Connections Layer with Travelling Luminous Data Packets */}
          <g className="connections-layer">
            {CONNECTIONS.map((conn) => {
              const isConnHighlighted =
                activeConnectionIds.has(conn.id) ||
                (activeFilter !== "all" &&
                  ARCHITECTURE_NODES.find((n) => n.id === conn.from)?.layer === activeFilter);
              const isConnDimmed =
                Boolean(activeNode) && !isConnHighlighted;

              return (
                <ArchitectureConnection
                  key={conn.id}
                  connection={conn}
                  isHighlighted={isConnHighlighted}
                  isDimmed={isConnDimmed}
                />
              );
            })}
          </g>

          {/* 4. Architecture Nodes Layer */}
          <g className="nodes-layer">
            {ARCHITECTURE_NODES.map((node) => {
              const isNodeHovered = hoveredNodeId === node.id || selectedNodeId === node.id;
              const isNodeConnected = connectedNodeIds.has(node.id);
              const isNodeDimmed =
                Boolean(activeNode) && !isNodeHovered && !isNodeConnected;

              return (
                <ArchitectureNode
                  key={node.id}
                  node={node}
                  isHovered={isNodeHovered}
                  isConnected={isNodeConnected}
                  isDimmed={isNodeDimmed}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onClick={() => setSelectedNodeId(node.id)}
                />
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}

export default ArchitectureCanvas;
