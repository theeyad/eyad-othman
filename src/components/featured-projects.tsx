import { getTranslations } from "next-intl/server";
import ScrollCarousel from "@/components/scroll-carousel";
import MainActionButton from "@/components/shared/main-action-button";
import { cn } from "@/lib/utils";
import type { FeaturedProjectsProps } from "@/lib/types";

export default async function FeaturedProjects({
  projects,
  isAr,
}: FeaturedProjectsProps) {
  const t = await getTranslations("HomePage");

  return (
    <section className="mt-20 sm:mt-28 w-full">
      <h2
        className={cn(
          "text-2xl sm:text-3xl uppercase text-foreground mb-6 sm:mb-8",
          isAr ? "font-cairo font-bold" : "font-bebas tracking-normal",
        )}
      >
        {t("featuredProjects")}
      </h2>

      {projects.length === 0 ? (
        <div className="rounded-2xl sm:rounded-3xl border border-dashed border-border bg-card/40 p-8 text-center text-sm text-muted-foreground">
          {t("noFeaturedProjects")}
        </div>
      ) : (
        <>
          <ScrollCarousel projects={projects} isAr={isAr} />
          <div className="flex justify-center">
            <MainActionButton
              title={t("seeMoreProjects")}
              url="/projects"
              className="mt-6 sm:mt-8"
            />
          </div>
        </>
      )}
    </section>
  );
}
