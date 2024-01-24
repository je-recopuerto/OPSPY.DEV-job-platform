import { auth } from "@/auth";
import { JobOverview } from "@/components/jobs/job-overview";
import { ScrollArea } from "@/components/ui/scroll-area";
import { filterJobPostsSchema } from "@/schemas/jobPost";
import {
  getJobPostsWithCompany,
  JobPostWithCompany,
} from "@/services/JobService";
import {
  getUserWithJobTrackersById,
  UserWithJobTrackers,
} from "@/services/UserService";
import { z } from "zod";

type JobPageParams = {
  searchParams: z.infer<typeof filterJobPostsSchema>;
};

export default async function SearchPage({ searchParams }: JobPageParams) {
  const session = await auth();
  const [jobs, user] = await Promise.all([
    getJobPostsWithCompany(searchParams),
    getUserWithJobTrackersById(session?.user?.id),
  ]);

  return (
    <ScrollArea>
      <div className={"flex flex-col gap-4"}>
        {jobs.map((job) => (
          <JobOverview
            job={job}
            key={job.id}
            isFollowing={isFollowing(job, user)}
          />
        ))}

        {jobs.length === 0 && (
          <p className={"text-center text-sm text-muted-foreground"}>
            No jobs found. Try changing your filters.
          </p>
        )}
      </div>
    </ScrollArea>
  );
}

const isFollowing = (
  job: JobPostWithCompany,
  user: UserWithJobTrackers | null,
) => {
  if (!user) return false;
  return user.trackers.find((t) => t.jobId === job.id) !== undefined;
};
