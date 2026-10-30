"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import {
  logoutAction,
} from "@/app/[locale]/actions/auth";
import {
  toggleAvailabilityAction,
  deleteProjectAction,
  deleteExperienceAction,
  updateProfileAvatarAction,
} from "@/app/[locale]/actions/admin";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  LogOut,
  ExternalLink,
  Plus,
  Pencil,
  Trash2,
  Briefcase,
  Layers,
  Sparkles,
  Loader2,
} from "lucide-react";
import { ImageUploader } from "@/components/image-uploader";
import { uploadStorageImage } from "@/lib/upload";

interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  title_ar: string;
  category: string;
  category_ar: string;
  description: string;
  description_ar: string;
  featured: boolean;
  display_order: number;
  live_url: string | null;
  github_url: string | null;
  project_images?: { url: string; is_primary: boolean }[];
}

interface ExperienceItem {
  id: string;
  role: string;
  role_ar: string;
  company: string;
  company_url: string | null;
  type: string;
  type_ar: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  display_order: number;
}

interface ProfileItem {
  id: number;
  avatar_url: string;
  resume_url: string;
  available_for_work: boolean;
}

interface AdminDashboardClientProps {
  initialProfile: ProfileItem | null;
  initialProjects: ProjectItem[];
  initialExperience: ExperienceItem[];
}

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
  const [profile, setProfile] = useState<ProfileItem | null>(initialProfile);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [showAvatarEdit, setShowAvatarEdit] = useState(false);

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
        const errorMsg = errorKey ? t(errorKey) : result.error || t("saveError");
        toast.destructive({ title: errorMsg });
      } else {
        toast.success({ title: t("saveSuccess") });
        router.refresh();
      }
    });
  };

  const handleUpdateAvatar = async (newUrl: string) => {
    if (!newUrl || !profile) return;
    setProfile({ ...profile, avatar_url: newUrl });
    setShowAvatarEdit(false);

    startTransition(async () => {
      const result = await updateProfileAvatarAction(newUrl);
      if (!result.success) {
        const errorKey = (result as { errorKey?: string }).errorKey;
        const errorMsg = errorKey ? t(errorKey) : result.error || t("saveError");
        toast.destructive({ title: errorMsg });
      } else {
        toast.success({ title: t("saveSuccess") });
        router.refresh();
      }
    });
  };

  const handleDeleteProject = (id: string) => {
    if (!window.confirm(t("deleteConfirm"))) return;

    startTransition(async () => {
      const result = await deleteProjectAction(id);
      if (!result.success) {
        const errorKey = (result as { errorKey?: string }).errorKey;
        const errorMsg = errorKey ? t(errorKey) : result.error || t("deleteError");
        toast.destructive({ title: errorMsg });
      } else {
        toast.success({ title: t("deleteSuccess") });
        router.refresh();
      }
    });
  };

  const handleDeleteExperience = (id: string) => {
    if (!window.confirm(t("deleteConfirm"))) return;

    startTransition(async () => {
      const result = await deleteExperienceAction(id);
      if (!result.success) {
        const errorKey = (result as { errorKey?: string }).errorKey;
        const errorMsg = errorKey ? t(errorKey) : result.error || t("deleteError");
        toast.destructive({ title: errorMsg });
      } else {
        toast.success({ title: t("deleteSuccess") });
        router.refresh();
      }
    });
  };

  return (
    <main className="min-h-screen px-6 sm:px-10 lg:ps-20 lg:pe-20 pt-24 pb-24 bg-background text-foreground">
      <div className="w-full lg:ms-10 max-w-6xl mx-auto space-y-12">
        {/* Top Header Bar */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div className="space-y-1 text-start">
            <h1
              className={cn(
                "text-3xl sm:text-4xl text-foreground uppercase tracking-tight",
                isAr ? "font-cairo font-bold" : "font-bebas tracking-normal"
              )}
            >
              {t("dashboardTitle")}
            </h1>
            <p
              className={cn(
                "text-xs sm:text-sm text-muted-foreground",
                isAr ? "font-cairo" : "font-manrope"
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
                isAr ? "font-cairo" : "font-manrope"
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
                isAr ? "font-cairo" : "font-manrope"
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
        <section aria-label="Overview Metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
                {initialProjects.length}
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
                {initialExperience.length}
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
                  profile?.available_for_work ? "bg-success" : "bg-muted-foreground/40"
                )}
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span
                className={cn(
                  "text-sm font-semibold",
                  profile?.available_for_work ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {profile?.available_for_work ? t("availableForWork") : t("notAvailable")}
              </span>
              <button
                type="button"
                onClick={handleToggleAvailability}
                disabled={isPending}
                className={cn(
                  "rounded-full border border-border bg-background px-3 py-1 text-xs font-medium transition-colors hover:border-foreground/40 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground",
                  isAr ? "font-cairo" : "font-manrope"
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
                const uploadResult = await uploadStorageImage(file, "profile_media");
                if (uploadResult.error || !uploadResult.publicUrl) {
                  toast.destructive({ title: t("uploadError") });
                  return;
                }
                await handleUpdateAvatar(uploadResult.publicUrl);
              }}
              onCancel={() => setShowAvatarEdit(false)}
              onError={(err) => toast.destructive({ title: err || t("uploadError") })}
            />
          </div>
        )}

        {/* Projects Management Section */}
        <section aria-label="Projects Management" className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5 text-start">
              <h2
                className={cn(
                  "text-2xl text-foreground uppercase tracking-tight",
                  isAr ? "font-cairo font-bold" : "font-bebas tracking-normal"
                )}
              >
                {t("projectsTitle")}
              </h2>
            </div>

            <Link
              href="/admin/projects/new"
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full bg-[#111111] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#111111] px-5 py-2.5 text-xs font-semibold transition-transform duration-200 hover:scale-105 active:scale-95 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground",
                isAr ? "font-cairo" : "font-manrope"
              )}
            >
              <Plus className="size-4" />
              <span>{t("newProject")}</span>
            </Link>
          </div>

          {initialProjects.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
              {t("noProjects")}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card divide-y divide-border overflow-hidden">
              {initialProjects.map((project) => {
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
                              isAr ? "font-cairo font-bold" : "font-bebas tracking-normal"
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
                        onClick={() => handleDeleteProject(project.id)}
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

        {/* Experience Management Section */}
        <section aria-label="Experience Timeline Management" className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5 text-start">
              <h2
                className={cn(
                  "text-2xl text-foreground uppercase tracking-tight",
                  isAr ? "font-cairo font-bold" : "font-bebas tracking-normal"
                )}
              >
                {t("experienceTitle")}
              </h2>
            </div>

            <Link
              href="/admin/experience/new"
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full bg-[#111111] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#111111] px-5 py-2.5 text-xs font-semibold transition-transform duration-200 hover:scale-105 active:scale-95 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground",
                isAr ? "font-cairo" : "font-manrope"
              )}
            >
              <Plus className="size-4" />
              <span>{t("newExperience")}</span>
            </Link>
          </div>

          {initialExperience.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
              {t("noExperience")}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card divide-y divide-border overflow-hidden">
              {initialExperience.map((exp) => {
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
                            isAr ? "font-cairo font-bold" : "font-bebas tracking-normal"
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
                        <span className="font-medium text-foreground">{exp.company}</span>
                        <span>•</span>
                        <span>{type}</span>
                        <span>•</span>
                        <span>
                          {exp.start_date} — {exp.is_current ? t("currentRole") : exp.end_date || ""}
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
                        onClick={() => handleDeleteExperience(exp.id)}
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
      </div>
    </main>
  );
}

