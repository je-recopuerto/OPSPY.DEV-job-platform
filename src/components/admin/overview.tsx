import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getCompanyCountGrowth } from "@/lib/data/company";
import { getJobCountGrowth } from "@/lib/data/job";
import { getUserCountGrowth } from "@/lib/data/user";
import { Timer } from "lucide-react";
import { Suspense } from "react";

export default function Overview() {
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
}

const TotalUsers = async () => {
  const { count, countLastMonth } = await getUserCountGrowth();

  return (
    <StatCard
      title={"Total users"}
      count={count}
      countLastMonth={countLastMonth}
    />
  );
};

const TotalJobs = async () => {
  const { count, countLastMonth } = await getJobCountGrowth();

  return (
    <StatCard
      title={"Total jobs"}
      count={count}
      countLastMonth={countLastMonth}
    />
  );
};

const TotalCompanies = async () => {
  const { count, countLastMonth } = await getCompanyCountGrowth();

  return (
    <StatCard
      title={"Total companies"}
      count={count}
      countLastMonth={countLastMonth}
    />
  );
};

const CardSkeleton = ({ title }: { title: string }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Timer className={"h-4 w-4 text-muted-foreground"} />
      </CardHeader>
      <CardContent className={"flex flex-col gap-2"}>
        <div className="text-2xl font-bold">
          <Skeleton className="h-6 w-16" />
        </div>
        <p className="text-xs text-muted-foreground">
          <Skeleton className="h-4 w-12" />
        </p>
      </CardContent>
    </Card>
  );
};

const StatCard = ({ title, count, countLastMonth }: any) => {
  const calculateGrowth = (current: number, lastMonth: number) => {
    const growth = Math.round(((current - lastMonth) / lastMonth) * 100);

    // If it's infinity, we show 100%
    if (growth === Infinity) {
      return 100;
    }

    return growth;
  };

  const monthGrowth = calculateGrowth(count, countLastMonth);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
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
