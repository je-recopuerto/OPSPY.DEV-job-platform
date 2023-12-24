import * as z from "zod";

export const updateProfileFormSchema = z.object({
  firstName: z.string().min(2).max(45),
  lastName: z.string().min(2).max(45),
  email: z.string().email(),
  dateOfBirth: z
    .date()
    .min(new Date(1900, 1, 1))
    .max(new Date())
    .nullable(),
  bio: z.string().max(255).nullish(),
});
