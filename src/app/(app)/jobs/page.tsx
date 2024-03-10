import { Suspense } from "react";
import { JobSkeleton, Post } from "./_components/job-post";

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
      <Post jobId={jobId} />
    </Suspense>
  );
}
