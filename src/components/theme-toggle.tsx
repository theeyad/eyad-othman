"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggleProps } from "@/lib/types";

const emptySubscribe = () => () => {};

export function ThemeToggle({ className, iconClassName }: ThemeToggleProps) {
  const t = useTranslations("Nav");
  const { resolvedTheme, toggleTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

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

