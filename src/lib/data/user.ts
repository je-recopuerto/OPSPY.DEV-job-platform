import { plans } from "@/config/subscriptions";
import {
  UserWithBioGenerations,
  UserWithCompany,
  UserWithCvs,
  UserWithJobTrackers,
} from "@/lib/data/user.types";
import prisma from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { UserSubscriptionPlan } from "@/types";
import { UploadedCv, User } from "@prisma/client";

export function isCompanyAccount(user: UserWithCompany | null): boolean {
  return user !== null && user !== undefined && user.company !== null;
}

export async function getUserCountGrowth(): Promise<{
  count: number;
  countLastMonth: number;
}> {
  const [count, countLastMonth] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({
      where: {
        createdAt: {
          lt: new Date(Date.now() - 86_400_000 * 30),
        },
      },
    }),
  ]);

  return {
    count,
    countLastMonth,
  };
}

export function getUserById(id?: User["id"]): Promise<User | null> {
  if (!id) {
    return Promise.resolve(null);
  }

  return prisma.user.findFirst({
    where: {
      id: id,
    },
  });
}

export function getUserWithBioGenerationsById(
  id?: User["id"],
): Promise<UserWithBioGenerations | null> {
  if (!id) {
    return Promise.resolve(null);
  }

  return prisma.user.findFirst({
    where: {
      id: id,
    },
    include: {
      bioGenerations: true,
    },
  });
}

export function getUserWithCvsById(
  id?: User["id"],
): Promise<UserWithCvs | null> {
  if (!id) {
    return Promise.resolve(null);
  }
  return prisma.user.findFirst({
    where: {
      id: id,
    },
    include: {
      cv: true,
      workExperience: true,
    },
  });
}

export function getUserWithCompanyById(
  id?: User["id"],
): Promise<UserWithCompany | null> {
  if (!id) {
    return Promise.resolve(null);
  }

  return prisma.user.findFirst({
    where: {
      id: id,
    },
    include: {
      company: true,
    },
  });
}

export function getUserWithJobTrackersById(
  id?: string,
): Promise<UserWithJobTrackers | null> {
  return prisma.user.findFirst({
    where: {
      id: id,
    },
    include: {
      trackers: true,
    },
  });
}

export function getCvById(id: UploadedCv["id"]) {
  return prisma.uploadedCv.findUnique({
    where: {
      id: id,
    },
  });
}

export async function getUserSubscriptionPlan(
  id: User["id"],
): Promise<UserSubscriptionPlan> {
  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Check if user is on a paid plan.
  const isPaid = Boolean(
    user.stripePriceId &&
      user.stripeCurrentPeriodEnd &&
      user.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now(),
  );

  // Find the pricing data corresponding to the user's plan
  const userPlan =
    plans.find((plan) => plan.stripeIds.monthly === user.stripePriceId) ||
    plans.find((plan) => plan.stripeIds.yearly === user.stripePriceId);

  const plan = isPaid && userPlan ? userPlan : plans[0];
  const interval = isPaid
    ? userPlan?.stripeIds.monthly === user.stripePriceId
      ? "month"
      : userPlan?.stripeIds.yearly === user.stripePriceId
        ? "year"
        : null
    : null;

  let isCanceled = false;
  if (isPaid && user.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      user.stripeSubscriptionId,
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return {
    ...plan,
    ...user,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime(),
    isPaid,
    interval,
    isCanceled,
  };
}
