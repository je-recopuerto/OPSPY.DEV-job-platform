'use server'

import {OnboardProps} from "../../types/props";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/db";
import {onboardingSchema} from "@/schemas/onboardingSchema";
import {redirect} from "next/navigation";

export async function setOnboarding(state: OnboardProps) {
  // This will throw an error if the state is invalid
  const validatedState = onboardingSchema.parse(state);

  const session = await getServerSession(authOptions);
  if (!session || !session.user)
    throw new Error("User not found")

  console.log("Setting onboarding:", state, "for user:", session?.user ?? "unknown")
  const user = await prisma.user.findFirst({
    where: {
      id: session.user.id
    }
  });

  if (!user)
    throw new Error("User not found")

  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      profile: {
        upsert: {
          where: {
            userId: user.id
          },
          create: {
            firstName: validatedState.firstName,
            lastName: validatedState.lastName,
            dateOfBirth: validatedState.dateOfBirth,
          },
          update: {
            firstName: validatedState.firstName,
            lastName: validatedState.lastName,
            dateOfBirth: validatedState.dateOfBirth,
          }
        }
      },
      isOnboarded: true
    }
  });

  console.log("Successfully updated", user.name, "profile.")
  redirect("/")
}