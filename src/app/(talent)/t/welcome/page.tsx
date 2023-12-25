import OnboardingForm from "@/components/onboarding/OnboardCard";
import { auth } from "@/auth";
import { getUserById } from "@/services/userService";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const session = await auth();
  if (!session || !session.user) {
    return <p>Access denied</p>;
  }

  const user = await getUserById(session.user.id);
  if (user) {
    return redirect("/t/dash");
  }

  return <OnboardingForm email={session.user?.email ?? ""} />;
}
