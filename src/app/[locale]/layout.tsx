import type { Metadata } from "next";
import { Manrope, Bebas_Neue, Cairo, Oswald } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import { SocialDock } from "@/components/social-dock";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  weight: "400",
  subsets: ["latin"],
});

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

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        manrope.variable,
        bebasNeue.variable,
        cairo.variable,
        oswald.variable,
      )}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark')}}catch(e){}`,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-full flex flex-col bg-background text-foreground",
          locale === "ar" ? "font-cairo" : "font-manrope",
        )}
      >
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            <SocialDock />
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
