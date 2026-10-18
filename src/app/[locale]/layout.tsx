import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import Navbar from "@/components/navbar";
import { SocialDock } from "@/components/social-dock";
import { LocaleHtmlSync } from "@/components/locale-html-sync";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === "ar";

  return {
    title: isAr
      ? "إياد عثمان — مطور واجهات أمامية"
      : "Eyad Othman — Frontend Developer",
    description: isAr
      ? "رجلٌ تعلم، ويتعلم، وسيتعلم دائمًا... مطور واجهات أمامية"
      : "A man who learned, is learning, and will always learn... Frontend Developer",
  };
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  // Load translation messages for the current locale
  const messages = await getMessages();

  // Validate that the requested locale is supported
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const isAr = locale === "ar";

  return (
    <>
      <LocaleHtmlSync locale={locale} dir={isAr ? "rtl" : "ltr"} />
      <NextIntlClientProvider messages={messages}>
        <div
          dir={isAr ? "rtl" : "ltr"}
          className={cn(
            "min-h-full flex flex-col bg-background text-foreground",
            isAr ? "font-cairo" : "font-manrope",
          )}
        >
          <Navbar />
          <SocialDock />
          {children}
        </div>
      </NextIntlClientProvider>
    </>
  );
}
