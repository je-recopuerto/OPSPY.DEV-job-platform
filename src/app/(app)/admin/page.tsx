import CompanyTable from "@/app/(app)/admin/_components/company-table";
import Overview from "@/app/(app)/admin/_components/overview";
import { auth } from "@/auth";
import Spinner from "@/components/cui/Spinner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/cui/breadcrumb";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/cui/tabs";
import { getCompanysToReview } from "@/lib/data/company";
import { getUserById } from "@/lib/data/user";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata = {
  title: "Admin",
};

export default async function AdminPage() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) return redirect("/");

  const user = await getUserById(session.user.id);
  if (!user || !user.isSuperUser) return notFound();

  return (
    <div className={"container min-h-screen"}>
      <div className="flex-1 space-y-4">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="/components">Admin Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>

          {/*<div className="flex items-center space-x-2">*/}
          {/*  <Button>*/}
          {/*    <DownloadIcon className={"h-4 w-4 mr-2"} />*/}
          {/*    Download*/}
          {/*  </Button>*/}
          {/*</div>*/}
        </div>
        <Tabs defaultValue="applications" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="company-requests">Company Requests</TabsTrigger>
          </TabsList>

          <TabsContent value={"overview"} className="space-y-4">
            <Overview />
          </TabsContent>

          <TabsContent value={"company-requests"} className="space-y-4">
            <Suspense fallback={<Spinner />}>
              <CompanyReviewTable />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

const CompanyReviewTable = async () => {
  const companies = await getCompanysToReview();

  return <CompanyTable data={companies} />;
};
