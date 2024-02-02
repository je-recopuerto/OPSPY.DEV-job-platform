import { auth } from "@/auth";
import { JobOverview, JobSearchParams } from "@/components/jobs/job-overview";
import JobPagination from "@/components/jobs/job-pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  JobPostWithCompany,
  fetchJobsPages,
  getJobPostsWithCompany,
} from "@/services/JobService";
import {
  UserWithJobTrackers,
  getUserWithJobTrackersById,
} from "@/services/UserService";

type JobPageParams = {
  searchParams: JobSearchParams;
};

export default async function JobList({ searchParams }: JobPageParams) {
  const session = await auth();
  const [jobs, user] = await Promise.all([
    getJobPostsWithCompany(searchParams),
    getUserWithJobTrackersById(session?.user?.id),
  ]);

  const maxPages = await fetchJobsPages(searchParams);

  return (
    <>
      <ScrollArea>
        <div className={"flex flex-col gap-4"}>
          {jobs.map((job) => (
            <JobOverview
              job={job}
              key={job.id}
              isFollowing={isFollowing(job, user)}
              searchParams={searchParams}
            />
          ))}

          {jobs.length === 0 && (
            <p className={"text-center text-sm text-muted-foreground"}>
              No jobs found. Try changing your filters.
            </p>
          )}
        </div>
      </ScrollArea>

      <JobPagination totalPages={maxPages} />
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
