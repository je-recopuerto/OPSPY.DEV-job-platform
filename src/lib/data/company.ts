import { CompanyWithOpenings } from "@/lib/data/job.types";
import prisma from "@/lib/db";
import { companyFilterSchema } from "@/schemas/company";
import { Company, Prisma } from "@prisma/client";
import { z } from "zod";
import CompanyWhereInput = Prisma.CompanyWhereInput;

export const COMPANY_PAGE_SIZE = 10;

export async function getCompanysToReview(): Promise<Company[]> {
  return prisma.company.findMany({
    include: {
      openings: true,
    },
    where: {
      isVerified: false,
    },
  });
}

export async function getCompanyCountGrowth(): Promise<{
  count: number;
  countLastMonth: number;
}> {
  const [count, countLastMonth] = await Promise.all([
    prisma.company.count(),
    prisma.company.count({
      where: {
        createdAt: {
          lt: new Date(Date.now() - 86_400_000 * 30),
        },
      },
    }),
  ]);

  return {
    count,
    countLastMonth,
  };
}

const generateFilters = (
  searchParams: z.infer<typeof companyFilterSchema>,
): CompanyWhereInput => {
  return {
    name: {
      contains: searchParams.name,
      mode: "insensitive",
    },
  };
};

export async function getCompanyById(companyId: string) {
  return prisma.company.findUnique({
    where: {
      id: companyId,
    },
  });
}

export async function getCompaniesPageCount(
  searchParams: z.infer<typeof companyFilterSchema>,
): Promise<number> {
  const companyCount = await prisma.company.count({
    where: {
      ...generateFilters(searchParams),
    },
  });

  return Math.ceil(companyCount / COMPANY_PAGE_SIZE);
}

export async function getCompaniesWithOpenings(
  searchParams: z.infer<typeof companyFilterSchema>,
): Promise<CompanyWithOpenings[]> {
  return prisma.company.findMany({
    include: {
      openings: true,
    },
    where: {
      ...generateFilters(searchParams),
    },
    take: COMPANY_PAGE_SIZE,
    skip: ((searchParams.page ?? 1) - 1) * COMPANY_PAGE_SIZE,
  });
}
