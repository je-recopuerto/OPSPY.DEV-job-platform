import JobFilter from "@/components/jobs/job-filter";

type JobsLayoutProps = {
  children: React.ReactNode;
  search: React.ReactNode;
};

export default async function JobsLayout({
  children,
  search,
}: JobsLayoutProps) {
  return (
    <main className="flex-1 space-y-4 p-8 pt-6 min-h-screen">
      <h1 className="text-2xl font-semibold pb-6">Jobs</h1>

      <JobFilter />

      <div className={"flex columns-2 gap-2"}>
        <div className={"w-[40%]"}>{search}</div>
        <div className={"w-[60%]"}>{children}</div>
      </div>
    </main>
  );
}
