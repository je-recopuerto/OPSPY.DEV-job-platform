"use client";

import { requestPlan } from "@/app/(app)/pricing/_actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { talentDashboardUrl } from "@/lib/pages";
import { SubscriptionPlan, UserSubscriptionPlan } from "@/types";
import { CheckIcon, Loader2, XIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export const PricingGrid = ({
  plans,
  isSignedIn,
  currentPlan,
}: {
  plans: SubscriptionPlan[];
  isSignedIn: boolean;
  currentPlan?: UserSubscriptionPlan;
}) => {
  const [isYearly, setIsYearly] = useState<boolean>(false);

  const toggleBilling = () => {
    setIsYearly(!isYearly);
  };

  return (
    <>
      <div className="mb-4 flex items-center gap-5 justify-center">
        <span>Monthly Billing</span>
        <Switch
          checked={isYearly}
          onCheckedChange={toggleBilling}
          role="switch"
          aria-label="switch-year"
        />
        <span>Annual Billing</span>
      </div>
      <section
        className={
          "mx-auto grid max-w-screen-lg gap-5 bg-inherit md:grid-cols-3 lg:grid-cols-3"
        }
      >
        {plans.map((plan) => {
          return (
            <PricingCard
              key={plan.name}
              plan={plan}
              isSignedIn={isSignedIn}
              currentPlan={currentPlan}
              isYearly={isYearly}
            />
          );
        })}
      </section>
    </>
  );
};

export function PricingCard({
  plan,
  currentPlan,
  isSignedIn,
  isYearly,
}: {
  plan: SubscriptionPlan;
  currentPlan?: UserSubscriptionPlan;
  isSignedIn: boolean;
  isYearly: boolean;
}) {
  return (
    <div
      className="relative flex flex-col overflow-hidden rounded-xl border"
      key={plan.name}
    >
      <div className="min-h-[150px] items-start space-y-4 bg-secondary/70 p-6">
        <p className="flex font-urban text-sm font-bold uppercase tracking-wider text-muted-foreground">
          {plan.name}
        </p>

        <div className="flex flex-row">
          <div className="flex items-end">
            <div className="flex text-left text-3xl font-semibold leading-6">
              {isYearly && plan.prices.monthly > 0 ? (
                <>
                  <span className="mr-2 text-muted-foreground line-through">
                    ${plan.prices.monthly}
                  </span>
                  <span>${plan.prices.yearly / 12}</span>
                </>
              ) : (
                `$${plan.prices.monthly}`
              )}
            </div>
            <div className="-mb-1 ml-2 text-left text-sm font-medium">
              <div>/mo</div>
            </div>
          </div>
        </div>
        {plan.prices.monthly > 0 ? (
          <div className="text-left text-sm text-muted-foreground">
            {isYearly
              ? `$${plan.prices.yearly} will be charged when annual`
              : "when charged monthly"}
          </div>
        ) : null}
      </div>

      <div className="flex h-full flex-col justify-between gap-16 p-6">
        <ul className="space-y-2 text-left text-sm font-medium leading-normal">
          {plan.features.map((feature) => (
            <li className="flex items-start" key={feature}>
              <CheckIcon className="mr-3 size-5 shrink-0" />
              <p>{feature}</p>
            </li>
          ))}

          {plan.limitations.length > 0 &&
            plan.limitations.map((feature) => (
              <li
                className="flex items-start text-muted-foreground"
                key={feature}
              >
                <XIcon className="mr-3 size-5 shrink-0" />
                <p>{feature}</p>
              </li>
            ))}
        </ul>

        {isSignedIn ? (
          plan.name === "Starter" ? (
            <Link
              href={talentDashboardUrl}
              className={buttonVariants({
                className: "w-full",
                variant: "default",
              })}
            >
              Go to dashboard
            </Link>
          ) : (
            <BillingFormButton
              year={isYearly}
              plan={plan}
              currentPlan={currentPlan}
            />
          )
        ) : (
          <Button onClick={() => signIn("auth0")}>Login</Button>
        )}
      </div>
    </div>
  );
}

interface BillingFormButtonProps {
  plan: SubscriptionPlan;
  currentPlan?: UserSubscriptionPlan;
  year: boolean;
}

function BillingFormButton({
  year,
  plan,
  currentPlan,
}: BillingFormButtonProps) {
  const { toast } = useToast();
  const router = useRouter();
  let [isPending, startTransition] = useTransition();
  const generateUserStripeSession = requestPlan.bind(
    null,
    plan.stripeIds[year ? "yearly" : "monthly"] ?? "",
  );

  const stripeSessionAction = () =>
    startTransition(async () => {
      const { error, url } = await generateUserStripeSession();

      if (error) {
        toast({
          title: "Error",
          description: error,
        });
      }

      if (url) {
        router.push(url);
      }
    });

  return (
    <Button
      variant="default"
      className="w-full"
      disabled={isPending}
      onClick={stripeSessionAction}
    >
      {isPending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin mr-2" /> Loading...
        </>
      ) : (
        <>
          {currentPlan &&
          currentPlan.stripePriceId ===
            plan.stripeIds[year ? "yearly" : "monthly"]
            ? "Manage Subscription"
            : "Upgrade"}
        </>
      )}
    </Button>
  );
}
