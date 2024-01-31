import { Prisma } from ".prisma/client";
import prisma from "@/lib/db";
import { companyFilterSchema } from "@/schemas/company";
import { CompanyWithOpenings } from "@/services/JobService";
import { z } from "zod";
import CompanyWhereInput = Prisma.CompanyWhereInput;

export const COMPANY_PAGE_SIZE = 10;

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
