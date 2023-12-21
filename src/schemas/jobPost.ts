import { z } from "zod";

export const createJobPostSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(255, "Title must be less than 255 characters"),
    description: z
      .string()
      .min(1, "Description is required")
      .max(255, "Description must be less than 255 characters"),
    minSalary: z.number().min(0, "Minimum salary must be greater than 0"),
    maxSalary: z.number(),
    location: z.string().min(1, "Location is required"),
    currency: z.string().min(1, "Currency is required"),
    type: z.string().min(1, "Type is required"),
    isRemote: z.boolean(),
  })
  .refine((data) => {
    if (data.minSalary && data.maxSalary) {
      return data.minSalary <= data.maxSalary;
    }
    return true;
  }, "Minimum salary must be less than maximum salary");
