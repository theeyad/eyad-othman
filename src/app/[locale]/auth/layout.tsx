import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === "ar";

  return {
    title: isAr ? "تسجيل الدخول" : "Sign In",
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
  };
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
