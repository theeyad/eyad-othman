import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/consts";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/en/admin",
          "/en/admin/*",
          "/ar/admin",
          "/ar/admin/*",
          "/auth/login",
          "/en/auth/login",
          "/ar/auth/login",
          "/api/*",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
