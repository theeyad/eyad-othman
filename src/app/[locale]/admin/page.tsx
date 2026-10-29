import { createClient } from "@/lib/supabase/server";
import { getLocale } from "next-intl/server";
import type { Metadata } from "next";
import AdminDashboardClient from "./admin-dashboard-client";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === "ar";

  return {
    title: isAr ? "لوحة التحكم — إياد عثمان" : "Admin Dashboard — Eyad Othman",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function AdminPage() {
  const supabase = await createClient();

  // Fetch current profile configuration
  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .eq("id", 1)
    .single();

  // Fetch all projects with their gallery images
  const { data: projects } = await supabase
    .from("projects")
    .select("*, project_images(*)")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  // Fetch all experience records
  const { data: experience } = await supabase
    .from("experience")
    .select("*")
    .order("display_order", { ascending: true })
    .order("start_date", { ascending: false });

  return (
    <AdminDashboardClient
      initialProfile={profile || null}
      initialProjects={projects || []}
      initialExperience={experience || []}
    />
  );
}