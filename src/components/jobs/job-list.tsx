import { auth } from "@/auth";
import { JobOverview } from "@/components/jobs/job-overview";
import JobPagination from "@/components/jobs/job-pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchJobsPages, getJobPostsWithCompany } from "@/lib/data/job";
import { JobPostWithCompany } from "@/lib/data/job.types";
import { getUserWithJobTrackersById } from "@/lib/data/user";
import { UserWithJobTrackers } from "@/lib/data/user.types";
import { jobFilterSchema } from "@/lib/params";
import { z } from "zod";

type JobPageParams = {
  filter: z.infer<typeof jobFilterSchema>;
};

export default async function JobList({ filter }: JobPageParams) {
  const session = await auth();
  const [jobs, user] = await Promise.all([
    getJobPostsWithCompany(filter),
    getUserWithJobTrackersById(session?.user?.id),
  ]);

  const maxPages = await fetchJobsPages(filter);

  return (
    <>
      <ScrollArea>
        <div className={"flex flex-col gap-4"}>
          {jobs.map((job) => (
            <JobOverview
              job={job}
              key={job.id}
              isFollowing={isFollowing(job, user)}
              filter={filter}
            />
          ))}

          {jobs.length === 0 && (
            <p className={"text-center text-sm text-muted-foreground"}>
              No jobs found. Try changing your filters.
            </p>
          )}
        </div>
      </ScrollArea>

      <JobPagination currentPage={filter.page ?? 1} totalPages={maxPages} />
    </>
  );
}

const isFollowing = (
  job: JobPostWithCompany,
  user: UserWithJobTrackers | null,
) => {
  if (!user) return false;
  return user.trackers.find((t) => t.jobId === job.id) !== undefined;
};
