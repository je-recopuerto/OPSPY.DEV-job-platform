import prisma from "@/lib/db";
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
      };
    };
  };
}>;

export async function getApplicationsForCompanyId(
  companyId: number,
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
        },
      },
    },
  });
}

export async function getApplicationById(
  id: number,
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
        },
      },
    },
  });
}
