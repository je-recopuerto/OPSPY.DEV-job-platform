import prisma from "@/lib/db";

export function getUserById(id: string) {
  return prisma.user.findFirst({
    where: {
      id: id
    }
  });
}