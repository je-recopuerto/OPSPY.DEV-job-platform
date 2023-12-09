import JobListing from "@/components/job-listing/job-listing";
import {getJobPostsWithCompany} from "@/services/jobPostService";

export default async function JobFeed() {
  const jobs = await getJobPostsWithCompany();

  return (
    <>
      <h1 className="text-2xl font-semibold pb-6 pt-12">Jobs ({jobs.length})</h1>

      <div className={"flex flex-col gap-y-3"}>
        {jobs.map((job) => (
          <JobListing job={job} key={job.id} />
        ))}
      </div>
    </>
  )
}