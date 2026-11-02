"use client";

import { useTranslations } from "next-intl";
import {
  GitHubIcon,
  LinkedInIcon,
  WhatsAppIcon,
  TelegramIconInDock,
  GmailIcon,
} from "@/components/icons";
import { SocialLink } from "@/lib/types";
import { SOCIAL_LINKS } from "@/components/socials";

export const links: SocialLink[] = [
  {
    key: "github",
    href: SOCIAL_LINKS.github,
    icon: <GitHubIcon className="size-4" />,
  },
  {
    key: "linkedin",
    href: SOCIAL_LINKS.linkedin,
    icon: <LinkedInIcon className="size-4" />,
  },
  {
    key: "whatsapp",
    href: SOCIAL_LINKS.whatsapp,
    icon: <WhatsAppIcon className="size-4" />,
  },
  {
    key: "telegram",
    href: SOCIAL_LINKS.telegram,
    icon: <TelegramIconInDock className="size-6" />,
  },
  {
    key: "email",
    href: SOCIAL_LINKS.email,
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
          <a
            key={link.key}
            href={link.href}
            target={link.key === "email" ? undefined : "_blank"}
            rel={link.key === "email" ? undefined : "noopener noreferrer"}
            aria-label={t(link.key)}
            className="cursor-default bg-card border border-border text-icon-muted hover:bg-foreground hover:border-foreground hover:text-card group relative size-10 rounded-full flex items-center justify-center hover:translate-x-1 rtl:hover:-translate-x-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          >
            {link.icon}

            {/* Slide-out Tooltip */}
            <span
              role="tooltip"
              className="invisible pointer-events-none absolute inset-s-full ms-3.5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground opacity-0 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0 rtl:group-hover:translate-x-0 group-hover:visible group-focus-visible:visible group-focus-visible:opacity-100"
            >
              {t(link.key)}
            </span>
          </a>
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
