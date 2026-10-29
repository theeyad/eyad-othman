export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          slug: string;
          title: string;
          title_ar: string;
          category: string;
          category_ar: string;
          description: string;
          description_ar: string;
          long_description: string;
          long_description_ar: string;
          tech_stack: string[];
          highlights: string[];
          highlights_ar: string[];
          live_url: string | null;
          github_url: string | null;
          featured: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          title_ar: string;
          category: string;
          category_ar: string;
          description: string;
          description_ar: string;
          long_description: string;
          long_description_ar: string;
          tech_stack?: string[];
          highlights?: string[];
          highlights_ar?: string[];
          live_url?: string | null;
          github_url?: string | null;
          featured?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          title_ar?: string;
          category?: string;
          category_ar?: string;
          description?: string;
          description_ar?: string;
          long_description?: string;
          long_description_ar?: string;
          tech_stack?: string[];
          highlights?: string[];
          highlights_ar?: string[];
          live_url?: string | null;
          github_url?: string | null;
          featured?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      project_images: {
        Row: {
          id: string;
          project_id: string;
          url: string;
          position: number;
          is_primary: boolean;
          alt_text: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          url: string;
          position?: number;
          is_primary?: boolean;
          alt_text?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          url?: string;
          position?: number;
          is_primary?: boolean;
          alt_text?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_images_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          }
        ];
      };
      experience: {
        Row: {
          id: string;
          role: string;
          role_ar: string;
          company: string;
          company_url: string | null;
          type: string;
          type_ar: string;
          start_date: string;
          end_date: string | null;
          is_current: boolean;
          description: string;
          description_ar: string;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          role: string;
          role_ar: string;
          company: string;
          company_url?: string | null;
          type: string;
          type_ar: string;
          start_date: string;
          end_date?: string | null;
          is_current?: boolean;
          description: string;
          description_ar: string;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          role?: string;
          role_ar?: string;
          company?: string;
          company_url?: string | null;
          type?: string;
          type_ar?: string;
          start_date?: string;
          end_date?: string | null;
          is_current?: boolean;
          description?: string;
          description_ar?: string;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      profile: {
        Row: {
          id: number;
          avatar_url: string;
          resume_url: string;
          available_for_work: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          avatar_url?: string;
          resume_url?: string;
          available_for_work?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          avatar_url?: string;
          resume_url?: string;
          available_for_work?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Convenient helper aliases
export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];
export type ProjectUpdate = Database["public"]["Tables"]["projects"]["Update"];

export type ProjectImage = Database["public"]["Tables"]["project_images"]["Row"];
export type ProjectImageInsert = Database["public"]["Tables"]["project_images"]["Insert"];
export type ProjectImageUpdate = Database["public"]["Tables"]["project_images"]["Update"];

export type Experience = Database["public"]["Tables"]["experience"]["Row"];
export type ExperienceInsert = Database["public"]["Tables"]["experience"]["Insert"];
export type ExperienceUpdate = Database["public"]["Tables"]["experience"]["Update"];

export type Profile = Database["public"]["Tables"]["profile"]["Row"];
export type ProfileInsert = Database["public"]["Tables"]["profile"]["Insert"];
export type ProfileUpdate = Database["public"]["Tables"]["profile"]["Update"];

export interface ProjectWithImages extends Project {
  images: ProjectImage[];
}
