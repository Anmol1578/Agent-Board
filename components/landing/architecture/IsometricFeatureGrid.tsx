import React from "react";

export function IsometricFeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-12">
      {/* 1. Autonomous AI agent */}
      <div className="flex flex-col group">
        <div className="relative h-48 w-full rounded-xl border border-white/8 bg-[#07070a] p-4 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-white/20 group-hover:bg-[#0a0a0f]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#141418_1px,transparent_1px),linear-gradient(to_bottom,#141418_1px,transparent_1px)] bg-[size:20px_20px] opacity-40" />

          {/* Isometric Agent Platform with Ivory 3D Prism */}
          <svg viewBox="0 0 160 120" className="w-40 h-30 relative z-10">
            {/* Tile 1: Top */}
            <g transform="translate(48, 12)">
              <polygon points="32,0 64,16 32,32 0,16" fill="#101116" stroke="#2c2d38" strokeWidth="1" />
              <ellipse cx="32" cy="16" rx="16" ry="8" fill="#171822" stroke="#3b3d4e" strokeWidth="0.8" />
              <path d="M 32 16 L 44 22 L 32 28 Z" fill="#e8ebb2" fillOpacity="0.85" stroke="#e8ebb2" strokeWidth="0.8" />
            </g>

            {/* Tile 2: Left */}
            <g transform="translate(14, 30)">
              <polygon points="32,0 64,16 32,32 0,16" fill="#101116" stroke="#2c2d38" strokeWidth="1" />
              <ellipse cx="32" cy="16" rx="16" ry="8" fill="#171822" stroke="#3b3d4e" strokeWidth="0.8" />
              <line x1="32" y1="8" x2="32" y2="24" stroke="#4a4c5e" strokeWidth="0.8" />
              <line x1="16" y1="16" x2="48" y2="16" stroke="#4a4c5e" strokeWidth="0.8" />
            </g>

            {/* Tile 3: Right (With prominent 3D Ivory block) */}
            <g transform="translate(82, 30)">
              <polygon points="32,0 64,16 32,32 0,16" fill="#101116" stroke="#2c2d38" strokeWidth="1" />
              <ellipse cx="32" cy="16" rx="16" ry="8" fill="#171822" stroke="#3b3d4e" strokeWidth="0.8" />
              {/* 3D Extruded Ivory Cube */}
              <polygon points="32,4 46,11 32,18 18,11" fill="#e8ebb2" stroke="#e8ebb2" strokeWidth="1" />
              <polygon points="18,11 32,18 32,26 18,19" fill="#c4c891" stroke="#e8ebb2" strokeWidth="0.8" />
              <polygon points="32,18 46,11 46,19 32,26" fill="#d8dc9f" stroke="#e8ebb2" strokeWidth="0.8" />
            </g>

            {/* Tile 4: Bottom */}
            <g transform="translate(48, 48)">
              <polygon points="32,0 64,16 32,32 0,16" fill="#101116" stroke="#2c2d38" strokeWidth="1" />
              <ellipse cx="32" cy="16" rx="16" ry="8" fill="#171822" stroke="#3b3d4e" strokeWidth="0.8" />
              <circle cx="32" cy="16" r="3" fill="#e8ebb2" />
            </g>
          </svg>
        </div>

        <h3 className="mt-4 font-heading text-sm font-semibold text-foreground tracking-tight">
          Autonomous AI agent
        </h3>
        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
          One unified agent works across canvas and code, drafting living BlockNote specs and
          executing tasks without context fragmentation.
        </p>
      </div>

      {/* 2. Interactive pipeline canvas */}
      <div className="flex flex-col group">
        <div className="relative h-48 w-full rounded-xl border border-white/8 bg-[#07070a] p-4 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-white/20 group-hover:bg-[#0a0a0f]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#141418_1px,transparent_1px),linear-gradient(to_bottom,#141418_1px,transparent_1px)] bg-[size:20px_20px] opacity-40" />

          {/* Wireframe Laptop -> Agent Platform -> Wireframe Laptop */}
          <svg viewBox="0 0 180 120" className="w-44 h-30 relative z-10">
            {/* Left Laptop */}
            <g transform="translate(10, 36)">
              <polygon points="20,12 40,22 20,32 0,22" fill="#0f1015" stroke="#3a3c4c" strokeWidth="1" />
              <polygon points="0,22 0,6 20,0 20,16" fill="#14161f" stroke="#4f526b" strokeWidth="1" />
              <line x1="3" y1="9" x2="15" y2="4" stroke="#e8ebb2" strokeWidth="0.8" />
              <line x1="3" y1="13" x2="12" y2="9" stroke="#38bdf8" strokeWidth="0.8" />
            </g>

            {/* Connecting Dashed Trajectory Line */}
            <path
              d="M 45 52 L 75 52 L 95 48"
              fill="none"
              stroke="#52556b"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <circle r="2" fill="#38bdf8">
              <animateMotion path="M 45 52 L 75 52 L 95 48" dur="2.4s" repeatCount="indefinite" />
            </circle>

            {/* Center Platform with Disc */}
            <g transform="translate(68, 30)">
              <polygon points="24,0 48,12 24,24 0,12" fill="#111218" stroke="#333544" strokeWidth="1" />
              <ellipse cx="24" cy="12" rx="14" ry="7" fill="#1a1c26" stroke="#484b60" strokeWidth="0.8" />
              <polygon points="24,4 34,9 24,14 14,9" fill="#e8ebb2" stroke="#e8ebb2" strokeWidth="0.8" />
            </g>

            {/* Right Connecting Line */}
            <path
              d="M 115 48 L 135 52 L 145 52"
              fill="none"
              stroke="#52556b"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <circle r="2" fill="#e8ebb2">
              <animateMotion path="M 115 48 L 135 52 L 145 52" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
            </circle>

            {/* Right Laptop */}
            <g transform="translate(130, 36)">
              <polygon points="20,12 40,22 20,32 0,22" fill="#0f1015" stroke="#3a3c4c" strokeWidth="1" />
              <polygon points="0,22 0,6 20,0 20,16" fill="#14161f" stroke="#4f526b" strokeWidth="1" />
              <line x1="3" y1="9" x2="16" y2="4" stroke="#a855f7" strokeWidth="0.8" />
            </g>
          </svg>
        </div>

        <h3 className="mt-4 font-heading text-sm font-semibold text-foreground tracking-tight">
          Interactive pipeline canvas
        </h3>
        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
          Visual diagrams aren&apos;t dead sketches. Wire up agent nodes and typed edges, and watch
          live data packets travel through your pipeline in real time.
        </p>
      </div>

      {/* 3. Tests and builds */}
      <div className="flex flex-col group">
        <div className="relative h-48 w-full rounded-xl border border-white/8 bg-[#07070a] p-4 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-white/20 group-hover:bg-[#0a0a0f]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#141418_1px,transparent_1px),linear-gradient(to_bottom,#141418_1px,transparent_1px)] bg-[size:20px_20px] opacity-40" />

          {/* Wireframe Laptop Connecting via Golden Line to Isometric Execution Matrix Pad */}
          <svg viewBox="0 0 180 120" className="w-44 h-30 relative z-10">
            <g transform="translate(14, 25)">
              <polygon points="26,16 52,29 26,42 0,29" fill="#0e0f14" stroke="#333544" strokeWidth="1" />
              <polygon points="0,29 0,8 26,0 26,21" fill="#141620" stroke="#484b60" strokeWidth="1.2" />
              <line x1="4" y1="12" x2="20" y2="6" stroke="#e8ebb2" strokeWidth="1" />
              <line x1="4" y1="17" x2="15" y2="12" stroke="#5a5e78" strokeWidth="0.8" />
              <line x1="4" y1="21" x2="18" y2="16" stroke="#38bdf8" strokeWidth="0.8" />
            </g>

            <path d="M 58 52 L 95 68" fill="none" stroke="#e8ebb2" strokeWidth="1.5" strokeOpacity="0.9" />
            <circle r="2.2" fill="#e8ebb2">
              <animateMotion path="M 58 52 L 95 68" dur="1.8s" repeatCount="indefinite" />
            </circle>

            <g transform="translate(90, 30)">
              <polygon points="36,0 72,18 36,36 0,18" fill="#12131b" stroke="#3a3c4f" strokeWidth="1.2" />
              <line x1="12" y1="12" x2="48" y2="30" stroke="#2c2e3c" strokeWidth="0.8" />
              <line x1="24" y1="6" x2="60" y2="24" stroke="#2c2e3c" strokeWidth="0.8" />
              <line x1="24" y1="30" x2="60" y2="12" stroke="#2c2e3c" strokeWidth="0.8" />
              <line x1="12" y1="24" x2="48" y2="6" stroke="#2c2e3c" strokeWidth="0.8" />
              <polygon points="36,8 46,13 36,18 26,13" fill="#e8ebb2" fillOpacity="0.75" />
            </g>
          </svg>
        </div>

        <h3 className="mt-4 font-heading text-sm font-semibold text-foreground tracking-tight">
          Isolated sandbox tests
        </h3>
        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
          The agent synthesizes code and immediately executes test suites in isolated micro-sandboxes.
          Test output, linting, and AST validation return in milliseconds.
        </p>
      </div>

      {/* 4. Apps with a database */}
      <div className="flex flex-col group">
        <div className="relative h-48 w-full rounded-xl border border-white/8 bg-[#07070a] p-4 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-white/20 group-hover:bg-[#0a0a0f]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#141418_1px,transparent_1px),linear-gradient(to_bottom,#141418_1px,transparent_1px)] bg-[size:20px_20px] opacity-40" />

          {/* Stacked 3D Isometric Cylinders + Base Extruded Block */}
          <svg viewBox="0 0 160 120" className="w-40 h-30 relative z-10">
            <g transform="translate(35, 35)">
              <polygon points="45,0 90,22 45,44 0,22" fill="#101117" stroke="#2d2f3d" strokeWidth="1" />
              <polygon points="65,12 80,19 65,26 50,19" fill="#e8ebb2" stroke="#e8ebb2" strokeWidth="1" />
              <polygon points="50,19 65,26 65,34 50,27" fill="#c2c68f" stroke="#e8ebb2" strokeWidth="0.8" />
              <polygon points="65,26 80,19 80,27 65,34" fill="#d8dc9f" stroke="#e8ebb2" strokeWidth="0.8" />
            </g>

            <g transform="translate(45, 10)">
              <path
                d="M 12 36 C 12 43 44 43 44 36 L 44 44 C 44 51 12 51 12 44 Z"
                fill="#12141c"
                stroke="#333748"
                strokeWidth="1.2"
              />
              <ellipse cx="28" cy="36" rx="16" ry="7" fill="#1b1d28" stroke="#3d4258" strokeWidth="1" />

              <path
                d="M 12 25 C 12 32 44 32 44 25 L 44 33 C 44 40 12 40 12 33 Z"
                fill="#161822"
                stroke="#3e4359"
                strokeWidth="1.2"
              />
              <ellipse cx="28" cy="25" rx="16" ry="7" fill="#202332" stroke="#4c526d" strokeWidth="1" />

              <path
                d="M 12 14 C 12 21 44 21 44 14 L 44 22 C 44 29 12 29 12 22 Z"
                fill="#1a1d29"
                stroke="#e8ebb2"
                strokeWidth="1.2"
              />
              <ellipse cx="28" cy="14" rx="16" ry="7" fill="#e8ebb2" fillOpacity="0.85" stroke="#e8ebb2" strokeWidth="1.2" />
            </g>
          </svg>
        </div>

        <h3 className="mt-4 font-heading text-sm font-semibold text-foreground tracking-tight">
          Vector memory &amp; datastores
        </h3>
        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
          Semantic vector retrieval paired with transactional PostgreSQL and sub-millisecond Redis
          state. The agent grounds every decision in your real codebase history.
        </p>
      </div>
    </div>
  );
}

export default IsometricFeatureGrid;
