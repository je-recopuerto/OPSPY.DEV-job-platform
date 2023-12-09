import prisma from "@/lib/db";
import {Prisma} from "@prisma/client";

export type CompanyWithOpenings = Prisma.CompanyGetPayload<{
  include: {
    openings: true;
  };
}>;

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
      createdAt: 'desc',
    },
    include: include,
  });
}