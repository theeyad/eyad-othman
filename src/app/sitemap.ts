import type { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/lib/supabase/queries";
import { SITE_URL } from "@/lib/consts";
import { routing } from "@/i18n/routing";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllProjectSlugs();
  const locales = routing.locales;

  // Base static routes with their SEO priority and change frequency
  const staticRoutes = [
    { path: "", priority: 1.0, changeFrequency: "monthly" as const },
    { path: "/projects", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate localized entries for static routes
  for (const route of staticRoutes) {
    for (const locale of locales) {
      sitemapEntries.push({
        url: `${SITE_URL}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: Object.fromEntries([
            ...locales.map((loc) => [loc, `${SITE_URL}/${loc}${route.path}`]),
            ["x-default", `${SITE_URL}/en${route.path}`],
          ]),
        },
      });
    }
  }

  // Generate localized entries for all dynamic project routes
  const validSlugs = slugs.filter(Boolean);
  for (const slug of validSlugs) {
    for (const locale of locales) {
      sitemapEntries.push({
        url: `${SITE_URL}/${locale}/projects/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries([
            ...locales.map((loc) => [loc, `${SITE_URL}/${loc}/projects/${slug}`]),
            ["x-default", `${SITE_URL}/en/projects/${slug}`],
          ]),
        },
      });
    }
  }

  return sitemapEntries;
}
