"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Globe, Folder, Mail, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import NavTab from "@/components/navtab";
import ThemeToggle from "@/components/theme-toggle";
import { motion } from "motion/react";

export default function Navbar() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const otherLocale = locale === "ar" ? "en" : "ar";
  const isAr = locale === "ar";

  // Active page detection
  const isHome = pathname === "/" || pathname === "";
  const isProjects = pathname.startsWith("/projects");
  const isContact = pathname.startsWith("/contact");

  return (
    <>
      {/* =========================================================================
          DESKTOP NAVBAR (md: and up)
          - Left: Circular 'EO' Monogram (Spring scale-in)
          - Center: Capsule with white/dark pill tabs (Stretches from start)
          - Right: Theme toggle & Language switcher circular buttons (Fades in)
         ========================================================================= */}
      <header className="fixed top-5 inset-x-0 mx-auto z-99 w-fit hidden md:flex items-center gap-2.5 pointer-events-auto">
        <div className="flex gap-1 items-center">
          {/* Monogram Brand Circle */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 450, damping: 22 }}
          >
            <Link
              href="/"
              aria-label="Eyad Othman"
              className="size-11 rounded-full bg-[#111111] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#111111] flex items-center justify-center shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground"
            >
              <span className="font-bebas text-xl tracking-normal leading-none select-none">
                <span className="inline-block">EO</span>
              </span>
            </Link>
          </motion.div>

          {/* Center Nav Pill Capsule */}
          <motion.nav
            aria-label="Main Navigation"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            style={{ transformOrigin: isAr ? "right center" : "left center" }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 24,
              delay: 0.18,
            }}
            className="rounded-full bg-[#111111] dark:bg-[#ffffff] p-1 shadow-sm flex items-center gap-1 transition-colors duration-200"
          >
            <NavTab href="/" label={t("home")} isActive={isHome} isAr={isAr} />
            <NavTab
              href="/projects"
              label={t("projects")}
              isActive={isProjects}
              isAr={isAr}
            />
            <NavTab
              href="/contact"
              label={t("contact")}
              isActive={isContact}
              isAr={isAr}
            />
            <NavTab
              href="/Eyad_Othman_Frontend.pdf"
              label={t("cv")}
              isAr={isAr}
              isExternal
              download="Eyad_Othman_Frontend.pdf"
            />
          </motion.nav>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.45, ease: "easeOut" }}
          className="flex gap-1 items-center"
        >
          {/* Theme Toggle Circle */}
          <ThemeToggle className="size-11 rounded-full bg-[#111111] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#111111] border-none shadow-sm transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:ring-muted-foreground" />

          {/* Language Switcher Circle */}
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: otherLocale })}
            aria-label={t("switchLang")}
            className="size-11 rounded-full bg-[#111111] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#111111] flex items-center justify-center shadow-sm transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground cursor-pointer"
          >
            <Globe className="size-5" />
          </button>
        </motion.div>
      </header>

      {/* =========================================================================
          MOBILE NAVBAR (< md:)
          - Single top pill container with squircle icon tiles
          - Smooth spring entrance animation
         ========================================================================= */}
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="fixed bottom-4 inset-x-0 mx-auto z-99 w-fit max-w-[95vw] flex md:hidden items-center justify-center pointer-events-auto"
      >
        <div className="rounded-2xl border border-border bg-card/90 backdrop-blur-md p-1.5 shadow-lg flex items-center gap-1.5 transition-colors duration-200">
          {/* 1. Monogram Tile */}
          <Link
            href="/"
            aria-label="Home"
            className={cn(
              "size-10 rounded-xl flex items-center justify-center font-oswald text-base transition-all duration-200 active:scale-95 shadow-sm",
              isHome
                ? "bg-[#111111] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#111111]"
                : "bg-card hover:bg-muted text-foreground border border-border",
            )}
          >
            <span className="">EO</span>
          </Link>

          {/* 2. Projects Tile */}
          <Link
            href="/projects"
            aria-label={t("projects")}
            className={cn(
              "size-10 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm",
              isProjects
                ? "bg-[#111111] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#111111]"
                : "bg-card hover:bg-muted text-foreground border border-border",
            )}
          >
            <Folder className="size-4.5" />
          </Link>

          {/* 3. Contact Tile */}
          <Link
            href="/contact"
            aria-label={t("contact")}
            className={cn(
              "size-10 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm",
              isContact
                ? "bg-[#111111] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#111111]"
                : "bg-card hover:bg-muted text-foreground border border-border",
            )}
          >
            <Mail className="size-4.5" />
          </Link>

          {/* 4. Download CV Tile */}
          <a
            href="/Eyad_Othman_Frontend.pdf"
            download="Eyad_Othman_Frontend.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("cv")}
            className="size-10 rounded-xl flex items-center justify-center bg-card hover:bg-muted text-foreground border border-border transition-all duration-200 active:scale-95 shadow-sm"
          >
            <Download className="size-4.5" />
          </a>

          {/* 5. Theme Toggle Tile (Reused Component) */}
          <ThemeToggle
            className="size-10 rounded-xl bg-card hover:bg-muted text-foreground border border-border transition-all duration-200 active:scale-95 shadow-sm"
            iconClassName="size-4.5"
          />

          {/* 6. Language Switcher Tile */}
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: otherLocale })}
            aria-label={t("switchLang")}
            className="h-10 px-2.5 rounded-xl flex items-center justify-center gap-1 bg-card hover:bg-muted text-foreground border border-border transition-all duration-200 active:scale-95 shadow-sm cursor-pointer"
          >
            <Globe className="size-4" />
            <span className="text-[11px] tracking-tight">{t("langBadge")}</span>
          </button>
        </div>
      </motion.header>
    </>
  );
}
