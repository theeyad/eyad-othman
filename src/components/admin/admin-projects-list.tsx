"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Plus, Pencil, Trash2, Layers, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AdminProjectsListProps } from "@/lib/types";

export function AdminProjectsList({
  projects,
  isAr,
  isPending,
  onSelectDelete,
}: AdminProjectsListProps) {
  const t = useTranslations("Admin");

  return (
    <section aria-label="Projects Management" className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5 text-start">
          <h2
            className={cn(
              "text-2xl text-foreground uppercase tracking-tight",
              isAr ? "font-cairo font-bold" : "font-bebas tracking-normal",
            )}
          >
            {t("projectsTitle")}
          </h2>
        </div>

        <Link
          href="/admin/projects/new"
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full bg-[#111111] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#111111] px-5 py-2.5 text-xs font-semibold transition-transform duration-200 hover:scale-105 active:scale-95 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground",
            isAr ? "font-cairo" : "font-manrope",
          )}
        >
          <Plus className="size-4" />
          <span>{t("newProject")}</span>
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
          {t("noProjects")}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card divide-y divide-border overflow-hidden">
          {projects.map((project) => {
            const title = isAr ? project.title_ar : project.title;
            const category = isAr ? project.category_ar : project.category;
            const primaryImage =
              project.project_images?.find((img) => img.is_primary)?.url ||
              project.project_images?.[0]?.url;

            return (
              <div
                key={project.id}
                className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-muted/10 transition-colors cursor-default"
              >
                <div className="flex items-center gap-4">
                  {primaryImage ? (
                    <div className="relative size-14 rounded-xl overflow-hidden border border-border shrink-0 bg-muted">
                      <Image
                        src={primaryImage}
                        alt={title}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="size-14 rounded-xl border border-border shrink-0 bg-muted flex items-center justify-center text-muted-foreground">
                      <Layers className="size-6" />
                    </div>
                  )}

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
                        {title}
                      </h3>
                      {project.featured && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[10px] font-semibold text-foreground">
                          <Sparkles className="size-2.5 text-success" />
                          <span>{t("featured")}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{category}</span>
                      <span>•</span>
                      <span>/{project.slug}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    aria-label={`${t("edit")} ${title}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-foreground hover:border-foreground/40 transition-colors cursor-default"
                  >
                    <Pencil className="size-3.5" />
                    <span>{t("edit")}</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      onSelectDelete({
                        type: "project",
                        id: project.id,
                        title,
                      })
                    }
                    disabled={isPending}
                    aria-label={`${t("delete")} ${title}`}
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

