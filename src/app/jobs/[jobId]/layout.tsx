import JobFilter from "@/components/jobs/job-filter";

type JobsLayoutProps = {
  children: React.ReactNode;
};

export default async function JobsLayout(props: JobsLayoutProps) {
  return (
    <main className="flex-1 space-y-4 p-8 pt-6 min-h-screen">
      <h1 className="text-2xl font-semibold pb-6">Jobs</h1>

      <JobFilter />

      {props.children}
    </main>
  );
}
