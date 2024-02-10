import { auth } from "@/auth";
import Hero1 from "@/components/home/hero1";
import { PricingGrid } from "@/components/pricing/pricing-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { employerPlans, talentPlans } from "@/config/subscriptions";
import { getUserSubscriptionPlan } from "@/lib/data/user";
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

const CheckItem = ({ text }: { text: string }) => (
  <div className="flex gap-2">
    <CheckCircle2 size={18} className="my-auto text-green-400" />
    <p className="pt-0.5 text-zinc-700 dark:text-zinc-300 text-sm">{text}</p>
  </div>
);

export default async function Page() {
  const session = await auth();
  const isSignedIn = !!session;

  let currentPlan;

  if (session && session.user && session.user.id) {
    currentPlan = await getUserSubscriptionPlan(session?.user.id);
  }

  return (
    <div className="py-8">
      <Hero1 />
      <PricingHeader
        title="Pricing Plans"
        subtitle="Choose the plan that's right for you"
      />
      <Tabs defaultValue="talent">
        <TabsList className="w-[400px] mx-auto grid grid-cols-2">
          <TabsTrigger value="talent">Talent</TabsTrigger>
          <TabsTrigger value="employer">Employer</TabsTrigger>
        </TabsList>
        <TabsContent value={"talent"}>
          <PricingGrid
            plans={talentPlans}
            isSignedIn={isSignedIn}
            currentPlan={currentPlan}
          />
        </TabsContent>
        <TabsContent value={"employer"}>
          <PricingGrid
            plans={employerPlans}
            isSignedIn={isSignedIn}
            currentPlan={currentPlan}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
