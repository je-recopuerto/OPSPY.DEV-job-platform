import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowRight, HammerIcon } from "lucide-react";

export default function ProfileSetupAlert() {
  return (
    <Alert>
      <HammerIcon className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You need to complete your profile before you can apply to jobs.
        <a href="/t/welcome" className="underline justify-end ml-1">
          Complete your profile <ArrowRight className="h-4 w-4 inline" />
        </a>
      </AlertDescription>
    </Alert>
  );
}
