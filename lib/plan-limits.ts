// Free-plan limits and upgrade dialog messaging, shared by server checks and client UI.
// Paid limits come from Clerk plan features and subscription items (see lib/billing.ts).

export const FREE_WORKSPACE_LIMIT = 3;
export const FREE_MONTHLY_PROMPTS = 5;

export const PRO_MONTHLY_PROMPTS = 200;
export const ENTERPRISE_MONTHLY_PROMPTS = 800;

export const PLAN_KEYS = {
  FREE: "free_user",
  PRO: "pro_builder",
  ENTERPRISE: "enterprise",
} as const;

export type PlanKey = (typeof PLAN_KEYS)[keyof typeof PLAN_KEYS];

// Returned by agent API endpoints when the owner's monthly prompts are exhausted.
export const PROMPT_LIMIT_ERROR = "prompt_limit_reached";

export const UPGRADE_REASONS = {
  prompts: {
    title: "You're out of agent prompts",
    description:
      "This workspace's plan has used all of its allocated agent prompts for this billing cycle. Upgrade for more prompts.",
  },
  workspaces: {
    title: `You've reached ${FREE_WORKSPACE_LIMIT} workspaces`,
    description: `The free plan includes up to ${FREE_WORKSPACE_LIMIT} workspaces. Upgrade to Pro Builder for unlimited workspaces.`,
  },
  sharing: {
    title: "Public links are a paid feature",
    description:
      "Upgrade to Pro Builder to generate shareable read-only public links for specs and canvases.",
  },
  pdfExport: {
    title: "PDF export is a paid feature",
    description:
      "Upgrade to Pro Builder to export workspace documents and canvas diagrams as high-resolution PDFs.",
  },
  voiceInput: {
    title: "Voice input is a paid feature",
    description:
      "Upgrade to Pro Builder to dictate prompt instructions and synthesize live architectures via voice.",
  },
} as const;

export type LimitError = keyof typeof UPGRADE_REASONS;
