import prisma from "@/lib/db";

export async function getCompanies() {
  // wait 5 seconds
  await new Promise(resolve => setTimeout(resolve, 5000));

  return prisma.company.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
}