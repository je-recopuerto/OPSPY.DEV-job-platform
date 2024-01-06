import { JobApplication } from ".prisma/client";
import AppliedJobsTable from "@/components/dashboard/applied-jobs-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getJobApplications } from "@/services/JobService";
import { CircleSlash2, Timer } from "lucide-react";

export default async function AppliedJobsTab() {
  const applications = await getJobApplications();

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Waiting for response
            </CardTitle>
            <Timer className={"h-4 w-4 text-muted-foreground"} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                applications.filter(
                  (application) => application.status === "APPLIED",
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviewing</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                applications.filter(
                  (application) => application.status === "INTERVIEWING",
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">+0% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <CircleSlash2 className={"h-4 w-4 text-muted-foreground"} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                applications.filter(
                  (application) => application.status === "REJECTED",
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">
              {percentRejected(applications)}% of your total jobs
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4">
        <AppliedJobsTable data={applications} />
      </div>
    </>
  );
}

const percentRejected = (data: JobApplication[]) => {
  const rejected = data.filter(
    (jobTracker) => jobTracker.status === "REJECTED",
  ).length;
  const total = data.length;
  return (rejected / total) * 100;
};
