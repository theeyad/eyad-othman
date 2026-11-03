import { useTranslations } from "next-intl";
import {
  WhatsAppIcon,
  TelegramIconInContact,
  GmailIcon,
} from "@/components/icons";
import { SOCIAL_LINKS } from "@/components/socials";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ContactInfoProps } from "@/lib/types";

export function ContactInfo({ isAvailable, isAr }: ContactInfoProps) {
  const t = useTranslations("ContactPage");

  return (
    <aside aria-label="Direct Communication Channels" className="space-y-6 text-start">
      {/* Availability Status Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs text-muted-foreground cursor-default">
        <span
          className={cn(
            "size-2 rounded-full shrink-0",
            isAvailable ? "bg-[#22c55e]" : "bg-muted-foreground/60",
          )}
        />
        <span className={cn("font-medium", isAr ? "font-cairo" : "font-manrope")}>
          {isAvailable ? t("availableForWork") : t("notAvailable")}
        </span>
      </div>

      <div className="space-y-1">
        <h2
          tabIndex={0}
          className={cn(
            "text-xl sm:text-2xl uppercase tracking-tight text-foreground cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground rounded-lg w-fit",
            isAr ? "font-cairo font-bold" : "font-bebas tracking-normal",
          )}
        >
          {t("directChannels")}
        </h2>
        <p
          tabIndex={0}
          className={cn(
            "text-xs sm:text-sm text-muted-foreground cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground rounded-lg",
            isAr ? "font-cairo" : "font-manrope",
          )}
        >
          {t("whatsappDesc")}
        </p>
      </div>

      {/* Communication Cards List */}
      <div className="space-y-3">
        {/* WhatsApp Quick Action */}
        <a
          href={SOCIAL_LINKS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t("chatOnWhatsapp")}: +${SOCIAL_LINKS.whatsapp.split("wa.me/")[1]} (opens in new tab)`}
          className="group flex items-center justify-between rounded-2xl border border-border bg-card p-4 sm:p-5 transition-colors hover:border-foreground/40 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
        >
          <div className="flex items-center gap-3.5">
            <div aria-hidden="true" className="flex size-11 items-center justify-center rounded-xl border border-border bg-background text-foreground shrink-0">
              <WhatsAppIcon className="size-5" />
            </div>
            <div className="space-y-0.5">
              <p
                className={cn(
                  "text-sm font-semibold text-foreground",
                  isAr ? "font-cairo" : "font-manrope",
                )}
              >
                {t("chatOnWhatsapp")}
              </p>
              <p className="text-xs text-muted-foreground font-mono" dir="ltr">
                +{SOCIAL_LINKS.whatsapp.split("wa.me/")[1]}
              </p>
            </div>
          </div>
          <ArrowUpRight aria-hidden="true" className="size-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5" />
        </a>

        {/* Telegram Direct */}
        <a
          href={SOCIAL_LINKS.telegram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t("telegramTitle")}: @${SOCIAL_LINKS.telegram.split("t.me/")[1]} (opens in new tab)`}
          className="group flex items-center justify-between rounded-2xl border border-border bg-card p-4 sm:p-5 transition-colors hover:border-foreground/40 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
        >
          <div className="flex items-center gap-3.5">
            <div aria-hidden="true" className="flex size-11 items-center justify-center rounded-xl border border-border bg-background text-foreground shrink-0">
              <TelegramIconInContact className="size-5" />
            </div>
            <div className="space-y-0.5">
              <p
                className={cn(
                  "text-sm font-semibold text-foreground",
                  isAr ? "font-cairo" : "font-manrope",
                )}
              >
                {t("telegramTitle")}
              </p>
              <p className="text-xs text-muted-foreground" dir="ltr">
                @{SOCIAL_LINKS.telegram.split("t.me/")[1]}
              </p>
            </div>
          </div>
          <ArrowUpRight aria-hidden="true" className="size-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5" />
        </a>

        {/* Email Direct */}
        <a
          href={SOCIAL_LINKS.email}
          aria-label={`${t("emailTitle")}: ${SOCIAL_LINKS.email.split(":")[1]}`}
          className="group flex items-center justify-between rounded-2xl border border-border bg-card p-4 sm:p-5 transition-colors hover:border-foreground/40 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
        >
          <div className="flex items-center gap-3.5">
            <div aria-hidden="true" className="flex size-11 items-center justify-center rounded-xl border border-border bg-background text-foreground shrink-0">
              <GmailIcon className="size-5" />
            </div>
            <div className="space-y-0.5">
              <p
                className={cn(
                  "text-sm font-semibold text-foreground",
                  isAr ? "font-cairo" : "font-manrope",
                )}
              >
                {t("emailTitle")}
              </p>
              <p className="text-xs text-muted-foreground font-mono" dir="ltr">
                {SOCIAL_LINKS.email.split(":")[1]}
              </p>
            </div>
          </div>
          <ArrowUpRight aria-hidden="true" className="size-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5" />
        </a>
      </div>
    </aside>
  );
}

