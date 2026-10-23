import { getTranslations } from "next-intl/server";
import { Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExperienceProps {
  isAr: boolean;
}

export async function Experience({ isAr }: ExperienceProps) {
  const t = await getTranslations("HomePage");

  return (
    <section className="mt-20 sm:mt-28 w-full">
      <h2
        className={cn(
          "mb-6 sm:mb-8 text-2xl sm:text-3xl uppercase text-foreground",
          isAr ? "font-cairo font-bold" : "font-bebas tracking-normal",
        )}
      >
        {t("experience")}
      </h2>

      <div className="flex items-start gap-3.5 sm:gap-5">
        {/* Left Status Marker Node */}
        <div
          aria-hidden="true"
          className="mt-6 sm:mt-7 flex size-2.5 sm:size-3 shrink-0 rounded-full bg-[#22c55e]"
        />

        {/* Experience Card */}
        <div className="flex-1 rounded-2xl sm:rounded-3xl border border-border bg-card p-6 sm:p-8 cursor-default">
          {/* Header Row: Title & Date Pill */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3
              className={cn(
                "text-xl sm:text-2xl uppercase text-foreground tracking-normal",
                isAr ? "font-cairo font-bold" : "font-bebas",
              )}
            >
              {t("experienceRole")}
            </h3>

            {/* Date Pill Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground font-medium">
              <span className="size-1.5 rounded-full bg-[#22c55e]" />
              <span className={cn(isAr ? "font-cairo" : "font-manrope")}>
                {t("experiencePeriod")}
              </span>
            </div>
          </div>

          {/* Meta Row: Company & Type Badge */}
          <div className="mt-3 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-1.5 text-foreground font-medium">
              <Briefcase className="size-3.5 sm:size-4 shrink-0 text-muted-foreground" />
              <span className={cn(isAr ? "font-cairo" : "font-manrope")}>
                {t("experienceCompany")}
              </span>
            </div>
            <span className="inline-flex items-center rounded-full border border-border bg-muted/20 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {t("experienceType")}
            </span>
          </div>

          {/* Description Body */}
          <p
            className={cn(
              "mt-5 text-sm sm:text-base leading-relaxed text-muted-foreground",
              isAr ? "font-cairo" : "font-manrope",
            )}
          >
            {t("experienceDescription")}
          </p>
        </div>
      </div>
    </section>
  );
}
