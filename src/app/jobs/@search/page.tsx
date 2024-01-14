import { JobFeed } from "@/components/jobs/job-feed";
import { filterJobPostsSchema } from "@/schemas/jobPost";
import { z } from "zod";

type JobPageParams = {
  searchParams: z.infer<typeof filterJobPostsSchema>;
};

export default function SearchPage({ searchParams }: JobPageParams) {
  return <JobFeed searchParams={searchParams} />;
}
