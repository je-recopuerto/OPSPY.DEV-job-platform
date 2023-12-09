import {Suspense} from "react";
import CompanyFeed from "@/components/company-feed";
import JobFeed from "@/components/job-feed";

export default function CompaniesPage() {
  return (
    <main className="flex min-h-screen flex-col p-14">
      <Suspense fallback={<p>Loading feed...</p>}>
        <CompanyFeed />
      </Suspense>
    </main>
  )
}