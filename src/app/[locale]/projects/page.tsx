import { getTranslations, getLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { getAllProjects } from "@/lib/supabase/queries";
import { ArrowRight, ArrowLeft } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === "ar";

  return {
    title: isAr ? "المشاريع — إياد عثمان" : "Projects — Eyad Othman",
    description: isAr
      ? "معرض لأحدث مشاريع وتطبيقات الواجهات الأمامية التي قام إياد عثمان بتطويرها."
      : "A showcase of frontend projects and web applications developed by Eyad Othman.",
  };
}

export default async function ProjectsPage() {
  const locale = await getLocale();
  const t = await getTranslations("ProjectsPage");
  const isAr = locale === "ar";

  const projects = await getAllProjects();

  return (
    <main className="min-h-screen px-6 sm:px-10 lg:ps-28 lg:pe-28 pt-20 md:pt-28 pb-24 bg-background text-foreground">
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-start mb-16">
          <h1
            className={
              isAr
                ? "font-cairo text-3xl font-bold sm:text-4xl text-foreground"
                : "font-bebas text-3xl uppercase sm:text-4xl text-foreground tracking-normal"
            }
          >
            {t("title")}
          </h1>

          <p
            className={cn(
              "mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base",
              isAr ? "font-cairo" : "font-manrope",
            )}
          >
            {t("subtitle")}
          </p>
        </div>

        {/* Projects Archive Grid or Empty State */}
        {projects.length === 0 ? (
          <div className="rounded-2xl sm:rounded-3xl border border-dashed border-border bg-card/40 p-12 text-center text-sm text-muted-foreground">
            {t("noProjects")}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project) => {
              const title = isAr ? project.title_ar : project.title;
              const category = isAr ? project.category_ar : project.category;
              const description = isAr
                ? project.description_ar
                : project.description;
              const primaryImage =
                project.project_images.find((img) => img.is_primary)?.url ||
                project.project_images[0]?.url ||
                "";

              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group relative flex flex-col rounded-3xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-foreground/30 cursor-default"
                >
                  {/* Visual Image Preview */}
                  <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    {primaryImage ? (
                      <Image
                        src={primaryImage}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : null}
                    <div className="absolute top-4 inset-s-4">
                      <span className="inline-flex items-center rounded-full border border-white/20 bg-black/50 backdrop-blur-md px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                        {category}
                      </span>
                    </div>
                  </div>

                  {/* Card Info Body */}
                  <div className="flex flex-col justify-between flex-1 p-6 space-y-4">
                    <div className="space-y-2">
                      <h2
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
                      <span className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground transition-colors shrink-0 ms-2">
                        {isAr ? (
                          <ArrowLeft size={16} />
                        ) : (
                          <ArrowRight size={16} />
                        )}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
