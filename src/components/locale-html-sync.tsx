"use client";

import { useEffect } from "react";

interface LocaleHtmlSyncProps {
  locale: string;
  dir: "rtl" | "ltr";
}

export function LocaleHtmlSync({ locale, dir }: LocaleHtmlSyncProps) {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
      document.documentElement.dir = dir;
    }
  }, [locale, dir]);

  return null;
}
