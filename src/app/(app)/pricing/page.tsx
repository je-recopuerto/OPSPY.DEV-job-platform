import Hero1 from "@/app/(app)/(marketing)/_components/hero1";
import { PricingGrid } from "@/app/(app)/pricing/_components/pricing-card";
import { auth } from "@/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { employerPlans, talentPlans } from "@/config/subscriptions";
import { getUserSubscriptionPlan } from "@/lib/data/user";

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
