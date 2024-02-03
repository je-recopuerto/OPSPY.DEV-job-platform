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

export type JobPostWithCompany = Prisma.JobPostGetPayload<{
  include: {
    company: true;
    tags: true;
  };
}>;

export type JobPostWithApplications = Prisma.JobPostGetPayload<{
  include: {
    application: true;
  };
}>;
