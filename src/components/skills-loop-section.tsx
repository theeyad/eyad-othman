import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import { SkillsLoop } from "@/components/skills-loop";
import type { SkillsLoopSectionProps } from "@/lib/types";

export async function SkillsLoopSection({ isAr }: SkillsLoopSectionProps) {
  const t = await getTranslations("HomePage");

  return (
    <section className="mt-20 sm:mt-28 w-full">
      <h2
        className={cn(
          "mb-6 sm:mb-8 text-2xl sm:text-3xl uppercase text-foreground",
          isAr ? "font-cairo font-bold" : "font-bebas tracking-normal",
        )}
      >
        {t("skills")}
      </h2>
      <SkillsLoop />
    </section>
  );
}

