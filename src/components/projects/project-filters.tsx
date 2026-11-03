import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { ProjectFiltersProps } from "@/lib/types";

export function ProjectFilters({
  categories,
  activeCategory,
  isAr,
}: ProjectFiltersProps) {
  const t = useTranslations("ProjectsPage");

  const getFilterUrl = (catSlug: string) => {
    if (catSlug === "all") {
      return `/projects`;
    }
    return `/projects?category=${encodeURIComponent(catSlug)}`;
  };

  const isAllActive = !activeCategory || activeCategory === "all";

  return (
    <nav
      aria-label={t("filterByCategory")}
      className="flex flex-wrap items-center gap-2 mb-10 sm:mb-12"
    >
      <Link
        href={getFilterUrl("all")}
        aria-current={isAllActive ? "page" : undefined}
        className={cn(
          "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors duration-200 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground",
          isAllActive
            ? "bg-foreground text-background"
            : "border border-border bg-card text-muted-foreground hover:text-foreground",
          isAr ? "font-cairo" : "font-manrope",
        )}
      >
        {t("all")}
      </Link>
      {categories.map((cat) => {
        const isActive = activeCategory === cat.slug;
        const categoryName = isAr ? cat.name_ar : cat.name;
        return (
          <Link
            key={cat.slug}
            href={getFilterUrl(cat.slug)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors duration-200 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground",
              isActive
                ? "bg-foreground text-background"
                : "border border-border bg-card text-muted-foreground hover:text-foreground",
              isAr ? "font-cairo" : "font-manrope",
            )}
          >
            {categoryName}
          </Link>
        );
      })}
    </nav>
  );
}

