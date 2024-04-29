import { getJobPostFromIdUserScoped } from "@/lib/data/job";
import { Metadata } from "next";
import { Suspense } from "react";
import { JobSkeleton, Post } from "./_components/job-post";

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

export async function generateMetadata({
  searchParams: { jid },
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const { jobPost } = await getJobPostFromIdUserScoped(jid as string);

  if (!jobPost) return { title: "Jobs" };

  return {
    title: jobPost.title,
    openGraph: {
      title: jobPost.title,
      description: jobPost.description?.slice(0, 160),
    },
  };
}
