import { auth } from "@/auth";
import {
  getUserWithJobTrackersById,
  UserWithJobTrackers,
} from "@/services/userService";
import JobListing from "@/components/jobs/job-listing";
import {
  getJobPostsWithCompany,
  JobPostWithCompany,
} from "@/services/JobService";

export default async function JobFeed() {
  return (
    <>
      <div className={"grid gap-4 md:grid-cols-2 lg:grid-cols-2"}></div>
    </>
  );
}
