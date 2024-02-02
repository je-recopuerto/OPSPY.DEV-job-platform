"use server";

import { JobApplication } from ".prisma/client";
import { type AuthorizeReturnType } from "@/app/_actions";
import { auth } from "@/auth";
import prisma from "@/lib/db";
import { rejectCandidateSchema } from "@/lib/validations/reject";
import { JobApplicationWithCompany } from "@/services/JobService";
import { notifyApplicationUpdated } from "@/services/KnockService";
import { UserWithCompany } from "@/services/UserService";
import { User } from "@prisma/client";
import { z } from "zod";

async function canModifyApplication(
  userId: User["id"],
  applicationId: JobApplication["id"],
): Promise<
  AuthorizeReturnType<{
    user: UserWithCompany;
    application: JobApplicationWithCompany;
  }>
> {
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

export async function rejectCandidate(
  applicationId: JobApplication["id"],
  values: z.infer<typeof rejectCandidateSchema>,
): Promise<{
  error?: string;
  message?: string;
}> {
  // Validate schema
  const { reason } = rejectCandidateSchema.parse(values);

  console.log("Rejecting candidate because:", reason);

  const session = await auth();
  if (!session?.user || !session?.user.id) {
    return {
      error: "You must be logged in to perform this action.",
      message: "",
    };
  }

  const response = await canModifyApplication(session.user.id, applicationId);
  if (!response.authorized) {
    return {
      error: "You are not authorized to perform this action.",
      message: "",
    };
  }

  const { user, application } = response.data;

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

  // Notify the candidate
  await notifyApplicationUpdated(user, application.job);

  return {
    message: "Candidate rejected.",
  };
}
