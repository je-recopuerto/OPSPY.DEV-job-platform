import CompanyFilter from "@/app/(app)/(employer)/e/applications/[applicationId]/_components/company-filter";
import {
  CompanyProfileSkeleton,
  CompanyProfileWithOpenings,
} from "@/app/(app)/jobs/_components/company-profile-with-openings";
import JobPagination from "@/app/(app)/jobs/_components/job-pagination";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/cui/breadcrumb";
import {
  getCompaniesPageCount,
  getCompaniesWithOpenings,
} from "@/lib/data/company";
import { companyFilterSchema } from "@/schemas/company";
import { Suspense } from "react";
import { z } from "zod";

export const metadata = {
  title: "Companies",
};

type Props = {
  searchParams: z.infer<typeof companyFilterSchema>;
};

export default async function ({ searchParams }: Props) {
  const totalPages = await getCompaniesPageCount(searchParams);

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

      <h1 className="text-2xl font-semibold pb-6">Explore Companies</h1>

      <div className="grid flex-1 space-x-2 md:grid-cols-[300px_1fr]">
        <aside className="hidden flex-col md:flex">
          <CompanyFilter />
        </aside>

        <Suspense
          fallback={<CompaniesSkeleton />}
          key={`${searchParams.page}${searchParams.name}`}
        >
          <Companies searchParams={searchParams} />
        </Suspense>
      </div>
      <JobPagination
        currentPage={searchParams.page ?? 1}
        totalPages={totalPages}
      />
    </main>
  );
}

function CompaniesSkeleton() {
  return (
    <main className="flex flex-1 flex-col w-full overflow-hidden gap-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <CompanyProfileSkeleton key={i} />
      ))}
    </main>
  );
}

async function Companies({
  searchParams,
}: {
  searchParams: z.infer<typeof companyFilterSchema>;
}) {
  const companies = await getCompaniesWithOpenings(searchParams);

  return (
    <main className="flex flex-1 flex-col w-full overflow-hidden gap-y-3">
      {companies.map((company) => (
        <CompanyProfileWithOpenings company={company} key={company.id} />
      ))}{" "}
      {companies.length === 0 && (
        <p className="text-sm text-center text-muted-foreground">
          No companies found.
        </p>
      )}
    </main>
  );
}
