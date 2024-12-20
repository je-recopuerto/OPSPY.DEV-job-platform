import CompanyProfile from "@/app/(app)/jobs/_components/company-profile";
import { isAuthorizedForEmployerDash } from "@/app/_actions";
import { auth } from "@/auth";
import Spinner from "@/components/cui/Spinner";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/cui/tabs";
import { buttonVariants } from "@/components/ui/button";
import { getApplicationsForCompanyId } from "@/lib/data/application";
import { getCompanyWithOpeningsAndApplicationsById } from "@/lib/data/job";
import { homeUrl, newJobUrl } from "@/lib/pages";
import { cn } from "@/lib/utils";
import { Company } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import ApplicationsTable from "./_components/applications-table";
import CompanyJobTable from "./_components/company-job-table";

export const metadata = {
  title: "Dashboard",
};

type EmployerDashboardPageProps = {
  searchParams: Promise<{
    tab?: string;
  }>;
};

export default async function EmployerDashboardPage({
  searchParams,
}: EmployerDashboardPageProps) {
  const tab = (await searchParams).tab;
  const session = await auth();
  const response = await isAuthorizedForEmployerDash(session?.user?.id);
  if (!response.success) return redirect(homeUrl);

  const { company } = response.value;
  if (!company) return notFound();

  return (
    <div className="container min-h-screen space-y-4">
      <CompanyProfile company={company} showStatus={true} />

      <div className="flex items-center justify-between space-y-2">
        <h2 className="flex align-baseline text-3xl font-bold tracking-tight">
          Employer Dashboard
        </h2>
        <div className="flex items-center space-x-2">
          <AddJobButton disabled={!company.isVerified} />
        </div>
      </div>
      <Tabs defaultValue={tab || "jobs"} className="space-y-4">
        <TabsList>
          <TabsTrigger value="jobs">Job Postings</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>
        <TabsContent value="jobs" className="space-y-4">
          <Suspense fallback={<Spinner />}>
            <JobTable companyId={company.id} />
          </Suspense>
        </TabsContent>
        <TabsContent value={"applications"} className="space-y-4">
          <Suspense fallback={<Spinner />}>
            <ServerApplicationsTable companyId={company.id} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const AddJobButton = ({ disabled }: { disabled: boolean }) => {
  return (
    <div className={"flex flex-col gap-1"}>
      <Link
        href={newJobUrl}
        className={cn(
          buttonVariants(),
          "ml-auto align-end",
          disabled ? "pointer-events-none opacity-50" : "",
        )}
      >
        <PlusIcon className={"w-4 h-4 mr-2"} />
        Add Job
      </Link>
      {disabled && (
        <p className={"text-xs text-muted-foreground"}>Requires verification</p>
      )}
    </div>
  );
};

async function JobTable({ companyId }: { companyId: Company["id"] }) {
  const company = await getCompanyWithOpeningsAndApplicationsById(companyId);
  if (!company) return <div>Company not found.</div>;

  return <CompanyJobTable data={company} />;
}

async function ServerApplicationsTable({ companyId }: { companyId: string }) {
  const applications = await getApplicationsForCompanyId(companyId);

  return <ApplicationsTable data={applications} />;
}
