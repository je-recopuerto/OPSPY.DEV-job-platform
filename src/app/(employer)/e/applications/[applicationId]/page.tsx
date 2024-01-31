import { auth } from "@/auth";
import { SignIn } from "@/components/auth-components";
import BackButton from "@/components/cui/BackButton";
import { SignIn } from "@/components/auth";
import ViewCvButton from "@/components/request-cv-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isAuthorizedForApplications, jobUrl } from "@/lib/pages";
import { ApplicationWithJob } from "@/services/ApplicationService";
import { WorkExperience } from "@prisma/client";
import { formatDistance } from "date-fns";
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

  const { isAuthorized, application } = await isAuthorizedForApplications(
    session.user.id,
    params.applicationId,
  );

  if (!isAuthorized) return redirect("/t/dash");
  if (!application) return notFound();

  return (
    <div className="container space-y-4">
      <BackButton />

      <JobTitle application={application} />
      <JobBody application={application} />

      <Notes />
    </div>
  );
}

const Notes = () => {
  return (
    <Card>
      <CardHeader>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Notes
        </h4>
      </CardHeader>
      <CardContent>
        <p>Notes about the applicant</p>
      </CardContent>
    </Card>
  );
};

const JobTitle = ({ application }: { application: ApplicationWithJob }) => {
  return (
    <div className="flex items-center justify-between space-y-2 pt-4 pb-2">
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
    </div>
  );
};

const JobBody = ({ application }: { application: ApplicationWithJob }) => {
  return (
    <Card>
      <CardHeader>
        <UserProfile application={application} />
      </CardHeader>
      <CardContent className={"flex flex-col gap-6"}>
        <UserSkills application={application} />
        <Experience experience={application.user.workExperience} />

        {JSON.stringify(application, null, 2)}
      </CardContent>
    </Card>
  );
};

const Experience = ({ experience }: { experience: WorkExperience[] }) => {
  const count = experience.length ?? 0;

  return (
    <section className={"flex flex-col gap-4"}>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Work Experience ({count})
      </h4>

      <div className={"flex flex-col gap-2"}>
        {experience.map((experience, key) => (
          <div
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-md grid gap-2"
            key={key}
          >
            <h3 className="text-lg font-medium">
              {experience.title} @ {experience.company}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              June 2020 - Present
            </p>
            <p className="text-sm">
              Description of the role and responsibilities at Company A.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

const UserSkills = ({ application }: { application: ApplicationWithJob }) => {
  return (
    <section className={"flex flex-col gap-4"}>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Skills
      </h4>

      <div className={"flex flex-wrap gap-2"}>
        <Badge>.NET</Badge>
        <Badge>RabbitMQ</Badge>
        <Badge>Azure</Badge>
        <Badge>Python</Badge>
      </div>
    </section>
  );
};

const UserProfile = ({ application }: { application: ApplicationWithJob }) => {
  return (
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
  );
};
