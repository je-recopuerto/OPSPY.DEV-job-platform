import { JobApplication } from ".prisma/client";
import prisma from "@/lib/db";
import { Company, Prisma } from "@prisma/client";

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

export async function getApplicationsForCompanyId(
  companyId: Company["id"],
): Promise<ApplicationWithJob[]> {
  return prisma.jobApplication.findMany({
    where: {
      job: {
        companyId: companyId,
      },
    },
    include: {
      job: {
        include: {
          company: true,
        },
      },
      user: {
        include: {
          cv: true,
          workExperience: true,
        },
      },
    },
  });
}

export async function getApplicationById(
  id: JobApplication["id"],
): Promise<ApplicationWithJob | null> {
  return prisma.jobApplication.findFirst({
    where: {
      id: id,
    },
    include: {
      job: {
        include: {
          company: true,
        },
      },
      user: {
        include: {
          cv: true,
          workExperience: true,
        },
      },
    },
  });
}
