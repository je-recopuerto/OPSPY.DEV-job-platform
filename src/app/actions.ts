"use server";

import prisma from "@/lib/db";
import { onboardingSchema } from "@/schemas/onboardingSchema";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import * as z from "zod";
import { getUserById, getUserWithCompanyById } from "@/services/userService";
import { revalidatePath } from "next/cache";
import { updateProfileFormSchema } from "@/schemas/updateProfileSchema";
import { createJobPostSchema } from "@/schemas/jobPost";
import knock, { applicationCreatedKnock } from "@/lib/knock";

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
    const exists = await prisma.jobApplication.findFirst({
      where: {
        jobId: jobId,
        userId: user.id,
      },
    });

    if (exists) throw new Error("Job application already exists");

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

    const knockResult = await knock.notify(applicationCreatedKnock, {
      actor: user.id,
      recipients: [user.id],
      data: {
        // prettier-ignore
        "companyName": {
          // prettier-ignore
          "value": result.job.company.name,
        },
        // prettier-ignore
        "jobName": {
          // prettier-ignore
          "value": result.job.title,
        },
      },
    });

    revalidatePath("/dash");
    return true;
  } catch (e) {
    console.error("Error creating job application:", e);
    return false;
  }
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
