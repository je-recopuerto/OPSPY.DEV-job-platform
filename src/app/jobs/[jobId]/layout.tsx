import { auth } from "@/auth";
import {
  getUserWithJobTrackersById,
  UserWithJobTrackers,
} from "@/services/userService";
import {
  getJobPostsWithCompany,
  JobPostWithCompany,
} from "@/services/JobService";
import JobListing from "@/components/jobs/job-listing";
import { ScrollArea } from "@/components/ui/scroll-area";

type JobsLayoutProps = {
  children: React.ReactNode;
};

export default async function JobsLayout(props: JobsLayoutProps) {
  const session = await auth();
  if (!session || !session.user) return;

  const user = await getUserWithJobTrackersById(session.user.id);
  const jobs = await getJobPostsWithCompany();

  const isFollowing = (
    job: JobPostWithCompany,
    user: UserWithJobTrackers | null,
  ) => {
    if (!user) return false;
    return user.trackers.find((t) => t.jobId === job.id) !== undefined;
  };

  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <h1 className="text-2xl font-semibold pb-6">Jobs ({jobs.length})</h1>

      <div className={"flex columns-2 gap-2 max-h-[70vh]"}>
        <ScrollArea className={"w-[40%]"}>
          <div className={"flex flex-col gap-4"}>
            {jobs.map((job) => (
              <JobListing
                job={job}
                key={job.id}
                isFollowing={isFollowing(job, user)}
              />
            ))}
          </div>
        </ScrollArea>

        <ScrollArea className={"w-[60%] rounded-lg border"}>
          {props.children}
        </ScrollArea>
      </div>
    </main>
  );
}
