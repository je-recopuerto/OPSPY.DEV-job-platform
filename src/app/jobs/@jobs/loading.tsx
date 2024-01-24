import { JobOverviewSkeleton } from "@/components/jobs/job-overview";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SearchLoadingPage() {
  return (
    <ScrollArea className={"w-full"}>
      <div className={"flex flex-col gap-4"}>
        {Array.from({ length: 3 }).map((_, i) => (
          <JobOverviewSkeleton key={i} />
        ))}
      </div>
    </ScrollArea>
  );
}
