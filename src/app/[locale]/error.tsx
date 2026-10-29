"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <main className="min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center text-center px-6 py-24 bg-background text-foreground">
      <div className="w-full max-w-lg mx-auto flex flex-col items-center">
        <h1
          className={cn(
            "text-4xl sm:text-5xl uppercase tracking-tight text-foreground",
            isAr ? "font-cairo font-bold" : "font-bebas tracking-normal"
          )}
        >
          {t("title")}
        </h1>

        <p
          className={cn(
            "mt-3 text-sm text-muted-foreground leading-relaxed",
            isAr ? "font-cairo" : "font-manrope"
          )}
        >
          {t("subtitle")}
        </p>

        {error.message && (
          <div
            role="alert"
            className={cn(
              "mt-6 flex items-start gap-2.5 rounded-xl border border-destructive/40 bg-destructive/10 p-3.5 text-xs text-destructive text-start w-full",
              isAr ? "font-cairo" : "font-manrope"
            )}
          >
            <AlertCircle className="size-4 shrink-0 mt-0.5" />
            <span className="break-words">{error.message}</span>
          </div>
        )}

        <div className="mt-8 flex items-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className={cn(
              "inline-flex items-center gap-2 rounded-full bg-[#111111] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#111111] px-6 py-2.5 text-xs font-semibold transition-transform duration-200 hover:scale-105 active:scale-95 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground",
              isAr ? "font-cairo" : "font-manrope"
            )}
          >
            <RotateCcw className="size-3.5" />
            <span>{t("tryAgain")}</span>
          </button>

          <Link
            href="/"
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-xs font-semibold text-foreground hover:bg-foreground hover:text-card transition-all duration-200 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground",
              isAr ? "font-cairo" : "font-manrope"
            )}
          >
            <Home className="size-3.5" />
            <span>{t("backHome")}</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

