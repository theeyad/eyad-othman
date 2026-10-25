import { getTranslations, getLocale } from "next-intl/server";
import CurrentYear from "@/components/current-year";
import { cn } from "@/lib/utils";

export default async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations("Footer");
  const isAr = locale === "ar";

  return (
    <footer className="w-full py-8 border-t border-border mt-auto flex items-center justify-center text-center">
      <p
        className={cn(
          "text-xs sm:text-sm text-muted-foreground cursor-default",
          isAr ? "font-cairo" : "font-manrope",
        )}
      >
        {t("copyright")} <CurrentYear /> {t("copyrightText")}
      </p>
    </footer>
  );
}
