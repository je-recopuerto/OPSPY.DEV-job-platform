import { getJobPostFromId } from "@/lib/data/job";
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
  if (!jid) return { title: "Jobs" };

  const jobPost = await getJobPostFromId(jid as string);
  if (!jobPost) return { title: "Job not found" };

  return {
    title: `${jobPost.title} at ${jobPost.company.name}`,
    description: jobPost.description?.slice(0, 160),
    openGraph: {
      title: jobPost.title,
      description: jobPost.description?.slice(0, 160),
    },
  };
}
