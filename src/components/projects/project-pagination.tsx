import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowLeft } from "lucide-react";
import type { ProjectPaginationProps } from "@/lib/types";

export function ProjectPagination({
  currentPage,
  totalPages,
  activeCategory,
  isAr,
}: ProjectPaginationProps) {
  const t = useTranslations("ProjectsPage");

  if (totalPages <= 1) {
    return null;
  }

  const getPageUrl = (pageNum: number) => {
    const searchParamsObj = new URLSearchParams();
    if (activeCategory && activeCategory !== "all") {
      searchParamsObj.set("category", activeCategory);
    }
    if (pageNum > 1) {
      searchParamsObj.set("page", pageNum.toString());
    }
    const qs = searchParamsObj.toString();
    return qs ? `/projects?${qs}` : `/projects`;
  };

  return (
    <nav
      aria-label="Pagination Navigation"
      className="mt-14 sm:mt-16 flex items-center justify-center gap-2"
    >
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          aria-label={t("previous")}
          className={cn(
            "inline-flex items-center justify-center size-9 rounded-full border border-border bg-card text-foreground transition-colors hover:bg-foreground hover:text-background cursor-default",
            isAr ? "font-cairo" : "font-manrope",
          )}
        >
          {isAr ? (
            <ArrowRight className="size-4" />
          ) : (
            <ArrowLeft className="size-4" />
          )}
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="inline-flex items-center justify-center size-9 rounded-full border border-border/40 bg-card/40 text-muted-foreground/40 cursor-default"
        >
          {isAr ? (
            <ArrowRight className="size-4" />
          ) : (
            <ArrowLeft className="size-4" />
          )}
        </span>
      )}

      {/* Page Number Buttons */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
        const isCurrent = pageNum === currentPage;
        return (
          <Link
            key={pageNum}
            href={getPageUrl(pageNum)}
            aria-current={isCurrent ? "page" : undefined}
            className={cn(
              "inline-flex items-center justify-center size-9 rounded-full text-xs font-semibold transition-colors cursor-default",
              isCurrent
                ? "bg-foreground text-background"
                : "border border-border bg-card text-muted-foreground hover:text-foreground",
              isAr ? "font-cairo" : "font-manrope",
            )}
          >
            {pageNum}
          </Link>
        );
      })}

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          aria-label={t("next")}
          className={cn(
            "inline-flex items-center justify-center size-9 rounded-full border border-border bg-card text-foreground transition-colors hover:bg-foreground hover:text-background cursor-default",
            isAr ? "font-cairo" : "font-manrope",
          )}
        >
          {isAr ? (
            <ArrowLeft className="size-4" />
          ) : (
            <ArrowRight className="size-4" />
          )}
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="inline-flex items-center justify-center size-9 rounded-full border border-border/40 bg-card/40 text-muted-foreground/40 cursor-default"
        >
          {isAr ? (
            <ArrowLeft className="size-4" />
          ) : (
            <ArrowRight className="size-4" />
          )}
        </span>
      )}
    </nav>
  );
}

