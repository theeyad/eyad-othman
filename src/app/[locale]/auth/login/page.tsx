"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getLoginSchema, type LoginFormValues } from "@/lib/validators/login";
import { loginAction } from "@/app/[locale]/actions/auth";
import { cn } from "@/lib/utils";
import { Mail, Eye, EyeOff, AlertCircle, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const t = useTranslations("Auth");
  const locale = useLocale();
  const isAr = locale === "ar";
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(getLoginSchema(t)),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setAuthError(null);

    const result = await loginAction(values);

    if (!result.success) {
      setAuthError(result.error || t("invalidCredentials"));
      setIsLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
        <main className="min-h-[calc(100vh-5rem)] flex flex-col justify-center px-10 sm:px-10 pt-28 pb-24 bg-background text-foreground">
            <div className="w-full lg:ms-10">
        {/* Back Link to Portfolio */}
        <div className="mb-6">
          <Link
            href="/"
            className={cn(
              "inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors cursor-default",
              isAr ? "font-cairo" : "font-manrope",
            )}
          >
            {isAr ? (
              <>
                <ArrowRight className="size-4" />
                <span>العودة إلى الرئيسية</span>
              </>
            ) : (
              <>
                <ArrowLeft className="size-4" />
                <span>Back to portfolio</span>
              </>
            )}
          </Link>
        </div>

        {/* Login Container */}
        <div className="p-7 sm:p-9 cursor-default">
          {/* Header */}
          <div className="text-start space-y-2 mb-8">
            <h1
              className={cn(
                "text-3xl sm:text-4xl uppercase tracking-tight text-foreground",
                isAr ? "font-cairo font-bold" : "font-bebas tracking-normal",
              )}
            >
              {t("loginTitle")}
            </h1>

            <p
              className={cn(
                "text-xs sm:text-sm text-muted-foreground leading-relaxed",
                isAr ? "font-cairo" : "font-manrope",
              )}
            >
              {t("loginSubtitle")}
            </p>
          </div>

          {/* Error Banner */}
          {authError && (
            <div
              role="alert"
              className={cn(
                "mb-6 flex items-start gap-2.5 rounded-xl border border-destructive/40 bg-destructive/10 p-3.5 text-xs text-destructive",
                isAr ? "font-cairo" : "font-manrope",
              )}
            >
              <AlertCircle className="size-4 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            {/* Email Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className={cn(
                  "block text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                  isAr ? "font-cairo" : "font-manrope",
                )}
              >
                {t("emailLabel")}
              </label>

              <div className="relative">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t("emailPlaceholder")}
                  disabled={isLoading}
                  {...register("email")}
                  className={cn(
                    "w-full border-b bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:border-b-foreground cursor-default",
                    errors.email ? "border-b-destructive" : "border-b-border",
                    isAr ? "pe-10 font-cairo" : "pe-10 font-manrope",
                  )}
                />
                <div className="pointer-events-none absolute inset-y-0 inset-e-0 flex items-center pe-3.5 text-muted-foreground">
                  <Mail className="size-4" />
                </div>
              </div>

              {errors.email && (
                <p className="text-xs text-destructive mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className={cn(
                  "block text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                  isAr ? "font-cairo" : "font-manrope",
                )}
              >
                {t("passwordLabel")}
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder={t("passwordPlaceholder")}
                  disabled={isLoading}
                  {...register("password")}
                  className={cn(
                    "w-full border-b bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:border-b-foreground cursor-default",
                    errors.password ? "border-b-destructive" : "border-b-border",
                    isAr ? "pe-10 font-cairo" : "pe-10 font-manrope",
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                  className="absolute inset-y-0 inset-e-0 flex items-center pe-3.5 text-muted-foreground hover:text-foreground transition-colors cursor-default"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-xs text-destructive mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#111111] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#111111] px-6 py-3 text-sm font-semibold transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:pointer-events-none cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground mt-4",
                isAr ? "font-cairo" : "font-manrope",
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>{t("signingIn")}</span>
                </>
              ) : (
                <span>{t("signInButton")}</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}