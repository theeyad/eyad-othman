import * as z from "zod";

export const getExperienceSchema = (t: (key: string) => string) =>
  z.object({
    role: z.string().min(1, { message: t("roleRequired") }),
    role_ar: z.string().min(1, { message: t("roleRequired") }),
    company: z.string().min(1, { message: t("companyRequired") }),
    company_url: z.string().optional(),
    type: z.string().min(1, { message: t("typeRequired") }),
    type_ar: z.string().min(1, { message: t("typeRequired") }),
    start_date: z.string().min(1, { message: t("startDateRequired") }),
    end_date: z.string().optional(),
    is_current: z.boolean(),
    description: z.string().min(1, { message: t("descriptionRequired") }),
    description_ar: z.string().min(1, { message: t("descriptionRequired") }),
    display_order: z.number(),
  });

export type ExperienceFormValues = z.infer<ReturnType<typeof getExperienceSchema>>;
