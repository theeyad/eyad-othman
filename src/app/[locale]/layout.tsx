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
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { SITE_URL } from "@/lib/consts";

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

  const defaultTitle = isAr
    ? "إياد عثمان"
    : "Eyad Othman";

  const description = isAr
    ? "موقع إياد عثمان — مطور واجهات أمامية. رجلٌ تعلم، ويتعلم، وسيتعلم دائمًا... تصفح أحدث المشاريع البرمجية، سجل الخبرات، والمهارات."
    : "Portfolio of Eyad Othman — Frontend Developer. A man who learned, is learning, and will always learn... Explore featured projects, experience, and skills.";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: defaultTitle,
      template: isAr ? "%s | إياد عثمان" : "%s | Eyad Othman",
    },
    description,
    keywords: isAr
      ? [
        "إياد عثمان",
        "مطور واجهات أمامية",
        "مهندس برمجيات",
        "مطور ويب",
        "ريأكت",
        "نكست جي اس",
        "تايلويند",
        "تايب سكريبت",
        "بورتفوليو",
        "معرض أعمال",
      ]
      : [
        "Eyad Othman",
        "Frontend Developer",
        "Software Engineer",
        "React Developer",
        "Next.js Developer",
        "TypeScript",
        "Tailwind CSS",
        "Web Developer",
        "Portfolio",
      ],
    authors: [{ name: "Eyad Othman", url: "https://github.com/theeyad" }],
    creator: "Eyad Othman",
    publisher: "Eyad Othman",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ar: "/ar",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: isAr ? "ar_EG" : "en_US",
      alternateLocale: isAr ? "en_US" : "ar_EG",
      url: `/${locale}`,
      siteName: isAr ? "إياد عثمان" : "Eyad Othman",
      title: defaultTitle,
      description,
      images: [
        {
          url: "/me.webp",
          width: 1200,
          height: 630,
          alt: isAr ? "إياد عثمان" : "Eyad Othman",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description,
      images: ["/me.webp"],
      creator: "@theeyad",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google:
        process.env.GOOGLE_SITE_VERIFICATION!,
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    manifest: "/site.webmanifest",
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
            <Footer />
            <Toaster />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
