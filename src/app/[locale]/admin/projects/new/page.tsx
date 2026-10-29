import { getLocale } from "next-intl/server";
import type { Metadata } from "next";
import { ProjectForm } from "@/components/admin/project-form";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === "ar";

  return {
    title: isAr ? "مشروع جديد — إياد عثمان" : "New Project — Eyad Othman",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function NewProjectPage() {
  return <ProjectForm />;
}

