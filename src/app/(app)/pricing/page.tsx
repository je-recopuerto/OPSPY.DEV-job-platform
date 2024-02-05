import { auth, signIn } from "@/auth";
import PricingButton from "@/components/pricing/pricing-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { talentFreePlan, talentProPlan } from "@/config/subscriptions";
import { getUserById, getUserSubscriptionPlan } from "@/lib/data/user";
import { SubscriptionPlan } from "@/lib/stripe";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

const PricingHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <section className="text-center">
    <h2 className="text-3xl font-bold">{title}</h2>
    <p className="text-xl pt-1">{subtitle}</p>
    <br />
  </section>
);

const PricingCard = ({
  title,
  monthlyPrice,
  description,
  features,
  actionLabel,
  popular,
  exclusive,
  link,
  plan,
  isOnPlan,
  isSignedIn,
}: PricingCardProps & { isSignedIn: boolean; isOnPlan: boolean }) => (
  <Card
    className={cn(
      `w-72 flex flex-col justify-between py-1 ${popular ? "border-rose-400" : "border-zinc-700"} mx-auto sm:mx-0`,
      {
        "animate-background-shine bg-white dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] transition-colors":
          exclusive,
      },
    )}
  >
    <div>
      <CardHeader className="pb-8 pt-4">
        <CardTitle className="text-zinc-700 dark:text-zinc-300 text-lg">
          {title}
        </CardTitle>
        <div className="flex gap-0.5">
          <h3 className="text-3xl font-bold">
            {monthlyPrice ? "$" + monthlyPrice : "Custom"}
          </h3>
          <span className="flex flex-col justify-end text-sm mb-1">
            {"/month"}
          </span>
        </div>
        <CardDescription className="pt-1.5 h-12">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {features.map((feature: string) => (
          <CheckItem key={feature} text={feature} />
        ))}
      </CardContent>
    </div>
    <CardFooter className="mt-2">
      {isSignedIn && plan ? (
        <PricingButton
          link={link}
          actionLabel={actionLabel}
          plan={plan}
          isOnPlan={isOnPlan}
        />
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn("auth0");
          }}
          className={"w-full"}
        >
          <Button className={cn("relative inline-flex w-full")}>Sign In</Button>
        </form>
      )}
    </CardFooter>
  </Card>
);

const CheckItem = ({ text }: { text: string }) => (
  <div className="flex gap-2">
    <CheckCircle2 size={18} className="my-auto text-green-400" />
    <p className="pt-0.5 text-zinc-700 dark:text-zinc-300 text-sm">{text}</p>
  </div>
);

export default async function Page() {
  const session = await auth();
  const isSignedIn = !!session;

  let currentPlan = talentFreePlan;

  if (session && session.user && session.user.id) {
    const user = await getUserById(session.user.id);
    if (user) {
      const { plan } = await getUserSubscriptionPlan(user.id);

      currentPlan = plan;
    }
  }

  return (
    <div className="py-8">
      <PricingHeader
        title="Pricing Plans"
        subtitle="Choose the plan that's right for you"
      />
      <Tabs defaultValue="0">
        <TabsList className="w-[400px] mx-auto grid grid-cols-2">
          <TabsTrigger value="0">Talent</TabsTrigger>
          <TabsTrigger value="1">Employer</TabsTrigger>
        </TabsList>
        <TabsContent value={"0"}>
          <section className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8 mt-8">
            {talentPlans.map((plan) => {
              return (
                <PricingCard
                  key={plan.title}
                  isSignedIn={isSignedIn}
                  isOnPlan={currentPlan === plan.plan}
                  {...plan}
                />
              );
            })}
          </section>
        </TabsContent>
        <TabsContent value={"1"}>
          <section className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8 mt-8">
            {employerPlans.map((plan) => {
              return (
                <PricingCard
                  key={plan.title}
                  isSignedIn={isSignedIn}
                  isOnPlan={currentPlan === plan.plan}
                  {...plan}
                />
              );
            })}
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}

type PricingCardProps = {
  title: string;
  monthlyPrice?: number | string;
  description: string;
  features: string[];
  actionLabel: string;
  link?: string;
  popular?: boolean;
  exclusive?: boolean;
  plan?: SubscriptionPlan;
};

const employerPlans: PricingCardProps[] = [
  {
    title: "Free",
    monthlyPrice: "0",
    description: "Essential features you need to get started",
    features: ["Unlimited job postings", "Preview potential candidates"],
    actionLabel: "Get Started",
    link: "/",
  },
  {
    title: "Pro",
    monthlyPrice: 25,
    description: "Perfect for owners of small & medium businessess",
    features: ["Featured job posts", "Scheduled posts"],
    actionLabel: "Get Started",
    popular: true,
    link: "/",
  },
  {
    title: "Enterprise",
    description: "Dedicated support and infrastructure to fit your needs",
    features: ["API Access", "In-depth analytics + reporting"],
    actionLabel: "Contact Sales",
    exclusive: true,
    link: "/",
  },
];

const talentPlans: PricingCardProps[] = [
  {
    title: "Free",
    monthlyPrice: "0",
    description: "Essential features you need to get started",
    features: [
      "Access all job postings",
      `${talentFreePlan.bioGenerationsPerDay} daily AI improvements`,
    ],
    actionLabel: "Go to Dashboard",
    link: "/t/dash",
    plan: talentFreePlan,
  },
  {
    title: "Talent Pro",
    monthlyPrice: 5,
    description: "Boost your profile and get more visibility",
    features: [
      `${talentProPlan.bioGenerationsPerDay} daily AI improvements`,
      "Boosted profile visibility",
    ],
    actionLabel: "Get Started",
    popular: true,
    plan: talentProPlan,
    exclusive: true,
  },
];
