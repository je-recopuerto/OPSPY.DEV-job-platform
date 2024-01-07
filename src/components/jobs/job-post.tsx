import JobActions from "@/components/jobs/job-post-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { JobPostWithCompany } from "@/services/JobService";

type JobPostProps = {
  job: JobPostWithCompany;
  isSavedInitial: boolean;
  isApplied: boolean;
};

export default function JobPost(props: JobPostProps) {
  return (
    <ScrollArea className={"w-[60%] rounded-lg border"}>
      <div className={"flex flex-col gap-5 p-6"}>
        <div className={"flex flex-row gap-x-3 space-y-0"}>
          <Avatar className={"h-14 w-14 rounded-sm"}>
            <AvatarImage
              src={props.job.company.logoUrl ?? "https://github.com/shadcn.png"}
              alt={props.job.company.name}
              sizes={"cover"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className={"flex flex-col w-full"}>
            <CardTitle>{props.job.title}</CardTitle>
            <CardDescription>{props.job.company.name}</CardDescription>
          </div>
        </div>

        <JobActions
          job={props.job}
          isSavedInitial={props.isSavedInitial}
          isApplied={props.isApplied}
        />

        <p className={"text-sm text-muted-foreground pb-6 whitespace-pre-wrap"}>
          {props.job.description}
        </p>
      </div>
    </ScrollArea>
  );
}
