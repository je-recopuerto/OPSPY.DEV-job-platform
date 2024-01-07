import JobOverview from "@/components/jobs/job-overview";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
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

export default async function JobFeed({
  userId,
  searchParams,
  className,
}: {
  userId: string;
  searchParams: z.infer<typeof filterJobPostsSchema>;
  className?: string;
}) {
  const [jobs, user] = await Promise.all([
    getJobPostsWithCompany(searchParams),
    getUserWithJobTrackersById(userId),
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
