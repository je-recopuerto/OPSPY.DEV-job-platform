import { JobFeed, JobFeedSkeleton } from "@/components/jobs/job-feed";
import { JobPost, JobSkeleton } from "@/components/jobs/job-post";
import { filterJobPostsSchema } from "@/schemas/jobPost";
import { Suspense } from "react";
import { z } from "zod";

type JobPageParams = {
  params: {
    jobId: string;
  };
  searchParams: z.infer<typeof filterJobPostsSchema>;
};

export const metadata = {
  title: "Jobs",
};

export default async function JobPage({ params, searchParams }: JobPageParams) {
  return (
    <>
      <div className={"flex columns-2 gap-2 max-h-[70vh]"}>
        <div className={"w-[40%]"}>
          <Suspense fallback={<JobFeedSkeleton />}>
            <JobFeed searchParams={searchParams} />
          </Suspense>
        </div>

        <div className={"w-[60%]"}>
          <Suspense fallback={<JobSkeleton />}>
            <JobPost jobId={params.jobId} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
