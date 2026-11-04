import { getTranslations, getLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getProfile } from "@/lib/supabase/queries";
import { ContactInfo } from "@/components/contact/contact-info";
import { ContactForm } from "@/components/contact/contact-form";
import { cn } from "@/lib/utils";

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

  const profile = await getProfile();
  const isAvailable = profile?.available_for_work ?? true;

  return (
    <main className="min-h-screen px-6 sm:px-10 lg:ps-28 lg:pe-28 pt-12 md:pt-28 pb-12 md:pb-24 bg-background text-foreground">
      <div className="mx-auto max-w-6xl">
        {/* Editorial Header */}
        <div className="text-start mb-12 sm:mb-16">
          <h1
            tabIndex={0}
            className={cn(
              "text-3xl sm:text-5xl uppercase tracking-tight text-foreground cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground rounded-lg w-fit",
              isAr ? "font-cairo font-bold" : "font-bebas tracking-normal",
            )}
          >
            {t("title")}
          </h1>

          <p
            tabIndex={0}
            className={cn(
              "mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base max-w-2xl cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground rounded-lg",
              isAr ? "font-cairo" : "font-manrope",
            )}
          >
            {t("subtitle")}
          </p>
        </div>

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Direct Communication Column */}
          <div className="lg:col-span-5">
            <ContactInfo isAvailable={isAvailable} isAr={isAr} />
          </div>

          {/* Interactive Form Column */}
          <div className="lg:col-span-7">
            <ContactForm isAr={isAr} />
          </div>
        </div>
      </div>
    </main>
  );
}
