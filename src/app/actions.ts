"use server";

import prisma from "@/lib/db";
import { onboardingSchema } from "@/schemas/onboardingSchema";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import * as z from "zod";
import { getUserById } from "@/services/userService";
import { revalidatePath } from "next/cache";
import { JobStatus } from ".prisma/client";

export async function setOnboarding(values: z.infer<typeof onboardingSchema>) {
  // This will throw an error if the state is invalid
  const validatedState = onboardingSchema.parse(values);

  const session = await auth();
  if (!session || !session.user) throw new Error("User not found");

  console.log(
    "Setting onboarding:",
    values,
    "for user:",
    session?.user ?? "unknown",
  );
  const user = await getUserById(session.user.id);

  if (!user) throw new Error("User not found");
  if (user.isOnboarded) throw new Error("User is already onboarded");

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      profile: {
        upsert: {
          where: {
            userId: user.id,
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
          },
        },
      },
      isOnboarded: true,
    },
  });

  console.log("Successfully updated", user.name, "profile.");
  redirect("/");
}

export async function setJobTrackerStatus(status: JobStatus, id: number) {
  console.log("Setting job tracker status to", status, "for id", id);

  await prisma.jobTracker.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  });

  revalidatePath("/dashboard");
}

export async function unsaveJob(id: number) {
  const result = prisma.jobTracker.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/dashboard");

  return result;
}

export async function saveJob(id: number, userId: string) {
  return prisma.jobTracker.create({
    data: {
      jobId: id,
      userId: userId,
    },
  });
}

export async function toggleSaveJob(id: number) {
  "use server";

  const session = await auth();
  if (!session || !session.user) return;

  const user = await getUserById(session.user.id);
  if (!user) return;

  const existingTracker = await prisma.jobTracker.findFirst({
    where: {
      jobId: id,
      userId: user.id,
    },
  });

  let removed = false;

  if (existingTracker) {
    const result = await unsaveJob(existingTracker.id);
    console.log("Deleted existing tracker:", result);
    removed = true;
  } else {
    const result = await saveJob(id, user.id);
    console.log("Creating new tracker for job:", id);
  }

  revalidatePath("/dashboard");
  return removed;
}
