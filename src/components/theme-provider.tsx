"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { ThemeContextType, Theme } from "@/lib/types";

const ThemeContext = createContext<ThemeContextType | null>(null);

const STORAGE_KEY = "theme";

function getSavedTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch {}
  return "light";
}

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const el = document.documentElement;
  el.classList.add("theme-changing");
  el.classList.toggle("dark", theme === "dark");
  // Force reflow so class applies immediately
  void el.offsetHeight;
  requestAnimationFrame(() => {
    el.classList.remove("theme-changing");
  });
}

// Safely fallback to useEffect during SSR
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme | null>(null);

  // Sync initial theme on client mount before paint
  useIsomorphicLayoutEffect(() => {
    const saved = getSavedTheme();
    setThemeState(saved);
    applyTheme(saved);
  }, []);

  // Native MutationObserver: if Next.js router wipes the class during locale navigation,
  // restore it immediately before paint!
  useEffect(() => {
    const el = document.documentElement;
    const observer = new MutationObserver(() => {
      const saved = getSavedTheme();
      if (saved === "dark" && !el.classList.contains("dark")) {
        el.classList.add("dark");
      } else if (saved === "light" && el.classList.contains("dark")) {
        el.classList.remove("dark");
      }
    });

    observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
    applyTheme(nextTheme);
    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {}
  }, []);

  const toggleTheme = useCallback(() => {
    const current = theme || getSavedTheme();
    const nextTheme: Theme = current === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  }, [theme, setTheme]);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme: theme || "light",
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
