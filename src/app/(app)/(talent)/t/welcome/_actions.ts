"use server";

import { auth } from "@/auth";
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

  // Update the user's record only if isOnboard is false
  const result = await prisma.user.updateMany({
    where: {
      id: session.user.id,
      isOnboard: false, // This condition ensures the update occurs only if isOnboard is false
    },
    data: {
      firstName: validatedState.firstName,
      lastName: validatedState.lastName,
      dateOfBirth: validatedState.dateOfBirth,
      bio: validatedState.bio,
      location: validatedState.location,
      githubLink: validatedState.githubUrl,
      linkedinLink: validatedState.linkedinUrl,
      portfolioLink: validatedState.portfolioUrl,
      isOnboard: true, // Setting isOnboard to true as part of the onboarding process
    },
  });

  if (result.count === 0) {
    console.log("User is already onboarded or not found.");
  } else {
    console.log("Successfully updated user profile.");
  }

  redirect("/t/dash");
}
