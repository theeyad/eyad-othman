import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === "ar";

  return {
    title: isAr ? "لوحة التحكم" : "Admin Dashboard",
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
  };
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
