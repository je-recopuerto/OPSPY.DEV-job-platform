import { notFound, redirect, useParams } from "next/navigation";
import { auth } from "@/auth";
import { SignIn } from "@/components/auth-components";
import { getUserWithCompanyById } from "@/services/userService";
import { getApplicationById } from "@/services/ApplicationService";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistance } from "date-fns";

type ApplicationPageProps = {
  params: {
    applicationId: string;
  };
};

export default async function ApplicationPage({
  params,
}: ApplicationPageProps) {
  const session = await auth();
  if (!session?.user) return <SignIn />;

  const user = await getUserWithCompanyById(session.user.id);
  if (!user || !user.company) return redirect("/talent/dashboard");

  // If applicationId isn't a number, return 404
  if (isNaN(parseInt(params.applicationId))) return notFound();

  const application = await getApplicationById(parseInt(params.applicationId));
  if (!application) return notFound();

  if (user.company.id !== application.job.companyId)
    return redirect("/talent/dashboard");

  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        {/*<CompanyProfile company={user.company} />*/}

        <div className={"flex"}></div>
        <Link
          href="/employer/dashboard"
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          <>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </>
        </Link>
        <div className="flex items-center justify-between space-y-2 pt-4 pb-2">
          <h2 className="text-3xl font-bold tracking-tight">
            <Link href={`/jobs/${application.jobId}`}>
              {application.job.title}
            </Link>
          </h2>

          <small className="text-sm font-medium leading-none">
            <span className={"mr-1"}>
              Date applied:{" "}
              {new Date(application.createdAt).toLocaleDateString()}
            </span>
            <span className={"mr-2"}>
              (
              {formatDistance(application.createdAt, new Date(), {
                addSuffix: true,
              })}
              )
            </span>
          </small>
        </div>

        <Card>
          <CardHeader>
            <div className={"flex flex-row"}>
              <Avatar className={"h-24 w-24 mr-5  "}>
                <AvatarImage
                  src={application.user.image ?? ""}
                  alt={"Applicant's profile picture"}
                  sizes={"cover"}
                />
                <AvatarFallback>
                  {application.user.name?.split(" ").map((name) => name[0])}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className={"flex gap-x-4 items-center"}>
                  {application.user.name}
                  <small className="text-sm text-muted-foreground font-medium leading-none">
                    <span className={"mr-2"}>{"🇬🇧"}</span>
                    {application.user.profile?.location}
                  </small>
                </CardTitle>
                <CardDescription>
                  {application.user.profile?.bio}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>{JSON.stringify(application)}</CardContent>
        </Card>

        {/*<Tabs defaultValue="jobs" className="space-y-4">*/}
        {/*  <TabsList>*/}
        {/*    <TabsTrigger value="jobs">Job Postings</TabsTrigger>*/}
        {/*    <TabsTrigger value="applications">Applications</TabsTrigger>*/}
        {/*  </TabsList>*/}
        {/*  <TabsContent value="jobs" className="space-y-4">*/}
        {/*    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">*/}
        {/*      <Card>*/}
        {/*        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">*/}
        {/*          <CardTitle className="text-sm font-medium">*/}
        {/*            Active Posts*/}
        {/*          </CardTitle>*/}

        {/*          <PinIcon className={"h-4 w-4 text-muted-foreground"} />*/}
        {/*        </CardHeader>*/}
        {/*        <CardContent>*/}
        {/*          <div className="text-2xl font-bold">1</div>*/}
        {/*          <p className="text-xs text-muted-foreground">*/}
        {/*            +20% from last month*/}
        {/*          </p>*/}
        {/*        </CardContent>*/}
        {/*      </Card>*/}
        {/*      <Card>*/}
        {/*        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">*/}
        {/*          <CardTitle className="text-sm font-medium">*/}
        {/*            Waiting for response*/}
        {/*          </CardTitle>*/}
        {/*          <Timer className={"h-4 w-4 text-muted-foreground"} />*/}
        {/*        </CardHeader>*/}
        {/*        <CardContent>*/}
        {/*          <div className="text-2xl font-bold">2</div>*/}
        {/*          <p className="text-xs text-muted-foreground">*/}
        {/*            +19% from last month*/}
        {/*          </p>*/}
        {/*        </CardContent>*/}
        {/*      </Card>*/}
        {/*      <Card>*/}
        {/*        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">*/}
        {/*          <CardTitle className="text-sm font-medium">*/}
        {/*            Interviewing*/}
        {/*          </CardTitle>*/}
        {/*          <svg*/}
        {/*            xmlns="http://www.w3.org/2000/svg"*/}
        {/*            viewBox="0 0 24 24"*/}
        {/*            fill="none"*/}
        {/*            stroke="currentColor"*/}
        {/*            strokeLinecap="round"*/}
        {/*            strokeLinejoin="round"*/}
        {/*            strokeWidth="2"*/}
        {/*            className="h-4 w-4 text-muted-foreground"*/}
        {/*          >*/}
        {/*            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />*/}
        {/*            <circle cx="9" cy="7" r="4" />*/}
        {/*            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />*/}
        {/*          </svg>*/}
        {/*        </CardHeader>*/}
        {/*        <CardContent>*/}
        {/*          <div className="text-2xl font-bold">3</div>*/}
        {/*          <p className="text-xs text-muted-foreground">*/}
        {/*            +0% from last month*/}
        {/*          </p>*/}
        {/*        </CardContent>*/}
        {/*      </Card>*/}
        {/*      <Card>*/}
        {/*        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">*/}
        {/*          <CardTitle className="text-sm font-medium">*/}
        {/*            Rejected*/}
        {/*          </CardTitle>*/}
        {/*          <CircleSlash2 className={"h-4 w-4 text-muted-foreground"} />*/}
        {/*        </CardHeader>*/}
        {/*        <CardContent>*/}
        {/*          <div className="text-2xl font-bold">4</div>*/}
        {/*          <p className="text-xs text-muted-foreground">*/}
        {/*            13% of your total jobs*/}
        {/*          </p>*/}
        {/*        </CardContent>*/}
        {/*      </Card>*/}
        {/*    </div>*/}
        {/*    <div className="grid gap-4">*/}
        {/*      <Card>*/}
        {/*        <CardHeader>*/}
        {/*          <CardTitle>Overview</CardTitle>*/}
        {/*        </CardHeader>*/}
        {/*        <CardContent className="px-4">*/}
        {/*          /!*<JobTrackerTable data={data} />*!/*/}
        {/*          <Suspense fallback={<div>Loading...</div>}>*/}
        {/*            /!*<JobTable companyId={user.company.id} />*!/*/}
        {/*          </Suspense>*/}
        {/*        </CardContent>*/}
        {/*      </Card>*/}
        {/*    </div>*/}
        {/*  </TabsContent>*/}
        {/*  <TabsContent value={"applications"} className="space-y-4">*/}
        {/*    Applications*/}
        {/*  </TabsContent>*/}
        {/*</Tabs>*/}
      </div>
    </>
  );
}
