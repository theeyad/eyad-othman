"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  GitHubIcon,
  LinkedInIcon,
  WhatsAppIcon,
  TelegramIcon,
  GmailIcon,
} from "@/components/icons";
import { SocialLink } from "@/lib/types";

export const links: SocialLink[] = [
  {
    key: "github",
    href: "https://github.com/theeyad",
    icon: <GitHubIcon className="size-4" />,
  },
  {
    key: "linkedin",
    href: "https://www.linkedin.com/in/eyad-othman",
    icon: <LinkedInIcon className="size-4" />,
  },
  {
    key: "whatsapp",
    href: "https://wa.me/201150440572",
    icon: <WhatsAppIcon className="size-4" />,
  },
  {
    key: "telegram",
    href: "https://t.me/eyad_osman2005",
    icon: <TelegramIcon className="size-6" />,
  },
  {
    key: "email",
    href: "mailto:eyadosman35@gmail.com",
    icon: <GmailIcon className="size-4" />,
  },
];

export function SocialDock() {
  const t = useTranslations("Nav");

  return (
    <aside
      aria-label="Social links"
      className="fixed inset-s-6 top-1/2 -translate-y-1/2 z-99 hidden lg:flex flex-col items-center pointer-events-auto"
    >
      {/* Decorative vertical top line */}
      <span
        aria-hidden="true"
        className="h-15 w-px bg-linear-to-b from-transparent to-border mb-3"
      />

      {/* Social Links Stack */}
      <div className="flex flex-col items-center gap-3">
        {links.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            target={link.key === "email" ? undefined : "_blank"}
            rel={link.key === "email" ? undefined : "noopener noreferrer"}
            aria-label={t(link.key)}
            className="bg-card border border-border text-icon-muted hover:bg-foreground hover:border-foreground hover:text-card group relative size-10 rounded-full flex items-center justify-center hover:translate-x-1 rtl:hover:-translate-x-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          >
            {link.icon}

            {/* Slide-out Tooltip */}
            <span
              role="tooltip"
              className="invisible pointer-events-none absolute inset-s-full ms-3.5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground opacity-0 shadow-md transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0 rtl:group-hover:translate-x-0 group-hover:visible group-focus-visible:visible group-focus-visible:opacity-100"
            >
              {t(link.key)}
            </span>
          </Link>
        ))}
      </div>

      {/* Decorative vertical bottom line */}
      <span
        aria-hidden="true"
        className="h-15 w-px bg-linear-to-t from-transparent to-border mt-3"
      />
    </aside>
  );
}
