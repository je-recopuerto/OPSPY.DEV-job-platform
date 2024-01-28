"use server";

import { auth } from "@/auth";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { getUserById, getUserSubscriptionPlan } from "@/services/UserService";
import { SubscriptionPlan } from "@/types";

const pricingUrl = absoluteUrl("/pricing");

export async function requestPlan(requestedPlan: SubscriptionPlan): Promise<{
  url?: string;
  error?: string;
}> {
  const session = await auth();
  if (!session?.user || !session?.user.id || !session?.user.email) {
    return { error: "You must be logged in to upgrade your plan." };
  }

  const user = await getUserById(session.user.id);
  if (!user) {
    return {
      error: "Please set up your profile before upgrading your plan.",
      url: "/t/welcome",
    };
  }

  const { plan } = await getUserSubscriptionPlan(user.id);
  if (plan === requestedPlan) {
    return { error: "You are already on this plan." };
  }

  // The user is on the free plan.
  // Create a checkout session to upgrade.
  const stripeSession = await stripe.checkout.sessions.create({
    success_url: pricingUrl,
    cancel_url: pricingUrl,
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",
    customer_email: session.user.email,
    line_items: [
      {
        price: requestedPlan.stripePriceId,
        quantity: 1,
      },
    ],
    metadata: {
      userId: session.user.id,
    },
  });

  if (!stripeSession.url) {
    return {
      error: "Something went wrong. Please try again later.",
    };
  }

  return {
    url: stripeSession.url,
  };
}
