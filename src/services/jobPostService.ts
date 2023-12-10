import prisma from "@/lib/db";
import {Prisma} from "@prisma/client";
import {JobTracker} from ".prisma/client";
import {JobTrackerWithPost} from "@/services/jobTrackerService";

export type JobPostWithCompany = Prisma.JobPostGetPayload<{
  include: {
    company: true;
  };
}>;

export function getJobPostsWithCompany(): Promise<JobPostWithCompany[]> {
  return prisma.jobPost.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      company: true
    }
  });
}