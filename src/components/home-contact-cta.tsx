import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import MainActionButton from "@/components/shared/main-action-button";
import type { HomeContactCtaProps } from "@/lib/types";
import { getContactChips } from "@/components/socials";

export async function HomeContactCta({ resumeUrl, isAr }: HomeContactCtaProps) {
  const t = await getTranslations("HomePage");

  const contactChips = getContactChips(t, resumeUrl);

  return (
    <section
      aria-labelledby="contact-cta-heading"
      className="mt-24 sm:mt-32 w-full flex flex-col items-center text-center"
    >
      <h2
        id="contact-cta-heading"
        tabIndex={0}
        className={cn(
          "text-3xl sm:text-5xl uppercase tracking-tight text-foreground cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground rounded-lg",
          isAr ? "font-cairo font-bold" : "font-bebas tracking-normal",
        )}
      >
        {t("letsWorkTogether")}
      </h2>

      <p
        tabIndex={0}
        className={cn(
          "mt-3 text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground rounded-lg",
          isAr ? "font-cairo" : "font-manrope",
        )}
      >
        {t("workTogetherSubtitle")}
      </p>

      {/* Direct Communication Chips */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
        {contactChips.map((chip) => {
          const isPdf = chip.key === "cv";
          const isEmail = chip.href.startsWith("mailto:");
          return (
            <a
              key={chip.key}
              href={chip.href}
              target={isPdf || isEmail ? undefined : "_blank"}
              rel={isPdf || isEmail ? undefined : "noopener noreferrer"}
              download={isPdf ? "Eyad_Othman_Frontend.pdf" : undefined}
              aria-label={
                isPdf
                  ? `${chip.name} (PDF)`
                  : isEmail
                    ? t("email")
                    : `${chip.name} (opens in new tab)`
              }
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs sm:text-sm font-medium text-foreground transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground"
            >
              <span aria-hidden="true" className="flex items-center">
                {chip.icon}
              </span>
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

