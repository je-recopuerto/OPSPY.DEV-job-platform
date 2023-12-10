import { OnboardingCardProps } from "@/components/onboarding/getting-started";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";

export default function YourExperience({ form }: OnboardingCardProps) {
  return (
    <>
      <CardHeader>
        <CardTitle>Work experience</CardTitle>
        <CardDescription>
          This can be full time, part time or internships
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className={"flex flex-row justify-end space-x-2"}>
          <Button variant="outline" size="icon">
            <PlusIcon className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon">
            <MinusIcon className="h-4 w-4" />
          </Button>
        </div>

        <div></div>
      </CardContent>
    </>
  );
}
