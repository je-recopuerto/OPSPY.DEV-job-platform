import JobListing from "@/components/job-listing/job-listing";
import {
  getJobPostsWithCompany,
  JobPostWithCompany,
} from "@/services/jobPostService";
import { auth } from "@/auth";
import {
  getUserWithJobTrackersById,
  UserWithJobTrackers,
} from "@/services/userService";

export default async function JobFeed() {
  const session = await auth();
  if (!session) return;

  const user = await getUserWithJobTrackersById(session.user.id);
  if (!user) return;

  const jobs = await getJobPostsWithCompany();

  return (
    <>
      <h1 className="text-2xl font-semibold pb-6">Jobs ({jobs.length})</h1>

      <div className={"grid gap-4 md:grid-cols-2 lg:grid-cols-2"}>
        {jobs.map((job) => (
          <JobListing
            job={job}
            key={job.id}
            isFollowing={isFollowing(job, user)}
          />
        ))}
      </div>
    </>
  );
}

const isFollowing = (job: JobPostWithCompany, user: UserWithJobTrackers) => {
  return user.trackers.find((t) => t.jobId === job.id) !== undefined;
};
