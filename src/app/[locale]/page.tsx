import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getTranslations("HomePage");
  const otherLocale = locale === "ar" ? "en" : "ar";

  const isAr = locale === "ar";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <div className="mx-auto max-w-xl">
        <span className="mb-6 inline-flex items-center rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted-foreground shadow-sm">
          <span className="me-2 inline-block size-2 rounded-full bg-emerald-500 animate-pulse" />
          {t("available")}
        </span>

        <h1
          className={
            isAr
              ? "font-arabic text-4xl font-bold sm:text-6xl text-foreground"
              : "font-display text-5xl uppercase sm:text-7xl text-foreground"
          }
        >
          {t("title")}
        </h1>

        <h2 className="mt-3 text-2xl font-medium text-muted-foreground sm:text-3xl">
          {t("role")}
        </h2>

        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t("tagline")}
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/"
            locale={otherLocale}
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            {t("switchLang")}
          </Link>
        </div>
      </div>
    </main>
  );
}
