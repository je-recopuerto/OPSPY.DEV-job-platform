"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { createJobPostSchema } from "@/schemas/jobPost";
import { getUserById, getUserWithCompanyById } from "@/services/UserService";
import { JobPost, User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";

export async function createJobPost(
  values: z.infer<typeof createJobPostSchema>,
) {
  // This will throw an error if the state is invalid
  const validatedState = createJobPostSchema.parse(values);

  const session = await auth();
  if (!session || !session.user || !session.user.id)
    throw new Error("User not found");

  const user = await getUserWithCompanyById(session.user.id);
  if (!user) throw new Error("User not found");
  if (!user.company) throw new Error("User does not have a company");

  console.log("Creating job post:", validatedState, "for user:", user);

  const result = await prisma.jobPost.create({
    data: {
      title: validatedState.title,
      description: validatedState.description,
      minSalary: validatedState.minSalary,
      maxSalary: validatedState.maxSalary,
      location: validatedState.location,
      currency: validatedState.currency,
      type: validatedState.type,
      workMode: validatedState.workMode,
      companyId: user.company.id,
    },
  });

  redirect("/e/dash");
}

export async function unsaveJob(id: number) {
  return prisma.jobTracker.delete({
    where: {
      id: id,
    },
  });
}

export async function saveJob(id: JobPost["id"], userId: User["id"]) {
  return prisma.jobTracker.create({
    data: {
      jobId: id,
      userId: userId,
    },
  });
}

export async function toggleSaveJob(id: JobPost["id"]) {
  "use server";

  const session = await auth();
  if (!session || !session.user || !session.user.id) return;

  const user = await getUserById(session.user.id);
  if (!user) return redirect("/t/welcome");

  const existingTracker = await prisma.jobTracker.findFirst({
    where: {
      jobId: id,
      userId: session.user.id,
    },
  });

  let removed = false;

  if (existingTracker) {
    const result = await unsaveJob(existingTracker.id);
    console.log("Deleted existing tracker:", result);
    removed = true;
  } else {
    const result = await saveJob(id, session.user.id);
    console.log("Creating new tracker for job:", id);
  }

  // revalidatePath("/t/dash");
  return removed;
}

export async function deleteJobPost(id: JobPost["id"]) {
  const result = await prisma.jobPost.delete({
    where: {
      id: id,
    },
  });

  console.log("Deleted job post with id", id, ":", result);

  // They're working on revalidating non-fetch API: https://twitter.com/timneutkens/status/1654843969069625345
  revalidatePath("/e/dash");

  return result;
}
