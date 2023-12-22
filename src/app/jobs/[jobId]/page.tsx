import { getJobPostFromId } from "@/services/JobService";
import React from "react";

type JobPageParams = {
  params: {
    jobId: string;
  };
};

export default async function JobPage(props: JobPageParams) {
  if (Number.isNaN(props.params.jobId)) {
    return <>Post with id &apos;{props.params.jobId}&apos; not found!</>;
  }

  const post = await getJobPostFromId(Number.parseInt(props.params.jobId));

  if (!post) {
    return <>Post not found!</>;
  }

  return (
    <div className={"p-8"}>
      <div className={"flex flex-col gap-4"}>
        <h1 className={"text-2xl font-semibold"}>{post.title}</h1>
        <p className={"text-sm text-muted-foreground pb-6"}>
          {post.company.name}
        </p>

        <p className={"text-sm text-muted-foreground pb-6 whitespace-pre-wrap"}>
          {post.description}
        </p>
      </div>
    </div>
  );
}
