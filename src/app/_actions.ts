"use server";

import { createServerAction, ServerActionError } from "@/lib/action-utils";
import { getApplicationById } from "@/lib/data/application";
import { getUserWithCompanyById } from "@/lib/data/user";
import { JobApplication, User } from "@prisma/client";

export const isAuthorizedForApplications = createServerAction(
  async (userId: User["id"], applicationId: JobApplication["id"]) => {
    const [user, application] = await Promise.all([
      getUserWithCompanyById(userId),
      getApplicationById(applicationId),
    ]);

    if (!user) throw new ServerActionError("UNAUTHORIZED");
    if (!application) throw new ServerActionError("NO_APPLICATION");

    const isAuthorized = user.company?.id === application.job.companyId;

    return {
      application: application,
      isAuthorized: isAuthorized,
    };
  },
);

export const isAuthorizedForEmployerDash = createServerAction(
  async (userId?: User["id"]) => {
    if (!userId) {
      throw new ServerActionError("NO_USER");
    }

    const user = await getUserWithCompanyById(userId);
    const isAuthorized = user !== null && user.company !== null;

    if (!isAuthorized) {
      throw new ServerActionError("UNAUTHORIZED");
    }

    return user;
  },
);

export const canCreateNewJobPost = createServerAction(
  async (userId: User["id"]) => {
    const user = await getUserWithCompanyById(userId);

    let isAuthorized =
      user !== null && user.company !== null && user.company.isVerified;

    if (!isAuthorized || !user) {
      throw new ServerActionError("UNAUTHORIZED");
    }

    return user;
  },
);
