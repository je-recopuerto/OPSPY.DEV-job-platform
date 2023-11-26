import OnboardingCard from "@/components/onboarding/OnboardCard";

export default async function OnboardingPage() {
  async function handleOnboarding() {
    "use server"

    console.log("Handling onboarding")
  }

  return (
    <form action={handleOnboarding}>
      <OnboardingCard />
    </form>
  )
}