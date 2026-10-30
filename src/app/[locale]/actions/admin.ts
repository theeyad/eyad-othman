"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { ProjectFormValues } from "@/lib/validators/project";
import { ExperienceFormValues } from "@/lib/validators/experience";

async function verifyAdminAuth() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { authorized: false, errorKey: "unauthorized" as const, error: "Unauthorized access", supabase };
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail && user.email !== adminEmail) {
    return { authorized: false, errorKey: "unauthorized" as const, error: "Unauthorized user email", supabase };
  }

  return { authorized: true, user, supabase };
}

// ============================================================================
// PROFILE & AVAILABILITY ACTIONS
// ============================================================================

export async function toggleAvailabilityAction(available: boolean) {
  try {
    const auth = await verifyAdminAuth();
    if (!auth.authorized) {
      return { success: false, errorKey: auth.errorKey, error: auth.error };
    }

    const { error } = await auth.supabase
      .from("profile")
      .update({ available_for_work: available, updated_at: new Date().toISOString() })
      .eq("id", 1);

    if (error) {
      return { success: false, errorKey: "toggleError", error: error.message };
    }

    revalidatePath("/", "layout");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to toggle status";
    return { success: false, errorKey: "toggleError", error: message };
  }
}

export async function updateProfileAvatarAction(avatarUrl: string) {
  try {
    const auth = await verifyAdminAuth();
    if (!auth.authorized) {
      return { success: false, errorKey: auth.errorKey, error: auth.error };
    }

    const { error } = await auth.supabase
      .from("profile")
      .update({ avatar_url: avatarUrl, updated_at: new Date().toISOString() })
      .eq("id", 1);

    if (error) {
      return { success: false, errorKey: "avatarError", error: error.message };
    }

    revalidatePath("/", "layout");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update avatar";
    return { success: false, errorKey: "avatarError", error: message };
  }
}

// ============================================================================
// PROJECTS CRUD ACTIONS
// ============================================================================

export async function createProjectAction(
  values: ProjectFormValues,
  images: { url: string; is_primary: boolean }[] = []
) {
  try {
    const auth = await verifyAdminAuth();
    if (!auth.authorized) {
      return { success: false, error: auth.error };
    }

    const techStackArray = values.tech_stack
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const highlightsArray = values.highlights
      ? values.highlights
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    const highlightsArArray = values.highlights_ar
      ? values.highlights_ar
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    const { data: project, error: projectError } = await auth.supabase
      .from("projects")
      .insert({
        slug: values.slug.trim().toLowerCase(),
        title: values.title.trim(),
        title_ar: values.title_ar.trim(),
        category: values.category.trim(),
        category_ar: values.category_ar.trim(),
        description: values.description.trim(),
        description_ar: values.description_ar.trim(),
        long_description: values.long_description.trim(),
        long_description_ar: values.long_description_ar.trim(),
        tech_stack: techStackArray,
        highlights: highlightsArray,
        highlights_ar: highlightsArArray,
        live_url: values.live_url?.trim() || null,
        github_url: values.github_url?.trim() || null,
        featured: Boolean(values.featured),
        display_order: Number(values.display_order) || 0,
      })
      .select("id")
      .single();

    if (projectError || !project) {
      const isConflict =
        projectError?.code === "23505" ||
        projectError?.message?.toLowerCase().includes("unique");
      return {
        success: false,
        errorKey: isConflict ? "slugExists" : "saveError",
        error: projectError?.message || "Failed to create project",
      };
    }

    if (images.length > 0) {
      const projectImages = images.map((img, idx) => ({
        project_id: project.id,
        url: img.url,
        position: idx,
        is_primary: img.is_primary,
      }));

      const { error: imagesError } = await auth.supabase
        .from("project_images")
        .insert(projectImages);

      if (imagesError) {
        return { success: false, errorKey: "saveError", error: imagesError.message };
      }
    }

    revalidatePath("/", "layout");
    return { success: true, projectId: project.id };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create project";
    return { success: false, errorKey: "saveError", error: message };
  }
}

export async function updateProjectAction(
  id: string,
  values: ProjectFormValues,
  images: { url: string; is_primary: boolean }[] = []
) {
  try {
    const auth = await verifyAdminAuth();
    if (!auth.authorized) {
      return { success: false, errorKey: auth.errorKey, error: auth.error };
    }

    const techStackArray = values.tech_stack
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const highlightsArray = values.highlights
      ? values.highlights
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    const highlightsArArray = values.highlights_ar
      ? values.highlights_ar
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    const { error: projectError } = await auth.supabase
      .from("projects")
      .update({
        slug: values.slug.trim().toLowerCase(),
        title: values.title.trim(),
        title_ar: values.title_ar.trim(),
        category: values.category.trim(),
        category_ar: values.category_ar.trim(),
        description: values.description.trim(),
        description_ar: values.description_ar.trim(),
        long_description: values.long_description.trim(),
        long_description_ar: values.long_description_ar.trim(),
        tech_stack: techStackArray,
        highlights: highlightsArray,
        highlights_ar: highlightsArArray,
        live_url: values.live_url?.trim() || null,
        github_url: values.github_url?.trim() || null,
        featured: Boolean(values.featured),
        display_order: Number(values.display_order) || 0,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (projectError) {
      const isConflict =
        projectError.code === "23505" ||
        projectError.message.toLowerCase().includes("unique");
      return {
        success: false,
        errorKey: isConflict ? "slugExists" : "saveError",
        error: projectError.message,
      };
    }

    // Refresh images
    await auth.supabase.from("project_images").delete().eq("project_id", id);

    if (images.length > 0) {
      const projectImages = images.map((img, idx) => ({
        project_id: id,
        url: img.url,
        position: idx,
        is_primary: img.is_primary,
      }));

      const { error: imagesError } = await auth.supabase
        .from("project_images")
        .insert(projectImages);

      if (imagesError) {
        return { success: false, errorKey: "saveError", error: imagesError.message };
      }
    }

    revalidatePath("/", "layout");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update project";
    return { success: false, errorKey: "saveError", error: message };
  }
}

export async function deleteProjectAction(id: string) {
  try {
    const auth = await verifyAdminAuth();
    if (!auth.authorized) {
      return { success: false, errorKey: auth.errorKey, error: auth.error };
    }

    const { error } = await auth.supabase.from("projects").delete().eq("id", id);

    if (error) {
      return { success: false, errorKey: "deleteError", error: error.message };
    }

    revalidatePath("/", "layout");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete project";
    return { success: false, errorKey: "deleteError", error: message };
  }
}

// ============================================================================
// EXPERIENCE CRUD ACTIONS
// ============================================================================

export async function createExperienceAction(values: ExperienceFormValues) {
  try {
    const auth = await verifyAdminAuth();
    if (!auth.authorized) {
      return { success: false, errorKey: auth.errorKey, error: auth.error };
    }

    const { error } = await auth.supabase.from("experience").insert({
      role: values.role.trim(),
      role_ar: values.role_ar.trim(),
      company: values.company.trim(),
      company_url: values.company_url?.trim() || null,
      type: values.type.trim(),
      type_ar: values.type_ar.trim(),
      start_date: values.start_date,
      end_date: values.is_current ? null : values.end_date || null,
      is_current: Boolean(values.is_current),
      description: values.description.trim(),
      description_ar: values.description_ar.trim(),
      display_order: Number(values.display_order) || 0,
    });

    if (error) {
      return { success: false, errorKey: "saveError", error: error.message };
    }

    revalidatePath("/", "layout");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create experience";
    return { success: false, errorKey: "saveError", error: message };
  }
}

export async function updateExperienceAction(id: string, values: ExperienceFormValues) {
  try {
    const auth = await verifyAdminAuth();
    if (!auth.authorized) {
      return { success: false, errorKey: auth.errorKey, error: auth.error };
    }

    const { error } = await auth.supabase
      .from("experience")
      .update({
        role: values.role.trim(),
        role_ar: values.role_ar.trim(),
        company: values.company.trim(),
        company_url: values.company_url?.trim() || null,
        type: values.type.trim(),
        type_ar: values.type_ar.trim(),
        start_date: values.start_date,
        end_date: values.is_current ? null : values.end_date || null,
        is_current: Boolean(values.is_current),
        description: values.description.trim(),
        description_ar: values.description_ar.trim(),
        display_order: Number(values.display_order) || 0,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      return { success: false, errorKey: "saveError", error: error.message };
    }

    revalidatePath("/", "layout");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update experience";
    return { success: false, errorKey: "saveError", error: message };
  }
}

export async function deleteExperienceAction(id: string) {
  try {
    const auth = await verifyAdminAuth();
    if (!auth.authorized) {
      return { success: false, errorKey: auth.errorKey, error: auth.error };
    }

    const { error } = await auth.supabase.from("experience").delete().eq("id", id);

    if (error) {
      return { success: false, errorKey: "deleteError", error: error.message };
    }

    revalidatePath("/", "layout");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete experience";
    return { success: false, errorKey: "deleteError", error: message };
  }
}

