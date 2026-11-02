"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AdminExperienceListProps } from "@/lib/types";

export function AdminExperienceList({
  experiences,
  isAr,
  isPending,
  onSelectDelete,
}: AdminExperienceListProps) {
  const t = useTranslations("Admin");

  return (
    <section aria-label="Experience Timeline Management" className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5 text-start">
          <h2
            className={cn(
              "text-2xl text-foreground uppercase tracking-tight",
              isAr ? "font-cairo font-bold" : "font-bebas tracking-normal",
            )}
          >
            {t("experienceTitle")}
          </h2>
        </div>

        <Link
          href="/admin/experience/new"
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full bg-[#111111] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#111111] px-5 py-2.5 text-xs font-semibold transition-transform duration-200 hover:scale-105 active:scale-95 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground",
            isAr ? "font-cairo" : "font-manrope",
          )}
        >
          <Plus className="size-4" />
          <span>{t("newExperience")}</span>
        </Link>
      </div>

      {experiences.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
          {t("noExperience")}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card divide-y divide-border overflow-hidden">
          {experiences.map((exp) => {
            const role = isAr ? exp.role_ar : exp.role;
            const type = isAr ? exp.type_ar : exp.type;

            return (
              <div
                key={exp.id}
                className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-muted/10 transition-colors cursor-default"
              >
                <div className="space-y-1 text-start">
                  <div className="flex items-center gap-2">
                    <h3
                      className={cn(
                        "text-lg text-foreground uppercase tracking-tight",
                        isAr
                          ? "font-cairo font-bold"
                          : "font-bebas tracking-normal",
                      )}
                    >
                      {role}
                    </h3>
                    {exp.is_current && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[10px] font-semibold text-foreground">
                        <span className="size-1.5 rounded-full bg-success" />
                        <span>{t("currentRole")}</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {exp.company}
                    </span>
                    <span>•</span>
                    <span>{type}</span>
                    <span>•</span>
                    <span>
                      {exp.start_date} —{" "}
                      {exp.is_current ? t("currentRole") : exp.end_date || ""}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Link
                    href={`/admin/experience/${exp.id}/edit`}
                    aria-label={`${t("edit")} ${role}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-foreground hover:border-foreground/40 transition-colors cursor-default"
                  >
                    <Pencil className="size-3.5" />
                    <span>{t("edit")}</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      onSelectDelete({
                        type: "experience",
                        id: exp.id,
                        title: role,
                      })
                    }
                    disabled={isPending}
                    aria-label={`${t("delete")} ${role}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-destructive/30 bg-destructive/10 px-3.5 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/20 transition-colors cursor-default disabled:opacity-50"
                  >
                    <Trash2 className="size-3.5" />
                    <span>{t("delete")}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

