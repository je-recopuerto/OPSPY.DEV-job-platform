import prisma from "@/lib/db";
import { jobFilterSchema } from "@/lib/params";
import { Company, Prisma } from "@prisma/client";
import { z } from "zod";
import JobPostWhereInput = Prisma.JobPostWhereInput;

export const JOB_PAGE_SIZE = 8;

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

export function getRandomJobPosts(
  count: number,
): Promise<JobPostWithCompany[]> {
  return prisma.jobPost.findMany({
    take: count,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      company: true,
      tags: true,
    },
  });
}

const generateFilter = (
  filter?: z.infer<typeof jobFilterSchema>,
): JobPostWhereInput => {
  return {
    AND: [
      filter?.cid
        ? {
            companyId: filter.cid,
          }
        : {},
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
  };
};

export async function fetchJobsPages(
  filter?: z.infer<typeof jobFilterSchema>,
): Promise<number> {
  // Make sure the schema is valid
  const response = jobFilterSchema.safeParse(filter);
  if (!response.success) {
    throw new Error("Invalid filter");
  }

  const totalJobs = await prisma.jobPost.count({
    where: {
      status: "ACTIVE",
      ...generateFilter(filter),
    },
  });

  return Math.ceil(totalJobs / JOB_PAGE_SIZE);
}

export async function getJobPostsWithCompany(
  filter?: z.infer<typeof jobFilterSchema>,
): Promise<JobPostWithCompany[]> {
  // Coerce string to number. This is currently a workaround
  if (filter?.minSalary) {
    filter.minSalary = Number(filter.minSalary);
  }

  // Coerce page to number. This is currently a workaround
  if (filter?.page) {
    filter.page = Number(filter.page);
  }

  // Make sure the schema is valid
  jobFilterSchema.parse(filter);

  return prisma.jobPost.findMany({
    where: {
      status: "ACTIVE",
      ...generateFilter(filter),
    },
    orderBy: {
      createdAt: "desc",
    },
    // Add page
    skip: filter?.page ? (filter.page - 1) * JOB_PAGE_SIZE : undefined,
    take: JOB_PAGE_SIZE,
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
  id: Company["id"],
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

export async function getJobPostsByCompanyId(
  companyId: Company["id"],
  count?: number,
): Promise<{
  jobs: JobPostWithCompany[];
  areMore: boolean;
}> {
  const jobs = await prisma.jobPost.findMany({
    where: {
      companyId: companyId,
      status: "ACTIVE",
    },
    take: count ? count + 1 : undefined,
    include: {
      company: true,
      tags: true,
    },
  });

  if (!count) {
    return {
      jobs,
      areMore: false,
    };
  }

  return {
    jobs: jobs.slice(0, count),
    areMore: jobs.length > count,
  };
}

export function getCompanyWithOpeningsAndApplicationsById(
  id: Company["id"],
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
        orderBy: {
          createdAt: "desc",
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
  userId?: string,
): Promise<{
  jobPost?: JobPostWithCompany;
  isSaved: boolean;
  hasApplied: boolean;
}> {
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
        tags: true;
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
          tags: true,
        },
      },
    },
  });
}
