import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { PROJECTS, getProjectBySlug } from "@/data/projects";
import { ExternalLink, ArrowLeft, ArrowRight } from "lucide-react";
import { GitHubIcon } from "@/components/icons";

interface PageProps {
  params: Promise<{
    locale: string;
    project: string;
  }>;
}

export function generateStaticParams() {
  const locales = ["en", "ar"];
  return locales.flatMap((locale) =>
    PROJECTS.map((project) => ({
      locale,
      project: project.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, project: slug } = await params;
  const project = getProjectBySlug(slug);
  const isAr = locale === "ar";

  if (!project) {
    return {
      title: isAr ? "المشروع غير موجود" : "Project Not Found",
    };
  }

  const title = isAr ? project.titleAr : project.title;
  const description = isAr ? project.descriptionAr : project.description;

  return {
    title: isAr ? `${title} — مشاريع إياد عثمان` : `${title} — Eyad Othman`,
    description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale, project: slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const isAr = locale === "ar";
  const title = isAr ? project.titleAr : project.title;
  const category = isAr ? project.categoryAr : project.category;
  const description = isAr ? project.descriptionAr : project.description;
  const longDescription = isAr
    ? project.longDescriptionAr
    : project.longDescription;
  const highlights = isAr ? project.highlightsAr : project.highlights;

  return (
    <main className="min-h-[calc(100vh-5rem)] px-6 sm:px-10 lg:ps-28 lg:pe-28 pt-28 pb-24 bg-background text-foreground">
      <div className="w-full max-w-4xl mx-auto">
        {/* Top Navigation Row: Back Link & Category */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/projects"
            className={cn(
              "inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors cursor-default",
              isAr ? "font-cairo" : "font-manrope",
            )}
          >
            {isAr ? (
              <>
                <ArrowRight className="size-4" />
                <span>العودة إلى المشاريع</span>
              </>
            ) : (
              <>
                <ArrowLeft className="size-4" />
                <span>Back to projects</span>
              </>
            )}
          </Link>

          <span className="inline-flex items-center rounded-full border border-border bg-card px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {category}
          </span>
        </div>

        {/* Project Header */}
        <div className="space-y-4">
          <h1
            className={cn(
              "text-3xl sm:text-5xl uppercase tracking-tight text-foreground",
              isAr ? "font-cairo font-bold" : "font-bebas tracking-normal",
            )}
          >
            {title}
          </h1>

          <p
            className={cn(
              "text-base sm:text-lg leading-relaxed text-muted-foreground",
              isAr ? "font-cairo" : "font-manrope",
            )}
          >
            {description}
          </p>
        </div>

        {/* Action Buttons Row */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground text-background px-6 py-2.5 text-xs sm:text-sm font-semibold transition-transform duration-200 hover:scale-105 active:scale-95 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            >
              <span>{isAr ? "زيارة الموقع الحي" : "Visit live site"}</span>
              <ExternalLink className="size-3.5" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card text-foreground px-6 py-2.5 text-xs sm:text-sm font-semibold transition-transform duration-200 hover:scale-105 active:scale-95 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground"
            >
              <GitHubIcon className="size-4" />
              <span>{isAr ? "الكود المصدري" : "GitHub Code"}</span>
            </a>
          )}
        </div>

        {/* Featured Visual Preview Frame (Zero shadows) */}
        <div className="relative aspect-video w-full rounded-2xl sm:rounded-3xl border border-border bg-card overflow-hidden my-10 sm:my-12">
          <Image
            src={project.image}
            alt={title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 960px"
            className="object-cover"
          />
        </div>

        {/* Project Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Main Description Column */}
          <div className="md:col-span-8 space-y-8">
            <div>
              <h2
                className={cn(
                  "text-xl sm:text-2xl uppercase text-foreground mb-3",
                  isAr ? "font-cairo font-bold" : "font-bebas tracking-normal",
                )}
              >
                {isAr ? "نظرة عامة على المشروع" : "Project Overview"}
              </h2>
              <p
                className={cn(
                  "text-sm sm:text-base leading-relaxed text-muted-foreground",
                  isAr ? "font-cairo" : "font-manrope",
                )}
              >
                {longDescription}
              </p>
            </div>

            {/* Key Deliverables & Highlights */}
            {highlights && highlights.length > 0 && (
              <div>
                <h2
                  className={cn(
                    "text-xl sm:text-2xl uppercase text-foreground mb-4",
                    isAr
                      ? "font-cairo font-bold"
                      : "font-bebas tracking-normal",
                  )}
                >
                  {isAr ? "أبرز الإنجازات والخصائص" : "Key Highlights"}
                </h2>
                <ul className="space-y-3">
                  {highlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className={cn(
                        "flex items-start gap-3 text-sm sm:text-base leading-relaxed text-muted-foreground",
                        isAr ? "font-cairo" : "font-manrope",
                      )}
                    >
                      <span className="size-1.5 rounded-full bg-foreground shrink-0 mt-2.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar Column: Tech Stack */}
          <div className="md:col-span-4">
            <div className="rounded-2xl border border-border bg-card p-6 cursor-default">
              <h3
                className={cn(
                  "text-lg uppercase text-foreground mb-4",
                  isAr ? "font-cairo font-bold" : "font-bebas tracking-normal",
                )}
              >
                {isAr ? "التقنيات المستخدمة" : "Tech Stack"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
