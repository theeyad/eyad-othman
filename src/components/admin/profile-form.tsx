"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import { updateProfileAction } from "@/app/[locale]/actions/admin";
import { uploadStorageImage } from "@/lib/upload";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  FileText,
  AlertCircle,
  Loader2,
  ExternalLink,
  Trash2,
  ImageIcon,
} from "lucide-react";
import type { ProfileFormProps } from "@/lib/types";

export function ProfileForm({ initialData }: ProfileFormProps) {
  const t = useTranslations("Admin");
  const locale = useLocale();
  const isAr = locale === "ar";
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Avatar state
  const [avatarPreview, setAvatarPreview] = useState<string>(
    initialData?.avatar_url || "/me.webp",
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarDragActive, setAvatarDragActive] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // Resume state
  const [currentResumeUrl, setCurrentResumeUrl] = useState<string>(
    initialData?.resume_url || "/Eyad_Othman_Frontend.pdf",
  );
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeDragActive, setResumeDragActive] = useState(false);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  // Availability state
  const [availableForWork, setAvailableForWork] = useState<boolean>(
    initialData?.available_for_work ?? true,
  );

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (avatarPreview && avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  // Avatar handlers
  const handleAvatarFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setFormError(t("invalidImageFile"));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFormError(t("imageTooLarge"));
      return;
    }
    setFormError(null);
    setAvatarFile(file);
    const objectUrl = URL.createObjectURL(file);
    setAvatarPreview(objectUrl);
  };

  const handleAvatarDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setAvatarDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleAvatarFile(e.dataTransfer.files[0]);
    }
  };

  // Resume handlers
  const handleResumeFile = (file: File) => {
    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      setFormError(t("invalidPdfFile"));
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setFormError(t("pdfTooLarge"));
      return;
    }
    setFormError(null);
    setResumeFile(file);
  };

  const handleResumeDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setResumeDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleResumeFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError(null);

    try {
      let finalAvatarUrl = avatarPreview;
      let finalResumeUrl = currentResumeUrl;

      // 1. Upload new avatar if chosen
      if (avatarFile) {
        const uploadResult = await uploadStorageImage(
          avatarFile,
          "profile_media",
        );
        if (uploadResult.error || !uploadResult.publicUrl) {
          setFormError(uploadResult.error || t("uploadError"));
          setIsLoading(false);
          return;
        }
        finalAvatarUrl = uploadResult.publicUrl;
      }

      // 2. Upload new resume PDF if chosen
      if (resumeFile) {
        const uploadResult = await uploadStorageImage(
          resumeFile,
          "profile_media",
        );
        if (uploadResult.error || !uploadResult.publicUrl) {
          setFormError(uploadResult.error || t("uploadError"));
          setIsLoading(false);
          return;
        }
        finalResumeUrl = uploadResult.publicUrl;
      }

      // 3. Update profile record in database
      const result = await updateProfileAction({
        avatar_url: finalAvatarUrl,
        resume_url: finalResumeUrl,
        available_for_work: availableForWork,
      });

      if (!result.success) {
        const errorKey = (result as { errorKey?: string }).errorKey;
        const errorMsg =
          errorKey ? t(errorKey) : result.error || t("saveError");
        setFormError(errorMsg);
        setIsLoading(false);
        return;
      }

      toast.success({ title: t("saveSuccess") });
      router.push("/admin");
      router.refresh();
    } catch {
      setFormError(t("saveError"));
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-6 sm:px-10 lg:ps-20 lg:pe-20 pt-12 md:pt-28 pb-12 md:pb-24 bg-background text-foreground">
      <div className="w-full max-w-4xl mx-auto space-y-10">
        {/* Top Back Navigation */}
        <div>
          <Link
            href="/admin"
            className={cn(
              "inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors cursor-default focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-muted-foreground rounded",
              isAr ? "font-cairo" : "font-manrope",
            )}
          >
            {isAr ? (
              <>
                <ArrowRight aria-hidden="true" className="size-4" />
                <span>{t("backToDashboard")}</span>
              </>
            ) : (
              <>
                <ArrowLeft aria-hidden="true" className="size-4" />
                <span>{t("backToDashboard")}</span>
              </>
            )}
          </Link>
        </div>

        {/* Editorial Form Container */}
        <div className="rounded-3xl border border-border bg-card p-5 sm:p-9 space-y-10 cursor-default">
          {/* Header */}
          <div className="space-y-1.5 pb-2 border-b-3 border-border text-start">
            <h1
              tabIndex={0}
              className={cn(
                "text-2xl sm:text-3xl uppercase tracking-tight text-foreground cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground rounded-lg w-fit",
                isAr ? "font-cairo font-bold" : "font-bebas tracking-normal",
              )}
            >
              {t("profileTitle")}
            </h1>
            <p
              tabIndex={0}
              className={cn(
                "text-xs sm:text-sm text-muted-foreground cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground rounded-lg",
                isAr ? "font-cairo" : "font-manrope",
              )}
            >
              {t("profileSubtitle")}
            </p>
          </div>

          {/* Error Banner */}
          {formError && (
            <div
              role="alert"
              className={cn(
                "flex items-start gap-2.5 rounded-xl border border-destructive/40 bg-destructive/10 p-3.5 text-xs text-destructive",
                isAr ? "font-cairo" : "font-manrope",
              )}
            >
              <AlertCircle
                aria-hidden="true"
                className="size-4 shrink-0 mt-0.5"
              />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Section 1 — Profile Avatar */}
            <div className="space-y-4 text-start">
              <div>
                <h2
                  tabIndex={0}
                  className={cn(
                    "text-sm font-semibold uppercase tracking-wider text-foreground cursor-default focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-muted-foreground rounded w-fit",
                    isAr ? "font-cairo" : "font-manrope",
                  )}
                >
                  {t("profileAvatarTitle")}
                </h2>
                <p
                  className={cn(
                    "text-xs text-muted-foreground mt-0.5",
                    isAr ? "font-cairo" : "font-manrope",
                  )}
                >
                  {t("profileAvatarDesc")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl border border-border bg-background/50">
                {/* Visual Avatar Preview */}
                <div className="relative size-28 sm:size-32 rounded-full overflow-hidden border-2 border-border bg-muted shrink-0">
                  <Image
                    src={avatarPreview}
                    alt="Eyad Othman"
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>

                {/* Dropzone & Picker */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setAvatarDragActive(true);
                  }}
                  onDragLeave={() => setAvatarDragActive(false)}
                  onDrop={handleAvatarDrop}
                  onClick={() => avatarInputRef.current?.click()}
                  className={cn(
                    "flex-1 w-full border border-dashed rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-default transition-colors",
                    avatarDragActive
                      ? "border-foreground bg-muted/40"
                      : "border-border hover:border-foreground/40 bg-card",
                  )}
                >
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/webp, image/svg+xml"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleAvatarFile(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                  />
                  <ImageIcon
                    aria-hidden="true"
                    className="size-6 text-muted-foreground mb-2"
                  />
                  <p
                    className={cn(
                      "text-xs font-semibold text-foreground",
                      isAr ? "font-cairo" : "font-manrope",
                    )}
                  >
                    {t("uploadProfileImage")}
                  </p>
                  <p
                    className={cn(
                      "text-[11px] text-muted-foreground mt-1",
                      isAr ? "font-cairo" : "font-manrope",
                    )}
                  >
                    {t("uploadProfileImageSub")}
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2 — Resume (CV) Document */}
            <div className="space-y-4 text-start">
              <div>
                <h2
                  tabIndex={0}
                  className={cn(
                    "text-sm font-semibold uppercase tracking-wider text-foreground cursor-default focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-muted-foreground rounded w-fit",
                    isAr ? "font-cairo" : "font-manrope",
                  )}
                >
                  {t("profileResumeTitle")}
                </h2>
                <p
                  className={cn(
                    "text-xs text-muted-foreground mt-0.5",
                    isAr ? "font-cairo" : "font-manrope",
                  )}
                >
                  {t("profileResumeDesc")}
                </p>
              </div>

              {/* Current Document Viewer */}
              {currentResumeUrl && (
                <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-background/50">
                  <div className="flex items-center gap-3">
                    <div
                      aria-hidden="true"
                      className="size-9 rounded-lg border border-border bg-card flex items-center justify-center text-foreground shrink-0"
                    >
                      <FileText className="size-4" />
                    </div>
                    <div className="space-y-0.5 text-start">
                      <p
                        className={cn(
                          "text-xs font-semibold text-foreground",
                          isAr ? "font-cairo" : "font-manrope",
                        )}
                      >
                        {t("currentResumeDoc")}
                      </p>
                    </div>
                  </div>
                  <a
                    href={currentResumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t("viewCurrentResume")} (PDF)`}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground",
                      isAr ? "font-cairo" : "font-manrope",
                    )}
                  >
                    <span>{t("viewCurrentResume")}</span>
                    <ExternalLink aria-hidden="true" className="size-3" />
                  </a>
                </div>
              )}

              {/* PDF Dropzone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setResumeDragActive(true);
                }}
                onDragLeave={() => setResumeDragActive(false)}
                onDrop={handleResumeDrop}
                onClick={() => resumeInputRef.current?.click()}
                className={cn(
                  "border border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-default transition-colors",
                  resumeDragActive
                    ? "border-foreground bg-muted/40"
                    : "border-border hover:border-foreground/40 bg-card",
                )}
              >
                <input
                  ref={resumeInputRef}
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleResumeFile(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />
                <Upload
                  aria-hidden="true"
                  className="size-6 text-muted-foreground mb-2"
                />
                <p
                  className={cn(
                    "text-xs font-semibold text-foreground",
                    isAr ? "font-cairo" : "font-manrope",
                  )}
                >
                  {resumeFile ? t("replaceResume") : t("uploadNewResume")}
                </p>
                <p
                  className={cn(
                    "text-[11px] text-muted-foreground mt-1",
                    isAr ? "font-cairo" : "font-manrope",
                  )}
                >
                  {t("profileResumeDesc")}
                </p>
              </div>

              {/* Selected File Card */}
              {resumeFile && (
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-card">
                  <div className="flex items-center gap-2.5 truncate me-3">
                    <FileText
                      aria-hidden="true"
                      className="size-4 text-foreground shrink-0"
                    />
                    <span className="text-xs font-medium text-foreground truncate">
                      {resumeFile.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono shrink-0">
                      ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setResumeFile(null);
                    }}
                    aria-label={t("removeSelectedFile")}
                    className="p-1 rounded-md text-muted-foreground hover:text-destructive transition-colors cursor-default focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-destructive"
                  >
                    <Trash2 aria-hidden="true" className="size-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Section 3 — Availability Status Toggle */}
            <div className="space-y-3 pt-4 border-t border-border text-start">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p
                    className={cn(
                      "text-xs font-semibold uppercase tracking-wider text-foreground",
                      isAr ? "font-cairo" : "font-manrope",
                    )}
                  >
                    {t("availabilityStatus")}
                  </p>
                  <p
                    className={cn(
                      "text-xs text-muted-foreground",
                      isAr ? "font-cairo" : "font-manrope",
                    )}
                  >
                    {availableForWork
                      ? t("availableForWork")
                      : t("notAvailable")}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setAvailableForWork(!availableForWork)}
                  aria-pressed={availableForWork}
                  className={cn(
                    "relative inline-flex h-6 w-11 shrink-0 cursor-default rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground",
                    availableForWork ? "bg-foreground" : "bg-muted",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none inline-block size-5 transform rounded-full bg-background shadow-none transition duration-200 ease-in-out",
                      availableForWork
                        ? isAr
                          ? "-translate-x-5"
                          : "translate-x-5"
                        : "translate-x-0",
                    )}
                  />
                </button>
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
              <Link
                href="/admin"
                className={cn(
                  "rounded-full border border-border bg-card px-6 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-default focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-muted-foreground",
                  isAr ? "font-cairo" : "font-manrope",
                )}
              >
                {t("cancel")}
              </Link>

              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-full bg-[#111111] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#111111] px-8 py-2.5 text-xs font-semibold transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground",
                  isAr ? "font-cairo" : "font-manrope",
                )}
              >
                {isLoading ? (
                  <>
                    <Loader2
                      aria-hidden="true"
                      className="size-3.5 animate-spin"
                    />
                    <span>{t("savingProfile")}</span>
                  </>
                ) : (
                  <span>{t("saveProfile")}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
