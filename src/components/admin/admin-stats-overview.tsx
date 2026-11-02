"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Layers, Briefcase } from "lucide-react";
import { ImageUploader } from "@/components/image-uploader";
import { uploadStorageImage } from "@/lib/upload";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { AdminStatsOverviewProps } from "@/lib/types";

export function AdminStatsOverview({
  initialProjectsCount,
  featuredCount,
  initialExperienceCount,
  profile,
  isPending,
  onToggleAvailability,
  onUpdateAvatar,
  isAr,
}: AdminStatsOverviewProps) {
  const t = useTranslations("Admin");
  const [showAvatarEdit, setShowAvatarEdit] = useState(false);

  return (
    <>
      {/* Metric Cards Grid */}
      <section
        aria-label="Overview Metrics"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {/* Total Projects Card */}
        <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between cursor-default">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("totalProjects")}
            </span>
            <Layers className="size-4 text-muted-foreground" />
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

        {/* Experience Card */}
        <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between cursor-default">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("totalExperience")}
            </span>
            <Briefcase className="size-4 text-muted-foreground" />
          </div>
          <div className="mt-4">
            <span className="font-bebas text-4xl text-foreground">
              {initialExperienceCount}
            </span>
          </div>
        </div>

        {/* Availability Status Card with Toggle */}
        <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between cursor-default">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("availabilityStatus")}
            </span>
            <span
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

        {/* Profile Avatar Card */}
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
                {t("profileAvatarLabel")}
              </p>
              <p className="text-[11px] text-muted-foreground truncate max-w-40">
                {profile?.avatar_url || "/me.webp"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowAvatarEdit(!showAvatarEdit)}
            className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium transition-colors hover:border-foreground/40 cursor-default"
          >
            {t("edit")}
          </button>
        </div>
      </section>

      {/* Quick Avatar Uploader Drawer */}
      {showAvatarEdit && (
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("uploadProfileImage")}
            </h3>
            <button
              type="button"
              onClick={() => setShowAvatarEdit(false)}
              className="text-xs text-muted-foreground hover:text-foreground cursor-default"
            >
              ✕
            </button>
          </div>
          <ImageUploader
            value={profile?.avatar_url}
            onSave={async (file) => {
              const uploadResult = await uploadStorageImage(
                file,
                "profile_media",
              );
              if (uploadResult.error || !uploadResult.publicUrl) {
                toast.destructive({ title: t("uploadError") });
                return;
              }
              await onUpdateAvatar(uploadResult.publicUrl);
              setShowAvatarEdit(false);
            }}
            onCancel={() => setShowAvatarEdit(false)}
            onError={(err) =>
              toast.destructive({ title: err || t("uploadError") })
            }
          />
        </div>
      )}
    </>
  );
}

