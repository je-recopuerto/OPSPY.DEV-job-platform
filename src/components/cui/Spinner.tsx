import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type SpinnerProps = {
  text?: string;
  className?: string;
};

export default function Spinner({ className, text }: SpinnerProps) {
  return (
    <p
      className={cn(
        className,
        "flex flex-row ml-2 text-sm text-muted-foreground items-center",
      )}
    >
      <Loader2 className="h-4 w-4 animate-spin mr-2" />
      {text ?? "Loading..."}
    </p>
  );
}
