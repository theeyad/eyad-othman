import type React from "react";
import type { Database } from "./supabase/types";

// ============================================================================
// 1. SUPABASE DATABASE & DERIVED TYPES
// ============================================================================

export * from "./supabase/types";

export type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
export type ProjectImageRow =
  Database["public"]["Tables"]["project_images"]["Row"];
export type ExperienceRow =
  Database["public"]["Tables"]["experience"]["Row"];
export type ProfileRow = Database["public"]["Tables"]["profile"]["Row"];

export interface ProjectWithImages extends ProjectRow {
  project_images: ProjectImageRow[];
}

// ============================================================================
// 2. MEDIA & UPLOADER TYPES
// ============================================================================

export interface GalleryItem {
  id: string;
  file?: File;
  previewUrl: string;
  is_primary: boolean;
}

export interface SliderImage {
  url: string;
  alt_text?: string | null;
}

export interface ImageUploaderProps {
  value?: string;
  onSave: (file: File) => Promise<void>;
  onCancel?: () => void;
  onError?: (message: string) => void;
  disabled?: boolean;
}

export interface MultiImageUploaderProps {
  value?: GalleryItem[];
  onChange: (images: GalleryItem[]) => void;
  onError: (message: string) => void;
  disabled?: boolean;
}

export interface ProjectImageSliderProps {
  images: SliderImage[];
  title: string;
  isAr?: boolean;
}

// ============================================================================
// 3. UI, NAVIGATION & THEME TYPES
// ============================================================================

export interface SocialLink {
  key: "github" | "linkedin" | "whatsapp" | "telegram" | "email";
  href: string;
  icon: React.ReactNode;
}

export interface NavTabProps {
  href: string;
  label: string;
  isActive?: boolean;
  isAr: boolean;
  isExternal?: boolean;
  download?: string;
  logo?: React.ReactNode;
}

export interface SplitTextProps {
  text: string;
  isArabic?: boolean;
  className?: string;
  delay?: number;
  charDelay?: number;
  wordDelay?: number;
}

export interface ThemeToggleProps {
  className?: string;
  iconClassName?: string;
}

export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme | null;
  resolvedTheme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export interface SkillItem {
  name: string;
  icon: React.ReactNode;
}

export type { ToastItem } from "@/hooks/use-toast";

// ============================================================================
// 4. PORTFOLIO COMPONENT PROPS
// ============================================================================

export interface ExperienceProps {
  experiences: ExperienceRow[];
  locale: string;
  isAr: boolean;
}

export interface FeaturedProjectsProps {
  projects: ProjectWithImages[];
  isAr: boolean;
}

export interface ScrollCarouselProps {
  projects: ProjectWithImages[];
  isAr?: boolean;
  className?: string;
  maxScrollHeight?: number;
}

// ============================================================================
// 5. ADMIN & FORM PROPS
// ============================================================================

export interface DeleteTarget {
  id: string;
  type: "project" | "experience";
  title: string;
}

export interface AdminDashboardClientProps {
  initialProfile: ProfileRow | null;
  initialProjects: ProjectWithImages[];
  initialExperience: ExperienceRow[];
}

export interface ExperienceFormProps {
  initialData?: ExperienceRow;
}

export interface ProjectFormProps {
  initialData?: ProjectWithImages;
}

// ============================================================================
// 6. NEXT.JS PAGE PROPS
// ============================================================================

export interface EditExperiencePageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export interface EditProjectPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export interface ProjectPageProps {
  params: Promise<{
    locale: string;
    project: string;
  }>;
}
