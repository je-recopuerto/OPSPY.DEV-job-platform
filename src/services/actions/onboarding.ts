"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { onboardingSchema } from "@/schemas/onboardingSchema";
import { getUserById } from "@/services/UserService";
import { redirect } from "next/navigation";
import * as z from "zod";

export async function setOnboarding(values: z.infer<typeof onboardingSchema>) {
  // This will throw an error if the state is invalid
  const validatedState = onboardingSchema.parse(values);

  const session = await auth();
  if (!session || !session.user) throw new Error("User not found");

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
