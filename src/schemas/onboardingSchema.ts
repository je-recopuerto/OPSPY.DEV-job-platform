import { z } from "zod";

export const onboardingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  dateOfBirth: z.date().max(new Date(), "Date of birth must be in the past"),
  bio: z.string().min(0, "Bio is required"),
  // locationCountry: z.string().min(1, "Location is required"),
  location: z.string().min(1, "Location is required"),
  linkedinUrl: z.string().url("Invalid URL").or(z.literal("")),
  githubUrl: z.string().url("Invalid URL").or(z.literal("")),
  portfolioUrl: z.string().url("Invalid URL").or(z.literal("")),
  // workExperience: z.array(z.object({
  //   roleTitle: z.string().min(1, 'Role title is required'),
  //   company: z.string().min(1, 'Company name is required'),
  //   startDate: z.date().max(new Date(), 'Start date must be in the past'),
  //   endDate: z.date().max(new Date(), 'End date must be in the past'),
  //   description: z.string().min(1, 'Description is required'),
  // }))
});
