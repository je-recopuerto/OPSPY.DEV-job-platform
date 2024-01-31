import { auth } from "@/auth";
import OnboardingCard from "@/components/onboarding/onboarding";
import { getUserById } from "@/services/UserService";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Welcome",
};

export default async function OnboardingPage() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return <p>Access denied</p>;
  }

  const user = await getUserById(session.user.id);
  if (user) {
    return redirect("/t/dash");
  }

  return <OnboardingCard email={session.user?.email ?? ""} />;
}
