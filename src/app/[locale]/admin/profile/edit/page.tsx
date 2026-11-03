import { createClient } from "@/lib/supabase/server";
import { getLocale } from "next-intl/server";
import type { Metadata } from "next";
import { ProfileForm } from "@/components/admin/profile-form";
import type { EditProfilePageProps } from "@/lib/types";

export async function generateMetadata({
  params,
}: EditProfilePageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  return {
    title: isAr
      ? "تعديل الملف الشخصي — إياد عثمان"
      : "Edit Profile — Eyad Othman",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function EditProfilePage() {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .eq("id", 1)
    .single();

  return <ProfileForm initialData={profile || null} />;
}

