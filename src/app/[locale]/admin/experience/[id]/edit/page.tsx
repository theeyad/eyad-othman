import { createClient } from "@/lib/supabase/server";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ExperienceForm } from "@/components/admin/experience-form";

interface EditExperiencePageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: EditExperiencePageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  return {
    title: isAr ? "تعديل الخبرة المهنية — إياد عثمان" : "Edit Experience — Eyad Othman",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function EditExperiencePage({
  params,
}: EditExperiencePageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: experience } = await supabase
    .from("experience")
    .select("*")
    .eq("id", id)
    .single();

  if (!experience) {
    notFound();
  }

  return <ExperienceForm initialData={experience} />;
}

