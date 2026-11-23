import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import {
  FREE_MONTHLY_PROMPTS,
  FREE_WORKSPACE_LIMIT,
  PRO_MONTHLY_PROMPTS,
  ENTERPRISE_MONTHLY_PROMPTS,
  PLAN_KEYS,
  type PlanKey,
} from "@/lib/plan-limits";

export interface PlanEntitlements {
  isPaid: boolean;
  planKey: PlanKey;
  planName: string;
  promptLimit: number;
  maxWorkspaces: number;
  unlimitedWorkspaces: boolean;
  publicSharing: boolean;
  pdfExport: boolean;
  voiceInput: boolean;
}

export const workspaceOwnerSelect = {
  clerkOrgId: true,
  creator: { select: { clerkId: true } },
} as const;

export function workspaceOwnerId(workspace: {
  clerkOrgId: string | null;
  creator: { clerkId: string };
}): string {
  return workspace.clerkOrgId ?? workspace.creator.clerkId;
}

export async function getWorkspaceOwnerId(workspaceId: string): Promise<string> {
  const workspace = await prisma.workspace.findUniqueOrThrow({
    where: { id: workspaceId },
    select: workspaceOwnerSelect,
  });
  return workspaceOwnerId(workspace);
}

export async function getEntitlements(ownerId: string): Promise<PlanEntitlements> {
  const clerk = await clerkClient();
  const isOrg = ownerId.startsWith("org_");

  const features = new Set<string>();
  let activePlanKey: PlanKey = PLAN_KEYS.FREE;
  let activePlanName = "Free";
  let isPaid = false;
  let basePrompts = FREE_MONTHLY_PROMPTS;

  try {
    const subscription = isOrg
      ? await clerk.billing.getOrganizationBillingSubscription(ownerId)
      : await clerk.billing.getUserBillingSubscription(ownerId);

    if (subscription && Array.isArray(subscription.subscriptionItems)) {
      for (const item of subscription.subscriptionItems) {
        // active or past_due keeps access while Clerk retries payment
        if (item.status === "active" || item.status === "past_due") {
          const planSlug = item.plan?.slug?.toLowerCase() || "";
          const planName = item.plan?.name || "";

          if (planSlug) {
            features.add(planSlug);
          }

          if (planSlug === PLAN_KEYS.ENTERPRISE || planSlug.includes("enterprise")) {
            activePlanKey = PLAN_KEYS.ENTERPRISE;
            activePlanName = planName || "Enterprise";
            isPaid = true;
          } else if (
            (planSlug === PLAN_KEYS.PRO || planSlug.includes("pro")) &&
            activePlanKey !== PLAN_KEYS.ENTERPRISE
          ) {
            activePlanKey = PLAN_KEYS.PRO;
            activePlanName = planName || "Pro Builder";
            isPaid = true;
          }

          item.plan?.features?.forEach((f) => {
            if (f.slug) features.add(f.slug.toLowerCase());
            if (f.name) features.add(f.name.toLowerCase());
          });
        }
      }
    }
  } catch {
    // If user has no active Clerk paid subscription, cleanly fall back to free user entitlements
  }

  // Determine prompt limits based on plan or specific features
  if (
    activePlanKey === PLAN_KEYS.ENTERPRISE ||
    features.has("agent_prompts_800") ||
    features.has("800_agent_prompt_per_month") ||
    features.has("800 agent prompt per month")
  ) {
    activePlanKey = PLAN_KEYS.ENTERPRISE;
    activePlanName = "Enterprise";
    isPaid = true;
    basePrompts = ENTERPRISE_MONTHLY_PROMPTS;
  } else if (
    activePlanKey === PLAN_KEYS.PRO ||
    features.has("agent_prompts_200") ||
    features.has("200_agent_prompt_per_month") ||
    features.has("200 agent prompt per month") ||
    isPaid
  ) {
    activePlanKey = PLAN_KEYS.PRO;
    activePlanName = "Pro Builder";
    isPaid = true;
    basePrompts = PRO_MONTHLY_PROMPTS;
  }

  // Calculate total prompt limit (scales with org seat count for B2B orgs)
  let promptLimit = basePrompts;
  if (isOrg && isPaid) {
    try {
      const org = await clerk.organizations.getOrganization({
        organizationId: ownerId,
        includeMembersCount: true,
      });
      const members = org.membersCount ?? 1;
      promptLimit = basePrompts * members;
    } catch {
      // Keep base prompts if org lookup fails
    }
  }

  const hasUnlimitedWorkspaces =
    isPaid ||
    features.has("unlimited_workspaces") ||
    features.has("unlimited_ workspaces") ||
    features.has("unlimited workspaces");

  const hasPublicSharing =
    isPaid ||
    features.has("public_sharing") ||
    features.has("public_share_links") ||
    features.has("public share links");

  const hasPdfExport =
    isPaid ||
    features.has("pdf_export") ||
    features.has("pdf export");

  const hasVoiceInput =
    isPaid ||
    features.has("voice_input") ||
    features.has("voice input");

  return {
    isPaid,
    planKey: activePlanKey,
    planName: activePlanName,
    promptLimit,
    maxWorkspaces: hasUnlimitedWorkspaces ? Infinity : FREE_WORKSPACE_LIMIT,
    unlimitedWorkspaces: hasUnlimitedWorkspaces,
    publicSharing: hasPublicSharing,
    pdfExport: hasPdfExport,
    voiceInput: hasVoiceInput,
  };
}
