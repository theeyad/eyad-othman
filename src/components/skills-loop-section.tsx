import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import { SkillsLoop } from "@/components/skills-loop";
import type { SkillsLoopSectionProps } from "@/lib/types";

export async function SkillsLoopSection({ isAr }: SkillsLoopSectionProps) {
  const t = await getTranslations("HomePage");

  return (
    <section aria-labelledby="skills-heading" className="mt-20 sm:mt-28 w-full">
      <h2
        id="skills-heading"
        tabIndex={0}
        className={cn(
          "mb-6 sm:mb-8 text-2xl sm:text-3xl uppercase text-foreground cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground rounded-lg w-fit",
          isAr ? "font-cairo font-bold" : "font-bebas tracking-normal",
        )}
      >
        {t("skills")}
      </h2>
      <SkillsLoop />
    </section>
  );
}

