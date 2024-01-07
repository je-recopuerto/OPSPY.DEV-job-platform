import { JobType, WorkMode } from "@prisma/client";

export const JobTypeReadable: Record<JobType, string> = {
  [JobType.FULL_TIME]: "Full Time",
  [JobType.PART_TIME]: "Part Time",
  [JobType.CONTRACT]: "Contract",
  [JobType.INTERNSHIP]: "Internship",
};

export const WorkModeReadable: Record<WorkMode, string> = {
  [WorkMode.REMOTE]: "Remote",
  [WorkMode.HYBRID]: "Hybrid",
  [WorkMode.ONSITE]: "On Site",
};
