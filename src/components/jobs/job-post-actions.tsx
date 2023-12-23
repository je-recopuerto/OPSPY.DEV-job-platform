"use client";

import { toggleSaveJob } from "@/app/actions";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Pin, PinOff } from "lucide-react";
import React, { useState } from "react";
import ApplyJobButton from "@/components/jobs/apply-job-button";
import { JobPostWithCompany } from "@/services/JobService";

export default function JobActions({
  job,
  isFollowingInitial,
}: {
  job: JobPostWithCompany;
  isFollowingInitial: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(isFollowingInitial);

  const toggle = async () => {
    setIsLoading(true);
    const removed = await toggleSaveJob(job.id);

    toast({
      title: removed ? "Job Unsaved" : "Job Saved",
      description: "You can view your saved jobs in your dashboard.",
      duration: 1500,
    });

    setIsFollowing(!removed);
    setIsLoading(false);
  };

  return (
    <div className={"flex flex-row gap-2"}>
      <ApplyJobButton post={job} />

      <Button
        onClick={() => toggle()}
        variant={isFollowing ? "destructive" : "default"}
        disabled={isLoading}
      >
        {isFollowing ? (
          <PinOff className={"h-5 w-5"} />
        ) : (
          <Pin className={"h-5 w-5"} />
        )}
      </Button>
    </div>
  );
}
