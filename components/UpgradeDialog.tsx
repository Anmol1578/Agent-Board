"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PricingPlans } from "@/components/PricingPlans";
import { UPGRADE_REASONS, type LimitError } from "@/lib/plan-limits";

export type UpgradeReasonInput =
  | LimitError
  | { title: string; description?: string };

interface UpgradeReason {
  title: string;
  description?: string;
}

const DEFAULT_REASON: UpgradeReason = {
  title: "Upgrade your plan",
  description:
    "Get more agent prompts, unlimited workspaces, public share links, voice input, and PDF export.",
};

const UpgradeDialogContext = createContext<(reason?: UpgradeReasonInput) => void>(
  () => {},
);

// Lets any part of the app open the pricing dialog with its own reason, e.g.
// openUpgrade("prompts") or openUpgrade("pdfExport") or openUpgrade({ title: "Custom Title" })
export function UpgradeDialogProvider({ children }: { children: ReactNode }) {
  const [reason, setReason] = useState<UpgradeReason | null>(null);
  const close = () => setReason(null);

  const openUpgrade = (input?: UpgradeReasonInput) => {
    if (!input) {
      setReason(DEFAULT_REASON);
      return;
    }
    if (typeof input === "string" && input in UPGRADE_REASONS) {
      setReason(UPGRADE_REASONS[input as LimitError]);
      return;
    }
    if (typeof input === "object" && input.title) {
      setReason(input);
      return;
    }
    setReason(DEFAULT_REASON);
  };

  return (
    <UpgradeDialogContext.Provider value={openUpgrade}>
      {children}
      <Dialog open={reason !== null} onOpenChange={(open) => !open && close()}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-4xl bg-[#0d0c0f] border-white/10 text-foreground p-6 sm:p-8">
          <DialogHeader className="items-center text-center mb-4">
            <DialogTitle className="font-heading text-2xl font-bold text-foreground">
              {reason?.title || DEFAULT_REASON.title}
            </DialogTitle>
            {(reason?.description || DEFAULT_REASON.description) && (
              <DialogDescription className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
                {reason?.description || DEFAULT_REASON.description}
              </DialogDescription>
            )}
          </DialogHeader>
          {/* Close first: this dialog blocks clicks outside itself, including Clerk's checkout drawer. */}
          <PricingPlans onCheckoutStart={close} />
        </DialogContent>
      </Dialog>
    </UpgradeDialogContext.Provider>
  );
}

export function useUpgradeDialog() {
  return useContext(UpgradeDialogContext);
}
