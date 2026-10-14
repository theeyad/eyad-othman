"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="relative flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
      >
        <span className="size-4 opacity-0" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
    >
      {isDark ? (
        <Sun className="size-4.5 text-foreground transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="size-4.5 text-foreground transition-transform duration-300 -rotate-12 hover:rotate-0" />
      )}
    </button>
  );
}
