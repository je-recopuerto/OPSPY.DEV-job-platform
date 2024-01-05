import { auth } from "@/auth";
import { getUserWithCompanyById } from "@/services/UserService";
import { SignIn } from "@/components/auth-components";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import CompanyProfile from "@/components/jobs/company-profile";
import { getCompanyWithOpeningsById } from "@/services/JobService";
import CompanyJobTable from "@/components/dashboard/employer/company-job-table";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import ApplicationsTable from "@/components/dashboard/applications/applications-table";
import { getApplicationsForCompanyId } from "@/services/ApplicationService";

export default async function EmployerDashboardPage() {
  const session = await auth();
  if (!session?.user) return <SignIn />;

  const user = await getUserWithCompanyById(session.user.id);
  if (!user || !user.company) return redirect("/e");

  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CompanyProfile company={user.company} />

        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Employer Dashboard
          </h2>
          <div className="flex items-center space-x-2">
            <Button asChild>
              <Link href={"/jobs/new"}>
                <PlusIcon className={"w-4 h-4 mr-2"} />
                Add Job
              </Link>
            </Button>
          </div>
        </div>
        <Tabs defaultValue="jobs" className="space-y-4">
          <TabsList>
            <TabsTrigger value="jobs">Job Postings</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>
          <TabsContent value="jobs" className="space-y-4">
            {/*<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">*/}
            {/*  <Card>*/}
            {/*    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">*/}
            {/*      <CardTitle className="text-sm font-medium">*/}
            {/*        Active Posts*/}
            {/*      </CardTitle>*/}

            {/*      <PinIcon className={"h-4 w-4 text-muted-foreground"} />*/}
            {/*    </CardHeader>*/}
            {/*    <CardContent>*/}
            {/*      <div className="text-2xl font-bold">1</div>*/}
            {/*      <p className="text-xs text-muted-foreground">*/}
            {/*        +20% from last month*/}
            {/*      </p>*/}
            {/*    </CardContent>*/}
            {/*  </Card>*/}
            {/*  <Card>*/}
            {/*    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">*/}
            {/*      <CardTitle className="text-sm font-medium">*/}
            {/*        Waiting for response*/}
            {/*      </CardTitle>*/}
            {/*      <Timer className={"h-4 w-4 text-muted-foreground"} />*/}
            {/*    </CardHeader>*/}
            {/*    <CardContent>*/}
            {/*      <div className="text-2xl font-bold">2</div>*/}
            {/*      <p className="text-xs text-muted-foreground">*/}
            {/*        +19% from last month*/}
            {/*      </p>*/}
            {/*    </CardContent>*/}
            {/*  </Card>*/}
            {/*  <Card>*/}
            {/*    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">*/}
            {/*      <CardTitle className="text-sm font-medium">*/}
            {/*        Interviewing*/}
            {/*      </CardTitle>*/}
            {/*      <svg*/}
            {/*        xmlns="http://www.w3.org/2000/svg"*/}
            {/*        viewBox="0 0 24 24"*/}
            {/*        fill="none"*/}
            {/*        stroke="currentColor"*/}
            {/*        strokeLinecap="round"*/}
            {/*        strokeLinejoin="round"*/}
            {/*        strokeWidth="2"*/}
            {/*        className="h-4 w-4 text-muted-foreground"*/}
            {/*      >*/}
            {/*        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />*/}
            {/*        <circle cx="9" cy="7" r="4" />*/}
            {/*        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />*/}
            {/*      </svg>*/}
            {/*    </CardHeader>*/}
            {/*    <CardContent>*/}
            {/*      <div className="text-2xl font-bold">3</div>*/}
            {/*      <p className="text-xs text-muted-foreground">*/}
            {/*        +0% from last month*/}
            {/*      </p>*/}
            {/*    </CardContent>*/}
            {/*  </Card>*/}
            {/*  <Card>*/}
            {/*    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">*/}
            {/*      <CardTitle className="text-sm font-medium">*/}
            {/*        Rejected*/}
            {/*      </CardTitle>*/}
            {/*      <CircleSlash2 className={"h-4 w-4 text-muted-foreground"} />*/}
            {/*    </CardHeader>*/}
            {/*    <CardContent>*/}
            {/*      <div className="text-2xl font-bold">4</div>*/}
            {/*      <p className="text-xs text-muted-foreground">*/}
            {/*        13% of your total jobs*/}
            {/*      </p>*/}
            {/*    </CardContent>*/}
            {/*  </Card>*/}
            {/*</div>*/}
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="px-4">
                  {/*<JobTrackerTable data={data} />*/}
                  <Suspense fallback={<div>Loading...</div>}>
                    <JobTable companyId={user.company.id} />
                  </Suspense>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value={"applications"} className="space-y-4">
            <Suspense fallback={<div>Loading...</div>}>
              <ServerApplicationsTable companyId={user.company.id} />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

async function JobTable({ companyId }: { companyId: number }) {
  const company = await getCompanyWithOpeningsById(companyId);

  if (!company) return <div>Company not found.</div>;

  return <CompanyJobTable data={company} />;
}

async function ServerApplicationsTable({ companyId }: { companyId: number }) {
  const applications = await getApplicationsForCompanyId(companyId);

  return <ApplicationsTable data={applications} />;
}
