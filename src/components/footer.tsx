"use cache";

import { getTranslations, getLocale } from "next-intl/server";
import { cn } from "@/lib/utils";

export default async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations("Footer");
  const isAr = locale === "ar";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 border-t border-border mt-auto flex items-center justify-center text-center">
      <p
        className={cn(
          "text-xs sm:text-sm text-muted-foreground cursor-default",
          isAr ? "font-cairo" : "font-manrope",
        )}
      >
        {t("copyright", { year: currentYear })}
      </p>
    </footer>
  );
}
