import { User } from "@prisma/client";

export type SubscriptionPlan = {
  name: string;
  description: string;
  features: string[];
  limitations: string[];
  prices: {
    monthly: number;
    yearly: number;
  };
  stripeIds: {
    monthly: string | null;
    yearly: string | null;
  };
  bioGenerationsPerDay: number;
  maxJobPosts: number;
};

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId" | "stripePriceId"> & {
    stripeCurrentPeriodEnd?: number;
    isPaid: boolean;
    interval: "month" | "year" | null;
    isCanceled?: boolean;
  };
