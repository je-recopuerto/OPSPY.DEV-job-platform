import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export function getUserById(id: string) {
  return prisma.user.findFirst({
    where: {
      id: id,
    },
  });
}

export type UserWithJobTrackers = Prisma.UserGetPayload<{
  include: {
    trackers: true;
  };
}>;

export function getUserWithJobTrackersById(
  id: string,
): Promise<UserWithJobTrackers | null> {
  return prisma.user.findFirst({
    where: {
      id: id,
    },
    include: {
      trackers: true,
    },
  });
}
