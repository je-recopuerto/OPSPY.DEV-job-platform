'use server'

import prisma from "@/lib/db";
import {onboardingSchema} from "@/schemas/onboardingSchema";
import {redirect} from "next/navigation";
import {auth} from "@/auth";
import * as z from "zod";
import {getUserById} from "@/services/userService";

export async function setOnboarding(values: z.infer<typeof onboardingSchema>) {
  // This will throw an error if the state is invalid
  const validatedState = onboardingSchema.parse(values);

  const session = await auth();
  if (!session || !session.user) throw new Error("User not found")

  console.log("Setting onboarding:", values, "for user:", session?.user ?? "unknown")
  const user = await getUserById(session.user.id);

  if (!user) throw new Error("User not found")
  if (user.isOnboarded) throw new Error("User is already onboarded")

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