import { Suspense } from "react";
import JobFeed from "@/components/jobs/job-feed";

export default function JobsPage() {
  return (
    <main className="flex min-h-screen flex-col p-14">
      <Suspense fallback={<p>Loading feed...</p>}>
        <JobFeed />
      </Suspense>
    </main>
  );
}
