import React from "react";
import { ConnectionPath } from "./types";

interface ArchitectureConnectionProps {
  connection: ConnectionPath;
  isHighlighted: boolean;
  isDimmed: boolean;
}

export function ArchitectureConnection({
  connection,
  isHighlighted,
  isDimmed,
}: ArchitectureConnectionProps) {
  const { path, color, speed, delay, bidirectional, reversePath } = connection;

  const baseOpacity = isHighlighted ? 0.95 : isDimmed ? 0.12 : 0.35;
  const strokeWidth = isHighlighted ? 1.8 : 1.2;

  return (
    <g className="transition-opacity duration-300">
      {/* 1. Underlying Dark Structural Path */}
      <path
        d={path}
        fill="none"
        stroke="#1a1a22"
        strokeWidth={strokeWidth + 0.5}
        strokeLinecap="round"
      />

      {/* 2. Active Geometric Data Route (Fine dashed architectural stroke) */}
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeOpacity={baseOpacity}
        strokeDasharray={isHighlighted ? "6 4" : "4 6"}
        strokeLinecap="round"
      />

      {/* 3. Luminous Forward Data Packet (Traveling along exact path) */}
      <circle r={isHighlighted ? 3 : 2.2} fill={color} opacity={isDimmed ? 0.2 : 0.95}>
        <animateMotion
          path={path}
          dur={`${speed}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
          calcMode="linear"
        />
      </circle>

      {/* 4. Soft Trailing Echo Particle */}
      <circle
        r={isHighlighted ? 2 : 1.4}
        fill={color}
        opacity={isDimmed ? 0.1 : 0.55}
      >
        <animateMotion
          path={path}
          dur={`${speed}s`}
          begin={`${delay + 0.15}s`}
          repeatCount="indefinite"
          calcMode="linear"
        />
      </circle>

      {/* 5. Bidirectional Reverse Packet (Feedback / Memory Returns) */}
      {bidirectional && reversePath && (
        <>
          <path
            d={reversePath}
            fill="none"
            stroke="#e8ebb2"
            strokeWidth={1}
            strokeOpacity={isDimmed ? 0.1 : 0.25}
            strokeDasharray="2 6"
          />
          <circle
            r={isHighlighted ? 2.6 : 1.8}
            fill="#e8ebb2"
            opacity={isDimmed ? 0.15 : 0.9}
          >
            <animateMotion
              path={reversePath}
              dur={`${speed + 0.6}s`}
              begin={`${delay + 1.2}s`}
              repeatCount="indefinite"
              calcMode="linear"
            />
          </circle>
        </>
      )}
    </g>
  );
}

export default ArchitectureConnection;
