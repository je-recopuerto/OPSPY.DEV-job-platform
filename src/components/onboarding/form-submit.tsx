import {OnboardingCardProps} from "@/components/onboarding/getting-started";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";

export default function FormSubmitButton({form}: OnboardingCardProps) {
  const {formState: {isSubmitting}} = form

  return (
    <>
      <Button className={"w-full"} disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
            Please wait
          </>
        ) : (
          <>
            Climb aboard!
          </>
        )}
      </Button>
    </>
  )
}