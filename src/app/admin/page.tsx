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
import SavedJobTab from "@/components/dashboard/saved-job-tab";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getCompanyCountGrowth } from "@/lib/data/company";
import { getJobCountGrowth } from "@/lib/data/job";
import { getUserById, getUserCountGrowth } from "@/lib/data/user";
import { Timer } from "lucide-react";
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
            <TabsTrigger value="saved-jobs">Saved Jobs</TabsTrigger>
          </TabsList>

          <TabsContent value={"overview"} className="space-y-4">
            <Overview />
          </TabsContent>

          <Suspense fallback={<Spinner />}>
            <TabsContent value={"saved-jobs"} className="space-y-4">
              <SavedJobTab userId={session.user.id} />
            </TabsContent>
          </Suspense>
        </Tabs>
      </div>
    </div>
  );
}

const Overview = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Suspense fallback={<CardSkeleton title={"Total users"} />}>
        <TotalUsers />
      </Suspense>

      <Suspense fallback={<CardSkeleton title={"Total jobs"} />}>
        <TotalJobs />
      </Suspense>

      <Suspense fallback={<CardSkeleton title={"Total companies"} />}>
        <TotalCompanies />
      </Suspense>
    </div>
  );
};

const TotalUsers = async () => {
  const { count, countLastMonth } = await getUserCountGrowth();
  const monthGrowth = calculateGrowth(count, countLastMonth);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Total active users
        </CardTitle>
        <Timer className={"h-4 w-4 text-muted-foreground"} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        <p className="text-xs text-muted-foreground">
          {monthGrowth}% from last month
        </p>
      </CardContent>
    </Card>
  );
};

const TotalJobs = async () => {
  const { count, countLastMonth } = await getJobCountGrowth();
  const monthGrowth = calculateGrowth(count, countLastMonth);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total jobs</CardTitle>
        <Timer className={"h-4 w-4 text-muted-foreground"} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        <p className="text-xs text-muted-foreground">
          {monthGrowth}% from last month
        </p>
      </CardContent>
    </Card>
  );
};

const TotalCompanies = async () => {
  const { count, countLastMonth } = await getCompanyCountGrowth();
  const monthGrowth = calculateGrowth(count, countLastMonth);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total companies</CardTitle>
        <Timer className={"h-4 w-4 text-muted-foreground"} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        <p className="text-xs text-muted-foreground">
          {monthGrowth}% from last month
        </p>
      </CardContent>
    </Card>
  );
};

const calculateGrowth = (current: number, lastMonth: number) => {
  const growth = Math.round(((current - lastMonth) / lastMonth) * 100);

  // If it's infinity, we show 100%
  if (growth === Infinity) {
    return 100;
  }

  return growth;
};

const CardSkeleton = ({ title }: { title: string }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Timer className={"h-4 w-4 text-muted-foreground"} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          <Skeleton className="h-8 w-16" />
        </div>
        <p className="text-xs text-muted-foreground">+19% from last month</p>
      </CardContent>
    </Card>
  );
};
