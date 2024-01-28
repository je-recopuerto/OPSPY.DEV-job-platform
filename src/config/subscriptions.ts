import { SubscriptionPlan } from "@/types";

export const talentFreePlan: SubscriptionPlan = {
  name: "Free",
  description:
    "The free plan is limited to 3 posts. Upgrade to the PRO plan for unlimited posts.",
  stripePriceId: "",
  bioGenerationsPerDay: 3,
  maxJobPosts: 0,
};

export const talentProPlan: SubscriptionPlan = {
  name: "PRO",
  description: "The PRO plan has unlimited posts.",
  stripePriceId: process.env.STRIPE_TALENT_PRO_MONTHLY_PLAN_ID || "",
  bioGenerationsPerDay: 10,
  maxJobPosts: 0,
};

export const employerFreePlan: SubscriptionPlan = {
  name: "Free",
  description: "",
  stripePriceId: "",
  bioGenerationsPerDay: 3,
  maxJobPosts: 100_000,
};

// export const employerProPlan: SubscriptionPlan = {};

export const subscriptions = [talentFreePlan, talentProPlan, employerFreePlan];
