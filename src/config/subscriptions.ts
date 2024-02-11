import { env } from "@/env.mjs";
import { SubscriptionPlan } from "@/types";

export const talentFreePlan: SubscriptionPlan = {
  name: "Starter",
  description:
    "The free plan is limited to 3 posts. Upgrade to the PRO plan for unlimited posts.",
  features: ["Access all job postings", `${3} daily AI improvements`],
  limitations: [],
  prices: {
    monthly: 0,
    yearly: 0,
  },
  stripeIds: {
    monthly: null,
    yearly: null,
  },
  bioGenerationsPerDay: 3,
  maxJobPosts: 0,
};

export const talentProPlan: SubscriptionPlan = {
  name: "PRO",
  description: "Boost your profile and get more visibility",
  features: [`${10} daily AI improvements`, "Boosted profile visibility"],
  limitations: [],
  prices: {
    monthly: 4.99,
    yearly: 49.99,
  },
  stripeIds: {
    monthly: env.NEXT_PUBLIC_STRIPE_TALENT_PRO_MONTHLY_PLAN_ID,
    yearly: env.NEXT_PUBLIC_STRIPE_TALENT_PRO_YEARLY_PLAN_ID,
  },
  bioGenerationsPerDay: 10,
  maxJobPosts: 0,
};

// export const talentFillipMccrevicePlan: SubscriptionPlan = {
//   name: "Fillip McCrevice",
//   description: "The ultimate plan for the ultimate talent",
//   features: [
//     "Unlimited daily AI improvements",
//     "Featured profile",
//     "Personalized job recommendations",
//   ],
//   prices: {
//     monthly: 99,
//     yearly: 999,
//   },
//   stripeIds: {
//     monthly: env.NEXT_PUBLIC_STRIPE_TALENT_FILLIP_MCCREVICE_MONTHLY_PLAN_ID,
//     yearly: env.NEXT_PUBLIC_STRIPE_TALENT_FILLIP_MCCREVICE_YEARLY_PLAN_ID,
//   },
//   bioGenerationsPerDay: 0,
//   maxJobPosts: 0,
// };

export const employerFreePlan: SubscriptionPlan = {
  name: "Starter",
  description: "Essential features you need to get started",
  features: ["Unlimited job postings", "Preview potential candidates"],
  limitations: [],
  prices: {
    monthly: 0,
    yearly: 0,
  },
  stripeIds: {
    monthly: null,
    yearly: null,
  },
  bioGenerationsPerDay: 3,
  maxJobPosts: 100_000,
};

// export const employerProPlan: SubscriptionPlan = {
// features: ["Featured job posts", "Scheduled posts"],
// };

export const employerPlans = [employerFreePlan];
export const talentPlans = [
  talentFreePlan,
  talentProPlan,
  // talentFillipMccrevicePlan,
];
export const plans = [...employerPlans, ...talentPlans];
