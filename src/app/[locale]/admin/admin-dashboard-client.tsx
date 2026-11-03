"use client";

import { useState, useTransition } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { logoutAction } from "@/app/[locale]/actions/auth";
import {
  toggleAvailabilityAction,
  deleteProjectAction,
  deleteExperienceAction,
} from "@/app/[locale]/actions/admin";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { LogOut, ExternalLink, Loader2 } from "lucide-react";
import { AdminStatsOverview } from "@/components/admin/admin-stats-overview";
import { AdminProjectsList } from "@/components/admin/admin-projects-list";
import { AdminExperienceList } from "@/components/admin/admin-experience-list";
import { AdminDeleteModal } from "@/components/admin/admin-delete-modal";
import type {
  ProfileRow,
  DeleteTarget,
  AdminDashboardClientProps,
} from "@/lib/types";

export default function AdminDashboardClient({
  initialProfile,
  initialProjects,
  initialExperience,
}: AdminDashboardClientProps) {
  const t = useTranslations("Admin");
  const locale = useLocale();
  const isAr = locale === "ar";
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [profile, setProfile] = useState<ProfileRow | null>(initialProfile);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  const featuredCount = initialProjects.filter((p) => p.featured).length;

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await logoutAction();
    router.push("/auth/login");
    router.refresh();
  };

  const handleToggleAvailability = () => {
    if (!profile) return;
    const nextState = !profile.available_for_work;
    setProfile({ ...profile, available_for_work: nextState });

    startTransition(async () => {
      const result = await toggleAvailabilityAction(nextState);
      if (!result.success) {
        setProfile({ ...profile, available_for_work: !nextState });
        const errorKey = (result as { errorKey?: string }).errorKey;
        const errorMsg =
          errorKey ? t(errorKey) : result.error || t("saveError");
        toast.destructive({ title: errorMsg });
      } else {
        toast.success({ title: t("saveSuccess") });
        router.refresh();
      }
    });
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    startTransition(async () => {
      const isProject = deleteTarget.type === "project";
      const result = isProject
        ? await deleteProjectAction(deleteTarget.id)
        : await deleteExperienceAction(deleteTarget.id);

      if (!result.success) {
        const errorKey = (result as { errorKey?: string }).errorKey;
        const errorMsg =
          errorKey ? t(errorKey) : result.error || t("deleteError");
        toast.destructive({ title: errorMsg });
      } else {
        toast.success({ title: t("deleteSuccess") });
        router.refresh();
      }
      setDeleteTarget(null);
    });
  };

  return (
    <main className="min-h-screen px-6 sm:px-10 lg:ps-20 lg:pe-20 pt-24 pb-24 bg-background text-foreground">
      <div className="w-full max-w-6xl mx-auto space-y-12">
        {/* Top Header Bar */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div className="space-y-1 text-start">
            <h1
              className={cn(
                "text-3xl sm:text-4xl text-foreground uppercase tracking-tight",
                isAr ? "font-cairo font-bold" : "font-bebas tracking-normal",
              )}
            >
              {t("dashboardTitle")}
            </h1>
            <p
              className={cn(
                "text-xs sm:text-sm text-muted-foreground",
                isAr ? "font-cairo" : "font-manrope",
              )}
            >
              {t("dashboardSubtitle")}
            </p>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground hover:bg-foreground hover:text-card transition-all duration-200 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground",
                isAr ? "font-cairo" : "font-manrope",
              )}
            >
              <span>{t("viewSite")}</span>
              <ExternalLink className="size-3.5" />
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full bg-[#111111] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#111111] px-4 py-2 text-xs font-semibold transition-transform duration-200 hover:scale-105 active:scale-95 disabled:opacity-60 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground",
                isAr ? "font-cairo" : "font-manrope",
              )}
            >
              {isSigningOut ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>{t("signingOut")}</span>
                </>
              ) : (
                <>
                  <LogOut className="size-3.5" />
                  <span>{t("signOut")}</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* Metric Cards Grid */}
        <AdminStatsOverview
          initialProjectsCount={initialProjects.length}
          featuredCount={featuredCount}
          initialExperienceCount={initialExperience.length}
          profile={profile}
          isPending={isPending}
          onToggleAvailability={handleToggleAvailability}
          isAr={isAr}
        />

        {/* Projects Management Section */}
        <AdminProjectsList
          projects={initialProjects}
          isAr={isAr}
          isPending={isPending}
          onSelectDelete={setDeleteTarget}
        />

        {/* Experience Management Section */}
        <AdminExperienceList
          experiences={initialExperience}
          isAr={isAr}
          isPending={isPending}
          onSelectDelete={setDeleteTarget}
        />
      </div>

      {/* Editorial Delete Confirmation Modal */}
      {deleteTarget && (
        <AdminDeleteModal
          target={deleteTarget}
          isPending={isPending}
          isAr={isAr}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </main>
  );
}
