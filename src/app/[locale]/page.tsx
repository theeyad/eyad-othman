import { getLocale } from "next-intl/server";
import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { SkillsLoopSection } from "@/components/skills-loop-section";
import Experience from "@/components/experience";
import FeaturedProjects from "@/components/featured-projects";
import { HomeContactCta } from "@/components/home-contact-cta";
import {
  getProfile,
  getExperiences,
  getFeaturedProjects,
} from "@/lib/supabase/queries";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === "ar";

  const title = isAr
    ? "إياد عثمان"
    : "Eyad Othman";

  const description = isAr
    ? "موقع إياد عثمان — مطور واجهات أمامية. رجلٌ تعلم، ويتعلم، وسيتعلم دائمًا... تصفح أحدث المشاريع البرمجية، سجل الخبرات، والمهارات."
    : "Portfolio of Eyad Othman — Frontend Developer. A man who learned, is learning, and will always learn... Explore featured projects, experience, and skills.";

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ar: "/ar",
        "x-default": "/en",
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}`,
    },
  };
}

export default async function HomePage() {
  const locale = await getLocale();
  const isAr = locale === "ar";

  // Concurrent parallel data fetching
  const [profile, experiences, featuredProjects] = await Promise.all([
    getProfile(),
    getExperiences(),
    getFeaturedProjects(),
  ]);

  const resumeUrl = profile?.resume_url || "/Eyad_Othman_Frontend.pdf";

  return (
    <main className="min-h-[calc(100vh-5rem)] flex flex-col items-center px-6 sm:px-10 lg:ps-28 lg:pe-28 pt-12 md:pt-28 pb-12 md:pb-24 bg-background text-foreground">
      <div className="w-full max-w-6xl mx-auto">
        {/* 1. Hero Section */}
        <HeroSection profile={profile} isAr={isAr} />

        {/* 2. Skills Loop Section */}
        <SkillsLoopSection isAr={isAr} />

        {/* 3. Experience Timeline Section */}
        <Experience experiences={experiences} locale={locale} isAr={isAr} />

        {/* 4. Featured Projects Section */}
        <FeaturedProjects projects={featuredProjects} isAr={isAr} />

        {/* 5. Contact CTA Section */}
        <HomeContactCta resumeUrl={resumeUrl} isAr={isAr} />
      </div>
    </main>
  );
}
