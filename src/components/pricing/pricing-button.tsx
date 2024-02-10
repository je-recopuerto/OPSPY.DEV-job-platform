"use client";

import { requestPlan } from "@/app/(app)/pricing/_actions";
import { buttonVariants } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { SubscriptionPlan } from "@/lib/stripe";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type PricingButtonProps = {
  actionLabel: string;
  link?: string;
  plan: SubscriptionPlan;
  isOnPlan?: boolean;
};

export default function PricingButton({
  actionLabel,
  plan,
  link,
  isOnPlan,
}: PricingButtonProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const request = async () => {
    const { error, url } = await requestPlan(plan);

    if (error) {
      toast({
        title: "Error",
        description: error,
      });
    }

    if (url) {
      router.push(url);
    }
  };

  if (link) {
    return (
      <Link
        href={link}
        className={cn(
          buttonVariants(),
          "relative inline-flex w-full items-center justify-center rounded-md bg-black text-white dark:bg-white px-6 font-medium  dark:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        )}
      >
        <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
        {isOnPlan ? "Manage" : actionLabel}
      </Link>
    );
  }

  return (
    <button
      onClick={request}
      className={cn(
        buttonVariants(),
        "relative inline-flex w-full items-center justify-center rounded-md bg-black text-white dark:bg-white px-6 font-medium  dark:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
      )}
      disabled={loading || isOnPlan}
    >
      {loading && (
        <div className="absolute inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
      )}

      <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
      {isOnPlan ? "Already on plan" : actionLabel}
    </button>
  );
}
