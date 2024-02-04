import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const BadgeIcon = ({ isVerified }: { isVerified: boolean }) => {
  return (
    <span
      className={cn(
        "w-3 h-3 animate-pulse bg-green-500 rounded-full mr-2",
        isVerified ? "bg-green-500" : "bg-destructive",
      )}
    />
  );
};

export default function StatusBadge({
  isVerified,
  className,
}: {
  isVerified: boolean;
  className?: string;
}) {
  return isVerified ? (
    <span
      className={cn(
        className,
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800",
      )}
    >
      <BadgeIcon isVerified={isVerified} />
      Verified
    </span>
  ) : (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={cn(
              className,
              "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800",
            )}
          >
            <BadgeIcon isVerified={isVerified} />
            Awaiting verification
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            Your company has not been verified yet. Others won't be able to see
            your company until it's verified.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
