import { z } from "zod";

export const contactSubjectEnum = z.enum([
  "freelance",
  "fulltime",
  "parttime",
  "consultation",
  "other",
]);

export type ContactSubject = z.infer<typeof contactSubjectEnum>;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "nameMin" })
    .max(100, { message: "nameMax" }),
  email: z
    .email({ message: "emailInvalid" })
    .max(255),
  subject: contactSubjectEnum,
  message: z
    .string()
    .trim()
    .min(5, { message: "messageMin" })
    .max(5000, { message: "messageMax" }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

