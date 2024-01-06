import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { CompanyWithOpenings } from "@/services/JobService";

export function getCompaniesWithOpenings(): Promise<CompanyWithOpenings[]> {
  return prisma.company.findMany({
    include: {
      openings: true,
    },
  });
}

export async function getCompanies({
  include,
}: {
  include?: Prisma.CompanyInclude;
}) {
  return prisma.company.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: include,
  });
}
