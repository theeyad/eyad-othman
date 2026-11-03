"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Layers, Briefcase, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AdminStatsOverviewProps } from "@/lib/types";

export function AdminStatsOverview({
  initialProjectsCount,
  featuredCount,
  initialExperienceCount,
  profile,
  isPending,
  onToggleAvailability,
  isAr,
}: AdminStatsOverviewProps) {
  const t = useTranslations("Admin");

  return (
    <section
      aria-label="Overview Metrics"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
    >
      {/* 1. Total Projects Card */}
      <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between cursor-default">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t("totalProjects")}
          </span>
          <Layers aria-hidden="true" className="size-4 text-muted-foreground" />
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="font-bebas text-4xl text-foreground">
            {initialProjectsCount}
          </span>
          <span className="text-xs text-muted-foreground">
            ({featuredCount} {t("featuredProjects")})
          </span>
        </div>
      </div>

      {/* 2. Experience Card */}
      <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between cursor-default">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t("totalExperience")}
          </span>
          <Briefcase aria-hidden="true" className="size-4 text-muted-foreground" />
        </div>
        <div className="mt-4">
          <span className="font-bebas text-4xl text-foreground">
            {initialExperienceCount}
          </span>
        </div>
      </div>

      {/* 3. Availability Status Card with Toggle */}
      <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between cursor-default">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t("availabilityStatus")}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "size-2.5 rounded-full transition-colors",
              profile?.available_for_work
                ? "bg-success"
                : "bg-muted-foreground/40",
            )}
          />
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span
            className={cn(
              "text-sm font-semibold",
              profile?.available_for_work
                ? "text-foreground"
                : "text-muted-foreground",
            )}
          >
            {profile?.available_for_work
              ? t("availableForWork")
              : t("notAvailable")}
          </span>
          <button
            type="button"
            onClick={onToggleAvailability}
            disabled={isPending}
            className={cn(
              "rounded-full border border-border bg-background px-3 py-1 text-xs font-medium transition-colors hover:border-foreground/40 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground",
              isAr ? "font-cairo" : "font-manrope",
            )}
          >
            {isPending ? t("updatingStatus") : t("edit")}
          </button>
        </div>
      </div>

      {/* 4. Profile Avatar & Resume Card */}
      <div className="rounded-2xl border border-border bg-card p-6 flex items-center justify-between cursor-default">
        <div className="flex items-center gap-3.5">
          <div className="relative size-12 rounded-full overflow-hidden border border-border shrink-0 bg-muted">
            {profile?.avatar_url && (
              <Image
                src={profile.avatar_url}
                alt="Eyad Othman"
                fill
                sizes="48px"
                className="object-cover"
              />
            )}
          </div>
          <div className="space-y-0.5 text-start">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
              {t("profileCardTitle")}
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <FileText aria-hidden="true" className="size-3 text-muted-foreground" />
              <span>{t("resumeLabel")}</span>
            </div>
          </div>
        </div>
        <Link
          href="/admin/profile/edit"
          className={cn(
            "rounded-full border border-border bg-background px-3 py-1 text-xs font-medium transition-colors hover:border-foreground/40 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground",
            isAr ? "font-cairo" : "font-manrope",
          )}
        >
          {t("edit")}
        </Link>
      </div>
    </section>
  );
}
