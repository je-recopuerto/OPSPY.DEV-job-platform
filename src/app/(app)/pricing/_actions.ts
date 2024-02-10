"use server";

import { auth } from "@/auth";
import { getUserById, getUserSubscriptionPlan } from "@/lib/data/user";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const billingUrl = absoluteUrl("/pricing");
const pricingUrl = absoluteUrl("/pricing");

export async function requestPlan(priceId: string): Promise<{
  url?: string;
  error?: string;
}> {
  let redirectUrl: string = "";

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

  const plan = await getUserSubscriptionPlan(user.id);
  if (plan.isPaid && plan.stripeCustomerId) {
    console.log("user is paid and has a stripe customer id");

    // User on Paid Plan - Create a portal session to manage subscription.
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: plan.stripeCustomerId,
      return_url: billingUrl,
    });

    redirectUrl = stripeSession.url as string;
  } else {
    console.log("user is not paid or does not have a stripe customer id");

    // User on Free Plan - Create a checkout session to upgrade.
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: session.user.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.id,
      },
    });

    redirectUrl = stripeSession.url as string;
  }

  return { url: redirectUrl };
  //
  //   redirectUrl = stripeSession.url as string
  // if (plan === requestedPlan) {
  //   return { error: "You are already on this plan." };
  // }
  //
  // // The user is on the free plan.
  // // Create a checkout session to upgrade.
  // const stripeSession = await stripe.checkout.sessions.create({
  //   success_url: pricingUrl,
  //   cancel_url: pricingUrl,
  //   payment_method_types: ["card"],
  //   mode: "subscription",
  //   billing_address_collection: "auto",
  //   customer_email: session.user.email,
  //   line_items: [
  //     {
  //       price: requestedPlan.stripePriceId,
  //       quantity: 1,
  //     },
  //   ],
  //   metadata: {
  //     userId: session.user.id,
  //   },
  // });
  //
  // if (!stripeSession.url) {
  //   return {
  //     error: "Something went wrong. Please try again later.",
  //   };
  // }
  //
  // return {
  //   url: stripeSession.url,
  // };
}
