import { z } from "zod";

export const rejectCandidateSchema = z.object({
  reason: z.string().max(1000).optional(),
  notifyCandidate: z.boolean(),
});

export const acceptCandidateSchema = z
  .object({
    message: z.string().max(1000).optional(),
    notifyCandidate: z.boolean(),
  })
  .refine(
    (data) => {
      // If notifyCandidate is true, message must not be undefined or an empty string.
      // Return true if the condition is met or if notifyCandidate is false.

      return !(
        data.notifyCandidate &&
        (data.message === undefined || data.message.trim() === "")
      );
    },
    {
      // Custom error message for the refinement.
      message: "Message is required when notify candidate is true.",
      path: ["message"],
    },
  );
