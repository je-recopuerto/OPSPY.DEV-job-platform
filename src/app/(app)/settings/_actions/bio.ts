"use server";

import { auth } from "@/auth";
import { createServerAction, ServerActionError } from "@/lib/action-utils";
import {
  getUserSubscriptionPlan,
  getUserWithBioGenerationsById,
} from "@/lib/data/user";
import { UserWithBioGenerations } from "@/lib/data/user.types";
import prisma from "@/lib/db";
import { improveBio } from "@/lib/openai";
import { bioSchema } from "@/schemas/updateProfileSchema";
import { UserSubscriptionPlan } from "@/types";
import { RateLimitError } from "openai";

export const getEnhancedBio = createServerAction(async (bio: string) => {
  const response = bioSchema.safeParse(bio);
  if (!response.success)
    throw new ServerActionError(response.error.errors.join(", "));

  const user = await auth().then(
    async (session) => await getUserWithBioGenerationsById(session?.user?.id),
  );
  if (!user) throw new ServerActionError("You are not permitted to do this.");

  const plan = await getUserSubscriptionPlan(user.id);

  // Remove one
  if (canUserGenerateBio(plan, user)) {
    let newBio;

    try {
      newBio = await improveBio(response.data!);
    } catch (error) {
      if (error instanceof RateLimitError) {
        throw new ServerActionError(
          "OpenAI rate limit exceeded - This is an issue with our site. Please try again later.",
        );
      } else if (error instanceof Error) {
        throw new ServerActionError(
          "An unexpected error occurred. Please try again later.",
        );
      }
    }

    await prisma.bioGeneration.create({
      data: {
        userId: user.id,
        content: newBio!,
      },
    });

    return newBio;
  } else {
    throw new ServerActionError(
      "You have reached your daily limit for bio generations.",
    );
  }
});

export const getMyGenerationsLeft = createServerAction(async () => {
  const user = await auth().then(
    async (session) => await getUserWithBioGenerationsById(session?.user?.id),
  );
  if (!user) return 0;

  const plan = await getUserSubscriptionPlan(user.id);
  return getUserBioGenerationsLeft(user, plan);
});

const canUserGenerateBio = (
  plan: UserSubscriptionPlan,
  user?: UserWithBioGenerations,
) => {
  if (!user) return false;

  return getUserBioGenerationsLeft(user, plan) > 0;
};

const getUserBioGenerationsLeft = (
  user: UserWithBioGenerations,
  plan: UserSubscriptionPlan,
) => {
  const generationsSinceLastReset = user.bioGenerations.filter(
    (generation) => generation.createdAt.getTime() + 86_400_000 > Date.now(),
  );

  return plan.bioGenerationsPerDay - generationsSinceLastReset.length;
};
