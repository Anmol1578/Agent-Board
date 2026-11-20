import React from "react";
import Image from "next/image";

export function TextureBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0"
    >
      {/* 1. Ambient Brand Spotlights (Tesser.sh Purple / Violet Theme) */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[750px] w-[1100px] rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.68_0.22_285/0.25),transparent_70%)] blur-3xl" />
      <div className="absolute top-[380px] left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-[radial-gradient(circle_at_center,oklch(0.62_0.24_275/0.14),transparent_65%)] blur-2xl" />

      {/* Layer Container with soft radial vignette mask to feather edges */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          maskImage:
            "radial-gradient(ellipse 95% 80% at 50% 32%, black 25%, transparent 92%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 95% 80% at 50% 32%, black 25%, transparent 92%)",
        }}
      >
        {/* TEXTURE 1: Cyber Telemetry Grid (Drifting coordinate matrix) */}
        <div className="absolute inset-0 w-full h-full animate-grid-drift opacity-30 mix-blend-screen">
          <Image
            src="/textures/cyber-grid.svg"
            alt=""
            fill
            priority
            className="object-cover object-top"
          />
        </div>

        {/* TEXTURE 2: Dot Matrix Canvas (Subtle breathing precision dots) */}
        <div className="absolute inset-0 w-full h-full animate-dot-pulse opacity-25 mix-blend-screen">
          <Image
            src="/textures/dot-matrix.svg"
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* TEXTURE 3: Topographic Contours (Undulating elevation wave) */}
        <div className="absolute inset-0 w-full h-full animate-topo-drift opacity-35 mix-blend-screen">
          <Image
            src="/textures/topo.svg"
            alt=""
            fill
            priority
            className="object-cover object-top"
          />
        </div>

        {/* TEXTURE 4: Orbital Rings & Vector Nodes (Continuous slow celestial rotation) */}
        <div className="absolute left-1/2 top-[320px] -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[900px] max-w-none opacity-45 mix-blend-screen animate-spin-slow">
          <Image
            src="/textures/orbital-rings.svg"
            alt=""
            fill
            priority
            className="object-contain"
          />
        </div>

        {/* TEXTURE 5: Circuit Nodes (Pulsing neural paths with glowing amber nodes) */}
        <div className="absolute inset-x-0 top-0 h-[850px] w-full animate-circuit-glow opacity-55 mix-blend-screen">
          <Image
            src="/textures/circuit-nodes.svg"
            alt=""
            fill
            priority
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* Bottom seamless fade into page content */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </div>
  );
}

export default TextureBackground;
