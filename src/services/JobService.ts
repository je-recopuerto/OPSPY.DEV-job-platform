import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export type JobTrackerWithPost = Prisma.JobTrackerGetPayload<{
  include: {
    job: {
      include: {
        company: true;
      };
    };
  };
}>;

export function getJobTrackersWithPost(): Promise<JobTrackerWithPost[]> {
  return prisma.jobTracker.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      job: {
        include: {
          company: true,
        },
      },
    },
  });
}

export function getSavedJobsForUserId(
  userId: string,
): Promise<JobTrackerWithPost[]> {
  return prisma.jobTracker.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      job: {
        include: {
          company: true,
        },
      },
    },
  });
}

export type JobPostWithCompany = Prisma.JobPostGetPayload<{
  include: {
    company: true;
    tags: true;
  };
}>;

export function getJobPostFromId(id: number) {
  return prisma.jobPost.findUnique({
    where: {
      id: id,
    },
    include: {
      company: true,
      tags: true,
    },
  });
}

export function getJobPostsWithCompany(): Promise<JobPostWithCompany[]> {
  return prisma.jobPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      company: true,
      tags: true,
    },
  });
}

export type JobApplicationWithCompany = Prisma.JobApplicationGetPayload<{
  include: {
    job: {
      include: {
        company: true;
      };
    };
  };
}>;

export function getJobApplications(): Promise<JobApplicationWithCompany[]> {
  return prisma.jobApplication.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      job: {
        include: {
          company: true,
        },
      },
    },
  });
}
