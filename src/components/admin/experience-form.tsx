"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getExperienceSchema,
  type ExperienceFormValues,
} from "@/lib/validators/experience";
import {
  createExperienceAction,
  updateExperienceAction,
} from "@/app/[locale]/actions/admin";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Loader2, AlertCircle } from "lucide-react";

interface ExperienceFormProps {
  initialData?: {
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
    description: string;
    description_ar: string;
    display_order: number;
  };
}

export function ExperienceForm({ initialData }: ExperienceFormProps) {
  const t = useTranslations("Admin");
  const locale = useLocale();
  const isAr = locale === "ar";
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const isEditing = Boolean(initialData);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ExperienceFormValues>({
    resolver: zodResolver(getExperienceSchema(t)),
    defaultValues: {
      role: initialData?.role || "",
      role_ar: initialData?.role_ar || "",
      company: initialData?.company || "",
      company_url: initialData?.company_url || "",
      type: initialData?.type || "Freelance",
      type_ar: initialData?.type_ar || "عمل حر",
      start_date: initialData?.start_date || "",
      end_date: initialData?.end_date || "",
      is_current: initialData?.is_current || false,
      description: initialData?.description || "",
      description_ar: initialData?.description_ar || "",
      display_order: initialData?.display_order || 0,
    },
  });

  const isCurrent = watch("is_current");

  const onSubmit = async (values: ExperienceFormValues) => {
    setIsLoading(true);
    setFormError(null);

    const result = isEditing
      ? await updateExperienceAction(initialData!.id, values)
      : await createExperienceAction(values);

    if (!result.success) {
      setFormError(result.error || t("saveError"));
      setIsLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <main className="min-h-screen px-6 sm:px-10 lg:ps-20 lg:pe-20 pt-24 pb-24 bg-background text-foreground">
      <div className="w-full max-w-5xl mx-auto space-y-8">
        {/* Direction-Aware Back Link */}
        <div>
          <Link
            href="/admin"
            className={cn(
              "inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors cursor-default",
              isAr ? "font-cairo" : "font-manrope"
            )}
          >
            {isAr ? (
              <>
                <ArrowRight className="size-4" />
                <span>{t("backToDashboard")}</span>
              </>
            ) : (
              <>
                <ArrowLeft className="size-4" />
                <span>{t("backToDashboard")}</span>
              </>
            )}
          </Link>
        </div>

        {/* Editorial Header */}
        <div className="text-start space-y-1">
          <h1
            className={cn(
              "text-3xl sm:text-4xl text-foreground uppercase tracking-tight",
              isAr ? "font-cairo font-bold" : "font-bebas tracking-normal"
            )}
          >
            {isEditing ? t("editExperienceTitle") : t("createExperienceTitle")}
          </h1>
          <p
            className={cn(
              "text-xs sm:text-sm text-muted-foreground",
              isAr ? "font-cairo" : "font-manrope"
            )}
          >
            {t("experienceDetailsSubtitle")}
          </p>
        </div>

        {/* Error Alert Banner */}
        {formError && (
          <div
            role="alert"
            className={cn(
              "flex items-start gap-2.5 rounded-xl border border-destructive/40 bg-destructive/10 p-3.5 text-xs text-destructive",
              isAr ? "font-cairo" : "font-manrope"
            )}
          >
            <AlertCircle className="size-4 shrink-0 mt-0.5" />
            <span>{formError}</span>
          </div>
        )}

        {/* Full-Canvas Editorial Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10" noValidate>
          {/* Section 1: Role & Company */}
          <div className="space-y-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pb-2 border-b border-border">
              Role & Organization
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Role EN */}
              <div className="space-y-1.5">
                <label
                  htmlFor="role"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {t("roleEn")}
                </label>
                <input
                  id="role"
                  type="text"
                  placeholder="e.g. Front-End Developer"
                  disabled={isLoading}
                  {...register("role")}
                  className={cn(
                    "w-full border-b bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:border-b-foreground cursor-default",
                    errors.role ? "border-b-destructive" : "border-b-border"
                  )}
                />
                {errors.role && (
                  <p className="text-xs text-destructive mt-1 font-medium">
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* Role AR */}
              <div className="space-y-1.5">
                <label
                  htmlFor="role_ar"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground font-cairo"
                >
                  {t("roleAr")}
                </label>
                <input
                  id="role_ar"
                  type="text"
                  placeholder="مثال: مطور واجهات أمامية"
                  disabled={isLoading}
                  dir="rtl"
                  {...register("role_ar")}
                  className={cn(
                    "w-full border-b bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:border-b-foreground cursor-default font-cairo",
                    errors.role_ar ? "border-b-destructive" : "border-b-border"
                  )}
                />
                {errors.role_ar && (
                  <p className="text-xs text-destructive mt-1 font-medium font-cairo">
                    {errors.role_ar.message}
                  </p>
                )}
              </div>

              {/* Company */}
              <div className="space-y-1.5">
                <label
                  htmlFor="company"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {t("company")}
                </label>
                <input
                  id="company"
                  type="text"
                  placeholder="e.g. Al-Adl Organization"
                  disabled={isLoading}
                  {...register("company")}
                  className={cn(
                    "w-full border-b bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:border-b-foreground cursor-default",
                    errors.company ? "border-b-destructive" : "border-b-border"
                  )}
                />
                {errors.company && (
                  <p className="text-xs text-destructive mt-1 font-medium">
                    {errors.company.message}
                  </p>
                )}
              </div>

              {/* Company URL */}
              <div className="space-y-1.5">
                <label
                  htmlFor="company_url"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {t("companyUrl")}
                </label>
                <input
                  id="company_url"
                  type="url"
                  placeholder="https://example.com"
                  disabled={isLoading}
                  {...register("company_url")}
                  className="w-full border-b border-b-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:border-b-foreground cursor-default"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Contract Type & Timeline */}
          <div className="space-y-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pb-2 border-b border-border">
              Timeline & Contract
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Type EN */}
              <div className="space-y-1.5">
                <label
                  htmlFor="type"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {t("typeEn")}
                </label>
                <input
                  id="type"
                  type="text"
                  placeholder="Freelance / Full-time / Part-time"
                  disabled={isLoading}
                  {...register("type")}
                  className={cn(
                    "w-full border-b bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:border-b-foreground cursor-default",
                    errors.type ? "border-b-destructive" : "border-b-border"
                  )}
                />
                {errors.type && (
                  <p className="text-xs text-destructive mt-1 font-medium">
                    {errors.type.message}
                  </p>
                )}
              </div>

              {/* Type AR */}
              <div className="space-y-1.5">
                <label
                  htmlFor="type_ar"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground font-cairo"
                >
                  {t("typeAr")}
                </label>
                <input
                  id="type_ar"
                  type="text"
                  placeholder="عمل حر / دوام كامل / دوام جزئي"
                  disabled={isLoading}
                  dir="rtl"
                  {...register("type_ar")}
                  className={cn(
                    "w-full border-b bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:border-b-foreground cursor-default font-cairo",
                    errors.type_ar ? "border-b-destructive" : "border-b-border"
                  )}
                />
                {errors.type_ar && (
                  <p className="text-xs text-destructive mt-1 font-medium font-cairo">
                    {errors.type_ar.message}
                  </p>
                )}
              </div>

              {/* Start Date */}
              <div className="space-y-1.5">
                <label
                  htmlFor="start_date"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {t("startDate")}
                </label>
                <input
                  id="start_date"
                  type="date"
                  disabled={isLoading}
                  {...register("start_date")}
                  className={cn(
                    "w-full border-b bg-transparent px-4 py-3 text-sm text-foreground transition-colors focus:outline-none focus:border-b-foreground cursor-default",
                    errors.start_date ? "border-b-destructive" : "border-b-border"
                  )}
                />
                {errors.start_date && (
                  <p className="text-xs text-destructive mt-1 font-medium">
                    {errors.start_date.message}
                  </p>
                )}
              </div>

              {/* End Date */}
              <div className="space-y-1.5">
                <label
                  htmlFor="end_date"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {t("endDate")}
                </label>
                <input
                  id="end_date"
                  type="date"
                  disabled={isLoading || isCurrent}
                  {...register("end_date")}
                  className={cn(
                    "w-full border-b border-b-border bg-transparent px-4 py-3 text-sm text-foreground transition-colors focus:outline-none focus:border-b-foreground cursor-default",
                    isCurrent && "opacity-40 pointer-events-none"
                  )}
                />
              </div>

              {/* Is Current Checkbox */}
              <div className="md:col-span-2 pt-1">
                <input type="hidden" {...register("is_current")} />
                <button
                  type="button"
                  onClick={() => setValue("is_current", !isCurrent)}
                  className="flex items-center gap-3 cursor-default"
                >
                  <div
                    className={cn(
                      "size-5 rounded-md border flex items-center justify-center transition-colors",
                      isCurrent
                        ? "bg-foreground border-foreground text-background"
                        : "border-border bg-card"
                    )}
                  >
                    {isCurrent && <span className="text-xs font-bold">✓</span>}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {t("isCurrent")}
                  </span>
                </button>
              </div>

              {/* Display Order */}
              <div className="space-y-1.5">
                <label
                  htmlFor="display_order"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {t("displayOrder")}
                </label>
                <input
                  id="display_order"
                  type="number"
                  placeholder="0"
                  disabled={isLoading}
                  {...register("display_order", { valueAsNumber: true })}
                  className="w-full border-b border-b-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:border-b-foreground cursor-default"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Descriptions */}
          <div className="space-y-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pb-2 border-b border-border">
              Impact & Responsibilities
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Description EN */}
              <div className="space-y-1.5">
                <label
                  htmlFor="description"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {t("expDescriptionEn")}
                </label>
                <textarea
                  id="description"
                  rows={4}
                  placeholder="Engineered the frontend for a 7-page responsive website..."
                  disabled={isLoading}
                  {...register("description")}
                  className={cn(
                    "w-full border-b bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:border-b-foreground cursor-default resize-none",
                    errors.description ? "border-b-destructive" : "border-b-border"
                  )}
                />
                {errors.description && (
                  <p className="text-xs text-destructive mt-1 font-medium">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Description AR */}
              <div className="space-y-1.5">
                <label
                  htmlFor="description_ar"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground font-cairo"
                >
                  {t("expDescriptionAr")}
                </label>
                <textarea
                  id="description_ar"
                  rows={4}
                  placeholder="تطوير الواجهة الأمامية لموقع متجاوب مكون من 7 صفحات..."
                  disabled={isLoading}
                  dir="rtl"
                  {...register("description_ar")}
                  className={cn(
                    "w-full border-b bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:border-b-foreground cursor-default resize-none font-cairo",
                    errors.description_ar ? "border-b-destructive" : "border-b-border"
                  )}
                />
                {errors.description_ar && (
                  <p className="text-xs text-destructive mt-1 font-medium font-cairo">
                    {errors.description_ar.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Form Action Controls */}
          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-full bg-[#111111] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#111111] px-8 py-3 text-sm font-semibold transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground",
                isAr ? "font-cairo" : "font-manrope"
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>{t("saving")}</span>
                </>
              ) : (
                <span>{t("saveExperience")}</span>
              )}
            </button>

            <Link
              href="/admin"
              className={cn(
                "inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-default",
                isAr ? "font-cairo" : "font-manrope"
              )}
            >
              {isAr ? "إلغاء" : "Cancel"}
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
