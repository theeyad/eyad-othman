import * as z from "zod";

export const getLoginSchema = (t: (key: string) => string) =>
    z.object({
        email: z
            .email({ message: t("invalidEmail") })
            .min(1, { message: t("invalidEmail") }),
        password: z
            .string()
            .min(8, { message: t("passwordMinLength") }),
    });

export type LoginFormValues = z.infer<ReturnType<typeof getLoginSchema>>;
