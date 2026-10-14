import { getTranslations, getLocale } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === "ar";

  return {
    title: isAr ? "تواصل معي — إياد عثمان" : "Contact — Eyad Othman",
    description: isAr
      ? "تواصل مع إياد عثمان للمشاريع الحرة، الاستشارات، وفرص العمل."
      : "Get in touch with Eyad Othman for freelance projects, collaborations, and opportunities.",
  };
}

export default async function ContactPage() {
  const locale = await getLocale();
  const t = await getTranslations("ContactPage");
  const isAr = locale === "ar";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 pt-24 text-center bg-background text-foreground transition-colors duration-200">
      <div className="mx-auto max-w-2xl">
        <h1
          className={
            isAr
              ? "font-arabic text-4xl font-bold sm:text-6xl text-foreground"
              : "font-display text-5xl uppercase sm:text-7xl text-foreground"
          }
        >
          {t("title")}
        </h1>

        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t("subtitle")}
        </p>

        <div className="mt-8 inline-flex items-center rounded-full border border-border bg-card px-5 py-2 text-sm text-muted-foreground shadow-sm">
          {t("comingSoon")}
        </div>
      </div>
    </main>
  );
}
