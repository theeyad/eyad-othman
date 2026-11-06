import { getTranslations, getLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { getAllProjects } from "@/lib/supabase/queries";
import { ArrowRight, ArrowLeft } from "lucide-react";
import PixelCard from "@/components/pixel-card";
import { ProjectFilters } from "@/components/projects/project-filters";
import { ProjectPagination } from "@/components/projects/project-pagination";
import type { ProjectsPageProps, ProjectCategory } from "@/lib/types";
import { ITEMS_PER_PAGE_PROJECTS } from "@/lib/consts";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === "ar";

  const title = isAr ? "المشاريع" : "Projects";
  const description = isAr
    ? "معرض لأحدث المشاريع والتطبيقات التي قمت بتطويرها."
    : "A showcase of projects and web applications developed by me.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/projects`,
      languages: {
        en: "/en/projects",
        ar: "/ar/projects",
        "x-default": "/en/projects",
      },
    },
    openGraph: {
      title: isAr ? `${title} | إياد عثمان` : `${title} | Eyad Othman`,
      description,
      url: `/${locale}/projects`,
    },
  };
}

export default async function ProjectsPage({
  params,
  searchParams,
}: ProjectsPageProps) {
  const { locale } = await params;
  const { category: queryCategory, page: queryPage } = await searchParams;
  const t = await getTranslations("ProjectsPage");
  const isAr = locale === "ar";

  const allProjects = await getAllProjects();

  // 1. Extract Unique Categories from Projects
  const categoryMap = new Map<string, ProjectCategory>();

  for (const project of allProjects) {
    if (project.category && !categoryMap.has(project.category.toLowerCase())) {
      categoryMap.set(project.category.toLowerCase(), {
        slug: project.category.toLowerCase(),
        name: project.category,
        name_ar: project.category_ar || project.category,
      });
    }
  }

  const categories = Array.from(categoryMap.values());

  // 2. Filter Projects
  const activeCategory = queryCategory?.toLowerCase();
  const filteredProjects =
    activeCategory && activeCategory !== "all"
      ? allProjects.filter((p) => p.category.toLowerCase() === activeCategory)
      : allProjects;

  // 3. Pagination Logic (Max 9 projects per page)
  const maxItems = ITEMS_PER_PAGE_PROJECTS;
  const totalProjects = filteredProjects.length;
  const totalPages = Math.ceil(totalProjects / maxItems);
  const currentPage = Math.max(
    1,
    Math.min(totalPages || 1, parseInt(queryPage || "1", 10) || 1),
  );

  const startIndex = (currentPage - 1) * maxItems;
  const paginatedProjects = filteredProjects.slice(
    startIndex,
    startIndex + maxItems,
  );

  return (
    <main className="min-h-screen px-6 sm:px-10 lg:ps-28 lg:pe-28 pt-12 md:pt-28 pb-12 md:pb-24 bg-background text-foreground">
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-start mb-10 sm:mb-12">
          <h1
            tabIndex={0}
            className={cn(
              "cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground rounded-lg w-fit",
              isAr
                ? "font-cairo text-3xl font-bold sm:text-4xl text-foreground"
                : "font-bebas text-3xl uppercase sm:text-4xl text-foreground tracking-normal",
            )}
          >
            {t("title")}
          </h1>

          <p
            tabIndex={0}
            className={cn(
              "mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground rounded-lg w-fit",
              isAr ? "font-cairo" : "font-manrope",
            )}
          >
            {t("subtitle")}
          </p>
        </div>

        {/* Category Filters Bar */}
        <ProjectFilters
          categories={categories}
          activeCategory={activeCategory}
          isAr={isAr}
        />

        {/* Projects Archive Grid or Empty State */}
        {paginatedProjects.length === 0 ? (
          <div
            tabIndex={0}
            role="status"
            className="rounded-2xl sm:rounded-3xl border border-dashed border-border bg-card/40 p-12 text-center text-sm text-muted-foreground cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground"
          >
            {t("noProjects")}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {paginatedProjects.map((project) => {
              const title = isAr ? project.title_ar : project.title;
              const category = isAr ? project.category_ar : project.category;
              const description = isAr
                ? project.description_ar
                : project.description;
              const primaryImage =
                project.project_images?.find((img) => img.is_primary)?.url ||
                project.project_images?.[0]?.url ||
                "";

              return (
                <PixelCard
                  key={project.slug}
                  variant="yellow"
                  radius={24}
                  intro={false}
                  className="rounded-3xl border border-border bg-card overflow-hidden cursor-default"
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    aria-labelledby={`project-title-${project.slug}`}
                    className="flex flex-col h-full cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground rounded-3xl"
                  >
                    {/* Visual Image Preview */}
                    <div className="relative aspect-video w-full overflow-hidden bg-muted">
                      {primaryImage ? (
                        <Image
                          src={primaryImage}
                          alt={title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      ) : null}
                      <div className="absolute top-4 inset-s-4 z-30">
                        <span className="inline-flex items-center rounded-full border border-white/20 bg-black/50 backdrop-blur-md px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                          {category}
                        </span>
                      </div>
                    </div>

                    {/* Card Info Body */}
                    <div className="flex flex-col justify-between flex-1 p-6 space-y-4 relative z-30">
                      <div className="space-y-2">
                        <h2
                          id={`project-title-${project.slug}`}
                          className={cn(
                            "text-2xl text-foreground uppercase tracking-tight",
                            isAr
                              ? "font-cairo font-bold"
                              : "font-bebas tracking-normal",
                          )}
                        >
                          {title}
                        </h2>
                        <p
                          className={cn(
                            "text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed",
                            isAr ? "font-cairo" : "font-manrope",
                          )}
                        >
                          {description}
                        </p>
                      </div>

                      {/* Tech Stack Chips & Link */}
                      <div className="pt-2 border-t border-border flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech_stack &&
                            project.tech_stack.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                              >
                                {tech}
                              </span>
                            ))}
                        </div>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0 ms-2">
                          {isAr ? (
                            <ArrowLeft aria-hidden="true" size={16} />
                          ) : (
                            <ArrowRight aria-hidden="true" size={16} />
                          )}
                        </span>
                      </div>
                    </div>
                  </Link>
                </PixelCard>
              );
            })}
          </div>
        )}

        {/* Pagination Navigation */}
        <ProjectPagination
          currentPage={currentPage}
          totalPages={totalPages}
          activeCategory={activeCategory}
          isAr={isAr}
        />
      </div>
    </main>
  );
}
