export type LayerId =
  | "workspace"
  | "orchestration"
  | "agents"
  | "infrastructure"
  | "output";

export interface ArchitectureNodeData {
  id: string;
  label: string;
  subtitle: string;
  layer: LayerId;
  layerName: string;
  x: number; // SVG coordinate x
  y: number; // SVG coordinate y
  width: number;
  height: number;
  type: "workspace" | "orchestrator" | "agent" | "database" | "memory" | "tool" | "output";
  status: "active" | "idle" | "streaming" | "syncing";
  color: string; // Accent color hex
  metrics: string;
  description: string;
}

export interface ConnectionPath {
  id: string;
  from: string;
  to: string;
  path: string; // SVG d attribute
  color: string;
  speed: number; // duration in seconds
  delay: number; // begin offset in seconds
  bidirectional?: boolean;
  reversePath?: string;
  label?: string;
}
