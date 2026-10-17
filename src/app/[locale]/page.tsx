import { getTranslations, getLocale } from "next-intl/server";

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getTranslations("HomePage");

  const isAr = locale === "ar";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 pt-24 text-center bg-background text-foreground transition-colors duration-200">
      <div className="mx-auto max-w-xl">
        <span className="mb-6 inline-flex items-center rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted-foreground">
          <span className="me-2 inline-block size-2 rounded-full bg-success" />
          {t("available")}
        </span>

        <h1
          className={
            isAr
              ? "font-cairo text-4xl font-bold sm:text-6xl text-foreground"
              : "font-bebas text-5xl uppercase sm:text-7xl text-foreground"
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
      </div>
    </main>
  );
}
