import { z } from "zod";

export const rejectCandidateSchema = z.object({
  reason: z.string().max(1000).optional(),
});
