import * as z from "zod";

export const bioSchema = z.string().max(1_000).optional();
export const workExperienceSchema = z
  .object({
    jobTitle: z.string().min(1).max(35),
    company: z.string().min(1).max(35),
    location: z.string().min(1).max(100),
    startDate: z.date(),
    endDate: z.date().or(z.literal(null)), // Allowing null for current jobs
    description: z.string().max(1000).optional(),
  })
  .refine((data) => data.endDate === null || data.startDate <= data.endDate, {
    message: "Start date must be on or before the end date",
    path: ["endDate"], // This sets the path of the error to point to `endDate` to make it clear where the error is.
  });

export const updateProfileFormSchema = z.object({
  firstName: z.string().min(2).max(45),
  lastName: z.string().min(2).max(45),
  dateOfBirth: z
    .date()
    .min(new Date(1900, 1, 1))
    .max(new Date())
    .nullable(),
  bio: bioSchema,
  githubLink: z
    .string()
    .url()
    .regex(
      /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}\/?$/,
      "Invalid GitHub URL",
    )
    .max(255)
    .optional()
    .or(z.literal(""))
    .nullish(),
  linkedInLink: z
    .string()
    .url()
    .regex(/^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/, "Invalid LinkedIn URL")
    .max(255)
    .optional()
    .or(z.literal(""))
    .nullish(),
  twitterLink: z
    .string()
    .url()
    .regex(
      /^(https?:\/\/)?(www\.)?twitter\.com\/[A-Za-z0-9_]+\/?$/,
      "Invalid Twitter URL",
    )
    .max(255)
    .optional()
    .or(z.literal(""))
    .nullish(),
  workExperience: z.array(workExperienceSchema).max(15).optional(),
});
