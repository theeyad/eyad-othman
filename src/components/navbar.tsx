"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Globe, Folder, Mail, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const otherLocale = locale === "ar" ? "en" : "ar";
  const isAr = locale === "ar";
  const isDark = resolvedTheme === "dark";

  // Active page detection
  const isHome = pathname === "/" || pathname === "";
  const isProjects = pathname.startsWith("/projects");
  const isContact = pathname.startsWith("/contact");

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <>
      {/* =========================================================================
          DESKTOP NAVBAR (md: and up)
          - Left: Circular 'EO' Monogram
          - Center: Capsule with white/dark pill tabs & active notch cutout
          - Right: Theme toggle & Language switcher circular buttons
         ========================================================================= */}
      <header className="fixed top-5 inset-x-0 mx-auto z-99 w-fit hidden md:flex items-center gap-2.5 pointer-events-auto">
        <div className="flex gap-px">
          {/* Monogram Brand Circle */}
          <Link
            href="/"
            aria-label="Eyad Othman"
            className="size-11 rounded-full bg-[#111111] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#111111] flex items-center justify-center shadow-sm"
          >
            <span className="font-bebas text-xl  tracking-normal leading-none select-none">
              <span className="inline-block">EO</span>
            </span>
          </Link>

          {/* Center Nav Pill Capsule */}
          <nav
            aria-label="Main Navigation"
            className="rounded-full bg-[#111111] dark:bg-[#ffffff] p-1 shadow-md flex items-center gap-1 transition-colors duration-200"
          >
            {/* HOME Tab */}
            <Link
              href="/"
              className={cn(
                "relative overflow-hidden rounded-full px-5 py-1.5 tracking-tight text-base uppercase transition-all duration-200 select-none",
                isAr ? "font-cairo " : "font-oswald text-base",
                "bg-[#ffffff] text-[#111111] dark:bg-[#111111] dark:text-[#ffffff]",
              )}
            >
              <span>{t("home")}</span>
              {isHome && (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 size-3 rounded-full bg-[#111111] dark:bg-[#ffffff]"
                />
              )}
            </Link>

            {/* PROJECTS Tab */}
            <Link
              href="/projects"
              className={cn(
                "relative overflow-hidden rounded-full px-5 py-1.5 font-oswald tracking-wider text-base uppercase transition-all duration-200 select-none",
                isAr ? "font-cairo" : "font-oswald text-base",
                "bg-[#ffffff] text-[#111111] dark:bg-[#111111] dark:text-[#ffffff]",
              )}
            >
              <span>{t("projects")}</span>
              {isProjects && (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 size-3 rounded-full bg-[#111111] dark:bg-[#ffffff]"
                />
              )}
            </Link>

            {/* CONTACT Tab */}
            <Link
              href="/contact"
              className={cn(
                "relative overflow-hidden rounded-full px-5 py-1.5 font-oswald tracking-wider text-base uppercase transition-all duration-200 select-none",
                isAr ? "font-cairo" : "font-oswald text-base",
                "bg-[#ffffff] text-[#111111] dark:bg-[#111111] dark:text-[#ffffff]",
              )}
            >
              <span>{t("contact")}</span>
              {isContact && (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 size-3 rounded-full bg-[#111111] dark:bg-[#ffffff]"
                />
              )}
            </Link>

            {/* CV Tab */}
            <a
              href="/Eyad_Othman_Frontend.pdf"
              download="Eyad_Othman_Frontend.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "relative rounded-full px-4 py-1.5 font-oswald tracking-wider text-base uppercase transition-all duration-200 select-none inline-flex items-center gap-1",
                isAr ? "font-cairo" : "font-oswald text-base",
                "bg-[#ffffff] text-[#111111] dark:bg-[#111111] dark:text-[#ffffff]",
              )}
            >
              <span>{t("cv")}</span>
            </a>
          </nav>
        </div>

        <div className="flex gap-1">
          {/* Theme Toggle Circle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t("themeToggle")}
            className="size-11 rounded-full bg-[#111111] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#111111] flex items-center justify-center shadow-md transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            {mounted ? (
              isDark ? (
                <Sun className="size-5 transition-transform duration-300 rotate-0 hover:rotate-45" />
              ) : (
                <Moon className="size-5 transition-transform duration-300 -rotate-12 hover:rotate-0" />
              )
            ) : (
              <span className="size-5 opacity-0" />
            )}
          </button>

          {/* Language Switcher Circle */}
          <Link
            href={pathname}
            locale={otherLocale}
            aria-label={t("switchLang")}
            className="size-11 rounded-full bg-[#111111] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#111111] flex items-center justify-center shadow-md transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <Globe className="size-5 transition-transform duration-300 hover:rotate-12" />
          </Link>
        </div>
      </header>

      {/* =========================================================================
          MOBILE NAVBAR (< md:)
          - Single top pill container with squircle icon tiles
         ========================================================================= */}
      <header className="fixed top-4 inset-x-0 mx-auto z-99 w-fit max-w-[95vw] flex md:hidden items-center justify-center pointer-events-auto">
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

          {/* 5. Theme Toggle Tile */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t("themeToggle")}
            className="size-10 rounded-xl flex items-center justify-center bg-card hover:bg-muted text-foreground border border-border transition-all duration-200 active:scale-95 shadow-sm cursor-pointer"
          >
            {mounted ? (
              isDark ? (
                <Sun className="size-4.5" />
              ) : (
                <Moon className="size-4.5" />
              )
            ) : (
              <span className="size-4.5 opacity-0" />
            )}
          </button>

          {/* 6. Language Switcher Tile */}
          <Link
            href={pathname}
            locale={otherLocale}
            aria-label={t("switchLang")}
            className="h-10 px-2.5 rounded-xl flex items-center justify-center gap-1 bg-card hover:bg-muted text-foreground border border-border transition-all duration-200 active:scale-95 shadow-sm"
          >
            <Globe className="size-4" />
            <span className="text-[11px]  tracking-tight">
              {t("langBadge")}
            </span>
          </Link>
        </div>
      </header>
    </>
  );
}
