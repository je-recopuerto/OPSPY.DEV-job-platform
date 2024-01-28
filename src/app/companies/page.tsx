import CompanyFilter from "@/components/companies/company-filter";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/cui/breadcrumb";
import CompanyProfileWithOpenings from "@/components/jobs/company-profile-with-openings";
import JobPagination from "@/components/jobs/job-pagination";
import { companyFilterSchema } from "@/schemas/company";
import { getCompaniesWithOpenings } from "@/services/CompanyService";
import { Suspense } from "react";
import { z } from "zod";

export const metadata = {
  title: "Companies",
};

type Props = {
  searchParams: z.infer<typeof companyFilterSchema>;
};

export default function ({ searchParams }: Props) {
  return (
    <main className=" container min-h-screen ">
      <Breadcrumb className={"mb-4"}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/components">Companies</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Suspense fallback={<p>Loading feed...</p>}>
        <CompanyFeed searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function CompanyFeed({
  searchParams,
}: {
  searchParams: z.infer<typeof companyFilterSchema>;
}) {
  const companies = await getCompaniesWithOpenings(searchParams);

  return (
    <>
      <h1 className="text-2xl font-semibold pb-6">
        Explore Companies ({companies.length})
      </h1>

      <div className="grid flex-1 space-x-2 md:grid-cols-[300px_1fr]">
        <aside className="hidden flex-col md:flex">
          <CompanyFilter />
        </aside>

        <main className="flex flex-1 flex-col w-full overflow-hidden gap-y-3">
          {companies.map((company) => (
            <CompanyProfileWithOpenings company={company} key={company.id} />
          ))}{" "}
        </main>
      </div>

      <JobPagination totalPages={10} />
    </>
  );
}
