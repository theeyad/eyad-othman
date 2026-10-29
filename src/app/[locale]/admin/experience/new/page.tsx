import { getLocale } from "next-intl/server";
import type { Metadata } from "next";
import { ExperienceForm } from "@/components/admin/experience-form";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === "ar";

  return {
    title: isAr ? "إضافة خبرة مهنية — إياد عثمان" : "Add Experience — Eyad Othman",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function NewExperiencePage() {
  return <ExperienceForm />;
}

