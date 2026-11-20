import React from "react";

interface IsometricIconProps {
  className?: string;
  color?: string;
  highlight?: boolean;
}

// 1. Isometric Agent Node: Segmented geometric disc with extruded ivory 3D prism
export function IsometricAgentIcon({
  className = "w-6 h-6",
  color = "#e8ebb2",
  highlight = false,
}: IsometricIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Isometric Base Diamond Pad */}
      <polygon
        points="24,6 44,17 24,28 4,17"
        fill="#121215"
        stroke="#2c2c34"
        strokeWidth="1.2"
      />
      {/* Base thickness */}
      <polygon
        points="4,17 24,28 24,32 4,21"
        fill="#0a0a0d"
        stroke="#222228"
        strokeWidth="1"
      />
      <polygon
        points="24,28 44,17 44,21 24,32"
        fill="#0e0e12"
        stroke="#222228"
        strokeWidth="1"
      />

      {/* Segmented Quadrants */}
      <path
        d="M24,10 L38,18 L24,25 L10,18 Z"
        fill="none"
        stroke="#3e3e48"
        strokeWidth="0.8"
        strokeDasharray="2 2"
      />
      <line x1="24" y1="10" x2="24" y2="25" stroke="#3e3e48" strokeWidth="0.8" />
      <line x1="10" y1="18" x2="38" y2="18" stroke="#3e3e48" strokeWidth="0.8" />

      {/* Extruded 3D Ivory/Color Highlight Block */}
      <g className={highlight ? "animate-pulse" : ""}>
        {/* Top face */}
        <polygon
          points="24,10 32,14.5 24,19 16,14.5"
          fill={color}
          fillOpacity="0.85"
          stroke={color}
          strokeWidth="1"
        />
        {/* Left face */}
        <polygon
          points="16,14.5 24,19 24,25 16,20.5"
          fill={color}
          fillOpacity="0.5"
          stroke={color}
          strokeWidth="0.8"
        />
        {/* Right face */}
        <polygon
          points="24,19 32,14.5 32,20.5 24,25"
          fill={color}
          fillOpacity="0.65"
          stroke={color}
          strokeWidth="0.8"
        />
      </g>
    </svg>
  );
}

// 2. Isometric Database Node: Stacked 3D Cylinders with ivory rim highlights
export function IsometricDatabaseIcon({
  className = "w-6 h-6",
  color = "#38bdf8",
}: IsometricIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Bottom Cylinder */}
      <g>
        <path
          d="M10,28 C10,33 38,33 38,28 L38,34 C38,39 10,39 10,34 Z"
          fill="#0c0d12"
          stroke="#2f3240"
          strokeWidth="1.2"
        />
        <ellipse
          cx="24"
          cy="28"
          rx="14"
          ry="5.5"
          fill="#161822"
          stroke="#3f4456"
          strokeWidth="1.2"
        />
      </g>

      {/* Middle Cylinder */}
      <g>
        <path
          d="M10,20 C10,25 38,25 38,20 L38,26 C38,31 10,31 10,26 Z"
          fill="#11131a"
          stroke="#383d50"
          strokeWidth="1.2"
        />
        <ellipse
          cx="24"
          cy="20"
          rx="14"
          ry="5.5"
          fill="#1a1c28"
          stroke="#484e68"
          strokeWidth="1.2"
        />
      </g>

      {/* Top Cylinder with Glowing Rim */}
      <g>
        <path
          d="M10,12 C10,17 38,17 38,12 L38,18 C38,23 10,23 10,18 Z"
          fill="#161a26"
          stroke={color}
          strokeWidth="1.2"
          strokeOpacity="0.8"
        />
        <ellipse
          cx="24"
          cy="12"
          rx="14"
          ry="5.5"
          fill="#1e2333"
          stroke={color}
          strokeWidth="1.4"
        />
        {/* Core storage pulse point */}
        <ellipse cx="24" cy="12" rx="4" ry="1.6" fill={color} fillOpacity="0.8" />
      </g>
    </svg>
  );
}

// 3. Isometric Central Orchestrator: Concentric coordinate rings & beacon
export function IsometricOrchestratorIcon({
  className = "w-6 h-6",
  color = "#e8ebb2",
}: IsometricIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Ring */}
      <ellipse
        cx="24"
        cy="24"
        rx="18"
        ry="9"
        fill="#0b0b10"
        stroke="#333340"
        strokeWidth="1.2"
        strokeDasharray="4 2"
      />
      {/* Inner Active Ring */}
      <ellipse
        cx="24"
        cy="24"
        rx="12"
        ry="6"
        fill="#12121c"
        stroke={color}
        strokeWidth="1.2"
        strokeOpacity="0.7"
      />

      {/* Axis Crosshairs */}
      <line x1="6" y1="24" x2="42" y2="24" stroke="#2b2b36" strokeWidth="0.8" />
      <line x1="24" y1="15" x2="24" y2="33" stroke="#2b2b36" strokeWidth="0.8" />

      {/* Central Floating Node Column */}
      <polygon
        points="24,14 29,18 24,22 19,18"
        fill={color}
        fillOpacity="0.9"
        stroke={color}
        strokeWidth="1"
      />
      <polygon
        points="19,18 24,22 24,27 19,23"
        fill={color}
        fillOpacity="0.5"
        stroke={color}
        strokeWidth="0.8"
      />
      <polygon
        points="24,22 29,18 29,23 24,27"
        fill={color}
        fillOpacity="0.7"
        stroke={color}
        strokeWidth="0.8"
      />
    </svg>
  );
}

// 4. Isometric Workspace / Laptop & Canvas
export function IsometricWorkspaceIcon({
  className = "w-6 h-6",
  color = "#38bdf8",
}: IsometricIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Laptop Keyboard Base */}
      <polygon
        points="24,22 40,30 24,38 8,30"
        fill="#101218"
        stroke="#2c303f"
        strokeWidth="1.2"
      />
      {/* Keyboard trackpad */}
      <polygon
        points="24,31 28,33 24,35 20,33"
        fill="#1a1e28"
        stroke="#394054"
        strokeWidth="0.8"
      />

      {/* Upright Screen */}
      <polygon
        points="8,30 8,15 24,8 24,22"
        fill="#141722"
        stroke="#3b4256"
        strokeWidth="1.2"
      />
      {/* Screen Glare & Code Lines */}
      <line x1="11" y1="18" x2="20" y2="14" stroke={color} strokeWidth="1" strokeOpacity="0.8" />
      <line x1="11" y1="21" x2="18" y2="18" stroke="#525c75" strokeWidth="0.8" />
      <line x1="11" y1="24" x2="22" y2="20" stroke={color} strokeWidth="0.8" strokeOpacity="0.6" />
      <line x1="11" y1="27" x2="16" y2="25" stroke="#525c75" strokeWidth="0.8" />
    </svg>
  );
}

// 5. Isometric Memory System: Stacked caching plates
export function IsometricMemoryIcon({
  className = "w-6 h-6",
  color = "#e8ebb2",
}: IsometricIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Bottom Layer */}
      <polygon
        points="24,20 40,28 24,36 8,28"
        fill="#101116"
        stroke="#292a34"
        strokeWidth="1.2"
      />
      {/* Middle Layer */}
      <polygon
        points="24,15 40,23 24,31 8,23"
        fill="#161820"
        stroke="#383946"
        strokeWidth="1.2"
      />
      {/* Top Layer */}
      <polygon
        points="24,10 40,18 24,26 8,18"
        fill="#1c1e28"
        stroke={color}
        strokeWidth="1.2"
      />
      {/* Data traces on top */}
      <line x1="16" y1="18" x2="32" y2="18" stroke={color} strokeWidth="1" strokeOpacity="0.7" />
      <line x1="20" y1="14" x2="28" y2="22" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
    </svg>
  );
}

// 6. Isometric Tool Gateway: Hexagonal socket & modular connector
export function IsometricToolIcon({
  className = "w-6 h-6",
  color = "#34d399",
}: IsometricIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <polygon
        points="24,8 38,16 38,32 24,40 10,32 10,16"
        fill="#0d1411"
        stroke="#24382e"
        strokeWidth="1.2"
      />
      <polygon
        points="24,14 33,19 33,29 24,34 15,29 15,19"
        fill="#14211b"
        stroke={color}
        strokeWidth="1.2"
        strokeOpacity="0.7"
      />
      {/* Connector Pins */}
      <circle cx="24" cy="24" r="2.5" fill={color} />
      <line x1="24" y1="14" x2="24" y2="21" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
      <line x1="24" y1="27" x2="24" y2="34" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
    </svg>
  );
}

// 7. Isometric Output Artifact: Layered document / pull request
export function IsometricOutputIcon({
  className = "w-6 h-6",
  color = "#e8ebb2",
}: IsometricIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Back Document Sheet */}
      <polygon
        points="22,6 38,14 26,38 10,30"
        fill="#111115"
        stroke="#2a2a32"
        strokeWidth="1"
      />
      {/* Front Highlight Sheet */}
      <polygon
        points="26,10 42,18 30,42 14,34"
        fill="#181820"
        stroke={color}
        strokeWidth="1.2"
      />
      {/* Text / Code Lines */}
      <line x1="18" y1="20" x2="34" y2="28" stroke="#4a4a58" strokeWidth="1" />
      <line x1="19" y1="24" x2="29" y2="29" stroke={color} strokeWidth="1" strokeOpacity="0.8" />
      <line x1="20" y1="28" x2="36" y2="36" stroke="#4a4a58" strokeWidth="1" />
      {/* Check glyph */}
      <circle cx="28" cy="18" r="3" fill={color} fillOpacity="0.8" />
    </svg>
  );
}
