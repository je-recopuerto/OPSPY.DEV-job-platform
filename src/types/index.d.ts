import { User } from "@prisma/client";

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd: number;
    isPro: boolean;
  };

export type SubscriptionPlan = {
  name: string;
  description: string;
  stripePriceId: string;
  bioGenerationsPerDay: number;
};
