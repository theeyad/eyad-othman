import { getTranslations } from "next-intl/server";
import { Briefcase, ExternalLink } from "lucide-react";
import { cn, formatExperiencePeriod } from "@/lib/utils";
import type { ExperienceProps } from "@/lib/types";

export default async function Experience({
  experiences,
  locale,
  isAr,
}: ExperienceProps) {
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

      {experiences.length === 0 ? (
        <div className="rounded-2xl sm:rounded-3xl border border-dashed border-border bg-card/40 p-8 text-center text-sm text-muted-foreground">
          {t("noExperience")}
        </div>
      ) : (
        <div className="relative space-y-6 sm:space-y-8">
          {experiences.map((exp) => {
            const role = isAr ? exp.role_ar : exp.role;
            const type = isAr ? exp.type_ar : exp.type;
            const description = isAr ? exp.description_ar : exp.description;
            const period = formatExperiencePeriod({
              startDate: exp.start_date,
              endDate: exp.end_date,
              isCurrent: exp.is_current,
              locale,
              presentLabel: t("present"),
            });

            return (
              <div
                key={exp.id}
                className="flex items-start gap-3.5 sm:gap-5"
              >
                {/* Left Status Marker Node */}
                <div
                  aria-hidden="true"
                  className={cn(
                    "mt-6 sm:mt-7 flex size-2.5 sm:size-3 shrink-0 rounded-full",
                    exp.is_current ? "bg-[#22c55e]" : "bg-muted-foreground/40",
                  )}
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
                      {role}
                    </h3>

                    {/* Date Pill Badge */}
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground font-medium">
                      <span
                        className={cn(
                          "size-1.5 rounded-full shrink-0",
                          exp.is_current
                            ? "bg-[#22c55e]"
                            : "bg-muted-foreground/50",
                        )}
                      />
                      <span
                        className={cn(isAr ? "font-cairo" : "font-manrope")}
                      >
                        {period}
                      </span>
                    </div>
                  </div>

                  {/* Meta Row: Company & Type Badge */}
                  <div className="mt-3 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                    <div className="inline-flex items-center gap-1.5 text-foreground font-medium">
                      <Briefcase className="size-3.5 sm:size-4 shrink-0 text-muted-foreground" />
                      {exp.company_url ? (
                        <a
                          href={exp.company_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 hover:underline cursor-default focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-muted-foreground rounded"
                        >
                          <span
                            className={cn(isAr ? "font-cairo" : "font-manrope")}
                          >
                            {exp.company}
                          </span>
                          <ExternalLink className="size-3 text-muted-foreground" />
                        </a>
                      ) : (
                        <span
                          className={cn(isAr ? "font-cairo" : "font-manrope")}
                        >
                          {exp.company}
                        </span>
                      )}
                    </div>
                    <span className="inline-flex items-center rounded-full border border-border bg-muted/20 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {type}
                    </span>
                  </div>

                  {/* Description Body */}
                  <p
                    className={cn(
                      "mt-5 text-sm sm:text-base leading-relaxed text-muted-foreground",
                      isAr ? "font-cairo" : "font-manrope",
                    )}
                  >
                    {description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
