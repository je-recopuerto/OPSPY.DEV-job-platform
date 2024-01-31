import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_API_KEY ?? "", {
  apiVersion: "2023-10-16",
  typescript: true,
});

export type SubscriptionPlan = {
  name: string;
  description: string;
  stripePriceId: string;
  bioGenerationsPerDay: number;
  maxJobPosts: number;
};
