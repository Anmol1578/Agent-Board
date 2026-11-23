"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import {
  SubscriptionDetailsButton,
  useSubscription,
} from "@clerk/nextjs/experimental";
import { getActivePromptUsage } from "@/actions/usage";
import { useUpgradeDialog } from "@/components/UpgradeDialog";

type Usage = Awaited<ReturnType<typeof getActivePromptUsage>>;

const USAGE_CHANGED_EVENTS = [
  "agent-board:prompt-usage-changed",
  "outpost:prompt-usage-changed",
];

// Called after an agent response or action, so the header count stays current without a full page reload.
export function refreshPromptUsage() {
  if (typeof window !== "undefined") {
    USAGE_CHANGED_EVENTS.forEach((evt) => window.dispatchEvent(new Event(evt)));
  }
}

// Header pill for the current context (personal account or active org):
// Displays the active plan name and this month's agent prompt consumption.
// Free plans get an Upgrade button; paid plans open Clerk's subscription details modal for members permitted to manage billing.
// `upgradeOnlyWhenOut` hides the Upgrade button until prompts run out (for compact headers like workspace canvas).
export function PlanButton({
  upgradeOnlyWhenOut = false,
}: {
  upgradeOnlyWhenOut?: boolean;
}) {
  const { orgId, has } = useAuth();
  const payerType = orgId ? "organization" : "user";
  const { data: subscription } = useSubscription({ for: payerType });
  const [usage, setUsage] = useState<Usage>(null);
  const openUpgrade = useUpgradeDialog();

  // Refetch when switching between the personal account and an org, and after agent prompt events.
  useEffect(() => {
    let cancelled = false;
    const load = () => {
      getActivePromptUsage()
        .then((next) => {
          if (!cancelled) setUsage(next);
        })
        .catch((err) => {
          console.warn("Failed to load prompt usage:", err);
        });
    };

    load();

    USAGE_CHANGED_EVENTS.forEach((evt) =>
      window.addEventListener(evt, load),
    );

    return () => {
      cancelled = true;
      USAGE_CHANGED_EVENTS.forEach((evt) =>
        window.removeEventListener(evt, load),
      );
    };
  }, [orgId]);

  if (!usage) return null;

  const { used, limit, isPaid } = usage;
  const isOut = used >= limit;
  const planName =
    subscription?.subscriptionItems?.find(
      (item) => item.status === "active" && !item.plan.isDefault,
    )?.plan.name ??
    usage.planName ??
    "Free";

  const upgrade = () =>
    openUpgrade({
      title: isOut ? "You're out of agent prompts" : "Get more agent prompts",
      description: `You've used ${used} of ${limit} prompts this month. Upgrade to Pro Builder for unlimited workspaces and more prompts.`,
    });

  const percentage = Math.min(100, Math.round((used / (limit || 1)) * 100));

  const usageButton = (
    <button
      type="button"
      title={`${used.toLocaleString()} of ${limit.toLocaleString()} agent prompts used this month (${percentage}%)`}
      onClick={isPaid ? undefined : upgrade}
      className="flex h-full items-center gap-2.5 px-3 transition-colors hover:bg-white/5 cursor-pointer"
    >
      <span className="font-heading font-semibold text-foreground tracking-tight">
        {planName}
      </span>
      <span className="h-1.5 w-12 overflow-hidden rounded-full bg-white/10">
        <span
          className={`block h-full rounded-full transition-all duration-300 ${
            isOut ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" : "bg-primary shadow-[0_0_8px_oklch(0.68_0.22_285/0.5)]"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </span>
      <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
        {used.toLocaleString()}/{limit.toLocaleString()}
      </span>
    </button>
  );

  const canManage =
    isPaid && (!orgId || has?.({ permission: "org:sys_billing:manage" }));

  return (
    <div className="flex h-8 items-center overflow-hidden rounded-full border border-white/10 bg-white/[0.04] text-xs backdrop-blur-md transition-all hover:border-white/20">
      {canManage ? (
        <SubscriptionDetailsButton for={payerType}>
          {usageButton}
        </SubscriptionDetailsButton>
      ) : (
        usageButton
      )}
      {!isPaid && (!upgradeOnlyWhenOut || isOut) && (
        <button
          type="button"
          onClick={upgrade}
          className="h-full border-l border-white/10 px-3 font-mono text-[11px] font-semibold text-primary transition-colors hover:bg-primary/10 cursor-pointer"
        >
          Upgrade
        </button>
      )}
    </div>
  );
}

export default PlanButton;
