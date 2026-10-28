import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { Database } from "@/lib/supabase/types";

const handleI18n = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  // 1. Let next-intl handle locale resolution and redirects
  const response = handleI18n(request);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  // Defensive fallback: If Supabase keys are not yet configured, return next-intl response
  if (!supabaseUrl || !supabaseKey) {
    return response;
  }

  // 2. Initialize Supabase SSR client to inspect and refresh auth cookies
  const supabase = createServerClient<Database>(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // 3. Validate user session cryptographically against Supabase Auth
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Detect admin routes and login route
  const adminRegex = /^\/(en|ar)\/admin(\/.*)?$/;
  const loginRegex = /^\/(en|ar)\/auth\/login\/?$/;

  const isAdminPath = adminRegex.test(pathname);
  const isLoginPage = loginRegex.test(pathname);

  const localeMatch = pathname.match(/^\/(en|ar)/);
  const currentLocale = localeMatch ? localeMatch[1] : routing.defaultLocale;

  const adminEmail = process.env.ADMIN_EMAIL;
  const isAuthorized = user && (!adminEmail || user.email === adminEmail);

  // 1. Unauthenticated/Unauthorized visitor trying to access protected admin pages
  if (isAdminPath && !isAuthorized) {
    const loginUrl = new URL(`/${currentLocale}/auth/login`, request.url);
    const redirectResponse = NextResponse.redirect(loginUrl);

    // Preserve refreshed cookies on redirect response
    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie);
    });
    return redirectResponse;
  }

  // 2. Already-authenticated admin visiting the login page
  if (isLoginPage && isAuthorized) {
    const adminUrl = new URL(`/${currentLocale}/admin`, request.url);
    const redirectResponse = NextResponse.redirect(adminUrl);

    // Preserve refreshed cookies on redirect response
    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie);
    });
    return redirectResponse;
  }

  return response;
}

export const config = {
  // Match only internationalized pathnames and redirect unlocalized paths
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
