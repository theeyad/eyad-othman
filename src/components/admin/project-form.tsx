"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getProjectSchema,
  type ProjectFormValues,
} from "@/lib/validators/project";
import {
  createProjectAction,
  updateProjectAction,
} from "@/app/[locale]/actions/admin";
import { MultiImageUploader, type GalleryItem } from "@/components/multi-image-uploader";
import { uploadStorageImage } from "@/lib/upload";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Loader2, AlertCircle } from "lucide-react";

interface ProjectFormProps {
  initialData?: {
    id: string;
    slug: string;
    title: string;
    title_ar: string;
    category: string;
    category_ar: string;
    description: string;
    description_ar: string;
    long_description: string;
    long_description_ar: string;
    tech_stack: string[];
    highlights: string[];
    highlights_ar: string[];
    live_url: string | null;
    github_url: string | null;
    featured: boolean;
    display_order: number;
    project_images?: { url: string; is_primary: boolean }[];
  };
}

export function ProjectForm({ initialData }: ProjectFormProps) {
  const t = useTranslations("Admin");
  const locale = useLocale();
  const isAr = locale === "ar";
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [images, setImages] = useState<GalleryItem[]>(
    initialData?.project_images?.map((img) => ({
      id: img.url,
      previewUrl: img.url,
      is_primary: img.is_primary,
    })) || []
  );

  const isEditing = Boolean(initialData);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(getProjectSchema(t)),
    defaultValues: {
      title: initialData?.title || "",
      title_ar: initialData?.title_ar || "",
      slug: initialData?.slug || "",
      category: initialData?.category || "",
      category_ar: initialData?.category_ar || "",
      description: initialData?.description || "",
      description_ar: initialData?.description_ar || "",
      long_description: initialData?.long_description || "",
      long_description_ar: initialData?.long_description_ar || "",
      tech_stack: initialData?.tech_stack?.join(", ") || "",
      highlights: initialData?.highlights?.join(", ") || "",
      highlights_ar: initialData?.highlights_ar?.join(", ") || "",
      live_url: initialData?.live_url || "",
      github_url: initialData?.github_url || "",
      featured: initialData?.featured || false,
      display_order: initialData?.display_order || 0,
    },
  });

  const featured = watch("featured");

  const onSubmit = async (values: ProjectFormValues) => {
    setIsLoading(true);
    setFormError(null);

    try {
      // 1. Upload only newly staged files
      const finalImages: { url: string; is_primary: boolean }[] = [];
      for (const item of images) {
        if (item.file) {
          const uploadResult = await uploadStorageImage(item.file, "project_media");
          if (uploadResult.error || !uploadResult.publicUrl) {
            setFormError(t("uploadError"));
            setIsLoading(false);
            return;
          }
          finalImages.push({
            url: uploadResult.publicUrl,
            is_primary: item.is_primary,
          });
        } else {
          finalImages.push({
            url: item.previewUrl,
            is_primary: item.is_primary,
          });
        }
      }

      // 2. Submit to server action
      const result = isEditing
        ? await updateProjectAction(initialData!.id, values, finalImages)
        : await createProjectAction(values, finalImages);

      if (!result.success) {
        const errorKey = (result as { errorKey?: string }).errorKey;
        const errorMsg = errorKey ? t(errorKey) : result.error || t("saveError");
        setFormError(errorMsg);
        setIsLoading(false);
        return;
      }

      // 3. Clean up any blob URLs
      images.forEach((item) => {
        if (item.file && item.previewUrl.startsWith("blob:")) {
          URL.revokeObjectURL(item.previewUrl);
        }
      });

      router.push("/admin");
      router.refresh();
    } catch {
      setFormError(t("saveError"));
      setIsLoading(false);
    }
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
            {isEditing ? t("editProjectTitle") : t("createProjectTitle")}
          </h1>
          <p
            className={cn(
              "text-xs sm:text-sm text-muted-foreground",
              isAr ? "font-cairo" : "font-manrope"
            )}
          >
            {t("projectDetailsSubtitle")}
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
          {/* Section 1: Titles & Slugs */}
          <div className="space-y-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pb-2 border-b-3 border-border">
              {t("basicIdentification")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title EN */}
              <div className="space-y-1.5">
                <label
                  htmlFor="title"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {t("titleEn")}
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder={t("titleEnPlaceholder")}
                  disabled={isLoading}
                  {...register("title")}
                  className={cn(
                    "w-full border-b bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:border-b-foreground cursor-default",
                    errors.title ? "border-b-destructive" : "border-b-border"
                  )}
                />
                {errors.title && (
                  <p className="text-xs text-destructive mt-1 font-medium">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Title AR */}
              <div className="space-y-1.5">
                <label
                  htmlFor="title_ar"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground font-cairo"
                >
                  {t("titleAr")}
                </label>
                <input
                  id="title_ar"
                  type="text"
                  placeholder={t("titleArPlaceholder")}
                  disabled={isLoading}
                  dir="rtl"
                  {...register("title_ar")}
                  className={cn(
                    "w-full border-b bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:border-b-foreground cursor-default font-cairo",
                    errors.title_ar ? "border-b-destructive" : "border-b-border"
                  )}
                />
                {errors.title_ar && (
                  <p className="text-xs text-destructive mt-1 font-medium font-cairo">
                    {errors.title_ar.message}
                  </p>
                )}
              </div>

              {/* Slug */}
              <div className="space-y-1.5">
                <label
                  htmlFor="slug"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {t("slug")}
                </label>
                <input
                  id="slug"
                  type="text"
                  placeholder="al-adl-law"
                  disabled={isLoading}
                  {...register("slug")}
                  className={cn(
                    "w-full border-b bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:border-b-foreground cursor-default",
                    errors.slug ? "border-b-destructive" : "border-b-border"
                  )}
                />
                {errors.slug && (
                  <p className="text-xs text-destructive mt-1 font-medium">
                    {errors.slug.message}
                  </p>
                )}
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

          {/* Section 2: Categories */}
          <div className="space-y-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pb-2 border-b-3 border-border">
              {t("categoriesSection")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category EN */}
              <div className="space-y-1.5">
                <label
                  htmlFor="category"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {t("categoryEn")}
                </label>
                <input
                  id="category"
                  type="text"
                  placeholder={t("categoryEnPlaceholder")}
                  disabled={isLoading}
                  {...register("category")}
                  className={cn(
                    "w-full border-b bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:border-b-foreground cursor-default",
                    errors.category ? "border-b-destructive" : "border-b-border"
                  )}
                />
                {errors.category && (
                  <p className="text-xs text-destructive mt-1 font-medium">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Category AR */}
              <div className="space-y-1.5">
                <label
                  htmlFor="category_ar"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground font-cairo"
                >
                  {t("categoryAr")}
                </label>
                <input
                  id="category_ar"
                  type="text"
                  placeholder={t("categoryArPlaceholder")}
                  disabled={isLoading}
                  dir="rtl"
                  {...register("category_ar")}
                  className={cn(
                    "w-full border-b bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:border-b-foreground cursor-default font-cairo",
                    errors.category_ar ? "border-b-destructive" : "border-b-border"
                  )}
                />
                {errors.category_ar && (
                  <p className="text-xs text-destructive mt-1 font-medium font-cairo">
                    {errors.category_ar.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Descriptions */}
          <div className="space-y-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pb-2 border-b-3 border-border">
              {t("descriptionsSection")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Short Description EN */}
              <div className="space-y-1.5">
                <label
                  htmlFor="description"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {t("descriptionEn")}
                </label>
                <textarea
                  id="description"
                  rows={3}
                  placeholder={t("descEnPlaceholder")}
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

              {/* Short Description AR */}
              <div className="space-y-1.5">
                <label
                  htmlFor="description_ar"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground font-cairo"
                >
                  {t("descriptionAr")}
                </label>
                <textarea
                  id="description_ar"
                  rows={3}
                  placeholder={t("descArPlaceholder")}
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

              {/* Long Description EN */}
              <div className="space-y-1.5">
                <label
                  htmlFor="long_description"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {t("longDescriptionEn")}
                </label>
                <textarea
                  id="long_description"
                  rows={5}
                  placeholder={t("longDescEnPlaceholder")}
                  disabled={isLoading}
                  {...register("long_description")}
                  className={cn(
                    "w-full border-b bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:border-b-foreground cursor-default resize-none",
                    errors.long_description ? "border-b-destructive" : "border-b-border"
                  )}
                />
                {errors.long_description && (
                  <p className="text-xs text-destructive mt-1 font-medium">
                    {errors.long_description.message}
                  </p>
                )}
              </div>

              {/* Long Description AR */}
              <div className="space-y-1.5">
                <label
                  htmlFor="long_description_ar"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground font-cairo"
                >
                  {t("longDescriptionAr")}
                </label>
                <textarea
                  id="long_description_ar"
                  rows={5}
                  placeholder={t("longDescArPlaceholder")}
                  disabled={isLoading}
                  dir="rtl"
                  {...register("long_description_ar")}
                  className={cn(
                    "w-full border-b bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:border-b-foreground cursor-default resize-none font-cairo",
                    errors.long_description_ar ? "border-b-destructive" : "border-b-border"
                  )}
                />
                {errors.long_description_ar && (
                  <p className="text-xs text-destructive mt-1 font-medium font-cairo">
                    {errors.long_description_ar.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Tech Stack & Highlights */}
          <div className="space-y-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pb-2 border-b-3 border-border">
              {t("techStackSection")}
            </h2>

            <div className="space-y-6">
              {/* Tech Stack */}
              <div className="space-y-1.5">
                <label
                  htmlFor="tech_stack"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {t("techStack")}
                </label>
                <input
                  id="tech_stack"
                  type="text"
                  placeholder={t("techStackPlaceholder")}
                  disabled={isLoading}
                  {...register("tech_stack")}
                  className={cn(
                    "w-full border-b bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:border-b-foreground cursor-default",
                    errors.tech_stack ? "border-b-destructive" : "border-b-border"
                  )}
                />
                {errors.tech_stack && (
                  <p className="text-xs text-destructive mt-1 font-medium">
                    {errors.tech_stack.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Highlights EN */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="highlights"
                    className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    {t("highlightsEn")}
                  </label>
                  <input
                    id="highlights"
                    type="text"
                    placeholder={t("highlightsEnPlaceholder")}
                    disabled={isLoading}
                    {...register("highlights")}
                    className="w-full border-b border-b-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:border-b-foreground cursor-default"
                  />
                </div>

                {/* Highlights AR */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="highlights_ar"
                    className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground font-cairo"
                  >
                    {t("highlightsAr")}
                  </label>
                  <input
                    id="highlights_ar"
                    type="text"
                    placeholder={t("highlightsArPlaceholder")}
                    disabled={isLoading}
                    dir="rtl"
                    {...register("highlights_ar")}
                    className="w-full border-b border-b-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:border-b-foreground cursor-default font-cairo"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Live URL */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="live_url"
                    className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    {t("liveUrl")}
                  </label>
                  <input
                    id="live_url"
                    type="url"
                    placeholder="https://example.com"
                    disabled={isLoading}
                    {...register("live_url")}
                    className="w-full border-b border-b-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:border-b-foreground cursor-default"
                  />
                </div>

                {/* GitHub URL */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="github_url"
                    className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    {t("githubUrl")}
                  </label>
                  <input
                    id="github_url"
                    type="url"
                    placeholder="https://github.com/theeyad/example"
                    disabled={isLoading}
                    {...register("github_url")}
                    className="w-full border-b border-b-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:border-b-foreground cursor-default"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Gallery Images */}
          <div className="space-y-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pb-2 border-b-3 border-border">
              {t("projectImagesLabel")}
            </h2>

            <MultiImageUploader
              value={images}
              onChange={setImages}
              onError={(err) => setFormError(err)}
              disabled={isLoading}
            />
          </div>

          {/* Section 6: Featured Toggle Switch */}
          <div className="pt-2">
            <input type="hidden" {...register("featured")} />
            <button
              type="button"
              onClick={() => setValue("featured", !featured)}
              className="flex items-center gap-3 cursor-default"
            >
              <div
                className={cn(
                  "size-5 rounded-md border flex items-center justify-center transition-colors",
                  featured
                    ? "bg-foreground border-foreground text-background"
                    : "border-border bg-card"
                )}
              >
                {featured && <span className="text-xs font-bold">✓</span>}
              </div>
              <span className="text-sm font-medium text-foreground">
                {t("featuredCheckbox")}
              </span>
            </button>
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
                <span>{t("saveProject")}</span>
              )}
            </button>

            <Link
              href="/admin"
              className={cn(
                "inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-default",
                isAr ? "font-cairo" : "font-manrope"
              )}
            >
              {t("cancel")}
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
