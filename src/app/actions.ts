"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { createJobPostSchema } from "@/schemas/jobPost";
import { onboardingSchema } from "@/schemas/onboardingSchema";
import { updateProfileFormSchema } from "@/schemas/updateProfileSchema";
import { JobPostWithCompany } from "@/services/JobService";
import { notifyApplicationCreated } from "@/services/KnockService";
import { getUserById, getUserWithCompanyById } from "@/services/UserService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";

export async function createJobPost(
  values: z.infer<typeof createJobPostSchema>,
) {
  // This will throw an error if the state is invalid
  const validatedState = createJobPostSchema.parse(values);

  const session = await auth();
  if (!session || !session.user) throw new Error("User not found");

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

export async function unsaveJob(id: number) {
  const result = prisma.jobTracker.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/dash");

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

  revalidatePath("/t/dash");
  return removed;
}

export async function withdrawApplication(jobId: number) {
  const session = await auth();
  if (!session || !session.user) throw new Error("User not found");

  const user = await getUserById(session.user.id);
  if (!user) throw new Error("User not found");

  try {
    const result = await prisma.jobApplication.deleteMany({
      where: {
        id: jobId,
        userId: user.id,
      },
    });

    console.log(
      "Deleted job application with id",
      jobId,
      "userId",
      user.id,
      ":",
      result,
    );

    revalidatePath("/dash");
    return true;
  } catch (e) {
    console.error("Error deleting job application:", e);
    return false;
  }
}

export async function quickApply(jobId: number) {
  const session = await auth();
  if (!session || !session.user) throw new Error("User not found");

  const user = await getUserById(session.user.id);
  if (!user) {
    console.log("Unknown user trying to quick apply:", session.user);
    return redirect("/t/welcome");
  }

  try {
    const alreadyApplied = await isUserAppliedToJob(user.id, jobId);
    if (alreadyApplied) {
      console.log("User already applied to job:", jobId);
      return false;
    }

    const result = await prisma.jobApplication.create({
      data: {
        userId: user.id,
        jobId: jobId,
      },
      include: {
        job: {
          include: {
            company: true,
          },
        },
      },
    });

    console.log("Created new job application:", result);

    await notifyApplicationCreated(user, result.job as JobPostWithCompany);

    revalidatePath("/dash");
    return true;
  } catch (e) {
    console.error("Error creating job application:", e);
    return false;
  }
}

export async function isUserAppliedToJob(
  userId: string,
  jobId: number,
): Promise<boolean> {
  const count = await prisma.jobApplication.count({
    where: {
      userId: userId,
      jobId: jobId,
    },
  });

  return count > 0;
}

export async function updateProfile(
  values: z.infer<typeof updateProfileFormSchema>,
) {
  console.log("Updating profile");

  // This will throw an error if the state is invalid
  const validatedState = updateProfileFormSchema.parse(values);

  const session = await auth();
  if (!session || !session.user) throw new Error("User not found");

  const user = await getUserById(session.user.id);
  if (!user) throw new Error("User not found");

  console.log("Updating profile:", validatedState, "for user:", user);

  const result = await prisma.user.upsert({
    where: {
      id: user.id,
    },
    create: {
      id: user.id,
      firstName: validatedState.firstName,
      lastName: validatedState.lastName,
      dateOfBirth: validatedState.dateOfBirth,
      email: validatedState.email,
    },
    update: {
      firstName: validatedState.firstName,
      lastName: validatedState.lastName,
      dateOfBirth: validatedState.dateOfBirth,
      email: validatedState.email,
    },
  });

  console.log("Successfully updated", user.firstName, "profile.");
  return result;
}
