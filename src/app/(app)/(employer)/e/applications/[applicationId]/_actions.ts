"use server";

import { auth } from "@/auth";
import { createServerAction, ServerActionError } from "@/lib/action-utils";
import { getApplicationWithCompanyById } from "@/lib/data/application";
import { getUserWithCompanyById } from "@/lib/data/user";
import prisma from "@/lib/db";
import { notifyApplicationUpdated } from "@/lib/knock";
import { canModifyApplication } from "@/lib/user";
import {
  acceptCandidateSchema,
  rejectCandidateSchema,
} from "@/lib/validations/reject";
import { JobApplication } from "@prisma/client";
import { z } from "zod";

export const matchCandidate = createServerAction(
  async (
    applicationId: JobApplication["id"],
    values: z.infer<typeof acceptCandidateSchema>,
  ) => {
    const form = acceptCandidateSchema.safeParse(values);
    if (!form.success)
      throw new ServerActionError(form.error.errors.join(", "));

    const user = await auth().then(async (session) =>
      getUserWithCompanyById(session?.user?.id),
    );
    const application = await getApplicationWithCompanyById(applicationId);

    if (
      !user ||
      !application ||
      !canModifyApplication(user, application.job.companyId)
    ) {
      throw new ServerActionError(
        "You are not authorized to perform this action.",
      );
    }

    // Change the application status to matched
    await prisma.jobApplication.update({
      where: {
        id: applicationId,
      },
      data: {
        status: "MATCHED",
      },
    });

    const { message, notifyCandidate } = form.data;

    if (notifyCandidate) {
      // Notify the candidate
      await notifyApplicationUpdated({
        userId: user.id,
        companyName: application.job.company.name,
        jobTitle: application.job.title,
        jobId: application.job.id,
        message: message,
      });
    }
  },
);

export const rejectCandidate = createServerAction(
  async (
    applicationId: JobApplication["id"],
    values: z.infer<typeof rejectCandidateSchema>,
  ) => {
    const parsed = rejectCandidateSchema.safeParse(values);
    if (!parsed.success) {
      throw new ServerActionError(parsed.error.errors.join(", "));
    }

    const user = await auth().then(async (session) =>
      getUserWithCompanyById(session?.user?.id),
    );
    const application = await getApplicationWithCompanyById(applicationId);

    if (
      !user ||
      !application ||
      !canModifyApplication(user, application.job.companyId)
    ) {
      throw new ServerActionError(
        "You are not authorized to perform this action.",
      );
    }

    if (!canModifyApplication(user, application.job.companyId))
      throw new ServerActionError(
        "You are not authorized to perform this action.",
      );

    const { reason, notifyCandidate } = parsed.data;

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
      await notifyApplicationUpdated({
        userId: user.id,
        companyName: application.job.company.name,
        jobTitle: application.job.title,
        jobId: application.job.id,
      });
    }
  },
);
