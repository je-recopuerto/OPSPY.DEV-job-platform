"use server";

import { ApplicationWithJob } from "@/lib/data/application.types";
import prisma from "@/lib/db";
import { Company, JobApplication } from "@prisma/client";

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

export async function getApplicationWithCompanyById(
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
          company: true,
          cv: true,
          workExperience: true,
        },
      },
    },
  });
}
