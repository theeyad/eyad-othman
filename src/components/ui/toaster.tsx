"use client";

import { useToast } from "@/hooks/use-toast";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

export function Toaster() {
  const { toasts, dismiss } = useToast();
  const locale = useLocale();
  const isAr = locale === "ar";

  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      aria-live="assertive"
      className={cn(
        "fixed bottom-6 end-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0",
        isAr ? "font-cairo" : "font-manrope"
      )}
    >
      {toasts.map((t) => {
        const isSuccess = t.type === "success" || t.variant === "success";
        const isDestructive = t.type === "destructive" || t.variant === "destructive";
        const isWarning = t.type === "warning" || t.variant === "warning";
        const isInfo = t.type === "info" || t.variant === "info";

        return (
          <div
            key={t.id}
            role="status"
            className={cn(
              "pointer-events-auto flex items-start gap-3 rounded-2xl border p-4 bg-card text-foreground transition-all duration-300 animate-in fade-in slide-in-from-bottom-5",
              isDestructive
                ? "border-destructive/40 text-destructive"
                : isSuccess
                ? "border-success/40 text-foreground"
                : "border-border text-foreground"
            )}
          >
            <div className="shrink-0 pt-0.5">
              {isSuccess && <CheckCircle2 className="size-4 text-success" />}
              {isDestructive && <AlertCircle className="size-4 text-destructive" />}
              {isWarning && <AlertTriangle className="size-4 text-amber-500" />}
              {isInfo && <Info className="size-4 text-blue-500" />}
              {!isSuccess && !isDestructive && !isWarning && !isInfo && (
                <Info className="size-4 text-muted-foreground" />
              )}
            </div>

            <div className="flex-1 space-y-1 text-start">
              {t.title && (
                <div className="text-xs font-semibold leading-tight text-foreground">
                  {t.title}
                </div>
              )}
              {t.description && (
                <div className="text-xs text-muted-foreground leading-relaxed">
                  {t.description}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => dismiss(t.id)}
              className="shrink-0 p-1 text-muted-foreground hover:text-foreground transition-colors cursor-default focus-visible:outline-none"
              aria-label="Close notification"
            >
              <X className="size-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

