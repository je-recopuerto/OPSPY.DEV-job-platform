import { auth } from "@/auth";
import JobActions from "@/components/jobs/job-post-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { getJobPostFromIdUserScoped } from "@/services/JobService";
import { JobPost } from "@prisma/client";
import { notFound } from "next/navigation";

type JobPostProps = {
  jobId: JobPost["id"];
};

async function JobPost({ jobId }: JobPostProps) {
  // wait 5 seconds
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const session = await auth();
  const { jobPost, isSaved, hasApplied } = await getJobPostFromIdUserScoped(
    jobId,
    session?.user?.id,
  );

  if (!jobPost) return notFound();

  return (
    <ScrollArea className={"rounded-lg border"}>
      <div className={"flex flex-col gap-5 p-6"}>
        <div className={"flex flex-row gap-x-3 space-y-0"}>
          <Avatar className={"h-14 w-14 rounded-sm"}>
            <AvatarImage
              src={jobPost.company.logoUrl ?? "https://github.com/shadcn.png"}
              alt={jobPost.company.name}
              sizes={"cover"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className={"flex flex-col w-full"}>
            <CardTitle>{jobPost.title}</CardTitle>
            <CardDescription>{jobPost.company.name}</CardDescription>
          </div>
        </div>

        <JobActions
          job={jobPost}
          isSavedInitial={isSaved}
          isApplied={hasApplied}
        />

        <p className={"text-sm text-muted-foreground pb-6 whitespace-pre-wrap"}>
          {jobPost.description}
        </p>
      </div>
    </ScrollArea>
  );
}

function JobSkeleton() {
  return (
    <div className={"p-6 rounded-lg border"}>
      <div className={"flex flex-col gap-4"}>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-14 w-14 rounded-sm" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[140px]" />
          </div>
        </div>

        <div className={"flex flex-row gap-4 my-4"}>
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>

        <div className={"flex flex-col gap-y-4"}>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
}

export { JobPost, JobSkeleton };
