"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  iconClassName?: string;
}

export function ThemeToggle({ className, iconClassName }: ThemeToggleProps) {
  const t = useTranslations("Nav");
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Mark mounted and sync theme when navigating between locales/routes from Client Router Cache
  useEffect(() => {
    // ============================================
    // ============================================
    // this part may make FOUC if  Next.js
    // restores page from memory with  a theme that
    //  doesn't match what the user actually saved
    //  in localStorage

    setMounted(true);
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (
        savedTheme &&
        (savedTheme === "light" || savedTheme === "dark") &&
        savedTheme !== resolvedTheme
      ) {
        setTheme(savedTheme);
      }
    }
  }, [pathname, resolvedTheme, setTheme]);
  // ============================================
  // ============================================

  const toggleTheme = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (typeof document !== "undefined") {
      document.cookie = `theme=${nextTheme}; path=/; max-age=31536000; SameSite=Lax`;
    }
  };

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t("themeToggle")}
      suppressHydrationWarning
      className={cn(
        "relative flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground",
        className,
      )}
    >
      {mounted ? (
        isDark ? (
          <Sun className={cn("size-5", iconClassName)} />
        ) : (
          <Moon className={cn("size-5", iconClassName)} />
        )
      ) : (
        <span className={cn("size-5 opacity-0", iconClassName)} />
      )}
    </button>
  );
}

export default ThemeToggle;
