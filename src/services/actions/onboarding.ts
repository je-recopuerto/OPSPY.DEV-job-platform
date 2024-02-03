"use server";

import { auth } from "@/auth";
import { getUserById } from "@/lib/data/user";
import prisma from "@/lib/db";
import { onboardingSchema } from "@/schemas/onboardingSchema";
import { redirect } from "next/navigation";
import * as z from "zod";

export async function setOnboarding(values: z.infer<typeof onboardingSchema>) {
  // This will throw an error if the state is invalid
  const validatedState = onboardingSchema.parse(values);

  const session = await auth();
  if (!session || !session.user || !session.user.id)
    throw new Error("User not found");

  console.log("Setting onboarding:", values, "for user:", session.user);
  const user = await getUserById(session.user.id);

  if (!user) {
    const result = await prisma.user.create({
      data: {
        id: session.user.id,
        firstName: validatedState.firstName,
        lastName: validatedState.lastName,
        dateOfBirth: validatedState.dateOfBirth,
        email: validatedState.email,
        bio: validatedState.bio,
      },
    });

    console.log("Successfully updated", result.firstName, "profile.");
  }

  redirect("/t/dash");
}
