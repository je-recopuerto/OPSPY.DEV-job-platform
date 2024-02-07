import { subscriptions, talentFreePlan } from "@/config/subscriptions";
import {
  UserWithCompany,
  UserWithCvs,
  UserWithJobTrackers,
} from "@/lib/data/user.types";
import prisma from "@/lib/db";
import { SubscriptionPlan } from "@/lib/stripe";
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

export function getUserById(id: string): Promise<User | null> {
  return prisma.user.findFirst({
    where: {
      id: id,
    },
  });
}

export function getUserWithCvsById(id: string): Promise<UserWithCvs | null> {
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

export async function getUserBioGenerationsLeft(
  id: User["id"],
): Promise<number> {
  const { plan } = await getUserSubscriptionPlan(id);

  const generations = await prisma.user.findFirst({
    where: {
      id: id,
    },
    select: {
      bioCompletions: true,
      lastBioReset: true,
    },
  });

  if (!generations) {
    throw new Error("User not found");
  }

  const { bioCompletions, lastBioReset } = generations;

  const now = Date.now();
  const lastReset = lastBioReset?.getTime() || now;

  const daysSinceLastReset = Math.floor((now - lastReset) / 86_400_000);
  console.log("daysSinceLastReset", daysSinceLastReset);
  // If the user's reset date isn't within a day, then they have all their generations left.
  if (daysSinceLastReset >= 1) {
    return plan.bioGenerationsPerDay;
  } else {
    console.log("daysLeft", plan.bioGenerationsPerDay, "-", bioCompletions);
    return plan.bioGenerationsPerDay - bioCompletions;
  }
}

export async function getUserSubscriptionPlan(id: User["id"]): Promise<{
  user: User;
  plan: SubscriptionPlan;
}> {
  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Check if user is on a pro plan.
  // const isPro =
  //   user.stripePriceId &&
  //   user.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now();

  const plan =
    subscriptions.find((plan) => plan.stripePriceId === user.stripePriceId) ||
    talentFreePlan;

  return {
    user,
    plan,
  };
}
