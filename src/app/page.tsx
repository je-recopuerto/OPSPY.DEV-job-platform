import Spinner from "@/components/cui/Spinner";
import FeaturedJobs from "@/components/home/featured-jobs";
import FindNextJobCta from "@/components/home/find-next-job";
import JobFilter from "@/components/home/job-filter";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/home/page-header";
import { getRandomJobPosts } from "@/services/JobService";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div>
      <PageHeader>
        {/*<Announcement />*/}

        <PageHeaderHeading>
          Jobs,{" "}
          <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            Simplified.
          </span>
        </PageHeaderHeading>
        <PageHeaderDescription>
          Search for jobs and apply directly from our platform.
        </PageHeaderDescription>
        <PageActions>
          <JobFilter />
        </PageActions>
      </PageHeader>

      <FindNextJobCta />

      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <Suspense fallback={<Spinner className={"mx-auto"} />}>
            <FeaturedJobsSection />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

async function FeaturedJobsSection() {
  const jobs = await getRandomJobPosts(4);

  return <FeaturedJobs jobs={jobs} />;
}
