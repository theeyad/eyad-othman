import * as z from "zod";

export const getExperienceSchema = (t: (key: string) => string) =>
  z.object({
    role: z.string().min(1, { message: t("roleEn") }),
    role_ar: z.string().min(1, { message: t("roleAr") }),
    company: z.string().min(1, { message: t("company") }),
    company_url: z.string().optional(),
    type: z.string().min(1, { message: t("typeEn") }),
    type_ar: z.string().min(1, { message: t("typeAr") }),
    start_date: z.string().min(1, { message: t("startDate") }),
    end_date: z.string().optional(),
    is_current: z.boolean(),
    description: z.string().min(1, { message: t("expDescriptionEn") }),
    description_ar: z.string().min(1, { message: t("expDescriptionAr") }),
    display_order: z.number(),
  });

export type ExperienceFormValues = z.infer<ReturnType<typeof getExperienceSchema>>;
