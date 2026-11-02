import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SplitText } from "@/components/split-text";
import { cn } from "@/lib/utils";
import MainActionButton from "@/components/shared/main-action-button";
import { Download } from "lucide-react";
import type { HeroSectionProps } from "@/lib/types";
import { getCommunicationChips } from "@/components/socials";

export async function HeroSection({ profile, isAr }: HeroSectionProps) {
  const t = await getTranslations("HomePage");

  const isAvailable = profile?.available_for_work ?? true;
  const avatarUrl = profile?.avatar_url || "/me.webp";
  const resumeUrl = profile?.resume_url || "/Eyad_Othman_Frontend.pdf";

  const commChips = getCommunicationChips(t);

  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
      <div className="md:col-span-6 md:items-start md:text-start flex flex-col items-center text-center">
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs text-muted-foreground">
          <span
            className={cn(
              "size-2 rounded-full shrink-0",
              isAvailable ? "bg-[#22c55e]" : "bg-muted-foreground/60",
            )}
          />
          <span className="font-medium">
            {isAvailable ? t("available") : t("unavailable")}
          </span>
        </div>

        {/* Split-text Animated Name */}
        <h1
          className={`mt-5 ${
            isAr
              ? "font-cairo text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight"
              : "font-bebas text-5xl sm:text-6xl md:text-7xl tracking-normal text-foreground uppercase leading-[0.95]"
          }`}
        >
          <SplitText
            text={isAr ? t("title") : t("title").toUpperCase()}
            isArabic={isAr}
            delay={0.1}
          />
        </h1>

        {/* Split-text Animated Role */}
        <h2
          className={`mt-1.5 ${
            isAr
              ? "font-cairo text-xl sm:text-2xl md:text-3xl font-semibold text-muted-foreground leading-tight"
              : "font-bebas text-2xl sm:text-3xl md:text-4xl text-muted-foreground uppercase tracking-normal leading-[0.95]"
          }`}
        >
          <SplitText
            text={isAr ? t("role") : t("role").toUpperCase()}
            isArabic={isAr}
            delay={0.35}
          />
        </h2>

        {/* Tagline */}
        <p
          className={`mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground ${
            isAr ? "font-cairo font-normal" : "font-manrope"
          }`}
        >
          {t("tagline")}
        </p>

        {/* Row 1 — Primary Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3">
          {/* View Projects */}
          <MainActionButton title={t("viewProjects")} url="/projects" />

          {/* Hire Me / Contact */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-2.5 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-muted hover:scale-105 active:scale-95 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground"
          >
            {t("hireMe")}
          </Link>

          {/* Download CV */}
          <a
            href={resumeUrl}
            download="Eyad_Othman_Frontend.pdf"
            className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-2.5 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-muted hover:scale-105 active:scale-95 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground"
          >
            <span className="me-1.5">
              <Download size={16} />
            </span>
            {t("downloadCv")}
          </a>
        </div>

        {/* Row 2 — Direct Communication Chips */}
        <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-2.5">
          {commChips.map((chip) => {
            return (
              <a
                key={chip.key}
                href={chip.href}
                target={chip.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  chip.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4.5 py-2.5 text-xs font-medium text-foreground transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground"
              >
                {chip.icon}
                <span>{chip.name}</span>
              </a>
            );
          })}
        </div>
      </div>

      <div className="md:col-span-6 flex justify-center -order-1 md:order-0 md:justify-end">
        <div className="relative w-full max-w-75 sm:max-w-85 md:max-w-95 aspect-4/5 rounded-[2.5rem] overflow-hidden bg-card border border-border">
          <Link
            href="/auth/login"
            aria-label="Profile"
            className="block cursor-default size-full relative"
          >
            <Image
              src={avatarUrl}
              alt={t("title")}
              fill
              priority
              sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 380px"
              className="object-cover"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

