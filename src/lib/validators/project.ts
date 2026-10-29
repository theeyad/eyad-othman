import * as z from "zod";

export const getProjectSchema = (t: (key: string) => string) =>
  z.object({
    title: z.string().min(1, { message: t("titleEn") }),
    title_ar: z.string().min(1, { message: t("titleAr") }),
    slug: z
      .string()
      .min(1, { message: t("slug") })
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: t("slug") }),
    category: z.string().min(1, { message: t("categoryEn") }),
    category_ar: z.string().min(1, { message: t("categoryAr") }),
    description: z.string().min(1, { message: t("descriptionEn") }),
    description_ar: z.string().min(1, { message: t("descriptionAr") }),
    long_description: z.string().min(1, { message: t("longDescriptionEn") }),
    long_description_ar: z.string().min(1, { message: t("longDescriptionAr") }),
    tech_stack: z.string().min(1, { message: t("techStack") }),
    highlights: z.string().optional(),
    highlights_ar: z.string().optional(),
    live_url: z.string().optional(),
    github_url: z.string().optional(),
    featured: z.boolean(),
    display_order: z.number(),
  });

export type ProjectFormValues = z.infer<ReturnType<typeof getProjectSchema>>;
