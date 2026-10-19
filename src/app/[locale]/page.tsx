import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SplitText } from "@/components/split-text";
import { cn } from "@/lib/utils";
import { SkillsLoop } from "@/components/skills-loop";
import {
  GitHubIcon,
  LinkedInIcon,
  WhatsAppIcon,
  TelegramIcon,
  GmailIcon,
} from "@/components/icons";

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getTranslations("HomePage");

  const isAr = locale === "ar";

  const commChips = [
    {
      key: "email",
      name: t("email"),
      href: "mailto:eyadosman35@gmail.com",
      icon: <GmailIcon className="size-4 text-foreground shrink-0" />,
    },
    {
      key: "whatsapp",
      name: t("whatsapp"),
      href: "https://wa.me/201150440572",
      icon: <WhatsAppIcon className="size-4 text-foreground shrink-0" />,
    },
    {
      key: "github",
      name: t("github"),
      href: "https://github.com/theeyad",
      icon: <GitHubIcon className="size-4 text-foreground shrink-0" />,
    },
    {
      key: "linkedin",
      name: t("linkedin"),
      href: "https://www.linkedin.com/in/eyad-othman",
      icon: <LinkedInIcon className="size-4 text-foreground shrink-0" />,
    },
    {
      key: "telegram",
      name: t("telegram"),
      href: "https://t.me/eyad_osman2005",
      icon: <TelegramIcon className="size-6 text-foreground shrink-0" />,
    },
  ];

  return (
    <main className="min-h-[calc(100vh-5rem)] flex flex-col items-center px-6 sm:px-10 lg:ps-28 lg:pe-28 pt-28 pb-24 bg-background text-foreground">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
          {/* =========================================================================
              LEFT COLUMN: Status, Split-text Animated Name & Role, Tagline, CTAs & Chips
             ========================================================================= */}
          <div className="md:col-span-5 md:items-start md:text-start flex flex-col items-center text-center">
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs text-muted-foreground">
              <span className="size-2 rounded-full bg-success shrink-0" />
              <span className="font-medium">{t("available")}</span>
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
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-full bg-[#111111] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#111111] px-6 py-2.5 text-sm font-semibold transition-transform duration-200 hover:scale-105 active:scale-95 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground"
              >
                {t("viewProjects")}
              </Link>

              {/* Hire Me / Contact */}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-2.5 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-muted hover:scale-105 active:scale-95 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground"
              >
                {t("hireMe")}
              </Link>

              {/* Download CV */}
              <a
                href="/Eyad_Othman_Frontend.pdf"
                download="Eyad_Othman_Frontend.pdf"
                className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-2.5 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-muted hover:scale-105 active:scale-95 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground"
              >
                <span className="me-1.5">↓</span>
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
                    target={
                      chip.href.startsWith("mailto:") ? undefined : "_blank"
                    }
                    rel={
                      chip.href.startsWith("mailto:")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4.5 py-2.5 text-xs font-medium text-foreground transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground"
                  >
                    { chip.icon }
                    <span>{chip.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Portrait Squircle Card (Rendered with next/image, no motion entrance)
             ========================================================================= */}
          <div className="md:col-span-7 flex justify-center -order-1 md:order-0 md:justify-end">
            <div className="relative w-full max-w-75 sm:max-w-85 md:max-w-95 aspect-4/5 rounded-[2.5rem] border border-border bg-card overflow-hidden shadow-2xs">
              <Image
                src="/me.webp"
                alt={t("title")}
                fill
                priority
                sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 380px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* PHASE 6: Skills LogoLoop Ticker Section */}
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
      </div>
    </main>
  );
}
