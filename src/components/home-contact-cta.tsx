import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import MainActionButton from "@/components/shared/main-action-button";
import type { HomeContactCtaProps } from "@/lib/types";
import { getContactChips } from "@/components/socials";

export async function HomeContactCta({ resumeUrl, isAr }: HomeContactCtaProps) {
  const t = await getTranslations("HomePage");

  const contactChips = getContactChips(t, resumeUrl);

  return (
    <section className="mt-24 sm:mt-32 w-full flex flex-col items-center text-center">
      <h2
        className={cn(
          "text-3xl sm:text-5xl uppercase tracking-tight text-foreground",
          isAr ? "font-cairo font-bold" : "font-bebas tracking-normal",
        )}
      >
        {t("letsWorkTogether")}
      </h2>

      <p
        className={cn(
          "mt-3 text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed",
          isAr ? "font-cairo" : "font-manrope",
        )}
      >
        {t("workTogetherSubtitle")}
      </p>

      {/* Direct Communication Chips */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
        {contactChips.map((chip) => {
          const isPdf = chip.key === "cv";
          return (
            <a
              key={chip.key}
              href={chip.href}
              target={isPdf ? undefined : "_blank"}
              rel={isPdf ? undefined : "noopener noreferrer"}
              download={
                isPdf ? "Eyad_Othman_Frontend.pdf" : undefined
              }
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs sm:text-sm font-medium text-foreground transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground"
            >
              {chip.icon}
              <span>{chip.name}</span>
            </a>
          );
        })}
      </div>

      {/* Send a message Action Button */}
      <div className="mt-8">
        <MainActionButton
          title={t("sendMessage")}
          url="/contact"
        />
      </div>
    </section>
  );
}

