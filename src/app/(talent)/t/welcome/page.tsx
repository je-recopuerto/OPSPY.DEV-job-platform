import { auth } from "@/auth";
import OnboardingForm from "@/components/onboarding/OnboardCard";
import { getUserById } from "@/services/UserService";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Welcome",
};

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
