import { JobPost, JobSkeleton } from "@/components/jobs/job-post";
import { Suspense } from "react";

export const metadata = {
  title: "Jobs",
};

type JobPageParams = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function JobsPage({
  searchParams: { jid },
}: JobPageParams) {
  if (!jid) return null;

  const jobId = typeof jid === "string" ? jid : jid[0];

  return (
    <Suspense fallback={<JobSkeleton />}>
      <JobPost jobId={jobId} />
    </Suspense>
  );
}
