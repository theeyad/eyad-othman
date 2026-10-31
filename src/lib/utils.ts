import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to merge class names with Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function to format a number with currency
export function formatCurrency(
  amount: number,
  currency = "USD",
  options?: Omit<Intl.NumberFormatOptions, "style" | "currency">
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    ...options,
  }).format(amount);
}

// Utility function to generate a unique ID
export function generateUniqueId(prefix = "id") {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

// Utility function to truncate text
export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

// Utility function to format date
export function formatDate(date: Date, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...options,
  }).format(date);
}

// Utility function to debounce function calls
export function debounce<T extends (...args: unknown[]) => void>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function (...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

// Utility function to throttle function calls
export function throttle<T extends (...args: unknown[]) => void>(func: T, limit: number) {
  let inThrottle = false;
  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Localized date utilities for experience timeline and portfolio display.
 */

export function formatMonthYear(dateStr: string, locale: string): string {
  if (!dateStr) return "";

  // Support YYYY-MM-DD or YYYY-MM
  const parts = dateStr.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);

  if (isNaN(year) || isNaN(month)) return dateStr;

  const date = new Date(Date.UTC(year, month - 1, 1));
  const intlLocale = locale === "ar" ? "ar-EG" : "en-US";

  return new Intl.DateTimeFormat(intlLocale, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatExperiencePeriod({
  startDate,
  endDate,
  isCurrent,
  locale,
  presentLabel,
}: {
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  locale: string;
  presentLabel: string;
}): string {
  const formattedStart = formatMonthYear(startDate, locale);

  if (isCurrent || !endDate) {
    return `${formattedStart} — ${presentLabel}`;
  }

  const formattedEnd = formatMonthYear(endDate, locale);
  return `${formattedStart} — ${formattedEnd}`;
}

