import prisma from "@/lib/db";
import { filterJobPostsSchema } from "@/schemas/jobPost";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export type JobPostWithCandidates = Prisma.JobPostGetPayload<{
  include: {
    application: {
      include: {
        user: true;
      };
    };
  };
}>;

export type JobTrackerWithPost = Prisma.JobTrackerGetPayload<{
  include: {
    job: {
      include: {
        company: true;
      };
    };
  };
}>;

export async function getRandomJobPost() {
  const result = await prisma.jobPost.findMany({
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      company: true,
    },
  });

  // pick one of the three
  const randomIndex = Math.floor(Math.random() * result.length);
  return result[randomIndex];
}

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

export type CompanyWithOpeningsAndApplications = Prisma.CompanyGetPayload<{
  include: {
    openings: {
      include: {
        application: true;
      };
    };
  };
}>;

export type JobPostWithApplications = Prisma.JobPostGetPayload<{
  include: {
    application: true;
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

export function getCompanyWithOpeningsAndApplicationsById(
  id: number,
): Promise<CompanyWithOpeningsAndApplications | null> {
  return prisma.company.findUnique({
    where: {
      id: id,
    },
    include: {
      openings: {
        include: {
          application: true,
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

export function getJobPostFromId(id: string) {
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

export async function getJobPostFromIdUserScoped(
  id: string,
  userId: string,
): Promise<{
  jobPost?: JobPostWithCompany;
  isSaved: boolean;
  hasApplied: boolean;
} | null> {
  const result = (await prisma.$transaction([
    prisma.jobPost.findUnique({
      where: {
        id: id,
      },
      include: {
        company: true,
        tags: true,
      },
    }),
    prisma.jobApplication.findFirst({
      where: {
        userId: userId,
        jobId: id,
      },
    }),
    prisma.jobTracker.findFirst({
      where: {
        userId: userId,
        jobId: id,
      },
    }),
  ])) as any;

  return {
    jobPost: result[0],
    hasApplied: result[1] !== null,
    isSaved: result[2] !== null,
  };
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

export function getJobApplications(
  userId: string,
): Promise<JobApplicationWithCompany[]> {
  return prisma.jobApplication.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: userId,
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
