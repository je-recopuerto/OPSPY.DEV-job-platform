"use server";

import { getApplicationById } from "@/lib/data/application";
import { ApplicationWithJob } from "@/lib/data/application.types";
import { getUserWithCompanyById } from "@/lib/data/user";
import { UserWithCompany } from "@/lib/data/user.types";
import { JobApplication, User } from "@prisma/client";

export declare type AuthorizeSuccess<Output> = {
  authorized: true;
  data: Output;
};
export declare type AuthorizeError = {
  authorized: false;
};
export declare type AuthorizeReturnType<Success> =
  | AuthorizeSuccess<Success>
  | AuthorizeError;

export async function isAuthorizedForApplications(
  userId: User["id"],
  applicationId: JobApplication["id"],
): Promise<{
  application: ApplicationWithJob | null;
  isAuthorized: boolean;
}> {
  const [user, application] = await Promise.all([
    getUserWithCompanyById(userId),
    getApplicationById(applicationId),
  ]);

  const isAuthorized =
    user !== null &&
    application !== null &&
    user.company?.id === application.job.companyId;

  return {
    application: application,
    isAuthorized: isAuthorized,
  };
}

export async function isAuthorizedForEmployerDash(userId: User["id"]): Promise<
  AuthorizeReturnType<{
    user: UserWithCompany;
  }>
> {
  const user = await getUserWithCompanyById(userId);
  const isAuthorized = user !== null && user.company !== null;

  if (!isAuthorized) {
    return {
      authorized: false,
    };
  }

  return {
    data: {
      user,
    },
    authorized: true,
  };
}

export async function canCreateNewJobPost(userId: User["id"]): Promise<
  AuthorizeReturnType<{
    user: UserWithCompany;
  }>
> {
  const user = await getUserWithCompanyById(userId);

  let isAuthorized =
    user !== null && user.company !== null && user.company.isVerified;

  if (!isAuthorized || !user) {
    return {
      authorized: false,
    };
  }

  return {
    data: {
      user,
    },
    authorized: true,
  };
}

export async function canCreateNewCompany(userId: User["id"]): Promise<
  AuthorizeReturnType<{
    user: UserWithCompany;
  }>
> {
  const user = await getUserWithCompanyById(userId);

  let isAuthorized = user !== null && user.company === null;

  if (!isAuthorized || !user) {
    return {
      authorized: false,
    };
  }

  return {
    data: {
      user,
    },
    authorized: true,
  };
}
