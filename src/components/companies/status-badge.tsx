import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { BadgeCheck, ShieldQuestionIcon } from "lucide-react";

export default function StatusBadge({
  isVerified,
  className,
}: {
  isVerified: boolean;
  className?: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {isVerified ? (
            <BadgeCheck
              className={cn(
                "inline-flex w-4 h-4 bg-green-500 rounded-full mr-2",
                className,
              )}
            />
          ) : (
            <ShieldQuestionIcon
              className={cn(
                "inline-flex w-4 h-4 text-red-500 rounded-full mr-2",
                className,
              )}
            />
          )}
        </TooltipTrigger>
        <TooltipContent>
          {isVerified ? <p>Verified</p> : <p>Awaiting verification</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
