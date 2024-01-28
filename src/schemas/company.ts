import { z } from "zod";

export const companyFilterSchema = z.object({
  name: z.string().max(255).optional(),
  // type: z.array(z.nativeEnum(JobType)).optional(),
  page: z.number().min(1).optional(),
});
