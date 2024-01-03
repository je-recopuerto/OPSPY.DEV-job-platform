import {
  getJobPostFromId,
  getJobPostsWithCompany,
  JobPostWithCompany,
} from "@/services/JobService";
import React from "react";
import JobActions from "@/components/jobs/job-post-actions";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  getUserWithJobTrackersById,
  UserWithJobTrackers,
} from "@/services/userService";
import { auth } from "@/auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import JobListing from "@/components/jobs/job-listing";
import { z } from "zod";
import { filterJobPostsSchema } from "@/schemas/jobPost";
import JobFilter from "@/components/jobs/job-filter";

type JobPageParams = {
  params: {
    jobId: string;
  };
  searchParams: z.infer<typeof filterJobPostsSchema>;
};

export default async function JobPage(props: JobPageParams) {
  const session = await auth();
  if (!session || !session.user) return;

  const jobs = await getJobPostsWithCompany(props.searchParams);
  const user = await getUserWithJobTrackersById(session.user.id);

  if (Number.isNaN(props.params.jobId)) {
    return <>Post with id &apos;{props.params.jobId}&apos; not found!</>;
  }

  const post = await getJobPostFromId(Number.parseInt(props.params.jobId));

  if (!post) {
    return <>Post not found!</>;
  }

  return (
    <>
      <JobFilter />

      <div className={"flex columns-2 gap-2 max-h-[70vh]"}>
        <ScrollArea className={"w-[40%]"}>
          <div className={"flex flex-col gap-4"}>
            {jobs.length === 0 && (
              <p className={"text-muted-foreground text-sm"}>
                No jobs found with these filters!
              </p>
            )}

            {jobs.map((job) => (
              <JobListing
                job={job}
                key={job.id}
                isFollowing={isFollowing(job, user)}
              />
            ))}
          </div>
        </ScrollArea>
        <ScrollArea className={"w-[60%] rounded-lg border"}>
          <div className={"p-8"}>
            <div className={"flex flex-col gap-5"}>
              <div className={"flex flex-row gap-x-3 space-y-0"}>
                <Avatar className={"h-14 w-14"}>
                  <AvatarImage
                    src={
                      post.company.logoUrl ?? "https://github.com/shadcn.png"
                    }
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

              <JobActions
                job={post}
                isFollowingInitial={isFollowing(post, user)}
              />

              <p
                className={
                  "text-sm text-muted-foreground pb-6 whitespace-pre-wrap"
                }
              >
                {post.description}
              </p>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
}

const isFollowing = (
  job: JobPostWithCompany,
  user: UserWithJobTrackers | null,
) => {
  if (!user) return false;
  return user.trackers.find((t) => t.jobId === job.id) !== undefined;
};

async function JobPosts({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string;
}) {
  const user = await getUserWithJobTrackersById(userId);
  const jobs = await getJobPostsWithCompany();

  const isFollowing = (
    job: JobPostWithCompany,
    user: UserWithJobTrackers | null,
  ) => {
    if (!user) return false;
    return user.trackers.find((t) => t.jobId === job.id) !== undefined;
  };

  return (
    <div className={"flex columns-2 gap-2 max-h-[70vh]"}>
      <ScrollArea className={"w-[40%]"}>
        <div className={"flex flex-col gap-4"}>
          {jobs.map((job) => (
            <JobListing
              job={job}
              key={job.id}
              isFollowing={isFollowing(job, user)}
            />
          ))}
        </div>
      </ScrollArea>
      <ScrollArea className={"w-[60%] rounded-lg border"}>
        {children}
      </ScrollArea>
    </div>
  );
}
