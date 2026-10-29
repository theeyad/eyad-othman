import { createClient } from "@/lib/supabase/server";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProjectForm } from "@/components/admin/project-form";

interface EditProjectPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: EditProjectPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  return {
    title: isAr ? "تعديل المشروع — إياد عثمان" : "Edit Project — Eyad Othman",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("*, project_images(*)")
    .eq("id", id)
    .single();

  if (!project) {
    notFound();
  }

  return <ProjectForm initialData={project} />;
}

