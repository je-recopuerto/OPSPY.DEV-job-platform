import {OnboardingCardProps} from "@/components/onboarding/getting-started";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";

export default function FormSubmitButton({form}: OnboardingCardProps) {
  const {formState: {isSubmitting}} = form

  return (
    <>
      {isSubmitting ? (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
          Please wait
        </Button>
      ) : (
        <Button type="submit">
          Submit
        </Button>
      )}
    </>
  )
}