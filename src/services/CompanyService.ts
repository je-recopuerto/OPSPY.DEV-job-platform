import prisma from "@/lib/db";
import { companyFilterSchema } from "@/schemas/company";
import { CompanyWithOpenings } from "@/services/JobService";
import { z } from "zod";

export const COMPANY_PAGE_SIZE = 10;

export function getCompaniesWithOpenings(
  searchParams: z.infer<typeof companyFilterSchema>,
): Promise<CompanyWithOpenings[]> {
  return prisma.company.findMany({
    include: {
      openings: true,
    },
    where: {
      name: {
        contains: searchParams.name,
        mode: "insensitive",
      },
    },
    take: COMPANY_PAGE_SIZE,
    skip: ((searchParams.page ?? 1) - 1) * COMPANY_PAGE_SIZE,
  });
}
