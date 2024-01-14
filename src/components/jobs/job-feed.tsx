import { auth } from "@/auth";
import {
  JobOverview,
  JobOverviewSkeleton,
} from "@/components/jobs/job-overview";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { filterJobPostsSchema } from "@/schemas/jobPost";
import {
  JobPostWithCompany,
  getJobPostsWithCompany,
} from "@/services/JobService";
import {
  UserWithJobTrackers,
  getUserWithJobTrackersById,
} from "@/services/UserService";
import { z } from "zod";

async function JobFeed({
  searchParams,
  className,
}: {
  searchParams: z.infer<typeof filterJobPostsSchema>;
  className?: string;
}) {
  const session = await auth();
  const [jobs, user] = await Promise.all([
    getJobPostsWithCompany(searchParams),
    getUserWithJobTrackersById(session?.user?.id),
  ]);

  const isFollowing = (
    job: JobPostWithCompany,
    user: UserWithJobTrackers | null,
  ) => {
    if (!user) return false;
    return user.trackers.find((t) => t.jobId === job.id) !== undefined;
  };

  return (
    <>
      <ScrollArea className={cn("", className)}>
        <div className={"flex flex-col gap-4"}>
          {jobs.map((job) => (
            <JobOverview
              job={job}
              key={job.id}
              isFollowing={isFollowing(job, user)}
            />
          ))}
        </div>
      </ScrollArea>
    </>
  );
}

function JobFeedSkeleton() {
  return (
    <>
      <ScrollArea className={"w-full"}>
        <div className={"flex flex-col gap-4"}>
          {Array.from({ length: 3 }).map((_, i) => (
            <JobOverviewSkeleton key={i} />
          ))}
        </div>
      </ScrollArea>
    </>
  );
}

export { JobFeed, JobFeedSkeleton };
