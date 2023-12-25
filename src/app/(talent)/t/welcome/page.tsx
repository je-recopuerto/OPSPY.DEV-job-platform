import OnboardingForm from "@/components/onboarding/OnboardCard";
import { auth } from "@/auth";

export default async function OnboardingPage() {
  const session = await auth();
  if (!session) {
    return <p>Access denied</p>;
  }

  return <OnboardingForm email={session.user?.email ?? ""} />;
}
