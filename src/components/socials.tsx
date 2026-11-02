import { Download } from "lucide-react";
import {
  GitHubIcon,
  LinkedInIcon,
  WhatsAppIcon,
  TelegramIconInContact,
  GmailIcon,
} from "@/components/icons";
import type { CommunicationChip } from "@/lib/types";

export const SOCIAL_LINKS = {
  email: "mailto:eyadosman35@gmail.com",
  whatsapp: "https://wa.me/201150440572",
  github: "https://github.com/theeyad",
  linkedin: "https://www.linkedin.com/in/eyad-othman",
  telegram: "https://t.me/eyad_osman2005",
} as const;

export function getCommunicationChips(
  t: (key: string) => string,
): CommunicationChip[] {
  return [
    {
      key: "email",
      name: t("email"),
      href: SOCIAL_LINKS.email,
      icon: <GmailIcon className="size-4 text-foreground shrink-0" />,
    },
    {
      key: "whatsapp",
      name: t("whatsapp"),
      href: SOCIAL_LINKS.whatsapp,
      icon: <WhatsAppIcon className="size-4 text-foreground shrink-0" />,
    },
    {
      key: "github",
      name: t("github"),
      href: SOCIAL_LINKS.github,
      icon: <GitHubIcon className="size-4 text-foreground shrink-0" />,
    },
    {
      key: "linkedin",
      name: t("linkedin"),
      href: SOCIAL_LINKS.linkedin,
      icon: <LinkedInIcon className="size-4 text-foreground shrink-0" />,
    },
    {
      key: "telegram",
      name: t("telegram"),
      href: SOCIAL_LINKS.telegram,
      icon: (
        <TelegramIconInContact className="size-4 text-foreground shrink-0" />
      ),
    },
  ];
}

export function getContactChips(
  t: (key: string) => string,
  resumeUrl: string,
): CommunicationChip[] {
  return [
    ...getCommunicationChips(t),
    {
      key: "cv",
      name: t("cv"),
      href: resumeUrl,
      icon: <Download className="size-4 text-foreground shrink-0" />,
    },
  ];
}
