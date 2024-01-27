import JobList from "@/components/jobs/job-list";
import { JobOverviewSkeleton } from "@/components/jobs/job-overview";
import { ScrollArea } from "@/components/ui/scroll-area";
import { filterJobPostsSchema } from "@/schemas/jobPost";
import { Suspense } from "react";
import { z } from "zod";

type JobPageParams = {
  searchParams: z.infer<typeof filterJobPostsSchema>;
};

export default async function SearchPage({ searchParams }: JobPageParams) {
  return (
    <Suspense fallback={<Skeleton />} key={searchParams.page}>
      <JobList searchParams={searchParams} />
    </Suspense>
  );
}

function Skeleton() {
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
