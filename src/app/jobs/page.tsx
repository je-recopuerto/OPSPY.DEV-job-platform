import { JobPost } from "@/components/jobs/job-post";
import { getRandomJobPost } from "@/services/JobService";

export const metadata = {
  title: "Jobs",
};

type JobPageParams = {
  searchParams: {
    [key: string]: string | string[];
  };
};

export default async function JobsPage({ searchParams }: JobPageParams) {
  const jobId = firstString(searchParams["jid"]);
  if (!jobId) {
    const jobPost = await getRandomJobPost();
    if (!jobPost) return <div>There are no jobs available at this time.</div>;
    return <JobPost jobId={jobPost.id} />;
  }

  // Append the query string to the redirect URL
  return <JobPost jobId={jobId} />;
}

const firstString = (value: string | string[]) => {
  if (Array.isArray(value)) return value[0];
  return value;
};
