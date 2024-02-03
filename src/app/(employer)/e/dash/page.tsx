import { isAuthorizedForEmployerDash } from "@/app/_actions";
import { auth } from "@/auth";
import { SignIn } from "@/components/auth";
import Spinner from "@/components/cui/Spinner";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/cui/tabs";
import ApplicationsTable from "@/components/dashboard/applications/applications-table";
import CompanyJobTable from "@/components/dashboard/employer/company-job-table";
import CompanyProfile from "@/components/jobs/company-profile";
import { buttonVariants } from "@/components/ui/button";
import { getApplicationsForCompanyId } from "@/lib/data/application";
import { getCompanyWithOpeningsAndApplicationsById } from "@/lib/data/job";
import { newJobUrl } from "@/lib/pages";
import { cn } from "@/lib/utils";
import { Company } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata = {
  title: "Dashboard",
};

type EmployerDashboardPageProps = {
  searchParams: {
    tab?: string;
  };
};

export default async function EmployerDashboardPage({
  searchParams: { tab },
}: EmployerDashboardPageProps) {
  const session = await auth();
  if (!session?.user || !session.user.id) return <SignIn />;

  const response = await isAuthorizedForEmployerDash(session.user.id);
  if (!response.authorized) return redirect("/t/dash");

  const { company } = response.data.user;
  if (!company) return notFound();

  return (
    <div className="container min-h-screen space-y-4">
      <CompanyProfile company={company} />

      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Employer Dashboard
        </h2>
        <div className="flex items-center space-x-2">
          <Link href={newJobUrl} className={cn(buttonVariants())}>
            <PlusIcon className={"w-4 h-4 mr-2"} />
            Add Job
          </Link>
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

async function JobTable({ companyId }: { companyId: Company["id"] }) {
  const company = await getCompanyWithOpeningsAndApplicationsById(companyId);
  if (!company) return <div>Company not found.</div>;

  return <CompanyJobTable data={company} />;
}

async function ServerApplicationsTable({ companyId }: { companyId: string }) {
  const applications = await getApplicationsForCompanyId(companyId);

  return <ApplicationsTable data={applications} />;
}
