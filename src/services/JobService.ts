import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { filterJobPostsSchema } from "@/schemas/jobPost";
import { z } from "zod";

export type JobTrackerWithPost = Prisma.JobTrackerGetPayload<{
  include: {
    job: {
      include: {
        company: true;
      };
    };
  };
}>;

export function getJobPostsWithCompany(
  filter?: z.infer<typeof filterJobPostsSchema>,
) {
  // Coerce string to number. This is currently a workaround
  if (filter?.minSalary) {
    filter.minSalary = Number(filter.minSalary);
  }

  // Make sure the schema is valid
  filterJobPostsSchema.parse(filter);

  return prisma.jobPost.findMany({
    where: {
      AND: [
        filter?.keywords
          ? {
              OR: [
                {
                  title: {
                    contains: filter.keywords,
                    mode: "insensitive",
                  },
                },
                {
                  description: {
                    contains: filter.keywords,
                    mode: "insensitive",
                  },
                },
                {
                  company: {
                    name: {
                      contains: filter.keywords,
                      mode: "insensitive",
                    },
                  },
                },
              ],
            }
          : {},
        filter?.tags?.length
          ? {
              tags: {
                some: {
                  name: {
                    in: filter.tags,
                  },
                },
              },
            }
          : {},
        filter?.minSalary
          ? {
              minSalary: {
                gte: filter.minSalary,
              },
            }
          : {},
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      company: true,
      tags: true,
    },
  });
}

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

export type CompanyWithOpenings = Prisma.CompanyGetPayload<{
  include: {
    openings: true;
  };
}>;

export function getCompanyWithOpeningsById(
  id: number,
): Promise<CompanyWithOpenings | null> {
  return prisma.company.findUnique({
    where: {
      id: id,
    },
    include: {
      openings: true,
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
