import { getJobPostFromId, JobPostWithCompany } from "@/services/JobService";
import React from "react";
import JobActions from "@/components/jobs/job-post-actions";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  getUserWithJobTrackersById,
  UserWithJobTrackers,
} from "@/services/userService";
import { auth } from "@/auth";

type JobPageParams = {
  params: {
    jobId: string;
  };
};

export default async function JobPage(props: JobPageParams) {
  const session = await auth();
  if (!session || !session.user) return;

  const user = await getUserWithJobTrackersById(session.user.id);

  if (Number.isNaN(props.params.jobId)) {
    return <>Post with id &apos;{props.params.jobId}&apos; not found!</>;
  }

  const post = await getJobPostFromId(Number.parseInt(props.params.jobId));

  if (!post) {
    return <>Post not found!</>;
  }

  return (
    <div className={"p-8"}>
      <div className={"flex flex-col gap-5"}>
        <div className={"flex flex-row gap-x-3 space-y-0"}>
          <Avatar className={"h-14 w-14"}>
            <AvatarImage
              src={post.company.logoUrl ?? "https://github.com/shadcn.png"}
              alt={post.company.name}
              sizes={"cover"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className={"flex flex-col w-full"}>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>{post.company.name}</CardDescription>
          </div>
        </div>

        <JobActions job={post} isFollowingInitial={isFollowing(post, user)} />

        <p className={"text-sm text-muted-foreground pb-6 whitespace-pre-wrap"}>
          {post.description}
        </p>
      </div>
    </div>
  );
}

const isFollowing = (
  job: JobPostWithCompany,
  user: UserWithJobTrackers | null,
) => {
  if (!user) return false;
  return user.trackers.find((t) => t.jobId === job.id) !== undefined;
};
