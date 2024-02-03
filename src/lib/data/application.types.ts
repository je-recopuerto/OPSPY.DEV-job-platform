import { Prisma } from "@prisma/client";

export type ApplicationWithJob = Prisma.JobApplicationGetPayload<{
  include: {
    job: {
      include: {
        company: true;
      };
    };
    user: {
      include: {
        cv: true;
        workExperience: true;
      };
    };
  };
}>;