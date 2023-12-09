import prisma from "@/lib/db";

export function getJobPosts() {
  return prisma.jobPost.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
}