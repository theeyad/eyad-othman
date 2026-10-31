import { cache } from "react";
import { createStaticClient } from "@/lib/supabase/static";
import type {
  ProjectWithImages,
  ExperienceRow,
  ProfileRow,
} from "@/lib/types";

/**
 * Fetch profile settings (availability status, avatar, resume URL).
 * Deduplicated per request via React 19 cache().
 */
export const getProfile = cache(async (): Promise<ProfileRow | null> => {
  try {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("id", 1)
      .single();

    if (error || !data) return null;
    return data;
  } catch (err) {
    console.error("Error fetching profile:", err);
    return null;
  }
});

/**
 * Fetch all experience records ordered by display_order ASC, start_date DESC.
 * Deduplicated per request via React 19 cache().
 */
export const getExperiences = cache(async (): Promise<ExperienceRow[]> => {
  try {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("experience")
      .select("*")
      .order("display_order", { ascending: true })
      .order("start_date", { ascending: false });

    if (error || !data) return [];
    return data;
  } catch (err) {
    console.error("Error fetching experiences:", err);
    return [];
  }
});

/**
 * Fetch featured projects with their images for the homepage carousel.
 * Deduplicated per request via React 19 cache().
 */
export const getFeaturedProjects = cache(async (): Promise<ProjectWithImages[]> => {
  try {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*, project_images(*)")
      .eq("featured", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    // Sort images by position ascending within each project
    return data.map((project) => ({
      ...project,
      project_images: (project.project_images || []).sort(
        (a, b) => a.position - b.position
      ),
    }));
  } catch (err) {
    console.error("Error fetching featured projects:", err);
    return [];
  }
});

/**
 * Fetch all projects with their gallery images for the projects archive page.
 * Deduplicated per request via React 19 cache().
 */
export const getAllProjects = cache(async (): Promise<ProjectWithImages[]> => {
  try {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*, project_images(*)")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    return data.map((project) => ({
      ...project,
      project_images: (project.project_images || []).sort(
        (a, b) => a.position - b.position
      ),
    }));
  } catch (err) {
    console.error("Error fetching all projects:", err);
    return [];
  }
});

/**
 * Fetch a single project by its unique slug with its gallery images.
 * Deduplicated per request via React 19 cache().
 */
export const getProjectBySlug = cache(
  async (slug: string): Promise<ProjectWithImages | null> => {
    try {
      const supabase = createStaticClient();
      const { data, error } = await supabase
        .from("projects")
        .select("*, project_images(*)")
        .eq("slug", slug)
        .single();

      if (error || !data) return null;

      return {
        ...data,
        project_images: (data.project_images || []).sort(
          (a, b) => a.position - b.position
        ),
      };
    } catch (err) {
      console.error(`Error fetching project slug "${slug}":`, err);
      return null;
    }
  }
);

/**
 * Fetch all project slugs for generateStaticParams.
 */
export const getAllProjectSlugs = cache(async (): Promise<string[]> => {
  try {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("projects")
      .select("slug");

    if (error || !data) return [];
    return data.map((p) => p.slug);
  } catch (err) {
    console.error("Error fetching project slugs:", err);
    return [];
  }
});

