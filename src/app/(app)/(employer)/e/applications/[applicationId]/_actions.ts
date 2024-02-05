"use server";

import { type AuthorizeReturnType } from "@/app/_actions";
import { auth } from "@/auth";
import { JobApplicationWithCompany } from "@/lib/data/job.types";
import { UserWithCompany } from "@/lib/data/user.types";
import prisma from "@/lib/db";
import { notifyApplicationUpdated } from "@/lib/knock";
import {
  acceptCandidateSchema,
  rejectCandidateSchema,
} from "@/lib/validations/reject";
import { JobApplication, User } from "@prisma/client";
import { z } from "zod";

async function canModifyApplication(
  userId: User["id"] | null | undefined,
  applicationId: JobApplication["id"],
): Promise<
  AuthorizeReturnType<{
    user: UserWithCompany;
    application: JobApplicationWithCompany;
  }>
> {
  if (!userId) {
    return {
      authorized: false,
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      company: true,
    },
  });

  const application = await prisma.jobApplication.findUnique({
    where: {
      id: applicationId,
    },
    include: {
      job: {
        include: {
          company: true,
          tags: true,
        },
      },
    },
  });

  const isAuthorized =
    user !== null &&
    application !== null &&
    user.company?.id === application.job.companyId;

  if (!isAuthorized) {
    return {
      authorized: false,
    };
  }

  return {
    authorized: true,
    data: {
      user: user,
      application: application,
    },
  };
}

export async function matchCandidate(
  applicationId: JobApplication["id"],
  values: z.infer<typeof acceptCandidateSchema>,
): Promise<{
  error?: string;
  message?: string;
}> {
  const parsed = acceptCandidateSchema.safeParse(values);
  if (!parsed.success) {
    return {
      error: "Invalid input",
      message: parsed.error.errors.join(", "),
    };
  }

  const session = await auth();
  const response = await canModifyApplication(session?.user?.id, applicationId);
  if (!response.authorized) {
    return {
      error: "You are not authorized to perform this action.",
      message: "",
    };
  }

  const { message, notifyCandidate } = parsed.data;
  const { user, application } = response.data;

  // Change the application status to matched
  await prisma.jobApplication.update({
    where: {
      id: application.id,
    },
    data: {
      status: "MATCHED",
    },
  });

  if (notifyCandidate) {
    // Notify the candidate
    await notifyApplicationUpdated(user, application.job, message);
  }

  return {
    message:
      "Candidate matched. " +
      (values.notifyCandidate
        ? "The candidate has been notified."
        : "The candidate has not been notified."),
  };
}

export async function rejectCandidate(
  applicationId: JobApplication["id"],
  values: z.infer<typeof rejectCandidateSchema>,
): Promise<{
  error?: string;
  message?: string;
}> {
  // Validate schema
  const parsed = rejectCandidateSchema.safeParse(values);
  if (!parsed.success) {
    return {
      error: "Invalid input",
      message: parsed.error.errors.join(", "),
    };
  }

  const session = await auth();
  const response = await canModifyApplication(session?.user?.id, applicationId);
  if (!response.authorized) {
    return {
      error: "You are not authorized to perform this action.",
      message: "",
    };
  }

  const { reason, notifyCandidate } = parsed.data;
  const { user, application } = response.data;

  console.log("Rejecting candidate because:", reason);

  // Change the application status to rejected
  await prisma.jobApplication.update({
    where: {
      id: application.id,
    },
    data: {
      status: "REJECTED",
      rejectionReason: reason,
    },
  });

  if (notifyCandidate) {
    // Notify the candidate
    await notifyApplicationUpdated(user, application.job);
  }

  return {
    message: "Candidate rejected.",
  };
}
