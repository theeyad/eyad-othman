import * as z from "zod";

export const getProjectSchema = (t: (key: string) => string) =>
  z.object({
    title: z.string().min(1, { message: t("titleRequired") }),
    title_ar: z.string().min(1, { message: t("titleRequired") }),
    slug: z
      .string()
      .min(1, { message: t("slugRequired") })
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: t("slugInvalid") }),
    category: z.string().min(1, { message: t("categoryRequired") }),
    category_ar: z.string().min(1, { message: t("categoryRequired") }),
    description: z.string().min(1, { message: t("descriptionRequired") }),
    description_ar: z.string().min(1, { message: t("descriptionRequired") }),
    long_description: z.string().min(1, { message: t("longDescriptionRequired") }),
    long_description_ar: z.string().min(1, { message: t("longDescriptionRequired") }),
    tech_stack: z.string().min(1, { message: t("techStackRequired") }),
    highlights: z.string().optional(),
    highlights_ar: z.string().optional(),
    live_url: z.string().optional(),
    github_url: z.string().optional(),
    featured: z.boolean(),
    display_order: z.number(),
  });

export type ProjectFormValues = z.infer<ReturnType<typeof getProjectSchema>>;
