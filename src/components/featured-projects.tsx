import { getTranslations } from "next-intl/server";
import ScrollCarousel from "@/components/lightswind/scroll-carousel";
import MainActionButton from "@/components/shared/main-action-button";
import { cn } from "@/lib/utils";

export default async function FeaturedProjects({ isAr }: { isAr: boolean }) {
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
      <ScrollCarousel isAr={isAr} />
      <div className="flex justify-center">
        <MainActionButton
          title={t("seeMoreProjects")}
          url="/projects"
          className="mt-6 sm:mt-8"
        />
      </div>
    </section>
  );
}
