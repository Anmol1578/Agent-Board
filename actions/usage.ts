"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { getEntitlements } from "@/lib/billing";
import { FREE_MONTHLY_PROMPTS } from "@/lib/plan-limits";
import { checkUser } from "@/actions/check-user";

export interface PromptUsage {
  used: number;
  limit: number;
  isPaid: boolean;
  planKey: string;
  planName: string;
}

// Retrieves the current month's agent prompt consumption and plan limit for the active account/org.
export async function getActivePromptUsage(): Promise<PromptUsage | null> {
  const { userId, orgId } = await auth();
  if (!userId) return null;

  const ownerId = orgId ?? userId;
  const entitlements = await getEntitlements(ownerId);

  // Compute start of current billing month (UTC)
  const now = new Date();
  const startOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));

  let used = 0;
  try {
    used = await prisma.agentPrompt.count({
      where: {
        ownerId,
        createdAt: { gte: startOfMonth },
      },
    });
  } catch (err) {
    console.warn("Could not query prompt usage count:", err);
  }

  return {
    used,
    limit: entitlements.promptLimit || FREE_MONTHLY_PROMPTS,
    isPaid: entitlements.isPaid,
    planKey: entitlements.planKey,
    planName: entitlements.planName,
  };
}

// Records an agent prompt execution and increments the monthly usage pool.
export async function recordPromptUsage(workspaceId?: string) {
  const { userId, orgId } = await auth();
  if (!userId) return null;

  const user = await checkUser();
  if (!user) return null;

  const ownerId = orgId ?? userId;

  try {
    return await prisma.agentPrompt.create({
      data: {
        ownerId,
        userId: user.id,
        workspaceId: workspaceId ?? null,
      },
    });
  } catch (err) {
    console.warn("Could not record agent prompt usage:", err);
    return null;
  }
}
