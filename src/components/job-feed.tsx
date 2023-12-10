import JobListing from "@/components/job-listing/job-listing";
import {getJobPostsWithCompany} from "@/services/jobPostService";

export default async function JobFeed() {
  const jobs = await getJobPostsWithCompany();

  return (
    <>
      <h1 className="text-2xl font-semibold pb-6">Jobs ({jobs.length})</h1>

      <div className={"grid gap-4 md:grid-cols-2 lg:grid-cols-2"}>
        {jobs.map((job) => (
          <JobListing job={job} key={job.id}/>
        ))}
      </div>
    </>
  )
}