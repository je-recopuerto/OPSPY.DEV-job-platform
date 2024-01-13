import { auth } from "@/auth";
import JobFeed from "@/components/jobs/job-feed";
import JobFilter from "@/components/jobs/job-filter";
import JobPost from "@/components/jobs/job-post";
import { filterJobPostsSchema } from "@/schemas/jobPost";
import { getJobPostFromIdUserScoped } from "@/services/JobService";
import { z } from "zod";

type JobPageParams = {
  params: {
    jobId: string;
  };
  searchParams: z.infer<typeof filterJobPostsSchema>;
};

export default async function JobPage(props: JobPageParams) {
  const session = await auth();

  const result = await getJobPostFromIdUserScoped(
    props.params.jobId,
    session?.user?.id,
  );

  if (!result || !result.jobPost) {
    return <>Post not found!</>;
  }

  return (
    <>
      <JobFilter />

      <div className={"flex columns-2 gap-2 max-h-[70vh]"}>
        <JobFeed
          className={"w-[40%]"}
          userId={session?.user?.id}
          searchParams={props.searchParams}
        />

        <JobPost
          job={result.jobPost}
          isSavedInitial={result.isSaved}
          isApplied={result.hasApplied}
        />
      </div>
    </>
  );
}
