"use client";

import ApplyJobButton from "@/components/jobs/apply-job-button";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { JobPostWithCompany } from "@/services/JobService";
import { toggleSaveJob } from "@/services/actions/job";
import { Pin, PinOff } from "lucide-react";
import { useState } from "react";

export default function JobActions({
  job,
  isSavedInitial,
  isApplied,
}: {
  job: JobPostWithCompany;
  isSavedInitial: boolean;
  isApplied: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(isSavedInitial);

  const toggle = async () => {
    setIsLoading(true);
    const removed = await toggleSaveJob(job.id);

    toast({
      title: removed ? "Job Unsaved" : "Job Saved",
      description: "You can view your saved jobs in your dash.",
      duration: 1500,
    });

    setIsSaved(!removed);
    setIsLoading(false);
  };

  return (
    <div className={"flex flex-row gap-2"}>
      <ApplyJobButton post={job} hasApplied={isApplied} />

      <Button
        onClick={toggle}
        variant={isSaved ? "destructive" : "default"}
        disabled={isLoading}
      >
        {isSaved ? (
          <PinOff className={"h-5 w-5"} />
        ) : (
          <Pin className={"h-5 w-5"} />
        )}
      </Button>
    </div>
  );
}
