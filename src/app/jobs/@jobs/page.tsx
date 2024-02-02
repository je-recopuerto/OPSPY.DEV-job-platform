import JobList from "@/components/jobs/job-list";
import { JobOverviewSkeleton } from "@/components/jobs/job-overview";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Suspense } from "react";

type JobPageParams = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function SearchPage({ searchParams }: JobPageParams) {
  const key = Object.values(searchParams).join("");

  return (
    <Suspense fallback={<Skeleton />} key={key}>
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
