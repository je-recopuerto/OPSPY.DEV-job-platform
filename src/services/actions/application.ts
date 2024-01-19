"use server";

import { JobApplication } from ".prisma/client";
import { auth } from "@/auth";
import prisma from "@/lib/db";
import { JobPostWithCompany } from "@/services/JobService";
import { notifyApplicationCreated } from "@/services/KnockService";
import { getUserById } from "@/services/UserService";
import { JobPost, User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function withdrawApplication(jobId: JobApplication["id"]) {
  const session = await auth();
  if (!session || !session.user || !session.user.id)
    throw new Error("User not found");

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

export async function quickApply(jobId: JobPost["id"]) {
  const session = await auth();
  if (!session || !session.user || !session.user.id)
    throw new Error("User not found");

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
  userId: User["id"],
  jobId: JobPost["id"],
): Promise<boolean> {
  const count = await prisma.jobApplication.count({
    where: {
      userId: userId,
      jobId: jobId,
    },
  });

  return count > 0;
}
