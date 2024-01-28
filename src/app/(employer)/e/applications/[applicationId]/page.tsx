import { auth } from "@/auth";
import { SignIn } from "@/components/auth-components";
import ViewCvButton from "@/components/request-cv-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  employerDashboardUrl,
  isAuthorizedForApplications,
  jobUrl,
} from "@/lib/pages";
import { cn } from "@/lib/utils";
import { ApplicationWithJob } from "@/services/ApplicationService";
import { formatDistance } from "date-fns";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

type ApplicationPageProps = {
  params: {
    applicationId: string;
  };
};

export const metadata = {
  title: "Application",
};

export default async function ApplicationPage({
  params,
}: ApplicationPageProps) {
  const session = await auth();
  if (!session?.user || !session.user.id) return <SignIn />;

  const { isAuthorized, user, application } = await isAuthorizedForApplications(
    session.user.id,
    params.applicationId,
  );

  if (!isAuthorized) return redirect("/t/dash");
  if (!application) return notFound();

  return (
    <div className="container space-y-4">
      <BackButton />

      <div className="flex items-center justify-between space-y-2 pt-4 pb-2">
        <JobTitle application={application} />
      </div>

      <JobBody application={application} />
    </div>
  );
}

const BackButton = () => {
  return (
    <Link
      href={employerDashboardUrl}
      className={cn(buttonVariants({ variant: "ghost" }))}
    >
      <ChevronLeft className="mr-2 h-4 w-4" />
      Back
    </Link>
  );
};

const JobTitle = ({ application }: { application: ApplicationWithJob }) => {
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight">
        <Link href={jobUrl(application.job.id)}>{application.job.title}</Link>
      </h2>

      <small className="text-sm font-medium leading-none">
        <span className={"mr-1"}>
          Date applied: {new Date(application.createdAt).toLocaleDateString()}
        </span>
        <span className={"mr-2"}>
          {`(${formatDistance(application.createdAt, new Date(), {
            addSuffix: true,
          })})`}
        </span>
      </small>
    </>
  );
};

const JobBody = ({ application }: { application: ApplicationWithJob }) => {
  return (
    <Card>
      <CardHeader>
        <div className={"flex flex-row"}>
          <Avatar className={"h-24 w-24 mr-5  "}>
            <AvatarImage
              src={application.user.imageURL ?? ""}
              alt={"Applicant's profile picture"}
              sizes={"cover"}
            />
            <AvatarFallback>
              {(application.user.firstName + " " + application.user.lastName)
                .split(" ")
                .map((name) => name[0])}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className={"flex gap-x-4 items-center"}>
              {application.user.firstName + " " + application.user.lastName}
              <small className="text-sm text-muted-foreground font-medium leading-none">
                <span className={"mr-2"}>{"🇬🇧"}</span>
                {application.user?.location}
              </small>
            </CardTitle>
            <CardDescription>{application.user.bio}</CardDescription>
          </div>

          <div className={"flex flex-row gap-4 justify-end ml-auto mb-auto"}>
            <Button variant={"destructive"}>Reject</Button>
            <Button className={"bg-green-500"}>Accept</Button>
            <ViewCvButton cvId={application.user.cv?.id} />
          </div>
        </div>
      </CardHeader>
      <CardContent className={"whitespace-pre-wrap"}>
        {JSON.stringify(application, null, 2)}
      </CardContent>
    </Card>
  );
};
