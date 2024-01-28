import { SubscriptionPlan } from "@/types";

export const talentFreePlan: SubscriptionPlan = {
  name: "Free",
  description:
    "The free plan is limited to 3 posts. Upgrade to the PRO plan for unlimited posts.",
  stripePriceId: "",
  bioGenerationsPerDay: 3,
};

export const talentProPlan: SubscriptionPlan = {
  name: "PRO",
  description: "The PRO plan has unlimited posts.",
  stripePriceId: process.env.STRIPE_TALENT_PRO_MONTHLY_PLAN_ID || "",
  bioGenerationsPerDay: 10,
};

export const subscriptions = [talentFreePlan, talentProPlan];
