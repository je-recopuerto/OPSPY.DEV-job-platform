import { JobStatusStyle } from "@/app/(app)/(employer)/e/dash/_components/company-job-table";
import { cn } from "@/lib/utils";

export default function StatusBadge({
  status,
  className,
}: {
  status: JobStatusStyle;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block w-2 h-2 rounded-full",
        status.color,
        className,
      )}
    ></span>
  );
}
