import { JobPost, JobSkeleton } from "@/components/jobs/job-post";
import { Suspense } from "react";

export const metadata = {
  title: "Jobs",
};

type JobPageParams = {
  searchParams: {
    jid: string;
  };
};

export default async function JobsPage({
  searchParams: { jid },
}: JobPageParams) {
  return (
    <Suspense fallback={<JobSkeleton />} key={jid}>
      <JobPost jobId={jid} />
    </Suspense>
  );
}
