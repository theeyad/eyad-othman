"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Loader2, Send, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import {
  contactSchema,
  type ContactFormData,
} from "@/lib/validations/contact";
import { sendContactMessageAction } from "@/app/[locale]/actions/contact";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ContactFormProps } from "@/lib/types";

export function ContactForm({ isAr }: ContactFormProps) {
  const t = useTranslations("ContactPage");
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "freelance",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormData) => {
    setFormError(null);
    try {
      const result = await sendContactMessageAction(values);
      if (!result.success) {
        const errorKey = (result as { errorKey?: string }).errorKey;
        const errorMsg = errorKey ? t(errorKey) : result.error || t("sendError");
        setFormError(errorMsg);
        toast.destructive({ title: errorMsg });
        return;
      }

      toast.success({ title: t("sendSuccess") });
      reset();
    } catch {
      const errorMsg = t("sendError");
      setFormError(errorMsg);
      toast.destructive({ title: errorMsg });
    }
  };

  const subjectOptions = [
    { value: "freelance", label: t("subjectFreelance") },
    { value: "fulltime", label: t("subjectFulltime") },
    { value: "parttime", label: t("subjectParttime") },
    { value: "consultation", label: t("subjectConsultation") },
    { value: "other", label: t("subjectOther") },
  ] as const;

  return (
    <div className="rounded-3xl border border-border bg-card p-5 sm:p-7 md:p-9 space-y-8 text-start cursor-default">
      {/* Header */}
      <div className="space-y-1.5 pb-2 border-b-3 border-border">
        <h2
          tabIndex={0}
          className={cn(
            "text-2xl sm:text-3xl uppercase tracking-tight text-foreground cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground rounded-lg w-fit",
            isAr ? "font-cairo font-bold" : "font-bebas tracking-normal",
          )}
        >
          {t("formTitle")}
        </h2>
        <p
          tabIndex={0}
          className={cn(
            "text-xs sm:text-sm text-muted-foreground cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground rounded-lg",
            isAr ? "font-cairo" : "font-manrope",
          )}
        >
          {t("formSubtitle")}
        </p>
      </div>

      {/* Error Alert Banner */}
      {formError && (
        <div
          role="alert"
          className={cn(
            "flex items-start gap-2.5 rounded-xl border border-destructive/40 bg-destructive/10 p-3.5 text-xs text-destructive",
            isAr ? "font-cairo" : "font-manrope",
          )}
        >
          <AlertCircle aria-hidden="true" className="size-4 shrink-0 mt-0.5" />
          <span>{formError}</span>
        </div>
      )}

      {/* Editorial Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {/* Name Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className={cn(
              "block text-xs font-semibold uppercase tracking-wider text-muted-foreground",
              isAr ? "font-cairo" : "font-manrope",
            )}
          >
            {t("nameLabel")} <span className="text-destructive">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder={t("namePlaceholder")}
            disabled={isSubmitting}
            {...register("name")}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(
              "w-full border-b bg-transparent px-4 py-3 text-base md:text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:border-b-foreground cursor-default",
              errors.name ? "border-b-destructive" : "border-b-border",
              isAr ? "font-cairo" : "font-manrope",
            )}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="text-xs text-destructive mt-1 font-medium">
              {errors.name.message ? t(errors.name.message) : t("nameMin")}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className={cn(
              "block text-xs font-semibold uppercase tracking-wider text-muted-foreground",
              isAr ? "font-cairo" : "font-manrope",
            )}
          >
            {t("emailLabel")} <span className="text-destructive">*</span>
          </label>
          <input
            id="email"
            type="email"
            dir="ltr"
            placeholder={t("emailPlaceholder")}
            disabled={isSubmitting}
            {...register("email")}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(
              "w-full border-b bg-transparent px-4 py-3 text-base md:text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:border-b-foreground cursor-default text-start",
              errors.email ? "border-b-destructive" : "border-b-border",
              isAr ? "font-cairo" : "font-manrope",
            )}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="text-xs text-destructive mt-1 font-medium">
              {errors.email.message ? t(errors.email.message) : t("emailInvalid")}
            </p>
          )}
        </div>

        {/* Subject Dropdown Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="subject"
            className={cn(
              "block text-xs font-semibold uppercase tracking-wider text-muted-foreground",
              isAr ? "font-cairo" : "font-manrope",
            )}
          >
            {t("subjectLabel")} <span className="text-destructive">*</span>
          </label>
          <Controller
            control={control}
            name="subject"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="subject"
                  aria-required="true"
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                  className={cn(
                    "w-full rounded-none border-0 border-b bg-transparent px-4 py-3 text-base md:text-sm text-foreground transition-colors focus-visible:outline-none focus-visible:border-b-foreground focus-visible:ring-0 cursor-default",
                    errors.subject ? "border-b-destructive" : "border-b-border",
                    isAr ? "font-cairo" : "font-manrope",
                  )}
                >
                  <SelectValue placeholder={t("subjectPlaceholder")} />
                </SelectTrigger>
                <SelectContent
                  className={cn(
                    "rounded-xl border border-border bg-card p-1 text-foreground",
                    isAr ? "font-cairo" : "font-manrope",
                  )}
                >
                  {subjectOptions.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      className="cursor-default"
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.subject && (
            <p id="subject-error" role="alert" className="text-xs text-destructive mt-1 font-medium">
              {t("subjectRequired")}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="message"
            className={cn(
              "block text-xs font-semibold uppercase tracking-wider text-muted-foreground",
              isAr ? "font-cairo" : "font-manrope",
            )}
          >
            {t("messageLabel")} <span className="text-destructive">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder={t("messagePlaceholder")}
            disabled={isSubmitting}
            {...register("message")}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(
              "w-full border-b bg-transparent px-4 py-3 text-base md:text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus-border-b-foreground cursor-default resize-none leading-relaxed min-h-28",
              errors.message ? "border-b-destructive" : "border-b-border",
              isAr ? "font-cairo" : "font-manrope",
            )}
          />
          {errors.message && (
            <p id="message-error" role="alert" className="text-xs text-destructive mt-1 font-medium">
              {errors.message.message ? t(errors.message.message) : t("messageMin")}
            </p>
          )}
        </div>

        {/* Submit Action Control */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#111111] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#111111] px-8 py-3 text-sm font-semibold transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground",
              isAr ? "font-cairo" : "font-manrope",
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                <span>{t("submitting")}</span>
              </>
            ) : (
              <>
                <Send aria-hidden="true" className="size-4 rtl:-scale-x-100" />
                <span>{t("submitButton")}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
