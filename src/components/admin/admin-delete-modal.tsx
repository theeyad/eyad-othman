"use client";

import { useTranslations } from "next-intl";
import { Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AdminDeleteModalProps } from "@/lib/types";

export function AdminDeleteModal({
  target,
  isPending,
  isAr,
  onCancel,
  onConfirm,
}: AdminDeleteModalProps) {
  const t = useTranslations("Admin");

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className={cn(
          "w-full max-w-md rounded-2xl border border-border bg-card p-6 space-y-6 animate-in zoom-in-95 duration-200 cursor-default",
          isAr ? "font-cairo text-start" : "font-manrope text-start",
        )}
      >
        <div className="flex items-start gap-4">
          <div className="size-10 rounded-full border border-destructive/30 bg-destructive/10 flex items-center justify-center shrink-0">
            <Trash2 className="size-5 text-destructive" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">
              {t("deleteModalTitle")}: {target.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {target.type === "project"
                ? t("deleteProjectWarning")
                : t("deleteExperienceWarning")}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-default"
          >
            {t("cancel")}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="inline-flex items-center gap-1.5 rounded-full bg-destructive text-destructive-foreground px-5 py-2 text-xs font-semibold hover:bg-destructive/90 transition-transform active:scale-95 disabled:opacity-60 cursor-default"
          >
            {isPending ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                <span>{t("deleting")}</span>
              </>
            ) : (
              <>
                <Trash2 className="size-3.5" />
                <span>{t("delete")}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

