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
        profile: true;
      };
    };
  };
}>;

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
          profile: true,
        },
      },
    },
  });
}
