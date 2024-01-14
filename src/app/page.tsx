import FeaturedJobs from "@/components/home/featured-jobs";
import FindNextJobCta from "@/components/home/find-next-job";
import JobFilter from "@/components/home/job-filter";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/home/page-header";

export default async function Home() {
  return (
    <div>
      <PageHeader>
        {/*<Announcement />*/}

        <PageHeaderHeading>
          Job Hunting,{" "}
          <h1 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            Simplified.
          </h1>
        </PageHeaderHeading>
        <PageHeaderDescription>
          Search for jobs and apply directly from our platform.
        </PageHeaderDescription>
        <PageActions>
          <JobFilter />
        </PageActions>
      </PageHeader>

      <FindNextJobCta />

      <FeaturedJobs count={3} />

      {/*<ExamplesNav className="[&>a:first-child]:text-primary" />*/}
      {/*<section className="overflow-hidden rounded-lg border bg-background shadow-md md:hidden md:shadow-xl">*/}
      {/*  <Image*/}
      {/*    src="/examples/mail-dark.png"*/}
      {/*    width={1280}*/}
      {/*    height={727}*/}
      {/*    alt="Mail"*/}
      {/*    className="hidden dark:block"*/}
      {/*  />*/}
      {/*  <Image*/}
      {/*    src="/examples/mail-light.png"*/}
      {/*    width={1280}*/}
      {/*    height={727}*/}
      {/*    alt="Mail"*/}
      {/*    className="block dark:hidden"*/}
      {/*  />*/}
      {/*</section>*/}
      {/*<section className="hidden md:block">*/}
      {/*  <div className="overflow-hidden rounded-lg border bg-background shadow-lg">*/}
      {/*    <MailPage />*/}
      {/*  </div>*/}
      {/*</section>*/}
    </div>
  );
}
